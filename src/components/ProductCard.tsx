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
    <div className="group card-hover rounded-xl bg-card border-0 overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
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
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-foreground leading-tight">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-primary">{price}</span>
          <span className="text-sm text-muted-foreground">/ {unit}</span>
        </div>
        <AddToCartButton
          onAddToCart={onAddToCart}
          variant="default"
          size="default"
          className="w-full"
        />
      </div>
    </div>
  );
};

export { ProductCard };
