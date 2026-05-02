import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bug, Sprout, Leaf, TrendingUp, Beaker, Wheat, Shield, Wrench, ArrowRight, Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { useCart, formatINR } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useProducts, useActiveBrands, CATEGORIES, type Product } from "@/hooks/useProducts";
import { toast } from "sonner";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  insecticides: <Bug className="size-7" />,
  fungicides: <Sprout className="size-7" />,
  herbicides: <Leaf className="size-7" />,
  pgr: <TrendingUp className="size-7" />,
  fertilizers: <Beaker className="size-7" />,
  seeds: <Wheat className="size-7" />,
  "bio-pesticides": <Shield className="size-7" />,
  equipment: <Wrench className="size-7" />,
};

const Index = () => {
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const lp = useLocalizedPath();
  const { data: products, isLoading } = useProducts();
  const { data: activeBrands } = useActiveBrands();

  const bestSellers = useMemo(
    () => (products || []).filter(p => p.tag || p.rating >= 4.5).slice(0, 8),
    [products]
  );

  const handleAddToCart = (product: Product, unit: string, price: number) => {
    addItem({
      id: `${product.id}-${unit}`,
      name: product.name,
      price,
      unit,
      image: product.image,
    });
    toast.success(`${product.name} (${unit}) added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <HeroSlider />

      {/* Shop by Category */}
      <section className="container py-10 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">{t("index.shop_by_category")}</h2>
          <p className="mt-1.5 sm:mt-2 text-muted-foreground text-xs sm:text-sm">{t("index.category_subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={lp(`/collection?cat=${cat.id}`)}
              className="card-hover flex flex-col items-center gap-2 sm:gap-3 rounded-2xl bg-card p-4 sm:p-6 md:p-8 text-center transition-all duration-200 hover:bg-secondary/50 border-0"
            >
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                {CATEGORY_ICONS[cat.id]}
              </div>
              <span className="font-semibold text-foreground text-sm">
                {language === "hi" ? cat.nameHi : cat.name}
              </span>
              <span className="text-xs text-muted-foreground leading-snug">
                {language === "hi" ? cat.descriptionHi : cat.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Brand — only renders when products with brands exist */}
      {activeBrands && activeBrands.length > 0 && (
        <section className="bg-secondary/20 py-10 sm:py-14 md:py-16">
          <div className="container px-4 sm:px-6">
            <div className="mb-6 sm:mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {language === "hi" ? "ब्रांड के अनुसार खरीदें" : "Shop by Brand"}
                </h2>
                <p className="mt-1.5 text-muted-foreground text-xs sm:text-sm">
                  {language === "hi" ? "विश्वसनीय निर्माताओं से असली उत्पाद" : "Genuine products from trusted manufacturers"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {activeBrands.map((brand) => (
                <Link
                  key={brand.id}
                  to={lp(`/collection?brand=${brand.id}`)}
                  className="card-hover group flex flex-col items-center justify-center gap-2 rounded-2xl bg-card p-4 sm:p-5 text-center transition-all duration-200 hover:bg-primary/5 border border-border/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Store className="size-4" />
                  </div>
                  <span className="font-semibold text-foreground text-sm leading-tight">{brand.label}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {brand.count} {language === "hi" ? "उत्पाद" : brand.count === 1 ? "product" : "products"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers — use content-visibility for below-fold paint optimization */}
      <section className="bg-secondary/30 py-10 sm:py-16 md:py-20" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
        <div className="container px-4 sm:px-6">
          <div className="mb-6 sm:mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">{t("index.best_sellers")}</h2>
              <p className="mt-1.5 sm:mt-2 text-muted-foreground text-xs sm:text-sm">{t("index.best_sellers_subtitle")}</p>
            </div>
            <Button variant="link" className="hidden sm:flex text-primary" asChild>
              <Link to={lp("/collection")}>{t("index.view_all")} <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : bestSellers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  basePrice={product.basePrice}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  tag={product.tag}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  units={product.units}
                  onAddToCart={(unit, price) => handleAddToCart(product, unit, price)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container py-10 sm:py-16 md:py-20 px-4 sm:px-6" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 400px" }}>
        <div className="rounded-2xl bg-primary p-6 sm:p-10 md:p-16 text-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            {t("index.cta_title")}
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-sm sm:text-base md:text-lg">
            {t("index.cta_subtitle")}
          </p>
          <Button variant="accent" size="lg" className="sm:!h-14 sm:!px-10 sm:!text-lg sm:!rounded-xl" asChild>
            <Link to={lp("/collection")}>{t("index.start_shopping")} <ArrowRight className="size-4 sm:size-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
