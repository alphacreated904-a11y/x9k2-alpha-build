import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatINR } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UnitOption } from "@/hooks/useProducts";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  originalPrice: number;
  image: string;
  tag?: string;
  rating: number;
  reviewCount: number;
  units: UnitOption[];
  onAddToCart?: (unit: string, price: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id, name, brand, basePrice, originalPrice, image, tag, rating, reviewCount, units, onAddToCart,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(units[0].label);
  const { t } = useLanguage();
  const lp = useLocalizedPath();

  const currentUnit = useMemo(() =>
    units.find(u => u.label === selectedUnit) || units[0],
    [units, selectedUnit]);

  const currentPrice = useMemo(() =>
    Math.round(basePrice * currentUnit.multiplier),
    [basePrice, currentUnit]);

  const currentOriginal = useMemo(() =>
    Math.round(originalPrice * currentUnit.multiplier),
    [originalPrice, currentUnit]);

  const discount = Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100);

  return (
    <div className="group card-hover rounded-2xl bg-card overflow-hidden border-0">
      <Link to={lp(`/product/${id}`)} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-destructive px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold text-destructive-foreground">
              {discount}% OFF
            </span>
          )}
          {tag && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-accent px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs font-semibold text-accent-foreground">
              {tag}
            </span>
          )}
        </div>
        <div className="p-3 sm:p-4 pb-1">
          <p className="text-[10px] sm:text-[11px] font-medium text-primary uppercase tracking-wide mb-0.5 sm:mb-1">{brand}</p>
          <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-tight line-clamp-2">{name}</h3>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
            <span className="text-[11px] text-muted-foreground ml-1">({reviewCount})</span>
          </div>
        </div>
      </Link>
      <div className="p-3 sm:p-4 pt-2 space-y-2">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-base sm:text-lg font-bold text-primary">{formatINR(currentPrice)}</span>
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">{formatINR(currentOriginal)}</span>
          )}
        </div>
        {units.length > 1 && (
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger className="h-8 text-xs rounded-lg border-border/60 min-h-0">
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
        )}
        <AddToCartButton
          onAddToCart={() => onAddToCart?.(selectedUnit, currentPrice)}
          label={t("common.add_to_cart")}
          addedLabel={t("common.added")}
          variant="default"
          size="sm"
          className="w-full rounded-lg font-semibold"
        />
      </div>
    </div>
  );
};

export { ProductCard };
