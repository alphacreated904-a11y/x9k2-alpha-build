import React from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Truck,
  Clock,
  MapPin,
  PackageCheck,
  UserCheck,
  AlertTriangle,
  Camera,
  Timer,
  Bell,
  Headphones,
  Mail,
  Phone,
  CheckCircle2,
  Globe,
  Shield,
} from "lucide-react";

const ShippingPolicy: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern id="ship-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ship-grid)" />
          </svg>
        </div>
        <div className="container max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Truck className="w-4 h-4" />
            {isHi ? "शिपिंग और डिलीवरी" : "Shipping & Delivery"}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {isHi ? "शिपिंग और डिलीवरी नीति" : "Shipping & Delivery Policy"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isHi
              ? "आपके ऑर्डर को सुरक्षित और समय पर पहुंचाने के लिए हमारी स्पष्ट शिपिंग नीतियाँ"
              : "Clear and transparent shipping policies to ensure your orders reach you safely and on time"}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {isHi ? "अंतिम बार अपडेट: मार्च 2026" : "Last updated: March 2026"}
          </p>
        </div>
      </section>

      <div className="container max-w-4xl py-12 md:py-16 space-y-8">

        {/* 1. Shipping Coverage */}
        <PolicyCard icon={Globe} title="1. Shipping Coverage" color="blue">
          <ul className="space-y-2">
            <BulletItem>Abhi Agri delivers agricultural products across India through trusted courier and logistics partners.</BulletItem>
            <BulletItem>Shipping charges (if any) will be clearly displayed at checkout before placing your order.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 2. Order Processing Time */}
        <PolicyCard icon={Clock} title="2. Order Processing Time" color="green">
          <ul className="space-y-2">
            <BulletItem>Orders are typically processed and dispatched within <strong className="text-foreground">2–3 working days</strong>.</BulletItem>
            <BulletItem>Bulk or large quantity orders may require additional processing time.</BulletItem>
            <BulletItem>Orders placed on weekends or public holidays will be processed on the next working day.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 3. Delivery Time */}
        <PolicyCard icon={Timer} title="3. Delivery Time" color="amber">
          <ul className="space-y-2">
            <BulletItem bold>Standard delivery timeline is 5–10 working days from the date of dispatch.</BulletItem>
            <BulletItem>Delivery timelines are estimates and may vary depending on:</BulletItem>
          </ul>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <MiniCard icon={MapPin} color="amber">Delivery location (urban/rural/remote areas)</MiniCard>
            <MiniCard icon={PackageCheck} color="amber">Product availability</MiniCard>
            <MiniCard icon={AlertTriangle} color="amber">Weather or external conditions</MiniCard>
            <MiniCard icon={Truck} color="amber">Courier partner operations</MiniCard>
          </div>
          <p className="text-sm text-muted-foreground mt-4 italic">
            In certain cases, delivery may take longer due to unavoidable circumstances.
          </p>
        </PolicyCard>

        {/* 4. Shipping Partners */}
        <PolicyCard icon={Shield} title="4. Shipping Partners" color="purple">
          <ul className="space-y-2">
            <BulletItem>We work with reliable courier and logistics providers to ensure safe delivery of your orders.</BulletItem>
            <BulletItem>In some cases, we may also use postal or regional transport services, which may take additional time.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 5. New User Order Verification */}
        <PolicyCard icon={UserCheck} title="5. New User Order Verification" color="blue" badge="FIRST ORDER">
          <p className="text-muted-foreground mb-3">For first-time users, our team may contact you to confirm your order details such as:</p>
          <ul className="space-y-2">
            <CheckItem>Delivery address</CheckItem>
            <CheckItem>Contact number</CheckItem>
            <CheckItem>Pincode</CheckItem>
          </ul>
          <p className="text-sm text-muted-foreground mt-4 italic">
            If the provided address is not serviceable, you may be asked to provide an alternative delivery location.
          </p>
        </PolicyCard>

        {/* 6. Delivery for Remote (ODA) Locations */}
        <PolicyCard icon={MapPin} title="6. Delivery for Remote (ODA) Locations" color="amber">
          <ul className="space-y-2">
            <BulletItem>If your address falls under a remote or non-serviceable (ODA) area, delivery may not be available directly to your doorstep.</BulletItem>
            <BulletItem>In such cases, you may be required to collect the parcel from the nearest courier office.</BulletItem>
            <BulletItem>Our support team will assist you with the required details.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 7. Damaged or Tampered Packages */}
        <PolicyCard icon={Camera} title="7. Damaged or Tampered Packages" color="red" badge="IMPORTANT">
          <p className="text-muted-foreground mb-3">If you receive a package that appears damaged or tampered:</p>
          <div className="space-y-3">
            <StepItem step={1}>Do not accept the delivery</StepItem>
            <StepItem step={2}>Take clear photos of the package</StepItem>
            <StepItem step={3}>Inform us immediately with your order details</StepItem>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            We will investigate the issue and arrange for a <strong className="text-foreground">replacement or resolution</strong> as applicable.
          </p>
        </PolicyCard>

        {/* 8. Delivery Delays & Disclaimer */}
        <PolicyCard icon={AlertTriangle} title="8. Delivery Delays & Disclaimer" color="amber">
          <p className="text-muted-foreground mb-3">While we strive to deliver all orders on time:</p>
          <ul className="space-y-2">
            <BulletItem>Delays may occur due to reasons beyond our control (such as weather conditions, transport disruptions, or courier issues).</BulletItem>
            <BulletItem bold>Abhi Agri shall not be held liable for any losses caused due to delayed or failed delivery.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 9. Order Tracking */}
        <PolicyCard icon={Bell} title="9. Order Tracking" color="green">
          <ul className="space-y-2">
            <BulletItem>Once your order is shipped, you will receive tracking details via <strong className="text-foreground">SMS, email, or WhatsApp</strong> (if available).</BulletItem>
            <BulletItem>This allows you to monitor the delivery status in real-time.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 10. Customer Support */}
        <PolicyCard icon={Headphones} title="10. Customer Support" color="purple">
          <p className="text-muted-foreground mb-4">For any shipping or delivery-related queries, you can contact us:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="mailto:support@abhiagri.com" className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email</p>
                <p className="text-sm font-medium text-foreground">support@abhiagri.com</p>
              </div>
            </a>
            <a href="tel:+911800123456" className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Phone</p>
                <p className="text-sm font-medium text-foreground">1800-123-456</p>
              </div>
            </a>
          </div>
        </PolicyCard>

      </div>

      <Footer />
    </div>
  );
};

