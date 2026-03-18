import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Leaf, ArrowRight, Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const QUICK_LINKS_EN = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Return & Refund Policy", href: "/return-refund-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
  { label: "Sitemap", href: "/sitemap" },
];

const QUICK_LINKS_HI = [
  { label: "हमारे बारे में", href: "/about" },
  { label: "हमसे संपर्क करें", href: "/contact" },
  { label: "गोपनीयता नीति", href: "/privacy" },
  { label: "वापसी और धनवापसी नीति", href: "/return-refund-policy" },
  { label: "सेवा की शर्तें", href: "/terms" },
  { label: "शिपिंग नीति", href: "/shipping" },
  { label: "अक्सर पूछे जाने वाले प्रश्न", href: "/faq" },
  { label: "साइटमैप", href: "/sitemap" },
];

const SHOP_LINKS_EN = [
  { label: "Seeds", href: "/collection?cat=seeds" },
  { label: "Crop Protection", href: "/collection?cat=crop-protection" },
  { label: "Nutrition", href: "/collection?cat=nutrition" },
  { label: "Equipment", href: "/collection?cat=equipment" },
  { label: "Shop All", href: "/collection" },
];

const SHOP_LINKS_HI = [
  { label: "बीज", href: "/collection?cat=seeds" },
  { label: "फसल सुरक्षा", href: "/collection?cat=crop-protection" },
  { label: "पोषण", href: "/collection?cat=nutrition" },
  { label: "उपकरण", href: "/collection?cat=equipment" },
  { label: "सभी खरीदें", href: "/collection" },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram", hoverClass: "hover:bg-pink-600" },
  { icon: Facebook, href: "#", label: "Facebook", hoverClass: "hover:bg-blue-600" },
  { icon: Youtube, href: "#", label: "YouTube", hoverClass: "hover:bg-red-600" },
  { icon: Twitter, href: "#", label: "X (Twitter)", hoverClass: "hover:bg-foreground" },
  { icon: Linkedin, href: "#", label: "LinkedIn", hoverClass: "hover:bg-blue-700" },
];

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const lp = useLocalizedPath();
  const quickLinks = language === "hi" ? QUICK_LINKS_HI : QUICK_LINKS_EN;
  const shopLinks = language === "hi" ? SHOP_LINKS_HI : SHOP_LINKS_EN;

  return (
    <footer className="bg-[hsl(150,10%,12%)] text-[hsl(40,20%,85%)]">
      <div className="container px-4 sm:px-6 py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">

          {/* Column 1 — Brand & About */}
          <div className="lg:col-span-1">
            <Link to={lp("/")} className="flex items-center gap-2.5 mb-5">
              <img src={logoImg} alt="AbhiAgri" className="size-10 object-contain" />
              <span className="text-xl font-bold text-white tracking-tight">AbhiAgri</span>
            </Link>
            <p className="text-sm leading-relaxed text-[hsl(40,10%,60%)] mb-6">
              {t("footer.about")}
            </p>
            <p className="text-sm leading-relaxed text-[hsl(40,10%,60%)]">
              {t("footer.about2")}
            </p>

            <div className="flex items-center gap-2.5 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(150,8%,20%)] text-[hsl(40,10%,70%)] transition-all duration-200 hover:text-white hover:scale-110 ${hoverClass}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-5 flex items-center gap-2">
              <span className="h-px w-5 bg-primary" />
              {t("footer.quick_links")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={lp(href)}
                    className="text-sm text-[hsl(40,10%,60%)] hover:text-white hover:pl-1 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="size-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Shop Categories */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-5 flex items-center gap-2">
              <span className="h-px w-5 bg-primary" />
              {t("footer.shop_categories")}
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={lp(href)}
                    className="text-sm text-[hsl(40,10%,60%)] hover:text-white hover:pl-1 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="size-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="h-px w-5 bg-primary" />
                {t("footer.download_app")}
              </h3>
              <p className="text-xs text-[hsl(40,10%,50%)]">{t("footer.coming_soon_app")}</p>
            </div>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-5 flex items-center gap-2">
              <span className="h-px w-5 bg-primary" />
              {t("footer.contact_us")}
            </h3>

            <div className="mb-5">
              <p className="text-xs text-[hsl(40,10%,50%)] uppercase tracking-wider font-medium mb-1.5">
                {t("footer.missed_call")}
              </p>
              <a
                href="tel:+911800123456"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                <Phone className="size-4" />
                1800-123-456
              </a>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <Mail className="size-4 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-[hsl(40,10%,50%)] uppercase tracking-wider font-medium mb-0.5">Email</p>
                <a href="mailto:support@abhiagri.com" className="text-sm text-[hsl(40,10%,60%)] hover:text-white transition-colors">
                  support@abhiagri.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <MapPin className="size-4 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-[hsl(40,10%,50%)] uppercase tracking-wider font-medium mb-0.5">
                  {language === "hi" ? "कॉर्पोरेट कार्यालय" : "Corporate Office"}
                </p>
                <p className="text-sm text-[hsl(40,10%,60%)] leading-relaxed">
                  AbhiAgri Pvt Ltd<br />
                  Pune, Maharashtra<br />
                  India - 411001
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-[hsl(150,8%,16%)] px-3.5 py-2.5">
              <Leaf className="size-5 text-primary shrink-0" />
              <p className="text-xs text-[hsl(40,10%,55%)] leading-snug">
                <span className="font-semibold text-primary">{t("footer.genuine")}</span> {t("footer.genuine_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[hsl(150,8%,18%)]">
        <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="text-xs text-[hsl(40,10%,45%)]">
            © 2026 AbhiAgri Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to={lp("/privacy")} className="text-xs text-[hsl(40,10%,45%)] hover:text-white transition-colors">
              {language === "hi" ? "गोपनीयता" : "Privacy"}
            </Link>
            <Link to={lp("/terms")} className="text-xs text-[hsl(40,10%,45%)] hover:text-white transition-colors">
              {language === "hi" ? "शर्तें" : "Terms"}
            </Link>
            <Link to={lp("/return-refund-policy")} className="text-xs text-[hsl(40,10%,45%)] hover:text-white transition-colors">
              {language === "hi" ? "धनवापसी" : "Refunds"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
