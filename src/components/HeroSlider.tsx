import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import heroImage from "@/assets/hero-farm.webp";
import vegImage from "@/assets/product-vegetables.webp";
import fruitImage from "@/assets/product-fruits.webp";

const SLIDES = [
  {
    image: heroImage,
    badge: { en: "Kharif Season Sale", hi: "खरीफ सीजन सेल" },
    title: { en: "Premium Seeds & Crop Care – Delivered to Your Farm", hi: "प्रीमियम बीज और फसल देखभाल — आपके खेत तक डिलीवरी" },
    subtitle: { en: "Shop 10,000+ agriculture products from trusted brands like Syngenta, Bayer & UPL. Fast pan-India delivery.", hi: "Syngenta, Bayer और UPL जैसे विश्वसनीय ब्रांडों से 10,000+ कृषि उत्पाद खरीदें। तेज़ पूरे भारत में डिलीवरी।" },
    cta: { en: "Shop Now", hi: "अभी खरीदें" },
    href: "/collection",
  },
  {
    image: vegImage,
    badge: { en: "New Arrivals", hi: "नई उपलब्धता" },
    title: { en: "Hybrid Seeds with 20% Higher Yield Guarantee", hi: "20% अधिक उपज गारंटी के साथ हाइब्रिड बीज" },
    subtitle: { en: "BG-II Cotton, Basmati Paddy, NS Chilli — certified quality seeds at the best prices.", hi: "BG-II कपास, बासमती धान, NS मिर्च — सबसे अच्छी कीमतों पर प्रमाणित गुणवत्ता वाले बीज।" },
    cta: { en: "Browse Seeds", hi: "बीज देखें" },
    href: "/collection?cat=seeds",
  },
  {
    image: fruitImage,
    badge: { en: "Crop Protection", hi: "फसल सुरक्षा" },
    title: { en: "Protect Your Crops. Maximize Returns.", hi: "अपनी फसलों की रक्षा करें। अधिकतम मुनाफा कमाएं।" },
    subtitle: { en: "Confidor, Dithane M-45 & more — insecticides and fungicides from India's top manufacturers.", hi: "Confidor, Dithane M-45 और अन्य — भारत के शीर्ष निर्माताओं से कीटनाशक और फफूंदनाशक।" },
    cta: { en: "Shop Crop Protection", hi: "फसल सुरक्षा खरीदें" },
    href: "/collection?cat=crop-protection",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { language } = useLanguage();
  const lp = useLocalizedPath();

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
              alt={slide.title[language]}
              className="h-[320px] sm:h-[420px] md:h-[520px] w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
                <div className="container px-5 sm:px-6">
                <div className="max-w-xl space-y-3 sm:space-y-5">
                  <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs sm:text-sm font-semibold text-accent-foreground">
                    {slide.badge[language]}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
                    {slide.title[language]}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-primary-foreground/80 leading-relaxed max-w-md">
                    {slide.subtitle[language]}
                  </p>
                  <Button variant="accent" size="lg" className="mt-2 sm:!h-14 sm:!px-10 sm:!text-lg sm:!rounded-xl" asChild>
                    <Link to={lp(slide.href)}>
                      {slide.cta[language]} <ArrowRight className="size-4 sm:size-5" />
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
