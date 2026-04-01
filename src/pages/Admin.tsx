import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  CATEGORIES,
  type Product,
  type UnitOption,
  type ProductSpec,
} from "@/hooks/useProducts";
import { formatINR } from "@/contexts/CartContext";
import { toast } from "sonner";

const EMPTY_PRODUCT: Omit<Product, "createdAt"> = {
  id: "",
  name: "",
  brand: "",
  category: "crop-protection",
  basePrice: 0,
  originalPrice: 0,
  image: "",
  images: [],
  tag: "",
  rating: 0,
  reviewCount: 0,
  units: [{ label: "1 pc", multiplier: 1 }],
  sku: "",
  description: "",
  specs: [],
  crops: [],
  pests: [],
};

const Admin = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-foreground">Admin Access Required</h1>
        <p className="text-muted-foreground">Please log in to manage products.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  const openAdd = () => {
    setForm({ ...EMPTY_PRODUCT, id: crypto.randomUUID().slice(0, 12) });
    setEditMode(false);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setForm({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      basePrice: product.basePrice,
      originalPrice: product.originalPrice,
      image: product.image,
      images: product.images,
      tag: product.tag || "",
      rating: product.rating,
      reviewCount: product.reviewCount,
      units: product.units,
      sku: product.sku,
      description: product.description,
      specs: product.specs,
      crops: product.crops,
      pests: product.pests,
    });
    setEditMode(true);
    setDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteProduct.mutate(deletingId);
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.sku) {
      toast.error("Name, brand and SKU are required");
      return;
    }
    const product: Product = {
      ...form,
      tag: form.tag || undefined,
    };
    if (editMode) {
      updateProduct.mutate(product, { onSuccess: () => setDialogOpen(false) });
    } else {
      createProduct.mutate(product, { onSuccess: () => setDialogOpen(false) });
    }
  };

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Helpers for array/JSON fields
  const updateSpec = (index: number, field: "label" | "value", val: string) => {
    const newSpecs = [...form.specs];
    newSpecs[index] = { ...newSpecs[index], [field]: val };
    updateField("specs", newSpecs);
  };

  const addSpec = () => updateField("specs", [...form.specs, { label: "", value: "" }]);
  const removeSpec = (i: number) => updateField("specs", form.specs.filter((_, idx) => idx !== i));

  const updateUnit = (index: number, field: "label" | "multiplier", val: string) => {
    const newUnits = [...form.units];
    newUnits[index] = { ...newUnits[index], [field]: field === "multiplier" ? parseFloat(val) || 0 : val };
    updateField("units", newUnits);
  };

  const addUnit = () => updateField("units", [...form.units, { label: "", multiplier: 1 }]);
  const removeUnit = (i: number) => updateField("units", form.units.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-xl font-bold text-foreground">Product Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="size-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Products ({products?.length || 0})
          </h2>
          <Button onClick={openAdd}>
            <Plus className="size-4 mr-1" /> Add Product
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : !products?.length ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No products yet. Add your first product!</p>
            <Button onClick={openAdd}>
              <Plus className="size-4 mr-1" /> Add Product
            </Button>
          </div>
        ) : (
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-foreground">Product</th>
                    <th className="text-left px-4 py-3 font-medium text-foreground">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-foreground">SKU</th>
                    <th className="text-right px-4 py-3 font-medium text-foreground">Price</th>
                    <th className="text-right px-4 py-3 font-medium text-foreground">Rating</th>
                    <th className="text-right px-4 py-3 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border hover:bg-secondary/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image && (
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-secondary" />
                          )}
                          <div>
                            <p className="font-medium text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{p.category.replace("-", " ")}</td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{p.sku}</td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">{formatINR(p.basePrice)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{p.rating} ★</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                            <Pencil className="size-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => confirmDelete(p.id)}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input id="brand" value={form.brand} onChange={(e) => updateField("brand", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => updateField("category", v as Product["category"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" value={form.sku} onChange={(e) => updateField("sku", e.target.value)} required disabled={editMode} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (₹)</Label>
                <Input id="basePrice" type="number" value={form.basePrice} onChange={(e) => updateField("basePrice", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input id="originalPrice" type="number" value={form.originalPrice} onChange={(e) => updateField("originalPrice", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" value={form.image} onChange={(e) => { updateField("image", e.target.value); updateField("images", [e.target.value]); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Tag</Label>
                <Input id="tag" value={form.tag || ""} onChange={(e) => updateField("tag", e.target.value)} placeholder="e.g. Bestseller" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => updateField("rating", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewCount">Review Count</Label>
                <Input id="reviewCount" type="number" value={form.reviewCount} onChange={(e) => updateField("reviewCount", Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crops">Target Crops (comma-separated)</Label>
              <Input id="crops" value={form.crops.join(", ")} onChange={(e) => updateField("crops", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pests">Target Pests (comma-separated)</Label>
              <Input id="pests" value={form.pests.join(", ")} onChange={(e) => updateField("pests", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
            </div>

            <div className="space-y-2">
              <Label>Description (HTML supported)</Label>
              <Textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={8}
                placeholder="Enter product description (HTML supported)"
              />
            </div>

            {/* Units */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Units / Pack Sizes</Label>
                <Button type="button" variant="outline" size="sm" onClick={addUnit}>
                  <Plus className="size-3 mr-1" /> Add Unit
                </Button>
              </div>
              {form.units.map((unit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input placeholder="Label (e.g. 1 kg)" value={unit.label} onChange={(e) => updateUnit(i, "label", e.target.value)} className="flex-1" />
                  <Input placeholder="Multiplier" type="number" step="0.01" value={unit.multiplier} onChange={(e) => updateUnit(i, "multiplier", e.target.value)} className="w-28" />
                  {form.units.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeUnit(i)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Specifications</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSpec}>
                  <Plus className="size-3 mr-1" /> Add Spec
                </Button>
              </div>
              {form.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input placeholder="Label" value={spec.label} onChange={(e) => updateSpec(i, "label", e.target.value)} className="flex-1" />
                  <Input placeholder="Value" value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} className="flex-1" />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeSpec(i)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                {(createProduct.isPending || updateProduct.isPending) && <Loader2 className="size-4 mr-1 animate-spin" />}
                {editMode ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
