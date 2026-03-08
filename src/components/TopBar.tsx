import React from "react";
import { Globe, Package } from "lucide-react";

const TopBar: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex h-9 items-center justify-between text-xs font-medium">
        <a href="#" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity min-h-0 min-w-0">
          <Package className="size-3.5" />
          Track Order
        </a>
        <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity min-h-0 min-w-0">
          <Globe className="size-3.5" />
          English
        </button>
      </div>
    </div>
  );
};

export { TopBar };
