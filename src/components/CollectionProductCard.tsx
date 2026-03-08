import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatINR } from "@/contexts/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UnitOption {
  label: string;
  multiplier: number;
}

interface CollectionProductCardProps {
  id: string;
  name: string;
  basePrice: number;
  image: string;
  tag?: string;
  units?: UnitOption[];
  onAddToCart?: (unit: string, price: number) => void;
}

const DEFAULT_UNITS: UnitOption[] = [
  { label: "1 kg", multiplier: 1 },
  { label: "500 g", multiplier: 0.55 },
  { label: "250 g", multiplier: 0.3 },
];

const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  id, name, basePrice, image, tag, units = DEFAULT_UNITS, onAddToCart,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(units[0].label);

  const currentUnit = useMemo(() => 
    units.find(u => u.label === selectedUnit) || units[0],
  [units, selectedUnit]);

  const currentPrice = useMemo(() => 
    Math.round(basePrice * currentUnit.multiplier),
  [basePrice, currentUnit]);

  return (
    <div className="group card-hover rounded-2xl bg-card overflow-hidden border-0">
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {tag && (
            <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {tag}
            </span>
          )}
        </div>
        <div className="p-4 pb-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{name}</h3>
        </div>
      </Link>
      <div className="p-4 pt-3 space-y-3">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">{formatINR(currentPrice)}</span>
          <span className="text-xs text-muted-foreground">/ {selectedUnit}</span>
        </div>
        <Select value={selectedUnit} onValueChange={setSelectedUnit}>
          <SelectTrigger className="h-9 text-xs rounded-lg border-border/60 min-h-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u.label} value={u.label} className="text-xs">
                {u.label} — {formatINR(Math.round(basePrice * u.multiplier))}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AddToCartButton
          onAddToCart={() => onAddToCart?.(selectedUnit, currentPrice)}
          label="Add to Cart"
          addedLabel="Added!"
          variant="default"
          size="sm"
          className="w-full rounded-lg font-semibold"
        />
      </div>
    </div>
  );
};

export { CollectionProductCard };
