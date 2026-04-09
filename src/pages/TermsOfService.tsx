import React from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FileText,
  Users,
  Shield,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  AlertTriangle,
  Lock,
  Link2,
  Info,
  Scale,
  UserCheck,
  MessageSquare,
  Calendar,
  Gavel,
  RefreshCw,
  Mail,
  BookOpen,
} from "lucide-react";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern id="tos-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#tos-grid)" />
          </svg>
        </div>
        <div className="container max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Terms & Conditions
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our platform. By accessing Abhi Agri, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: March 2026</p>
        </div>
      </section>

      <div className="container max-w-4xl py-12 md:py-16 space-y-8">

        <SectionCard icon={BookOpen} title="1. Introduction" color="blue">
          <p className="text-muted-foreground">
            Welcome to <strong className="text-foreground">Abhi Agri</strong>. By accessing or using our website, you agree to comply with and be bound by the following Terms & Conditions. If you do not agree with any part of these terms, you should not use our website or services.
          </p>
          <p className="text-muted-foreground mt-3">These terms apply to all users, including visitors, customers, and suppliers.</p>
        </SectionCard>

        <SectionCard icon={Info} title="2. Definitions" color="purple">
          <ul className="space-y-2">
            <DefItem term={`"We", "Our", "Us"`}>refer to Abhi Agri.</DefItem>
            <DefItem term={`"User", "You"`}>refers to anyone accessing or using the website.</DefItem>
            <DefItem term={`"Website"`}>refers to our online platform.</DefItem>
            <DefItem term={`"Products"`}>include seeds, fertilizers, pesticides, and other agricultural goods listed on our website.</DefItem>
          </ul>
        </SectionCard>

        <SectionCard icon={Lock} title="3. User Account & Security" color="amber">
          <ul className="space-y-2">
            <Bullet>You may be required to create an account to use certain features.</Bullet>
            <Bullet>You are responsible for maintaining the confidentiality of your login credentials.</Bullet>
            <Bullet>Any activity under your account will be considered your responsibility.</Bullet>
            <Bullet bold>Notify us immediately if you suspect unauthorized access.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={ShoppingCart} title="4. Services Offered" color="green">
          <p className="text-muted-foreground mb-4">
            Abhi Agri provides an online platform where users can browse and purchase agricultural products from various sellers.
          </p>
          <p className="text-foreground font-medium mb-2">We reserve the right to:</p>
          <ul className="space-y-2">
            <Bullet>Modify or discontinue services at any time</Bullet>
            <Bullet>Cancel orders due to product unavailability, pricing errors, or suspicious activity</Bullet>
            <Bullet>Limit quantities or refuse service without prior notice</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={CreditCard} title="5. Orders, Pricing & Payments" color="blue">
          <ul className="space-y-2">
            <Bullet>All prices are listed in Indian Rupees (INR) and may change without notice.</Bullet>
            <Bullet>Orders are confirmed only after successful payment or order verification.</Bullet>
            <Bullet>We support multiple payment methods (online payment, UPI, etc.).</Bullet>
            <Bullet>Cash on Delivery (COD) may be available for selected locations/orders.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Truck} title="6. Shipping & Delivery" color="green">
          <ul className="space-y-2">
            <Bullet>Delivery timelines are estimates and may vary due to external factors.</Bullet>
            <Bullet>We are not responsible for delays caused by courier partners, weather, or unforeseen circumstances.</Bullet>
            <Bullet>Risk of loss transfers to the user upon dispatch of the product.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={RotateCcw} title="7. Returns, Refunds & Cancellations" color="amber">
          <ul className="space-y-2">
            <Bullet>Returns and refunds are subject to our separate Return Policy.</Bullet>
            <Bullet>Orders may be cancelled by us due to stock issues or policy violations.</Bullet>
            <Bullet>Refunds (if applicable) will be processed within a reasonable timeframe.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={AlertTriangle} title="8. User Conduct" color="red">
          <p className="text-muted-foreground mb-3">By using our website, you agree <strong className="text-foreground">NOT</strong> to:</p>
          <ul className="space-y-2">
            <RejectBullet>Post or share unlawful, harmful, or offensive content</RejectBullet>
            <RejectBullet>Upload viruses or malicious code</RejectBullet>
            <RejectBullet>Violate intellectual property rights</RejectBullet>
            <RejectBullet>Engage in fraudulent or misleading activities</RejectBullet>
          </ul>
          <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mt-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Violation may result in account suspension or legal action.
          </p>
        </SectionCard>

        <SectionCard icon={Shield} title="9. Intellectual Property" color="purple">
          <p className="text-muted-foreground mb-3">
            All content on this website (logos, text, images, design, etc.) is owned by or licensed to <strong className="text-foreground">Abhi Agri</strong>.
          </p>
          <p className="text-foreground font-medium mb-2">You may not:</p>
          <ul className="space-y-2">
            <RejectBullet>Copy, reproduce, or distribute content without permission</RejectBullet>
            <RejectBullet>Use our brand or materials for commercial purposes</RejectBullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Link2} title="10. Third-Party Links" color="blue">
          <p className="text-muted-foreground mb-3">Our website may contain links to external websites. We are not responsible for:</p>
          <ul className="space-y-2">
            <Bullet>Their content</Bullet>
            <Bullet>Privacy practices</Bullet>
            <Bullet>Any loss or damage caused by their use</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Info} title="11. Disclaimer of Warranties" color="amber">
          <ul className="space-y-2">
            <Bullet>We strive to provide accurate information, but we do not guarantee completeness or accuracy.</Bullet>
            <Bullet>Products should be used as per manufacturer instructions.</Bullet>
            <Bullet bold>Use of products is at your own risk.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Scale} title="12. Limitation of Liability" color="red">
          <p className="text-muted-foreground mb-3">Abhi Agri shall not be liable for:</p>
          <ul className="space-y-2">
            <Bullet>Any direct or indirect damages</Bullet>
            <Bullet>Loss of profits, data, or business</Bullet>
            <Bullet>Delays or service interruptions</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={UserCheck} title="13. Indemnification" color="green">
          <p className="text-muted-foreground">
            You agree to indemnify and hold Abhi Agri harmless from any claims, damages, or losses arising from your use of the website or violation of these terms.
          </p>
        </SectionCard>

        <SectionCard icon={MessageSquare} title="14. Communication" color="blue">
          <p className="text-muted-foreground mb-3">By using our services, you agree to receive:</p>
          <ul className="space-y-2">
            <Bullet>Calls, SMS, or emails related to your orders</Bullet>
            <Bullet>Promotional communications (you can opt out anytime)</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Calendar} title="15. Eligibility" color="purple">
          <ul className="space-y-2">
            <Bullet>You must be at least <strong className="text-foreground">18 years old</strong> to use our services.</Bullet>
            <Bullet>If under 18, usage must be under parental/guardian supervision.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Users} title="16. Termination" color="red">
          <p className="text-muted-foreground mb-3">We reserve the right to suspend or terminate your account if:</p>
          <ul className="space-y-2">
            <RejectBullet>You violate these terms</RejectBullet>
            <RejectBullet>Engage in suspicious or harmful activities</RejectBullet>
          </ul>
        </SectionCard>

        <SectionCard icon={Gavel} title="17. Governing Law" color="amber">
          <ul className="space-y-2">
            <Bullet>These Terms shall be governed by the <strong className="text-foreground">laws of India</strong>.</Bullet>
            <Bullet>All disputes shall be subject to the jurisdiction of courts in <strong className="text-foreground">Rajkot, Gujarat</strong>.</Bullet>
          </ul>
        </SectionCard>

        <SectionCard icon={RefreshCw} title="18. Changes to Terms" color="blue">
          <p className="text-muted-foreground">
            We may update these Terms at any time without prior notice. Continued use of the website means you accept the updated Terms.
          </p>
        </SectionCard>

        <SectionCard icon={Mail} title="19. Contact Us" color="green">
          <p className="text-muted-foreground mb-3">For any questions or concerns, contact us at:</p>
          <div className="rounded-xl border border-border bg-muted/30 p-5 inline-flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <a href="mailto:support@abhiagri.com" className="text-primary font-semibold hover:underline">
              support@abhiagri.com
            </a>
          </div>
        </SectionCard>

        {/* Agreement */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 p-8 text-center space-y-4 mt-12">
          <p className="text-foreground text-lg font-bold">
            ✔ By using Abhi Agri, you agree to all the above terms.
          </p>
          <div className="text-muted-foreground text-sm space-y-1">
            <p>All disputes are subject to <strong className="text-foreground">Rajkot, Gujarat jurisdiction.</strong></p>
            <p className="font-medium text-primary">Trusted by Farmers. Protected by Technology. Powered by Abhi Agri.</p>
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

const SectionCard = ({ icon: Icon, title, color, children }: { icon: React.ElementType; title: string; color: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4 mb-5">
      <div className={`p-3 rounded-xl ${colorMap[color] ?? colorMap.blue}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-sm sm:text-base leading-relaxed">{children}</div>
  </div>
);

const Bullet = ({ children, bold }: { children: React.ReactNode; bold?: boolean }) => (
  <li className={`flex items-start gap-2 text-muted-foreground ${bold ? "font-semibold text-foreground" : ""}`}>
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
    <span>{children}</span>
  </li>
);

const RejectBullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-2 text-muted-foreground">
    <span className="text-destructive font-bold text-xs">✕</span>
    <span>{children}</span>
  </li>
);

const DefItem = ({ term, children }: { term: string; children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-muted-foreground">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
    <span><strong className="text-foreground">{term}</strong> — {children}</span>
  </li>
);

export default TermsOfService;
