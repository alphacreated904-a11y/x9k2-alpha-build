import React from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, formatINR } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Separator } from "@/components/ui/separator";

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const { t } = useLanguage();
  const lp = useLocalizedPath();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="size-5" />
            {t("cart.your_cart")} ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{t("cart.empty")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("cart.add_items")}</p>
            </div>
            <Button variant="default" onClick={closeCart} asChild>
              <Link to={lp("/collection")}>{t("cart.shop_now")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.unit}`} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover bg-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">per {item.unit}</p>
                    <p className="text-sm font-semibold text-primary mt-1">{formatINR(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="size-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4 space-y-4 bg-card">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="font-medium text-foreground">{formatINR(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.shipping")}</span>
                  <span className="text-muted-foreground">{t("cart.shipping_calc")}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">{t("cart.total")}</span>
                <span className="font-bold text-lg text-foreground">{formatINR(totalPrice)}</span>
              </div>
              <Button variant="default" size="lg" className="w-full" asChild onClick={closeCart}>
                <Link to={lp("/checkout")}>{t("cart.checkout")}</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={closeCart}>
                {t("cart.continue")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export { CartDrawer };
