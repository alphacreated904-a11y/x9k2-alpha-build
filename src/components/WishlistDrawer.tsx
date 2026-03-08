import React from "react";
import { Link } from "react-router-dom";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart, formatINR } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { toast } from "sonner";

const WishlistDrawer: React.FC = () => {
  const { items, isOpen, closeWishlist, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { t } = useLanguage();
  const lp = useLocalizedPath();

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      unit: "1 pc",
      image: item.image,
    });
    removeItem(item.id);
    toast.success(`${item.name} moved to cart`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeWishlist()}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <Heart className="size-5 text-destructive" />
            {t("wishlist.title")} ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <Heart className="size-12 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{t("wishlist.empty")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("wishlist.browse")}</p>
            </div>
            <Button variant="default" onClick={closeWishlist} asChild>
              <Link to={lp("/collection")}>{t("cart.shop_now")}</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-secondary/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-secondary"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground line-clamp-2">{item.name}</h3>
                  <p className="text-sm font-semibold text-primary mt-1">{formatINR(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="h-7 text-xs rounded-full"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag className="size-3 mr-1" />
                      {t("common.add_to_cart")}
                    </Button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export { WishlistDrawer };
