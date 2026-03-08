import React from "react";
import { Leaf, Wheat, Apple, Milk, Egg, Cherry, Bean, Fish, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { toast } from "sonner";

import vegImage from "@/assets/product-vegetables.jpg";
import fruitImage from "@/assets/product-fruits.jpg";
import honeyImage from "@/assets/product-honey.jpg";
import breadImage from "@/assets/product-bread.jpg";

const PRODUCTS = [
  { name: "Organic Harvest Box", price: "$42", unit: "box", image: vegImage, tag: "Bestseller" },
  { name: "Seasonal Fruit Crate", price: "$38", unit: "crate", image: fruitImage, tag: "New" },
  { name: "Raw Wildflower Honey", price: "$18", unit: "jar", image: honeyImage },
  { name: "Artisan Sourdough", price: "$12", unit: "loaf", image: breadImage },
  { name: "Farm Fresh Eggs", price: "$8", unit: "dozen", image: vegImage },
  { name: "Mixed Berry Basket", price: "$24", unit: "basket", image: fruitImage },
  { name: "Pure Maple Syrup", price: "$16", unit: "bottle", image: honeyImage },
  { name: "Rustic Rye Bread", price: "$10", unit: "loaf", image: breadImage },
];

const CATEGORIES = [
  { name: "Vegetables", icon: <Leaf className="size-7" />, count: 124 },
  { name: "Grains", icon: <Wheat className="size-7" />, count: 86 },
  { name: "Fruits", icon: <Apple className="size-7" />, count: 93 },
  { name: "Dairy", icon: <Milk className="size-7" />, count: 47 },
  { name: "Eggs", icon: <Egg className="size-7" />, count: 35 },
  { name: "Berries", icon: <Cherry className="size-7" />, count: 28 },
  { name: "Legumes", icon: <Bean className="size-7" />, count: 41 },
  { name: "Seafood", icon: <Fish className="size-7" />, count: 22 },
];

const Index = () => {
  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <HeroSlider />

      {/* Categories */}
      <section className="container py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground text-sm">Browse our curated selection of farm-fresh goods</p>
          </div>
          <Button variant="link" className="hidden sm:flex text-primary">
            View all <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Best Sellers</h2>
              <p className="mt-2 text-muted-foreground text-sm">Hand-picked selections from our top farmers</p>
            </div>
            <Button variant="link" className="hidden sm:flex text-primary">
              View all <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.name}
                {...product}
                onAddToCart={() => handleAddToCart(product.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container py-16 md:py-20">
        <div className="rounded-2xl bg-primary p-10 md:p-16 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            Join 10,000+ families eating better
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-base md:text-lg">
            Get weekly deliveries of the freshest organic produce, sourced within 50 miles of your home.
          </p>
          <Button variant="accent" size="xl">
            Get Started Today <ArrowRight className="size-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="size-5 text-primary" />
            <span className="font-semibold text-foreground">Terroir</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Terroir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
