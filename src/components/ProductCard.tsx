import React from "react";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/AddToCartButton";

interface ProductCardProps {
  name: string;
  price: string;
  unit: string;
  image: string;
  tag?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, unit, image, tag, onAddToCart }) => {
  return (
    <div className="group card-hover rounded-2xl bg-card overflow-hidden border-0">
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
      <div className="p-4 space-y-2.5">
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">{price}</span>
            <span className="text-xs text-muted-foreground">/ {unit}</span>
          </div>
          <AddToCartButton
            onAddToCart={onAddToCart}
            label="Add"
            addedLabel="✓"
            variant="default"
            size="sm"
            className="rounded-full h-9 px-4 min-h-0"
          />
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
