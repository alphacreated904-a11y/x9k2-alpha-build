import React from "react";
import { Phone, Truck } from "lucide-react";

const TopBar: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex h-9 items-center justify-between text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <Truck className="size-3.5" />
          Free delivery on orders above ₹999
        </span>
        <a href="tel:+911800123456" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity min-h-0 min-w-0">
          <Phone className="size-3.5" />
          1800-123-456
        </a>
      </div>
    </div>
  );
};

export { TopBar };
