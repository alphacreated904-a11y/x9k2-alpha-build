import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "en" | "hi";

interface Translations {
  [key: string]: { en: string; hi: string };
}

const TRANSLATIONS: Translations = {
  // TopBar
  "topbar.free_delivery": { en: "Free delivery on orders above ₹999", hi: "₹999 से ऊपर के ऑर्डर पर मुफ्त डिलीवरी" },
  "topbar.track_order": { en: "Track Order", hi: "ऑर्डर ट्रैक करें" },
  "topbar.wishlist": { en: "Wishlist", hi: "विशलिस्ट" },
  "topbar.login": { en: "Login", hi: "लॉगिन" },
  // Navbar
  "nav.search_placeholder": { en: "Search seeds, pesticides, fertilizers...", hi: "बीज, कीटनाशक, उर्वरक खोजें..." },
  "nav.shop_all": { en: "Shop All", hi: "सभी खरीदें" },
  "nav.seeds": { en: "Seeds", hi: "बीज" },
  "nav.crop_protection": { en: "Crop Protection", hi: "फसल सुरक्षा" },
  "nav.nutrition": { en: "Nutrition", hi: "पोषण" },
  "nav.equipment": { en: "Equipment", hi: "उपकरण" },
  // Cart
  "cart.your_cart": { en: "Your Cart", hi: "आपकी कार्ट" },
  "cart.empty": { en: "Your cart is empty", hi: "आपकी कार्ट खाली है" },
  "cart.add_items": { en: "Add items to get started", hi: "शुरू करने के लिए आइटम जोड़ें" },
  "cart.shop_now": { en: "Shop Now", hi: "अभी खरीदें" },
  "cart.subtotal": { en: "Subtotal", hi: "उप-कुल" },
  "cart.shipping": { en: "Shipping", hi: "शिपिंग" },
  "cart.shipping_calc": { en: "Calculated at checkout", hi: "चेकआउट पर गणना होगी" },
  "cart.total": { en: "Total", hi: "कुल" },
  "cart.checkout": { en: "Proceed to Checkout", hi: "चेकआउट पर जाएं" },
  "cart.continue": { en: "Continue Shopping", hi: "खरीदारी जारी रखें" },
  // Common
  "common.add_to_cart": { en: "Add to Cart", hi: "कार्ट में डालें" },
  "common.added": { en: "Added!", hi: "जोड़ दिया!" },
  "common.home": { en: "Home", hi: "होम" },
  "common.products": { en: "Products", hi: "उत्पाद" },
  // Hero
  "hero.shop_now": { en: "Shop Now", hi: "अभी खरीदें" },
  // Collection
  "collection.all_products": { en: "All Products", hi: "सभी उत्पाद" },
  "collection.filters": { en: "Filters", hi: "फ़िल्टर" },
  "collection.no_match": { en: "No products match your filters.", hi: "कोई उत्पाद आपके फ़िल्टर से मेल नहीं खाता।" },
  "collection.clear_all": { en: "Clear all filters", hi: "सभी फ़िल्टर साफ़ करें" },
  "collection.coming_soon": { en: "Coming Soon!", hi: "जल्द आ रहा है!" },
  "collection.browse_all": { en: "Browse All Products", hi: "सभी उत्पाद देखें" },
  // Checkout
  "checkout.title": { en: "Checkout", hi: "चेकआउट" },
  "checkout.place_order": { en: "Place Order", hi: "ऑर्डर दें" },
  "checkout.order_confirmed": { en: "Order Confirmed!", hi: "ऑर्डर पुष्टि हो गया!" },
  // Track Order
  "track.title": { en: "Track Your Order", hi: "अपना ऑर्डर ट्रैक करें" },
  "track.enter_id": { en: "Enter your Order ID", hi: "अपना ऑर्डर आईडी दर्ज करें" },
  "track.button": { en: "Track", hi: "ट्रैक करें" },
  // Login
  "login.title": { en: "Login to AbhiAgri", hi: "AbhiAgri में लॉगिन करें" },
  "login.email": { en: "Email Address", hi: "ईमेल पता" },
  "login.password": { en: "Password", hi: "पासवर्ड" },
  "login.submit": { en: "Sign In", hi: "साइन इन" },
  "login.no_account": { en: "Don't have an account?", hi: "अकाउंट नहीं है?" },
  "login.signup": { en: "Sign Up", hi: "साइन अप" },
  // Wishlist
  "wishlist.title": { en: "My Wishlist", hi: "मेरी विशलिस्ट" },
  "wishlist.empty": { en: "Your wishlist is empty", hi: "आपकी विशलिस्ट खाली है" },
  "wishlist.browse": { en: "Start browsing products", hi: "उत्पाद ब्राउज़ करना शुरू करें" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback((key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
