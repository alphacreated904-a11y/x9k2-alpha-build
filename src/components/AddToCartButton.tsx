import React, { useState, useCallback } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  onAddToCart?: () => void;
  label?: string;
  addedLabel?: string;
}

const AddToCartButton = React.forwardRef<HTMLButtonElement, AddToCartButtonProps>(
  ({ className, onAddToCart, label = "Add to Cart", addedLabel = "Added!", variant = "default", size, ...props }, ref) => {
    const [state, setState] = useState<"idle" | "animating" | "done">("idle");

    const handleClick = useCallback(() => {
      if (state !== "idle") return;
      setState("animating");
      onAddToCart?.();

      setTimeout(() => setState("done"), 400);
      setTimeout(() => setState("idle"), 1800);
    }, [state, onAddToCart]);

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "relative overflow-hidden",
          state === "animating" && "animate-cart-pop",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            state === "done" && "opacity-0 scale-75"
          )}
        >
          <ShoppingCart className="size-4" />
          {label}
        </span>

        {state === "done" && (
          <span className="absolute inset-0 flex items-center justify-center gap-2 animate-cart-check text-primary-foreground">
            <Check className="size-4" />
            {addedLabel}
          </span>
        )}
      </Button>
    );
  }
);
AddToCartButton.displayName = "AddToCartButton";

export { AddToCartButton };
