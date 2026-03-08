import React, { useState, useMemo, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { FilterSidebar, type FilterOption } from "@/components/FilterSidebar";
import { CollectionProductCard } from "@/components/CollectionProductCard";
import { ActiveFilters, type ActiveFilter } from "@/components/ActiveFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

import vegImage from "@/assets/product-vegetables.jpg";
import fruitImage from "@/assets/product-fruits.jpg";
import honeyImage from "@/assets/product-honey.jpg";
import breadImage from "@/assets/product-bread.jpg";

// Mock data
const BRANDS: FilterOption[] = [
  { id: "green-acres", label: "Green Acres", count: 24 },
  { id: "farm-fresh", label: "Farm Fresh Co.", count: 18 },
  { id: "harvest-gold", label: "Harvest Gold", count: 15 },
  { id: "pure-earth", label: "Pure Earth", count: 12 },
  { id: "valley-organics", label: "Valley Organics", count: 9 },
];

const CROP_TYPES: FilterOption[] = [
  { id: "organic", label: "Organic", count: 42 },
  { id: "heirloom", label: "Heirloom", count: 18 },
  { id: "hybrid", label: "Hybrid", count: 28 },
  { id: "non-gmo", label: "Non-GMO", count: 35 },
];

const PESTS: FilterOption[] = [
  { id: "aphids", label: "Aphid Resistant", count: 14 },
  { id: "blight", label: "Blight Resistant", count: 11 },
  { id: "mildew", label: "Mildew Resistant", count: 8 },
  { id: "nematode", label: "Nematode Resistant", count: 6 },
];

const ALL_PRODUCTS = [
  { id: "1", name: "Organic Harvest Box", basePrice: 42, image: vegImage, tag: "Bestseller" },
  { id: "2", name: "Seasonal Fruit Crate", basePrice: 38, image: fruitImage, tag: "New" },
  { id: "3", name: "Raw Wildflower Honey", basePrice: 18, image: honeyImage },
  { id: "4", name: "Artisan Sourdough", basePrice: 12, image: breadImage },
  { id: "5", name: "Heirloom Tomatoes", basePrice: 8, image: vegImage },
  { id: "6", name: "Mixed Berry Basket", basePrice: 24, image: fruitImage },
  { id: "7", name: "Pure Maple Syrup", basePrice: 16, image: honeyImage },
  { id: "8", name: "Rustic Rye Bread", basePrice: 10, image: breadImage },
  { id: "9", name: "Baby Spinach Pack", basePrice: 6, image: vegImage, tag: "Organic" },
  { id: "10", name: "Citrus Variety Box", basePrice: 32, image: fruitImage },
  { id: "11", name: "Creamed Honey", basePrice: 22, image: honeyImage },
  { id: "12", name: "Multigrain Loaf", basePrice: 14, image: breadImage },
];

const Collection = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCropTypes, setSelectedCropTypes] = useState<string[]>([]);
  const [selectedPests, setSelectedPests] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const toggle = useCallback((list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
  , []);

  // Build active filters
  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const filters: ActiveFilter[] = [];
    if (priceRange[0] > 0 || priceRange[1] < 200) {
      filters.push({ id: "price", label: `$${priceRange[0]} – $${priceRange[1]}`, category: "price" });
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
      const p = PESTS.find((x) => x.id === id);
      if (p) filters.push({ id, label: p.label, category: "pest" });
    });
    return filters;
  }, [priceRange, selectedBrands, selectedCropTypes, selectedPests]);

  const removeFilter = useCallback((filter: ActiveFilter) => {
    switch (filter.category) {
      case "price": setPriceRange([0, 200]); break;
      case "brand": setSelectedBrands((s) => s.filter((x) => x !== filter.id)); break;
      case "crop": setSelectedCropTypes((s) => s.filter((x) => x !== filter.id)); break;
      case "pest": setSelectedPests((s) => s.filter((x) => x !== filter.id)); break;
    }
  }, []);

  const clearAll = useCallback(() => {
    setPriceRange([0, 200]);
    setSelectedBrands([]);
    setSelectedCropTypes([]);
    setSelectedPests([]);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS
      .filter((p) => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1])
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low": return a.basePrice - b.basePrice;
          case "price-high": return b.basePrice - a.basePrice;
          case "name": return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
  }, [priceRange, sortBy]);

  const handleAddToCart = (name: string, unit: string, price: number) => {
    toast.success(`${name} (${unit}) — $${price.toFixed(2)} added to cart`);
  };

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
      pests={PESTS}
      selectedPests={selectedPests}
      onPestToggle={(id) => setSelectedPests((s) => toggle(s, id))}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors min-h-0 min-w-0">Home</a>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Vegetables</span>
        </nav>
      </div>

      <div className="container pb-16">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-60 shrink-0">
            {filterSidebarContent}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort & Mobile Filter */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Vegetables</h1>
                <p className="text-sm text-muted-foreground mt-0.5">{filteredProducts.length} products</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="default" className="lg:hidden rounded-full gap-2">
                      <SlidersHorizontal className="size-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-6 overflow-y-auto">
                    {filterSidebarContent}
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 h-11 rounded-full border-border/60 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A–Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-5">
                <ActiveFilters filters={activeFilters} onRemove={removeFilter} onClearAll={clearAll} />
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {filteredProducts.map((product) => (
                <CollectionProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  tag={product.tag}
                  onAddToCart={(unit) => handleAddToCart(product.name, unit)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No products match your filters.</p>
                <Button variant="link" onClick={clearAll} className="mt-2">Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-semibold text-foreground">Terroir</span>
          <p className="text-sm text-muted-foreground">© 2026 Terroir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Collection;
