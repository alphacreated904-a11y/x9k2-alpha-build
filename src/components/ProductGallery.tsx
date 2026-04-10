import React, { useState } from "react";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const goNext = () => setSelectedIndex((i) => (i + 1) % images.length);
  const goPrev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-secondary cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={images[selectedIndex]}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          width={600}
          height={600}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            isZoomed && "scale-[2.5]"
          )}
          style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
          draggable={false}
          loading={selectedIndex === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        
        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isZoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors min-h-0 min-w-0"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors min-h-0 min-w-0"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all min-h-0 min-w-0",
                i === selectedIndex ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"
              )}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" loading="lazy" decoding="async" width={80} height={80} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductGallery };
