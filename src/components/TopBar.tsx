import React from "react";
import { Link } from "react-router-dom";
import { Phone, Truck, PackageSearch, Heart, LogIn, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";

const TopBar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems: wishlistCount, openWishlist } = useWishlist();

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex h-9 items-center justify-between text-xs font-medium">
        {/* Left — delivery info */}
        <span className="hidden sm:flex items-center gap-1.5">
          <Truck className="size-3.5" />
          {t("topbar.free_delivery")}
        </span>

        {/* Mobile — phone */}
        <a
          href="tel:+911800123456"
          className="sm:hidden flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <Phone className="size-3.5" />
          1800-123-456
        </a>

        {/* Right — action buttons */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
            aria-label="Switch language"
          >
            <Globe className="size-3.5" />
            <span className="font-semibold text-[11px] tracking-wide">
              {language === "en" ? "हिंदी" : "English"}
            </span>
          </button>

          <span className="w-px h-3.5 bg-primary-foreground/20 mx-0.5 hidden sm:block" />

          {/* Track Order */}
          <Link
            to="/track-order"
            className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
          >
            <PackageSearch className="size-3.5" />
            {t("topbar.track_order")}
          </Link>

          <span className="w-px h-3.5 bg-primary-foreground/20 mx-0.5 hidden sm:block" />

          {/* Wishlist */}
          <button
            onClick={openWishlist}
            className="relative flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
          >
            <Heart className="size-3.5" />
            <span className="hidden sm:inline">{t("topbar.wishlist")}</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 left-4 sm:left-auto sm:-right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground px-1">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </button>

          <span className="w-px h-3.5 bg-primary-foreground/20 mx-0.5 hidden sm:block" />

          {/* Login */}
          <Link
            to="/login"
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
          >
            <LogIn className="size-3.5" />
            <span className="hidden sm:inline">{t("topbar.login")}</span>
          </Link>

          <span className="w-px h-3.5 bg-primary-foreground/20 mx-0.5 hidden sm:block" />

          {/* Phone */}
          <a
            href="tel:+911800123456"
            className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
          >
            <Phone className="size-3.5" />
            1800-123-456
          </a>
        </div>
      </div>
    </div>
  );
};

export { TopBar };
