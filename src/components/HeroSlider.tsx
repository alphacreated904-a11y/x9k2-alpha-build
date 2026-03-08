import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-farm.webp";
import vegImage from "@/assets/product-vegetables.webp";
import fruitImage from "@/assets/product-fruits.webp";

const SLIDES = [
  {
    image: heroImage,
    badge: "Kharif Season Sale",
    title: "Premium Seeds & Crop Care – Delivered to Your Farm",
    subtitle: "Shop 10,000+ agriculture products from trusted brands like Syngenta, Bayer & UPL. Fast pan-India delivery.",
    cta: "Shop Now",
    href: "/collection",
  },
  {
    image: vegImage,
    badge: "New Arrivals",
    title: "Hybrid Seeds with 20% Higher Yield Guarantee",
    subtitle: "BG-II Cotton, Basmati Paddy, NS Chilli — certified quality seeds at the best prices.",
    cta: "Browse Seeds",
    href: "/collection?cat=seeds",
  },
  {
    image: fruitImage,
    badge: "Crop Protection",
    title: "Protect Your Crops. Maximize Returns.",
    subtitle: "Confidor, Dithane M-45 & more — insecticides and fungicides from India's top manufacturers.",
    cta: "Shop Crop Protection",
    href: "/collection?cat=crop-protection",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "transition-opacity duration-700 ease-in-out",
            i === current ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-[420px] md:h-[520px] w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-xl space-y-5">
                  <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                    {slide.badge}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed max-w-md">
                    {slide.subtitle}
                  </p>
                  <Button variant="accent" size="xl" className="mt-2" asChild>
                    <Link to={slide.href}>
                      {slide.cta} <ArrowRight className="size-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-colors min-h-0 min-w-0"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/40 transition-colors min-h-0 min-w-0"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 min-h-0 min-w-0",
              i === current ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export { HeroSlider };
