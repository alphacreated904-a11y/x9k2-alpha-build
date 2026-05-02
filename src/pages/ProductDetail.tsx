import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck, Truck, BadgeCheck, Minus, Plus, Star, Loader2, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart, formatINR } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useProduct, useSimilarProducts, CATEGORIES } from "@/hooks/useProducts";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);
  const { data: similarProducts } = useSimilarProducts(product, 8);
  const category = CATEGORIES.find(c => c.id === product?.category);
  const { language, t } = useLanguage();
  const lp = useLocalizedPath();

  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState("");
  const { addItem } = useCart();

  // Set default unit when product loads
  React.useEffect(() => {
    if (product && product.units.length > 0 && !selectedUnit) {
      setSelectedUnit(product.units[0].label);
    }
  }, [product, selectedUnit]);

  const currentUnit = useMemo(() =>
    product?.units.find(u => u.label === selectedUnit) || product?.units[0],
    [product?.units, selectedUnit]);

  const currentPrice = useMemo(() =>
    Math.round((product?.basePrice || 0) * (currentUnit?.multiplier || 1)),
    [product?.basePrice, currentUnit]);

  const currentOriginal = useMemo(() =>
    Math.round((product?.originalPrice || 0) * (currentUnit?.multiplier || 1)),
    [product?.originalPrice, currentUnit]);

  const discount = currentOriginal > 0 ? Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: `${product.id}-${selectedUnit}`,
      name: product.name,
      price: currentPrice,
      unit: selectedUnit,
      image: product.images[0],
    }, quantity);
    toast.success(`${quantity}x ${product.name} (${selectedUnit}) added to cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <div className="flex justify-center py-32">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild><Link to={lp("/collection")}>Browse Products</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryName = category ? (language === "hi" ? category.nameHi : category.name) : t("common.products");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("common.home"),
        "item": `${window.location.origin}${lp("/")}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryName,
        "item": `${window.location.origin}${lp(`/collection?cat=${product.category}`)}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TopBar />
      <Navbar />

      <div className="container py-4">
        <nav className="text-xs text-muted-foreground">
          <Link to={lp("/")} className="hover:text-foreground transition-colors min-h-0 min-w-0">{t("common.home")}</Link>
          <span className="mx-2">/</span>
          <Link to={lp(`/collection?cat=${product.category}`)} className="hover:text-foreground transition-colors min-h-0 min-w-0">
            {categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      <section className="container pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-primary">{product.brand}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  <BadgeCheck className="size-3" /> {t("product.verified_seller")}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount} {t("product.reviews")})</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">SKU: {product.sku}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">{formatINR(currentPrice)}</span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatINR(currentOriginal)}</span>
                  <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent-foreground">
                    {t("product.save")} {discount}%
                  </span>
                </>
              )}
            </div>

            {product.units.length > 1 && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t("product.pack_size")}</label>
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                  <SelectTrigger className="w-full max-w-xs h-11 rounded-lg border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.units.map((u) => (
                      <SelectItem key={u.label} value={u.label}>
                        {u.label} — {formatINR(Math.round(product.basePrice * u.multiplier))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">{t("product.quantity")}:</span>
                <div className="flex items-center rounded-full border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors min-h-0 min-w-0"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors min-h-0 min-w-0"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <Button onClick={handleAddToCart} variant="default" size="xl" className="w-full text-base font-semibold">
                {t("common.add_to_cart")} — {formatINR(currentPrice * quantity)}
              </Button>
              <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-3 py-2 leading-relaxed">
                {t("policy.product_warning")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BadgeCheck className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("product.verified_seller")}</p>
                  <p className="text-xs">{t("product.genuine")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Truck className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t("product.delivery")}</p>
                  <p className="text-xs">{t("product.free_shipping")}</p>
                </div>
              </div>
            </div>

            {(product.crops.length > 0 || product.pests.length > 0) && (
              <div className="space-y-3 pt-2">
                {product.crops.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{t("product.target_crops")}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.crops.map(c => (
                        <span key={c} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
                {product.pests.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{t("product.target_pests")}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.pests.map(p => (
                        <span key={p} className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{p}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/20">
        <div className="container py-10 md:py-14">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start gap-1 bg-transparent p-0 border-b border-border rounded-none h-auto flex-wrap">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm"
              >
                {t("product.description")}
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm"
              >
                {t("product.specs")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6 md:mt-8 max-w-[900px]">
              <div
                className="prose max-w-none text-foreground font-sans
                  prose-headings:text-foreground prose-headings:font-sans prose-headings:tracking-tight

                  prose-h1:text-[24px] md:prose-h1:text-[28px] prose-h1:font-bold prose-h1:leading-[1.3] prose-h1:mt-8 prose-h1:mb-4

                  prose-h2:text-[20px] md:prose-h2:text-[22px] prose-h2:font-bold prose-h2:leading-[1.35] prose-h2:mt-8 md:prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-border prose-h2:pb-2

                  prose-h3:text-[18px] md:prose-h3:text-[20px] prose-h3:font-semibold prose-h3:leading-[1.4] prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-primary

                  prose-p:text-[14px] md:prose-p:text-[16px] prose-p:leading-[1.65] md:prose-p:leading-[1.7] prose-p:text-muted-foreground prose-p:mb-4

                  prose-ul:my-4 prose-ul:pl-5 prose-ul:text-muted-foreground prose-ul:space-y-1.5
                  prose-li:text-[14px] md:prose-li:text-[15px] prose-li:leading-[1.65] prose-li:marker:text-primary

                  prose-strong:text-foreground prose-strong:font-semibold

                  prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-6 prose-table:text-[13px] md:prose-table:text-sm
                  prose-thead:bg-primary/10
                  prose-th:px-3 md:prose-th:px-4 prose-th:py-2.5 md:prose-th:py-3 prose-th:text-left prose-th:text-foreground prose-th:font-semibold prose-th:border prose-th:border-border
                  prose-td:px-3 md:prose-td:px-4 prose-td:py-2.5 md:prose-td:py-3 prose-td:border prose-td:border-border prose-td:text-muted-foreground
                  prose-tr:even:bg-secondary/30"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </TabsContent>

            <TabsContent value="specs" className="mt-8 max-w-2xl">
              <div className="rounded-xl border border-border overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex py-3.5 px-4 text-sm ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}
                  >
                    <span className="w-40 shrink-0 font-medium text-foreground">{spec.label}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Similar Products — same category, prioritising same composition */}
      {similarProducts && similarProducts.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="container py-10 md:py-14 px-4 sm:px-6">
            <div className="mb-6 sm:mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {language === "hi" ? "समान उत्पाद देखें" : "View Similar Products"}
                </h2>
                <p className="mt-1.5 text-muted-foreground text-xs sm:text-sm">
                  {language === "hi"
                    ? `${categoryName} श्रेणी के अन्य उत्पाद`
                    : `Other ${categoryName.toLowerCase()} you might consider`}
                </p>
              </div>
              <Button variant="link" className="hidden sm:flex text-primary shrink-0" asChild>
                <Link to={lp(`/collection?cat=${product.category}`)}>
                  {language === "hi" ? "सभी देखें" : "View all"} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div
              className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "thin" }}
            >
              {similarProducts.map((sp) => (
                <div key={sp.id} className="snap-start shrink-0 w-[160px] sm:w-[200px] md:w-[230px]">
                  <ProductCard
                    id={sp.id}
                    name={sp.name}
                    brand={sp.brand}
                    basePrice={sp.basePrice}
                    originalPrice={sp.originalPrice}
                    image={sp.image}
                    tag={sp.tag}
                    rating={sp.rating}
                    reviewCount={sp.reviewCount}
                    units={sp.units}
                    onAddToCart={(unit, price) => {
                      addItem({
                        id: `${sp.id}-${unit}`,
                        name: sp.name,
                        price,
                        unit,
                        image: sp.image,
                      });
                      toast.success(`${sp.name} (${unit}) added to cart`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
