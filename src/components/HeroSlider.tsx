import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroImage from "@/assets/hero-farm.jpg";
import vegImage from "@/assets/product-vegetables.jpg";
import fruitImage from "@/assets/product-fruits.jpg";

const SLIDES = [
  {
    image: heroImage,
    badge: "Farm to Table",
    title: "Fresh from the field, straight to you.",
    subtitle: "Premium organic produce sourced directly from local farmers. No middlemen, no compromises.",
    cta: "Browse Marketplace",
  },
  {
    image: vegImage,
    badge: "Seasonal Picks",
    title: "This week's harvest is here.",
    subtitle: "Hand-picked vegetables from farms within 50 miles. Delivered fresh to your door.",
    cta: "Shop Vegetables",
  },
  {
    image: fruitImage,
    badge: "New Arrivals",
    title: "Sun-ripened fruits, peak flavor.",
    subtitle: "Organic berries, citrus, and stone fruits — sourced at the perfect moment.",
    cta: "Shop Fruits",
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
      {/* Slides */}
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
              className="h-[480px] md:h-[560px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-lg space-y-5">
                  <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                    {slide.badge}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <Button variant="accent" size="xl" className="mt-2">
                    {slide.cta} <ArrowRight className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
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

      {/* Dots */}
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
