import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Upload, Download, Loader2, CheckCircle2, AlertCircle, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { CATEGORIES, type ProductCategory } from "@/hooks/useProducts";
import { toast } from "sonner";

/**
 * Bulk uploads products from an Excel file.
 *
 * Expected columns (case-insensitive, flexible):
 *   name, category, brand, sku, base_price, original_price, image, tag,
 *   rating, review_count, description, composition, crops, pests, units, specs
 *
 * - "category" must be one of the category IDs (insecticides, fungicides, herbicides,
 *   pgr, fertilizers, seeds, bio-pesticides, equipment) OR a friendly name we map.
 * - "crops" / "pests" — comma-separated string.
 * - "units" — JSON array string OR comma-separated "label:multiplier" pairs.
 * - "specs" — JSON array of {label,value} OR pipe-separated "Label=Value|Label=Value".
 */

type UploadStatus = "idle" | "parsing" | "uploading" | "done" | "error";

interface ParsedRow {
  ok: boolean;
  product?: any;
  error?: string;
  rowIndex: number;
}

const CATEGORY_ID_SET = new Set(CATEGORIES.map((c) => c.id));
const CATEGORY_ALIASES: Record<string, ProductCategory> = {
  insecticide: "insecticides",
  insecticides: "insecticides",
  fungicide: "fungicides",
  fungicides: "fungicides",
  herbicide: "herbicides",
  herbicides: "herbicides",
  pgr: "pgr",
  "plant growth regulator": "pgr",
  "plant growth regulators": "pgr",
  fertilizer: "fertilizers",
  fertilizers: "fertilizers",
  nutrition: "fertilizers",
  seed: "seeds",
  seeds: "seeds",
  "bio-pesticide": "bio-pesticides",
  "bio pesticide": "bio-pesticides",
  "bio-pesticides": "bio-pesticides",
  "biopesticides": "bio-pesticides",
  equipment: "equipment",
  tool: "equipment",
  tools: "equipment",
};

