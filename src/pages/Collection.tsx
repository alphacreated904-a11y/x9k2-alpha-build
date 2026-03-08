import React, { useState, useMemo, useCallback } from "react";
import { SlidersHorizontal, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useSearchParams, Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { FilterSidebar, type FilterOption } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";
import { ActiveFilters, type ActiveFilter } from "@/components/ActiveFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart, formatINR } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { ALL_PRODUCTS, BRANDS, CROP_TYPES, PEST_TYPES, CATEGORIES } from "@/data/products";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 8;

const CATEGORY_NAMES_HI: Record<string, string> = {
  seeds: "बीज",
  "crop-protection": "फसल सुरक्षा",
  nutrition: "पोषण",
  equipment: "उपकरण",
};

const Collection = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("cat") || "";
  const { language, t } = useLanguage();
  const lp = useLocalizedPath();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCropTypes, setSelectedCropTypes] = useState<string[]>([]);
  const [selectedPests, setSelectedPests] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { addItem } = useCart();

  const toggle = useCallback((list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    , []);

  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const filters: ActiveFilter[] = [];
    if (categoryFilter) {
      const cat = CATEGORIES.find(c => c.id === categoryFilter);
      if (cat) filters.push({ id: categoryFilter, label: language === "hi" ? CATEGORY_NAMES_HI[cat.id] || cat.name : cat.name, category: "category" });
    }
    if (priceRange[0] > 0 || priceRange[1] < 5000) {
      filters.push({ id: "price", label: `${formatINR(priceRange[0])} – ${formatINR(priceRange[1])}`, category: "price" });
    }
    selectedBrands.forEach((id) => {
      const b = BRANDS.find((x) => x.id === id);
      if (b) filters.push({ id, label: b.label, category: "brand" });
    });
    selectedCropTypes.forEach((id) => {
      const c = CROP_TYPES.find((x) => x.id === id);
      if (c) filters.push({ id, label: c.label, category: "crop" });
    });
    selectedPests.forEach((id) => {
      const p = PEST_TYPES.find((x) => x.id === id);
      if (p) filters.push({ id, label: p.label, category: "pest" });
    });
    return filters;
  }, [categoryFilter, priceRange, selectedBrands, selectedCropTypes, selectedPests, language]);

  const removeFilter = useCallback((filter: ActiveFilter) => {
    switch (filter.category) {
      case "price": setPriceRange([0, 5000]); break;
      case "brand": setSelectedBrands((s) => s.filter((x) => x !== filter.id)); break;
      case "crop": setSelectedCropTypes((s) => s.filter((x) => x !== filter.id)); break;
      case "pest": setSelectedPests((s) => s.filter((x) => x !== filter.id)); break;
    }
  }, []);

  const clearAll = useCallback(() => {
    setPriceRange([0, 5000]);
    setSelectedBrands([]);
    setSelectedCropTypes([]);
    setSelectedPests([]);
  }, []);

  const categoryProductCount = useMemo(() => {
    if (!categoryFilter) return ALL_PRODUCTS.length;
    return ALL_PRODUCTS.filter(p => p.category === categoryFilter).length;
  }, [categoryFilter]);

  const isComingSoon = categoryFilter && categoryProductCount === 0;

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS
      .filter((p) => {
        if (categoryFilter && p.category !== categoryFilter) return false;
        if (p.basePrice < priceRange[0] || p.basePrice > priceRange[1]) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low": return a.basePrice - b.basePrice;
          case "price-high": return b.basePrice - a.basePrice;
          case "rating": return b.rating - a.rating;
          case "name": return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
  }, [categoryFilter, priceRange, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleAddToCart = (product: typeof ALL_PRODUCTS[0], unit: string, price: number) => {
    addItem({
      id: `${product.id}-${unit}`,
      name: product.name,
      price,
      unit,
      image: product.image,
    });
    toast.success(`${product.name} (${unit}) — ${formatINR(price)} added to cart`);
  };

  const pageTitle = categoryFilter
    ? (language === "hi"
        ? CATEGORY_NAMES_HI[categoryFilter] || CATEGORIES.find(c => c.id === categoryFilter)?.name || t("common.products")
        : CATEGORIES.find(c => c.id === categoryFilter)?.name || "Products")
    : t("collection.all_products");

  const filterSidebarContent = (
    <FilterSidebar
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      brands={BRANDS}
      selectedBrands={selectedBrands}
      onBrandToggle={(id) => setSelectedBrands((s) => toggle(s, id))}
      cropTypes={CROP_TYPES}
      selectedCropTypes={selectedCropTypes}
      onCropTypeToggle={(id) => setSelectedCropTypes((s) => toggle(s, id))}
      pests={PEST_TYPES}
      selectedPests={selectedPests}
      onPestToggle={(id) => setSelectedPests((s) => toggle(s, id))}
      maxPrice={5000}
    />
  );

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
        "name": pageTitle
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
          <span className="text-foreground font-medium">{pageTitle}</span>
        </nav>
      </div>

      <div className="container pb-16">
        <div className="flex gap-8">
          <div className="hidden lg:block w-60 shrink-0">
            {filterSidebarContent}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{pageTitle}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">{filteredProducts.length} {t("collection.products_count")}</p>
              </div>
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="default" className="lg:hidden rounded-full gap-2">
                      <SlidersHorizontal className="size-4" />
                      {t("collection.filters")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-6 overflow-y-auto">
                    {filterSidebarContent}
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 h-11 rounded-full border-border/60 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t("collection.sort.featured")}</SelectItem>
                    <SelectItem value="price-low">{t("collection.sort.price_low")}</SelectItem>
                    <SelectItem value="price-high">{t("collection.sort.price_high")}</SelectItem>
                    <SelectItem value="rating">{t("collection.sort.rating")}</SelectItem>
                    <SelectItem value="name">{t("collection.sort.name")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFilters.length > 0 && !isComingSoon && (
              <div className="mb-5">
                <ActiveFilters filters={activeFilters} onRemove={removeFilter} onClearAll={clearAll} />
              </div>
            )}

             {isComingSoon && (
              <div className="py-20 text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src={logo}
                    alt="AbhiAgri mascot"
                    className="w-28 h-28 object-contain drop-shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{t("collection.coming_soon")}</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {language === "hi"
                    ? `हम आपके लिए सबसे अच्छे ${pageTitle.toLowerCase()} उत्पाद लाने के लिए कड़ी मेहनत कर रहे हैं।`
                    : `We're working hard to bring you the best ${pageTitle.toLowerCase()} products. Check back soon or browse our other categories.`}
                </p>
                <Button variant="default" asChild>
                  <Link to={lp("/collection")}>{t("collection.browse_all")}</Link>
                </Button>
              </div>
            )}

            {!isComingSoon && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {visibleProducts.map((product) => (
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

            {!isComingSoon && filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">{t("collection.no_match")}</p>
                <Button variant="link" onClick={clearAll} className="mt-2">{t("collection.clear_all")}</Button>
              </div>
            )}

            {!isComingSoon && hasMore && (
              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10"
                  onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                >
                  {t("collection.load_more")} ({filteredProducts.length - visibleCount} {t("collection.remaining")})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Collection;
