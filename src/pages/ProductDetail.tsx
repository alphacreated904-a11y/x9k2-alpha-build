import React, { useState } from "react";
import { ShieldCheck, Truck, BadgeCheck, Minus, Plus, Star } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { ProductGallery } from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, formatINR } from "@/contexts/CartContext";
import { toast } from "sonner";

import vegImage from "@/assets/product-vegetables.jpg";
import fruitImage from "@/assets/product-fruits.jpg";
import honeyImage from "@/assets/product-honey.jpg";
import breadImage from "@/assets/product-bread.jpg";

// Mock product data
const PRODUCT = {
  id: "1",
  name: "Organic Harvest Box – Premium Selection",
  brand: "Green Acres Farm",
  sku: "GAF-VEG-001",
  originalPrice: 4650,
  price: 3500,
  unit: "box",
  rating: 4.8,
  reviewCount: 124,
  images: [vegImage, fruitImage, honeyImage, breadImage],
  description: `
    <p>Experience the finest organic vegetables, hand-picked at peak ripeness from our certified organic farms. Each Harvest Box contains a curated selection of seasonal produce, ensuring you receive the freshest, most flavorful vegetables available.</p>
    <p class="mt-4">Our farming practices prioritize soil health, biodiversity, and sustainable water management. No synthetic pesticides or fertilizers are ever used, and all produce is non-GMO verified.</p>
    <h4 class="mt-6 font-semibold">What's Included:</h4>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Mixed leafy greens (lettuce, spinach, arugula)</li>
      <li>Root vegetables (carrots, beets, radishes)</li>
      <li>Seasonal squash or zucchini</li>
      <li>Fresh herbs (basil, cilantro, or parsley)</li>
      <li>Heirloom tomatoes</li>
    </ul>
  `,
  specs: [
    { label: "Weight", value: "2.5–3 kg (varies by season)" },
    { label: "Servings", value: "4–6 people" },
    { label: "Certification", value: "India Organic, Non-GMO Verified" },
    { label: "Origin", value: "Local farms within 50 km" },
    { label: "Shelf Life", value: "5–7 days refrigerated" },
    { label: "Storage", value: "Refrigerate at 2–4°C" },
    { label: "Packaging", value: "100% compostable materials" },
  ],
  dosage: `
    <p>For optimal nutrition and freshness, we recommend consuming the contents of your Harvest Box within 5–7 days of delivery.</p>
    <h4 class="mt-6 font-semibold">Daily Serving Suggestions:</h4>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li><strong>Leafy Greens:</strong> 2–3 cups per day, raw or lightly sautéed</li>
      <li><strong>Root Vegetables:</strong> 1 cup per day, roasted or steamed</li>
      <li><strong>Fresh Herbs:</strong> Use liberally as garnish or in cooking</li>
    </ul>
    <p class="mt-4">Wash all produce thoroughly before consumption. For best results, store leafy greens in a damp paper towel inside a sealed container.</p>
  `,
  safety: `
    <div class="space-y-4">
      <div class="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
        <ShieldCheck class="size-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p class="font-semibold">Allergen Information</p>
          <p class="text-sm text-muted-foreground mt-1">This product is handled in a facility that also processes tree nuts. While our vegetables are allergen-free, cross-contamination may occur.</p>
        </div>
      </div>
      <div class="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
        <ShieldCheck class="size-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p class="font-semibold">Food Safety</p>
          <p class="text-sm text-muted-foreground mt-1">All produce is tested for pesticide residue and microbial contamination. Our farms follow GAP (Good Agricultural Practices) certification standards.</p>
        </div>
      </div>
      <div class="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
        <ShieldCheck class="size-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p class="font-semibold">Quality Guarantee</p>
          <p class="text-sm text-muted-foreground mt-1">If you're not 100% satisfied with the quality of your produce, contact us within 24 hours for a full refund or replacement.</p>
        </div>
      </div>
    </div>
  `,
};

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const savings = Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      unit: PRODUCT.unit,
      image: PRODUCT.images[0],
    }, quantity);
    toast.success(`${quantity}x ${PRODUCT.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors min-h-0 min-w-0">Home</a>
          <span className="mx-2">/</span>
          <a href="/collection" className="hover:text-foreground transition-colors min-h-0 min-w-0">Vegetables</a>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{PRODUCT.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <section className="container pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <ProductGallery images={PRODUCT.images} productName={PRODUCT.name} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm font-medium text-primary mb-1">{PRODUCT.brand}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                {PRODUCT.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.floor(PRODUCT.rating) ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-1">{PRODUCT.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({PRODUCT.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">{formatINR(PRODUCT.price)}</span>
              <span className="text-lg text-muted-foreground line-through">{formatINR(PRODUCT.originalPrice)}</span>
              <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent-foreground">
                Save {savings}%
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
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
                Add to Cart — {formatINR(PRODUCT.price * quantity)}
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BadgeCheck className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Verified Partner</p>
                  <p className="text-xs">Certified organic supplier</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Truck className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Secure Delivery</p>
                  <p className="text-xs">Temperature-controlled shipping</p>
                </div>
              </div>
            </div>

            {/* SKU */}
            <p className="text-xs text-muted-foreground pt-2">SKU: {PRODUCT.sku}</p>
          </div>
        </div>
      </section>

      {/* Technical Tabs */}
      <section className="border-t border-border bg-secondary/20">
        <div className="container py-10 md:py-14">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start gap-1 bg-transparent p-0 border-b border-border rounded-none h-auto flex-wrap">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm"
              >
                Technical Specs
              </TabsTrigger>
              <TabsTrigger
                value="dosage"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm"
              >
                Dosage Instructions
              </TabsTrigger>
              <TabsTrigger
                value="safety"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm"
              >
                Safety Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8 max-w-3xl">
              <div
                className="prose prose-sm text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: PRODUCT.description }}
              />
            </TabsContent>

            <TabsContent value="specs" className="mt-8 max-w-2xl">
              <div className="rounded-xl border border-border overflow-hidden">
                {PRODUCT.specs.map((spec, i) => (
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

            <TabsContent value="dosage" className="mt-8 max-w-3xl">
              <div
                className="prose prose-sm text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: PRODUCT.dosage }}
              />
            </TabsContent>

            <TabsContent value="safety" className="mt-8 max-w-3xl">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                  <ShieldCheck className="size-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Allergen Information</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      This product is handled in a facility that also processes tree nuts. While our vegetables are allergen-free, cross-contamination may occur.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                  <ShieldCheck className="size-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Food Safety</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      All produce is tested for pesticide residue and microbial contamination. Our farms follow GAP (Good Agricultural Practices) certification standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                  <ShieldCheck className="size-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Quality Guarantee</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      If you're not 100% satisfied with the quality of your produce, contact us within 24 hours for a full refund or replacement.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

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

export default ProductDetail;
