import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSync } from "@/components/LanguageSync";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { FloatingContact } from "@/components/FloatingContact";
import ScrollToTop from "./components/ScrollToTop";

// Eagerly load Index (home page) for fastest FCP/LCP
import Index from "./pages/Index";

// Lazy-load all other routes to reduce initial bundle
const Collection = lazy(() => import("./pages/Collection"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ReturnRefundPolicy = lazy(() => import("./pages/ReturnRefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const LazyFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <LanguageSync />
              <Toaster />
              <Sonner />
              <CartDrawer />
              <WishlistDrawer />
              <FloatingContact />
              <Suspense fallback={<LazyFallback />}>
                <Routes>
                  {/* English routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/shipping" element={<ShippingPolicy />} />
                  {/* Hindi routes */}
                  <Route path="/hi" element={<Index />} />
                  <Route path="/hi/collection" element={<Collection />} />
                  <Route path="/hi/product/:id" element={<ProductDetail />} />
                  <Route path="/hi/checkout" element={<Checkout />} />
                  <Route path="/hi/return-refund-policy" element={<ReturnRefundPolicy />} />
                  <Route path="/hi/track-order" element={<TrackOrder />} />
                  <Route path="/hi/login" element={<Login />} />
                  <Route path="/hi/about" element={<About />} />
                  <Route path="/hi/privacy" element={<Privacy />} />
                  <Route path="/hi/terms-of-service" element={<TermsOfService />} />
                  <Route path="/hi/shipping" element={<ShippingPolicy />} />
                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
