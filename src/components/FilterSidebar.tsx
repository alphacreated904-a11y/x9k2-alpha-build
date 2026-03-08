import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { formatINR } from "@/contexts/CartContext";

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/60 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-foreground min-h-0 min-w-0"
      >
        {title}
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
};

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceChange: (val: [number, number]) => void;
  brands: FilterOption[];
  selectedBrands: string[];
  onBrandToggle: (id: string) => void;
  cropTypes: FilterOption[];
  selectedCropTypes: string[];
  onCropTypeToggle: (id: string) => void;
  pests: FilterOption[];
  selectedPests: string[];
  onPestToggle: (id: string) => void;
  maxPrice?: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange, onPriceChange,
  brands, selectedBrands, onBrandToggle,
  cropTypes, selectedCropTypes, onCropTypeToggle,
  pests, selectedPests, onPestToggle,
  maxPrice = 5000,
}) => {
  return (
    <aside className="w-full space-y-0">
      <h3 className="text-base font-bold text-foreground mb-2">Filters</h3>

      <FilterSection title="Price Range">
        <Slider
          min={0}
          max={maxPrice}
          step={50}
          value={priceRange}
          onValueChange={(v) => onPriceChange(v as [number, number])}
          className="py-2"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatINR(priceRange[0])}</span>
          <span>{formatINR(priceRange[1])}</span>
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map((b) => (
          <label key={b.id} className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={selectedBrands.includes(b.id)}
              onCheckedChange={() => onBrandToggle(b.id)}
              className="min-h-0 min-w-0"
            />
            <span className="text-sm text-foreground flex-1">{b.label}</span>
            {b.count !== undefined && <span className="text-xs text-muted-foreground">{b.count}</span>}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Crop Type">
        {cropTypes.map((c) => (
          <label key={c.id} className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={selectedCropTypes.includes(c.id)}
              onCheckedChange={() => onCropTypeToggle(c.id)}
              className="min-h-0 min-w-0"
            />
            <span className="text-sm text-foreground flex-1">{c.label}</span>
            {c.count !== undefined && <span className="text-xs text-muted-foreground">{c.count}</span>}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Pests" defaultOpen={false}>
        {pests.map((p) => (
          <label key={p.id} className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={selectedPests.includes(p.id)}
              onCheckedChange={() => onPestToggle(p.id)}
              className="min-h-0 min-w-0"
            />
            <span className="text-sm text-foreground flex-1">{p.label}</span>
            {p.count !== undefined && <span className="text-xs text-muted-foreground">{p.count}</span>}
          </label>
        ))}
      </FilterSection>
    </aside>
  );
};

export { FilterSidebar };
export type { FilterOption };