/* ---------- Reusable sub-components ---------- */

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  red: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
};

const PolicyCard = ({
  icon: Icon,
  title,
  color,
  badge,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  badge?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4 mb-5">
      <div className={`p-3 rounded-xl ${colorMap[color] ?? colorMap.blue}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </div>
    <div className="text-sm sm:text-base leading-relaxed">{children}</div>
  </div>
);

const BulletItem = ({ children, bold }: { children: React.ReactNode; bold?: boolean }) => (
  <li className={`flex items-start gap-2 text-muted-foreground ${bold ? "font-semibold text-foreground" : ""}`}>
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
    <span>{children}</span>
  </li>
);

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-2 text-muted-foreground">
    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
    <span>{children}</span>
  </li>
);

const MiniCard = ({
  icon: Icon,
  color,
  children,
}: {
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center gap-3">
    <Icon className={`w-4 h-4 shrink-0 ${color === "amber" ? "text-amber-500" : color === "green" ? "text-emerald-500" : "text-primary"}`} />
    <span className="text-sm text-muted-foreground">{children}</span>
  </div>
);

const StepItem = ({ step, children }: { step: number; children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-bold shrink-0">
      {step}
    </span>
    <span className="text-sm text-muted-foreground">{children}</span>
  </div>
);

export default ShippingPolicy;