function normalizeKey(k: string): string {
  return k.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function pick(row: Record<string, any>, keys: string[]): any {
  for (const k of keys) {
    const v = row[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function toStringArr(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  return String(v)
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseUnits(v: any): { label: string; multiplier: number }[] {
  if (!v) return [{ label: "1 pc", multiplier: 1 }];
  // Try JSON first
  if (typeof v === "string") {
    const trimmed = v.trim();
    if (trimmed.startsWith("[")) {
      try {
        const arr = JSON.parse(trimmed);
        if (Array.isArray(arr)) return arr;
      } catch {
        // fallthrough
      }
    }
    // fallback: comma-separated "label:multiplier"
    return trimmed
      .split(/[,;]/)
      .map((part) => {
        const [label, mult] = part.split(":").map((s) => s.trim());
        return { label: label || "1 pc", multiplier: parseFloat(mult) || 1 };
      })
      .filter((u) => u.label);
  }
  if (Array.isArray(v)) return v;
  return [{ label: "1 pc", multiplier: 1 }];
}

function parseSpecs(v: any, composition?: string): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  if (composition) specs.push({ label: "Composition", value: String(composition) });
  if (!v) return specs;
  if (typeof v === "string") {
    const trimmed = v.trim();
    if (trimmed.startsWith("[")) {
      try {
        const arr = JSON.parse(trimmed);
        if (Array.isArray(arr)) return [...specs, ...arr];
      } catch {
        // fallthrough
      }
    }
    // pipe-separated "Label=Value|Label=Value"
    trimmed.split("|").forEach((p) => {
      const [label, ...rest] = p.split("=");
      if (label && rest.length) specs.push({ label: label.trim(), value: rest.join("=").trim() });
    });
  } else if (Array.isArray(v)) {
    return [...specs, ...v];
  }
  return specs;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function parseRow(raw: Record<string, any>, idx: number): ParsedRow {
  const row: Record<string, any> = {};
  Object.keys(raw).forEach((k) => {
    row[normalizeKey(k)] = raw[k];
  });

  const name = pick(row, ["name", "product_name", "title"]);
  if (!name) return { ok: false, rowIndex: idx, error: "Missing 'name'" };

  const rawCategory = String(pick(row, ["category", "type"]) || "").toLowerCase().trim();
  let category: ProductCategory | undefined;
  if (CATEGORY_ID_SET.has(rawCategory as ProductCategory)) {
    category = rawCategory as ProductCategory;
  } else if (CATEGORY_ALIASES[rawCategory]) {
    category = CATEGORY_ALIASES[rawCategory];
  }
  if (!category) return { ok: false, rowIndex: idx, error: `Invalid category: '${rawCategory}'` };

  const brand = String(pick(row, ["brand", "manufacturer", "company"]) || "").trim() || "Generic";
  const sku = String(pick(row, ["sku", "code"]) || `${slugify(name)}-${Date.now()}-${idx}`).trim();
  const basePrice = Number(pick(row, ["base_price", "price", "selling_price"]) || 0);
  const originalPrice = Number(pick(row, ["original_price", "mrp", "list_price"]) || basePrice);
  const image = String(pick(row, ["image", "image_url", "img"]) || "").trim();
  const tag = String(pick(row, ["tag", "badge"]) || "").trim() || null;
  const rating = Number(pick(row, ["rating"]) || 0);
  const reviewCount = Number(pick(row, ["review_count", "reviews"]) || 0);
  const description = String(pick(row, ["description", "details", "long_description"]) || "");
  const composition = pick(row, ["composition", "active_ingredient", "technical_name"]);
  const crops = toStringArr(pick(row, ["crops", "target_crops"]));
  const pests = toStringArr(pick(row, ["pests", "target_pests"]));
  const units = parseUnits(pick(row, ["units", "pack_size", "packs"]));
  const specs = parseSpecs(pick(row, ["specs", "specifications"]), composition);

  const id = `${slugify(brand)}-${slugify(name)}-${idx}`.slice(0, 80);

  return {
    ok: true,
    rowIndex: idx,
    product: {
      id,
      name: String(name).trim(),
      brand,
      category,
      base_price: basePrice,
      original_price: originalPrice,
      image_url: image,
      images: image ? [image] : [],
      tag,
      rating,
      review_count: reviewCount,
      units,
      sku,
      description,
      specs,
      crops,
      pests,
    },
  };
}

const BulkProductUploader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [parsed, setParsed] = useState<ParsedRow[]>([]);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const reset = () => {
    setStatus("idle");
    setParsed([]);
    setProgress({ done: 0, total: 0 });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    setStatus("parsing");
    setParsed([]);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });
      const results = rows.map((r, i) => parseRow(r, i));
      setParsed(results);
      setStatus("idle");
      const errors = results.filter((r) => !r.ok).length;
      if (errors > 0) {
        toast.warning(`${results.length - errors} valid rows, ${errors} rows have errors`);
      } else {
        toast.success(`${results.length} rows parsed successfully`);
      }
    } catch (e: any) {
      toast.error(`Failed to read file: ${e.message}`);
      setStatus("error");
    }
  };

  const handleUpload = async () => {
    const valid = parsed.filter((r) => r.ok).map((r) => r.product);
    if (valid.length === 0) {
      toast.error("No valid rows to upload");
      return;
    }
    setStatus("uploading");
    setProgress({ done: 0, total: valid.length });
    const BATCH = 50;
    let inserted = 0;
    let failed = 0;
    for (let i = 0; i < valid.length; i += BATCH) {
      const chunk = valid.slice(i, i + BATCH);
      const { error } = await supabase.from("products").upsert(chunk, { onConflict: "id" });
      if (error) {
        failed += chunk.length;
        console.error("Upload chunk failed", error);
      } else {
        inserted += chunk.length;
      }
      setProgress({ done: i + chunk.length, total: valid.length });
    }
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["active-brands"] });
    if (failed > 0) {
      toast.error(`Inserted ${inserted}, failed ${failed}. Check console.`);
    } else {
      toast.success(`Successfully uploaded ${inserted} products`);
    }
    setStatus("done");
  };

  const downloadTemplate = () => {
    const headers = [
      "name",
      "category",
      "brand",
      "sku",
      "base_price",
      "original_price",
      "image",
      "tag",
      "rating",
      "review_count",
      "composition",
      "description",
      "crops",
      "pests",
      "units",
      "specs",
    ];
    const example = {
      name: "Emamectin Benzoate 5% SG",
      category: "insecticides",
      brand: "AbhiAgri",
      sku: "ABH-EMB-001",
      base_price: 350,
      original_price: 420,
      image: "https://example.com/img.jpg",
      tag: "Bestseller",
      rating: 4.5,
      review_count: 25,
      composition: "Emamectin Benzoate 5% SG",
      description: "<p>Effective on lepidopteran pests.</p>",
      crops: "Cotton, Chilli, Vegetables",
      pests: "Bollworm, Fruit borer",
      units: "100 g:0.3, 250 g:0.7, 500 g:1",
      specs: "Mode of Action=Translaminar|Formulation=SG",
    };
    const ws = XLSX.utils.json_to_sheet([example], { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "abhiagri-products-template.xlsx");
  };

  const validCount = parsed.filter((r) => r.ok).length;
  const errorCount = parsed.length - validCount;

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Upload className="size-4 mr-1" /> Bulk Upload
      </Button>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="size-5" />
              Bulk Upload Products
            </DialogTitle>
            <DialogDescription>
              Upload an Excel file (.xlsx) with product data. Products will be matched by{" "}
              <code className="text-xs bg-secondary px-1 rounded">id</code> and upserted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 p-4 bg-secondary/40 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Need the format?</p>
                <p className="text-xs text-muted-foreground">Download a template with example data</p>
              </div>
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="size-4 mr-1" /> Template
              </Button>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              <FileSpreadsheet className="size-10 text-muted-foreground mx-auto mb-3" />
              <Button onClick={() => fileInputRef.current?.click()} disabled={status === "parsing" || status === "uploading"}>
                {status === "parsing" ? <><Loader2 className="size-4 mr-1 animate-spin" /> Parsing…</> : "Choose Excel File"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Supports .xlsx, .xls, .csv</p>
            </div>

            {parsed.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-primary">
                    <CheckCircle2 className="size-4" /> {validCount} valid
                  </span>
                  {errorCount > 0 && (
                    <span className="flex items-center gap-1.5 text-destructive">
                      <AlertCircle className="size-4" /> {errorCount} errors
                    </span>
                  )}
                </div>
                {errorCount > 0 && (
                  <div className="max-h-32 overflow-y-auto border border-destructive/30 rounded-lg p-2 bg-destructive/5 text-xs space-y-1">
                    {parsed.filter((r) => !r.ok).slice(0, 10).map((r) => (
                      <div key={r.rowIndex} className="text-destructive">
                        Row {r.rowIndex + 2}: {r.error}
                      </div>
                    ))}
                    {errorCount > 10 && <div className="text-muted-foreground">…and {errorCount - 10} more</div>}
                  </div>
                )}
              </div>
            )}

            {status === "uploading" && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Uploading {progress.done} / {progress.total}…
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(progress.done / Math.max(1, progress.total)) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
              <Button
                onClick={handleUpload}
                disabled={validCount === 0 || status === "uploading" || status === "parsing"}
              >
                {status === "uploading" && <Loader2 className="size-4 mr-1 animate-spin" />}
                Upload {validCount} Products
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { BulkProductUploader };
