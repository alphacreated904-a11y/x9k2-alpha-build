import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCartButton } from "@/components/AddToCartButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CollectionProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  tag?: string;
  units?: string[];
  onAddToCart?: (unit: string) => void;
}

const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  id, name, price, image, tag, units = ["1 kg", "500 g", "250 g"], onAddToCart,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(units[0]);

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
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-lg font-bold text-primary">{price}</span>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-3 space-y-3">
        <Select value={selectedUnit} onValueChange={setSelectedUnit}>
          <SelectTrigger className="h-9 text-xs rounded-lg border-border/60 min-h-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u} className="text-xs">{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AddToCartButton
          onAddToCart={() => onAddToCart?.(selectedUnit)}
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
