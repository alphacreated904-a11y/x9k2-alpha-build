import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Search, ShoppingCart, User } from "lucide-react";
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
import { Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CATEGORIES = [
  { name: "Vegetables", href: "/collection", description: "Fresh organic vegetables" },
  { name: "Fruits", href: "/collection", description: "Seasonal fruits & berries" },
  { name: "Dairy", href: "/collection", description: "Milk, cheese & yogurt" },
  { name: "Grains", href: "/collection", description: "Rice, wheat & cereals" },
  { name: "Eggs", href: "/collection", description: "Farm-fresh eggs" },
  { name: "Honey & Syrups", href: "/collection", description: "Natural sweeteners" },
];

const PAGES = [
  { name: "Shop All", href: "/collection" },
  { name: "Best Sellers", href: "/collection" },
  { name: "New Arrivals", href: "/collection" },
  { name: "About Us", href: "/" },
  { name: "Contact", href: "/" },
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
          <SheetContent side="left" className="w-80 p-6">
            <div className="flex items-center gap-2 mb-8">
              <Leaf className="size-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Terroir</span>
            </div>
            <nav className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.href}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Pages</h3>
                <div className="space-y-1">
                  {PAGES.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="block py-2 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Leaf className="size-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">Terroir</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex mx-6">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium bg-transparent hover:bg-secondary">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-1 p-4">
                  {CATEGORIES.map((cat) => (
                    <NavigationMenuLink key={cat.name} asChild>
                      <Link
                        to={cat.href}
                        className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-secondary"
                      >
                        <div className="text-sm font-medium text-foreground">{cat.name}</div>
                        <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/collection"
                  className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none"
                >
                  Shop All
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/collection"
                  className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none"
                >
                  Best Sellers
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none"
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Centered Search */}
        <div className="flex-1 max-w-md mx-auto hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search products..."
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
