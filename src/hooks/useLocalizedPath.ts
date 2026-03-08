import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Returns a function that prefixes paths with /hi when language is Hindi.
 * Usage: const lp = useLocalizedPath(); <Link to={lp("/collection")} />
 */
export const useLocalizedPath = () => {
  const { language } = useLanguage();

  return (path: string) => {
    if (language === "hi") {
      // Don't double-prefix
      if (path.startsWith("/hi")) return path;
      return `/hi${path === "/" ? "" : path}` || "/hi";
    }
    return path;
  };
};
