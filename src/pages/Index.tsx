import React from "react";
import { Leaf, Wheat, Apple, Milk, ShoppingCart, Search, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { toast } from "sonner";

import heroImage from "@/assets/hero-farm.jpg";
import vegImage from "@/assets/product-vegetables.jpg";
import fruitImage from "@/assets/product-fruits.jpg";
import honeyImage from "@/assets/product-honey.jpg";
import breadImage from "@/assets/product-bread.jpg";

const PRODUCTS = [
  { name: "Organic Harvest Box", price: "$42", unit: "box", image: vegImage, tag: "Bestseller" },
  { name: "Seasonal Fruit Crate", price: "$38", unit: "crate", image: fruitImage, tag: "New" },
  { name: "Raw Wildflower Honey", price: "$18", unit: "jar", image: honeyImage },
  { name: "Artisan Sourdough", price: "$12", unit: "loaf", image: breadImage },
];

const CATEGORIES = [
  { name: "Vegetables", icon: <Leaf className="size-6" />, count: 124 },
  { name: "Grains", icon: <Wheat className="size-6" />, count: 86 },
  { name: "Fruits", icon: <Apple className="size-6" />, count: 93 },
  { name: "Dairy", icon: <Milk className="size-6" />, count: 47 },
];

const Index = () => {
  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="size-6 text-primary" />
            <span className="text-xl font-bold text-foreground tracking-tight">Terroir</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Farmers</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Search className="size-5" /></Button>
            <Button variant="ghost" size="icon"><User className="size-5" /></Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">2</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Lush organic farm at golden hour" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
        <div className="container relative py-28 md:py-40">
          <div className="max-w-xl space-y-6">
            <span className="inline-block rounded-full bg-accent/90 px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Farm to Table
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
              Fresh from the field, straight to you.
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
              Premium organic produce sourced directly from local farmers. No middlemen, no compromises.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="hero" size="xl">
                Browse Marketplace <ArrowRight className="size-5" />
              </Button>
              <Button variant="outline" size="xl" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
                Meet the Farmers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground">Browse our curated selection of farm-fresh goods</p>
          </div>
          <Button variant="link" className="hidden sm:flex text-primary">
            View all <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/50 py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">Hand-picked selections from our top farmers</p>
            </div>
            <Button variant="link" className="hidden sm:flex text-primary">
              View all <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="container py-20">
        <div className="rounded-2xl bg-primary p-10 md:p-16 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            Join 10,000+ families eating better
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-lg">
            Get weekly deliveries of the freshest organic produce, sourced within 50 miles of your home.
          </p>
          <Button variant="accent" size="xl">
            Get Started Today <ArrowRight className="size-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
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
