import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Sprout, Shield, Beaker, Wrench, Menu } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

const MEGA_CATEGORIES = [
  {
    name: "Seeds",
    icon: <Sprout className="size-5 text-primary" />,
    href: "/collection?cat=seeds",
    description: "Hybrid & open-pollinated seeds for all crops",
    items: ["Vegetable Seeds", "Field Crop Seeds", "Flower Seeds", "Fodder Seeds"],
  },
  {
    name: "Crop Protection",
    icon: <Shield className="size-5 text-primary" />,
    href: "/collection?cat=crop-protection",
    description: "Insecticides, fungicides & herbicides",
    items: ["Insecticides", "Fungicides", "Herbicides", "Bio Pesticides"],
  },
  {
    name: "Nutrition",
    icon: <Beaker className="size-5 text-primary" />,
    href: "/collection?cat=nutrition",
    description: "Fertilizers, micronutrients & growth promoters",
    items: ["NPK Fertilizers", "Micronutrients", "Organic Manure", "Growth Regulators"],
  },
  {
    name: "Equipment",
    icon: <Wrench className="size-5 text-primary" />,
    href: "/collection?cat=equipment",
    description: "Sprayers, tools & farm machinery",
    items: ["Sprayers", "Hand Tools", "Irrigation", "Safety Gear"],
  },
];

const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/40">
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-8">
              <img src={logoImg} alt="AgriMart" className="size-8 object-contain" />
              <span className="text-lg font-bold text-foreground">AgriMart</span>
            </div>
            <nav className="space-y-6">
              {MEGA_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <Link
                    to={cat.href}
                    className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2"
                  >
                    {cat.icon}
                    {cat.name}
                  </Link>
                  <div className="space-y-1 pl-7">
                    {cat.items.map((item) => (
                      <Link
                        key={item}
                        to={cat.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/collection"
                className="block py-2 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Shop All
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Leaf className="size-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">AgriMart</span>
        </Link>

        {/* Desktop Mega-Menu */}
        <NavigationMenu className="hidden lg:flex mx-6">
          <NavigationMenuList className="gap-1">
            {MEGA_CATEGORIES.map((cat) => (
              <NavigationMenuItem key={cat.name}>
                <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium bg-transparent hover:bg-secondary">
                  {cat.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-5">
                    <div className="flex items-center gap-2 mb-4">
                      {cat.icon}
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {cat.items.map((item) => (
                        <NavigationMenuLink key={item} asChild>
                          <Link
                            to={cat.href}
                            className="block rounded-lg p-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                          >
                            {item}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <NavigationMenuLink asChild>
                      <Link
                        to={cat.href}
                        className="block mt-3 pt-3 border-t border-border text-sm font-semibold text-primary hover:underline"
                      >
                        View all {cat.name} →
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/collection"
                  className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Shop All
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search seeds, pesticides, fertilizers..."
              className="pl-10 pr-4 h-10 rounded-full bg-secondary border-0 text-sm placeholder:text-muted-foreground focus-visible:ring-primary/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full sm:hidden">
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-full" onClick={openCart}>
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
