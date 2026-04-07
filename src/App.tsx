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
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <LanguageSync />
              <Toaster />
              <Sonner />
              <CartDrawer />
              <WishlistDrawer />
              <FloatingContact />
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
                {/* Hindi routes — relative paths under /hi */}
                <Route path="/hi" element={<Index />} />
                <Route path="/hi/collection" element={<Collection />} />
                <Route path="/hi/product/:id" element={<ProductDetail />} />
                <Route path="/hi/checkout" element={<Checkout />} />
                <Route path="/hi/return-refund-policy" element={<ReturnRefundPolicy />} />
                <Route path="/hi/track-order" element={<TrackOrder />} />
                <Route path="/hi/login" element={<Login />} />
                <Route path="/hi/about" element={<About />} />
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
