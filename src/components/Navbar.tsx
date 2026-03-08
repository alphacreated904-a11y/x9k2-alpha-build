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
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const MEGA_CATEGORIES = [
  {
    nameKey: "nav.seeds",
    icon: <Sprout className="size-5 text-primary" />,
    href: "/collection?cat=seeds",
    descKey: "cat.seeds.desc",
    items: ["Vegetable Seeds", "Field Crop Seeds", "Flower Seeds", "Fodder Seeds"],
    itemsHi: ["सब्जी के बीज", "फसल के बीज", "फूल के बीज", "चारा बीज"],
  },
  {
    nameKey: "nav.crop_protection",
    icon: <Shield className="size-5 text-primary" />,
    href: "/collection?cat=crop-protection",
    descKey: "cat.crop_protection.desc",
    items: ["Insecticides", "Fungicides", "Herbicides", "Bio Pesticides"],
    itemsHi: ["कीटनाशक", "फफूंदनाशक", "खरपतवारनाशक", "जैव कीटनाशक"],
  },
  {
    nameKey: "nav.nutrition",
    icon: <Beaker className="size-5 text-primary" />,
    href: "/collection?cat=nutrition",
    descKey: "cat.nutrition.desc",
    items: ["NPK Fertilizers", "Micronutrients", "Organic Manure", "Growth Regulators"],
    itemsHi: ["NPK उर्वरक", "सूक्ष्म पोषक तत्व", "जैविक खाद", "वृद्धि नियंत्रक"],
  },
  {
    nameKey: "nav.equipment",
    icon: <Wrench className="size-5 text-primary" />,
    href: "/collection?cat=equipment",
    descKey: "cat.equipment.desc",
    items: ["Sprayers", "Hand Tools", "Irrigation", "Safety Gear"],
    itemsHi: ["स्प्रेयर", "हाथ के उपकरण", "सिंचाई", "सुरक्षा उपकरण"],
  },
];

const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { language, t } = useLanguage();
  const lp = useLocalizedPath();

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
            <nav className="space-y-6">
              {MEGA_CATEGORIES.map((cat) => (
                <div key={cat.nameKey}>
                  <Link
                    to={lp(cat.href)}
                    className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2"
                  >
                    {cat.icon}
                    {t(cat.nameKey)}
                  </Link>
                  <div className="space-y-1 pl-7">
                    {(language === "hi" ? cat.itemsHi : cat.items).map((item, idx) => (
                      <Link
                        key={idx}
                        to={lp(cat.href)}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to={lp("/collection")}
                className="block py-2 px-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {t("nav.shop_all")}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to={lp("/")} className="flex items-center gap-2 shrink-0">
          <img src={logoImg} alt="AbhiAgri" className="size-9 object-contain" />
          <span className="text-xl font-bold text-foreground tracking-tight">AbhiAgri</span>
        </Link>

        {/* Desktop Mega-Menu */}
        <NavigationMenu className="hidden lg:flex mx-6">
          <NavigationMenuList className="gap-1">
            {MEGA_CATEGORIES.map((cat) => (
              <NavigationMenuItem key={cat.nameKey}>
                <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium bg-transparent hover:bg-secondary">
                  {t(cat.nameKey)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-5">
                    <div className="flex items-center gap-2 mb-4">
                      {cat.icon}
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t(cat.nameKey)}</p>
                        <p className="text-xs text-muted-foreground">{t(cat.descKey)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {(language === "hi" ? cat.itemsHi : cat.items).map((item, idx) => (
                        <NavigationMenuLink key={idx} asChild>
                          <Link
                            to={lp(cat.href)}
                            className="block rounded-lg p-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                          >
                            {item}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <NavigationMenuLink asChild>
                      <Link
                        to={lp(cat.href)}
                        className="block mt-3 pt-3 border-t border-border text-sm font-semibold text-primary hover:underline"
                      >
                        {language === "hi" ? `सभी ${t(cat.nameKey)} देखें →` : `View all ${t(cat.nameKey)} →`}
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={lp("/collection")}
                  className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  {t("nav.shop_all")}
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
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link to={lp("/login")}>
              <User className="size-5" />
            </Link>
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
