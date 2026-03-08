import React from "react";
import { Leaf, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/40">
      <div className="container flex h-16 items-center gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0 min-h-0 min-w-0">
          <Leaf className="size-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">Terroir</span>
        </a>

        {/* Centered Search */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search fresh produce, dairy, grains..."
              className="pl-10 pr-4 h-11 rounded-full bg-secondary border-0 text-sm placeholder:text-muted-foreground focus-visible:ring-primary/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <ShoppingCart className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              2
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
