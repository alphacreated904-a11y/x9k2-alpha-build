import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Shield, Beaker, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { useCart, formatINR } from "@/contexts/CartContext";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products";
import { toast } from "sonner";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  seeds: <Sprout className="size-7" />,
  "crop-protection": <Shield className="size-7" />,
  nutrition: <Beaker className="size-7" />,
  equipment: <Wrench className="size-7" />,
};

const BEST_SELLERS = ALL_PRODUCTS.filter(p => p.tag || p.rating >= 4.5).slice(0, 8);

const Index = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof ALL_PRODUCTS[0], unit: string, price: number) => {
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
      <section className="container py-16 md:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground text-sm">Everything your farm needs — seeds to sprayers</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/collection?cat=${cat.id}`}
              className="card-hover flex flex-col items-center gap-3 rounded-2xl bg-card p-6 md:p-8 text-center transition-all duration-200 hover:bg-secondary/50 border-0"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                {CATEGORY_ICONS[cat.id]}
              </div>
              <span className="font-semibold text-foreground text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground leading-snug">{cat.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Best Sellers</h2>
              <p className="mt-2 text-muted-foreground text-sm">Top-rated products from trusted brands</p>
            </div>
            <Button variant="link" className="hidden sm:flex text-primary" asChild>
              <Link to="/collection">View all <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {BEST_SELLERS.map((product) => (
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
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container py-16 md:py-20">
        <div className="rounded-2xl bg-primary p-10 md:p-16 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            Join 50,000+ Farmers Growing Smarter
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-base md:text-lg">
            Get genuine agri inputs at wholesale prices with free delivery, expert advice, and crop-specific recommendations.
          </p>
          <Button variant="accent" size="xl" asChild>
            <Link to="/collection">Start Shopping <ArrowRight className="size-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="AbhiAgri" className="size-8 object-contain" />
            <span className="font-semibold text-foreground">AbhiAgri</span>
          </Link>
          <p className="text-sm text-muted-foreground">© 2026 AbhiAgri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
