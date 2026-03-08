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
  // Category descriptions
  "cat.seeds.desc": { en: "Hybrid & open-pollinated seeds for all crops", hi: "सभी फसलों के लिए हाइब्रिड और खुले परागित बीज" },
  "cat.crop_protection.desc": { en: "Insecticides, fungicides & herbicides", hi: "कीटनाशक, फफूंदनाशक और खरपतवारनाशक" },
  "cat.nutrition.desc": { en: "Fertilizers, micronutrients & growth promoters", hi: "उर्वरक, सूक्ष्म पोषक तत्व और वृद्धि प्रोत्साहक" },
  "cat.equipment.desc": { en: "Sprayers, tools & farm machinery", hi: "स्प्रेयर, उपकरण और कृषि मशीनरी" },
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
  // Index page
  "index.shop_by_category": { en: "Shop by Category", hi: "श्रेणी के अनुसार खरीदें" },
  "index.category_subtitle": { en: "Everything your farm needs — seeds to sprayers", hi: "आपके खेत की हर ज़रूरत — बीज से स्प्रेयर तक" },
  "index.best_sellers": { en: "Best Sellers", hi: "सबसे ज़्यादा बिकने वाले" },
  "index.best_sellers_subtitle": { en: "Top-rated products from trusted brands", hi: "विश्वसनीय ब्रांडों के शीर्ष रेटेड उत्पाद" },
  "index.view_all": { en: "View all", hi: "सभी देखें" },
  "index.cta_title": { en: "Join 50,000+ Farmers Growing Smarter", hi: "50,000+ किसानों के साथ स्मार्ट खेती करें" },
  "index.cta_subtitle": { en: "Get genuine agri inputs at wholesale prices with free delivery, expert advice, and crop-specific recommendations.", hi: "मुफ्त डिलीवरी, विशेषज्ञ सलाह और फसल-विशिष्ट सिफारिशों के साथ थोक मूल्य पर असली कृषि सामग्री प्राप्त करें।" },
  "index.start_shopping": { en: "Start Shopping", hi: "खरीदारी शुरू करें" },
  // Collection
  "collection.all_products": { en: "All Products", hi: "सभी उत्पाद" },
  "collection.filters": { en: "Filters", hi: "फ़िल्टर" },
  "collection.no_match": { en: "No products match your filters.", hi: "कोई उत्पाद आपके फ़िल्टर से मेल नहीं खाता।" },
  "collection.clear_all": { en: "Clear all filters", hi: "सभी फ़िल्टर साफ़ करें" },
  "collection.coming_soon": { en: "Coming Soon!", hi: "जल्द आ रहा है!" },
  "collection.browse_all": { en: "Browse All Products", hi: "सभी उत्पाद देखें" },
  "collection.products_count": { en: "products", hi: "उत्पाद" },
  "collection.load_more": { en: "Load More Products", hi: "और उत्पाद लोड करें" },
  "collection.remaining": { en: "remaining", hi: "शेष" },
  "collection.sort.featured": { en: "Featured", hi: "फीचर्ड" },
  "collection.sort.price_low": { en: "Price: Low to High", hi: "कीमत: कम से अधिक" },
  "collection.sort.price_high": { en: "Price: High to Low", hi: "कीमत: अधिक से कम" },
  "collection.sort.rating": { en: "Top Rated", hi: "शीर्ष रेटेड" },
  "collection.sort.name": { en: "Name: A–Z", hi: "नाम: A–Z" },
  // Checkout
  "checkout.title": { en: "Checkout", hi: "चेकआउट" },
  "checkout.place_order": { en: "Place Order", hi: "ऑर्डर दें" },
  "checkout.order_confirmed": { en: "Order Confirmed!", hi: "ऑर्डर पुष्टि हो गया!" },
  // Track Order
  "track.title": { en: "Track Your Order", hi: "अपना ऑर्डर ट्रैक करें" },
  "track.enter_id": { en: "Enter your Order ID", hi: "अपना ऑर्डर आईडी दर्ज करें" },
  "track.button": { en: "Track", hi: "ट्रैक करें" },
  "track.subtitle": { en: "Enter your order ID to see the latest status and delivery updates.", hi: "नवीनतम स्थिति और डिलीवरी अपडेट देखने के लिए अपना ऑर्डर आईडी दर्ज करें।" },
  // Login
  "login.title": { en: "Login to AbhiAgri", hi: "AbhiAgri में लॉगिन करें" },
  "login.email": { en: "Email Address", hi: "ईमेल पता" },
  "login.password": { en: "Password", hi: "पासवर्ड" },
  "login.submit": { en: "Sign In", hi: "साइन इन" },
  "login.no_account": { en: "Don't have an account?", hi: "अकाउंट नहीं है?" },
  "login.signup": { en: "Sign Up", hi: "साइन अप" },
  "login.create_account": { en: "Create your AbhiAgri account", hi: "अपना AbhiAgri अकाउंट बनाएं" },
  "login.join": { en: "Join thousands of farmers across India", hi: "भारत भर के हज़ारों किसानों से जुड़ें" },
  "login.welcome": { en: "Welcome back! Enter your details", hi: "वापस स्वागत है! अपनी जानकारी दर्ज करें" },
  "login.full_name": { en: "Full Name", hi: "पूरा नाम" },
  "login.forgot_password": { en: "Forgot password?", hi: "पासवर्ड भूल गए?" },
  "login.already_account": { en: "Already have an account?", hi: "पहले से अकाउंट है?" },
  // Wishlist
  "wishlist.title": { en: "My Wishlist", hi: "मेरी विशलिस्ट" },
  "wishlist.empty": { en: "Your wishlist is empty", hi: "आपकी विशलिस्ट खाली है" },
  "wishlist.browse": { en: "Start browsing products", hi: "उत्पाद ब्राउज़ करना शुरू करें" },
  // Product Detail
  "product.verified_seller": { en: "Verified Seller", hi: "सत्यापित विक्रेता" },
  "product.reviews": { en: "reviews", hi: "समीक्षाएं" },
  "product.save": { en: "Save", hi: "बचत" },
  "product.pack_size": { en: "Pack Size", hi: "पैक साइज़" },
  "product.quantity": { en: "Quantity", hi: "मात्रा" },
  "product.genuine": { en: "Genuine products guaranteed", hi: "असली उत्पादों की गारंटी" },
  "product.delivery": { en: "Pan-India Delivery", hi: "पूरे भारत में डिलीवरी" },
  "product.free_shipping": { en: "Free shipping above ₹999", hi: "₹999 से ऊपर मुफ्त शिपिंग" },
  "product.target_crops": { en: "Target Crops", hi: "लक्षित फसलें" },
  "product.target_pests": { en: "Target Pests", hi: "लक्षित कीट" },
  "product.description": { en: "Description", hi: "विवरण" },
  "product.specs": { en: "Technical Specs", hi: "तकनीकी विशेषताएं" },
  // Footer
  "footer.about": { en: "AbhiAgri is one of India's fastest-growing AgriTech platforms, dedicated to empowering farmers with quality seeds, crop protection products, fertilizers, and modern equipment — delivered to your doorstep.", hi: "AbhiAgri भारत के सबसे तेज़ी से बढ़ते AgriTech प्लेटफार्मों में से एक है, जो किसानों को गुणवत्ता वाले बीज, फसल सुरक्षा उत्पाद, उर्वरक और आधुनिक उपकरण — आपके दरवाज़े तक पहुंचाने के लिए समर्पित है।" },
  "footer.about2": { en: "We leverage technology and data-driven insights to help farmers optimize practices, boost yields, and build a sustainable future for Indian agriculture.", hi: "हम किसानों को प्रथाओं को अनुकूलित करने, उपज बढ़ाने और भारतीय कृषि के लिए एक स्थायी भविष्य बनाने में मदद करने के लिए प्रौद्योगिकी और डेटा-संचालित अंतर्दृष्टि का उपयोग करते हैं।" },
  "footer.quick_links": { en: "Quick Links", hi: "त्वरित लिंक" },
  "footer.shop_categories": { en: "Shop Categories", hi: "खरीदारी श्रेणियां" },
  "footer.download_app": { en: "Download App", hi: "ऐप डाउनलोड करें" },
  "footer.coming_soon_app": { en: "Coming soon on Play Store & App Store", hi: "जल्द ही Play Store और App Store पर" },
  "footer.contact_us": { en: "Contact Us", hi: "हमसे संपर्क करें" },
  "footer.missed_call": { en: "Missed Call to Order", hi: "ऑर्डर करने के लिए मिस्ड कॉल" },
  "footer.genuine": { en: "100% Genuine", hi: "100% असली" },
  "footer.genuine_desc": { en: "products from certified sellers", hi: "प्रमाणित विक्रेताओं से उत्पाद" },
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
