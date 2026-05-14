import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Bug, Sprout, Leaf, TrendingUp, Beaker, Wheat, Shield, Wrench } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { id: "home", path: "/", labelEn: "Home", labelHi: "होम" },
  { id: "shop", path: "/collection", labelEn: "Shop", labelHi: "शॉप" },
  { id: "about", path: "/about", labelEn: "About", labelHi: "हमारे बारे में" },
  { id: "contact", path: "/contact", labelEn: "Contact", labelHi: "संपर्क" },
];

const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { language, t } = useLanguage();
  const lp = useLocalizedPath();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/40">
      <div className="container px-4 sm:px-6 flex h-14 sm:h-16 items-center gap-2 sm:gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-8">
              <img src={logoImg} alt="AbhiAgri" className="size-8 object-contain" />
              <span className="text-lg font-bold text-foreground">AbhiAgri</span>
            </div>
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  to={lp(link.path)}
                  className="block py-2.5 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  {language === "hi" ? link.labelHi : link.labelEn}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to={lp("/")} className="flex items-center gap-2 shrink-0">
          <img src={logoImg} alt="AbhiAgri" className="size-9 object-contain" />
          <span className="text-xl font-bold text-foreground tracking-tight">AbhiAgri</span>
        </Link>

        {/* Desktop Nav — simple top-level links */}
        <nav className="hidden lg:flex items-center gap-1 mx-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={lp(link.path)}
              className="inline-flex h-9 items-center px-3 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            >
              {language === "hi" ? link.labelHi : link.labelEn}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={t("nav.search_placeholder")}
              className="pl-10 pr-4 h-10 rounded-full bg-secondary border-0 text-sm placeholder:text-muted-foreground focus-visible:ring-primary/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full sm:hidden">
            <Search className="size-5" />
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={lp("/profile")}>{t("profile.my_profile")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to={lp("/login")}>
                <User className="size-5" />
              </Link>
            </Button>
          )}
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
