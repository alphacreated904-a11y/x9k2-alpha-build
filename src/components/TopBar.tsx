import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Truck, PackageSearch, LogIn, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const TopBar: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const lp = useLocalizedPath();

  const handleToggleLanguage = () => {
    const currentPath = location.pathname + location.search;
    if (language === "en") {
      // Switch to Hindi: add /hi prefix
      navigate(`/hi${currentPath === "/" ? "" : currentPath}`);
    } else {
      // Switch to English: remove /hi prefix
      const englishPath = currentPath.replace(/^\/hi/, "") || "/";
      navigate(englishPath);
    }
  };

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6 flex h-9 items-center justify-between text-xs font-medium">
        {/* Left — delivery info */}

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
            onClick={handleToggleLanguage}
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
            to={lp("/track-order")}
            className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
          >
            <PackageSearch className="size-3.5" />
            {t("topbar.track_order")}
          </Link>

          <span className="w-px h-3.5 bg-primary-foreground/20 mx-0.5 hidden sm:block" />

          {/* Login */}
          <Link
            to={lp("/login")}
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
