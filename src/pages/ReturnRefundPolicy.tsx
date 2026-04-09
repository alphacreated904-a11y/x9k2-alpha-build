import React from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  CreditCard,
  PackageCheck,
  Truck,
  RotateCcw,
  RefreshCw,
  Banknote,
  PackageX,
  XCircle,
  Users,
  AlertTriangle,
  FileText,
  Camera,
  Clock,
  CheckCircle2,
  Ban,
} from "lucide-react";

const ReturnRefundPolicy: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern id="policy-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#policy-grid)" />
          </svg>
        </div>
        <div className="container max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            {isHi ? "केवल प्रीपेड ऑर्डर" : "Prepaid Orders Only"}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {isHi ? "वापसी, धनवापसी और डिलीवरी नीति" : "Return, Refund & Delivery Policy"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isHi
              ? "आपकी खरीदारी को सुरक्षित और पारदर्शी बनाने के लिए हमारी स्पष्ट नीतियाँ"
              : "Clear and transparent policies to ensure a safe and reliable shopping experience"}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {isHi ? "अंतिम बार अपडेट: मार्च 2026" : "Last updated: March 2026"}
          </p>
        </div>
      </section>

      <div className="container max-w-4xl py-12 md:py-16 space-y-8">

        {/* 1. Payment Policy */}
        <PolicyCard icon={CreditCard} title="1. Payment Policy" color="blue">
          <ul className="space-y-2">
            <BulletItem bold>We accept 100% advance payment only.</BulletItem>
            <BulletItem>Orders will be processed only after successful payment confirmation.</BulletItem>
            <BulletItem>We do not offer Cash on Delivery (COD).</BulletItem>
          </ul>
        </PolicyCard>

        {/* 2. Order Confirmation */}
        <PolicyCard icon={PackageCheck} title="2. Order Confirmation" color="green">
          <ul className="space-y-2">
            <BulletItem>All orders are considered <strong className="text-foreground">final</strong> after payment is completed.</BulletItem>
            <BulletItem>Customers are requested to carefully review product details before placing the order.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 3. Delivery & Product Checking */}
        <PolicyCard icon={Truck} title="3. Delivery & Product Checking" color="amber" badge="MANDATORY">
          <p className="text-muted-foreground mb-4">
            Customers <strong className="text-foreground">must open and check the product at the time of delivery</strong> in front of the delivery person.
          </p>
          <p className="text-foreground font-medium mb-2">Please verify:</p>
          <ul className="space-y-1.5 mb-5">
            <CheckItem>Correct product received</CheckItem>
            <CheckItem>Proper seal & packaging</CheckItem>
            <CheckItem>No damage / leakage</CheckItem>
          </ul>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/30 p-5 space-y-4">
            <div>
              <p className="text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" /> If any issue is found:
              </p>
              <ul className="pl-6 space-y-1 text-amber-700 dark:text-amber-400 list-disc text-sm">
                <li>Do <strong>NOT</strong> accept the delivery</li>
                <li>Immediately inform us</li>
              </ul>
            </div>
            <div>
              <p className="text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" /> Once delivery is accepted:
              </p>
              <ul className="pl-6 space-y-1 text-amber-700 dark:text-amber-400 list-disc text-sm">
                <li>Product will be considered delivered in proper condition</li>
                <li><strong>No damage-related claims will be accepted</strong></li>
              </ul>
            </div>
          </div>
        </PolicyCard>

        {/* 4. Return Policy */}
        <PolicyCard icon={RotateCcw} title="4. Return Policy" color="green">
          <p className="text-muted-foreground mb-4">We accept returns <strong className="text-foreground">ONLY</strong> in the following cases:</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <MiniCard icon={CheckCircle2} color="green">Damaged product (at delivery time)</MiniCard>
            <MiniCard icon={CheckCircle2} color="green">Wrong product delivered</MiniCard>
            <MiniCard icon={CheckCircle2} color="green">Expired product (if applicable)</MiniCard>
          </div>
          <p className="text-foreground font-medium mb-3">❌ Returns will NOT be accepted if:</p>
          <ul className="space-y-1.5">
            <RejectItem>Product is opened or used</RejectItem>
            <RejectItem>Complaint raised after 48 hours of delivery</RejectItem>
            <RejectItem>Product was not checked at delivery time</RejectItem>
            <RejectItem>Customer ordered wrong product</RejectItem>
            <RejectItem>Change of mind / no longer needed</RejectItem>
          </ul>
        </PolicyCard>

        {/* 5. Return Request Process */}
        <PolicyCard icon={Camera} title="5. Return Request Process" color="purple">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 rounded-lg border border-border bg-muted/30 p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-foreground text-sm">Within 48 Hours</p>
              <p className="text-xs text-muted-foreground mt-1">Raise request after delivery</p>
            </div>
            <div className="flex-1 rounded-lg border border-border bg-muted/30 p-4 text-center">
              <Camera className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-foreground text-sm">Photo / Video Proof</p>
              <p className="text-xs text-muted-foreground mt-1">Clear images of product & packaging</p>
            </div>
          </div>
          <p className="text-amber-700 dark:text-amber-400 font-medium mt-4 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Requests without proof will not be accepted.
          </p>
        </PolicyCard>

        {/* 6. Refund Policy */}
        <PolicyCard icon={Banknote} title="6. Refund Policy" color="green">
          <ul className="space-y-2">
            <BulletItem>Refund will be processed only after verification from supplier.</BulletItem>
            <BulletItem>Refund timeline: <strong className="text-foreground">5–7 working days</strong> after approval.</BulletItem>
            <BulletItem>Refund will be made via: Original payment method / UPI / bank transfer.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 7. Replacement Policy */}
        <PolicyCard icon={RefreshCw} title="7. Replacement Policy" color="blue">
          <p className="text-muted-foreground mb-3">In case of approved return:</p>
          <ul className="space-y-2">
            <BulletItem>Replacement product <strong className="text-foreground">OR</strong></BulletItem>
            <BulletItem>Refund will be provided (based on availability & supplier decision)</BulletItem>
          </ul>
        </PolicyCard>

        {/* 8. Non-Returnable Products */}
        <PolicyCard icon={PackageX} title="8. Non-Returnable Products" color="red">
          <p className="text-muted-foreground mb-3">Due to the nature of agricultural products, the following are <strong className="text-foreground">strictly non-returnable:</strong></p>
          <div className="grid sm:grid-cols-3 gap-3">
            <MiniCard icon={Ban} color="red">Opened pesticides</MiniCard>
            <MiniCard icon={Ban} color="red">Used fertilizers</MiniCard>
            <MiniCard icon={Ban} color="red">Seeds after opening</MiniCard>
          </div>
        </PolicyCard>

        {/* 9. Cancellation Policy */}
        <PolicyCard icon={XCircle} title="9. Cancellation Policy" color="amber">
          <ul className="space-y-2">
            <BulletItem>Orders can be cancelled <strong className="text-foreground">only before dispatch.</strong></BulletItem>
            <BulletItem>Once order is shipped, cancellation is not allowed.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 10. Delivery Responsibility */}
        <PolicyCard icon={Truck} title="10. Delivery Responsibility" color="blue">
          <ul className="space-y-2">
            <BulletItem>Delivery is handled by third-party suppliers / logistics partners.</BulletItem>
            <BulletItem>We ensure order coordination and support.</BulletItem>
            <BulletItem>Delivery timelines may vary depending on location.</BulletItem>
          </ul>
        </PolicyCard>

        {/* 11. Fraud & Abuse Policy */}
        <PolicyCard icon={Shield} title="11. Fraud & Abuse Policy" color="red">
          <p className="text-muted-foreground mb-3">The following activities are <strong className="text-foreground">strictly prohibited:</strong></p>
          <ul className="space-y-1.5 mb-4">
            <RejectItem>False damage claims</RejectItem>
            <RejectItem>Fake return requests</RejectItem>
            <RejectItem>Misuse of refund policy</RejectItem>
          </ul>
          <p className="text-foreground font-medium mb-2">Action may include:</p>
          <ul className="space-y-2">
            <BulletItem>Account blocking</BulletItem>
            <BulletItem>No future orders allowed</BulletItem>
          </ul>
        </PolicyCard>

        {/* 12. Customer Responsibility */}
        <PolicyCard icon={Users} title="12. Customer Responsibility" color="green">
          <p className="text-muted-foreground mb-3">By placing an order, customer agrees to:</p>
          <ul className="space-y-1.5">
            <CheckItem>Provide accurate delivery details</CheckItem>
            <CheckItem>Be available at delivery time</CheckItem>
            <CheckItem>Follow product usage instructions</CheckItem>
            <CheckItem>Carefully check product at delivery</CheckItem>
          </ul>
        </PolicyCard>

        {/* 13. Policy Updates */}
        <PolicyCard icon={FileText} title="13. Policy Updates" color="purple">
          <p className="text-muted-foreground">
            We reserve the right to modify this policy at any time without prior notice.
          </p>
        </PolicyCard>

        {/* Agreement + Legal */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 p-8 text-center space-y-4 mt-12">
          <p className="text-foreground text-lg font-bold">
            ✔ By placing an order, you agree to all above terms.
          </p>
          <div className="text-muted-foreground text-sm space-y-1">
            <p>All disputes are subject to <strong className="text-foreground">Rajkot jurisdiction.</strong></p>
            <p>We act as a facilitator between customer and supplier.</p>
          </div>
        </div>
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

const RejectItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-2 text-muted-foreground">
    <XCircle className="w-4 h-4 text-destructive shrink-0" />
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
  <div className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col items-center text-center gap-2">
    <Icon className={`w-5 h-5 ${color === "green" ? "text-emerald-500" : "text-destructive"}`} />
    <span className="text-sm text-muted-foreground">{children}</span>
  </div>
);

export default ReturnRefundPolicy;
