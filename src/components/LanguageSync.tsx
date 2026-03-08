import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Syncs the language context with the current URL prefix.
 * Place inside BrowserRouter.
 */
const LanguageSync: React.FC = () => {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const isHindiRoute = pathname === "/hi" || pathname.startsWith("/hi/");
    const urlLang = isHindiRoute ? "hi" : "en";
    if (urlLang !== language) {
      setLanguage(urlLang);
    }
  }, [pathname, language, setLanguage]);

  return null;
};

export { LanguageSync };
