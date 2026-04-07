import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import {
  Shield,
  Lock,
  Cookie,
  Share2,
  Link2,
  ShieldCheck,
  FileText,
  BarChart3,
  Scale,
  UserCheck,
  Mail,
  Rocket,
  CheckCircle2,
  Phone,
  MapPin,
} from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pp-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#pp-grid)" />
          </svg>
        </div>
        <div className="container px-4 sm:px-6 relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="size-4" />
            Privacy Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your Privacy <span className="text-primary">Matters to Us</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            At <strong className="text-foreground">Abhi Agri</strong>, we value the trust you place in us. We are committed to safeguarding your personal information and ensuring a secure and transparent user experience.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 sm:px-6 max-w-4xl mx-auto space-y-12">

          {/* Notice */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 md:p-6">
            <p className="text-sm md:text-base text-foreground leading-relaxed">
              <strong>Note:</strong> This Privacy Policy may be updated from time to time without prior notice. We encourage you to review this page periodically. By accessing or using our website, you agree to the terms of this Privacy Policy.
            </p>
          </div>

          {/* Section 1 */}
          <PolicySection icon={Lock} number="1" title="Information We Collect">
            <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card p-5">
                <h4 className="font-semibold text-foreground mb-3">Personal Information</h4>
                <ul className="space-y-2">
                  {["Name", "Email address", "Phone number", "Address (billing/shipping)", "Payment details (processed securely via third-party gateways)"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-5">
                <h4 className="font-semibold text-foreground mb-3">Non-Personal Information</h4>
                <ul className="space-y-2">
                  {["Browser type", "IP address", "Device information", "Pages visited and user behavior"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              You can browse our website without revealing personal information. However, certain features (like placing orders) require registration.
            </p>
          </PolicySection>

          {/* Section 2 */}
          <PolicySection icon={FileText} number="2" title="How We Use Your Information">
            <p className="text-muted-foreground mb-4">We use the collected information to:</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {[
                "Provide and improve our services",
                "Process orders and transactions",
                "Personalize your experience",
                "Communicate updates, offers, and notifications",
                "Improve website performance and UX",
                "Prevent fraud and enhance security",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4">You may opt out of promotional communications at any time.</p>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection icon={Cookie} number="3" title="Cookies & Tracking Technologies">
            <p className="text-muted-foreground mb-4">We use cookies to:</p>
            <ul className="space-y-2 mb-4">
              {["Enhance your browsing experience", "Understand user behavior", "Improve website functionality"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Cookies are small files stored on your device. You can disable cookies through your browser settings, though some features may not function properly.
            </p>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection icon={Share2} number="4" title="Sharing of Information">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-4">
              <p className="text-sm font-semibold text-foreground">We do not sell or rent your personal information to third parties.</p>
            </div>
            <p className="text-muted-foreground mb-3">However, we may share your information in these cases:</p>
            <ul className="space-y-2">
              {[
                "With trusted partners and service providers (for payments, delivery, etc.)",
                "To comply with legal obligations or government requests",
                "To prevent fraud, security threats, or illegal activities",
                "In case of business transfer (merger, acquisition, etc.)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-3">All partners are required to maintain the confidentiality of your data.</p>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection icon={Link2} number="5" title="Third-Party Links">
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. Once you leave our website, we are not responsible for the privacy practices or content of those external sites. We recommend reviewing their privacy policies before sharing any information.
            </p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection icon={ShieldCheck} number="6" title="Data Security">
            <p className="text-muted-foreground">
              We implement strict security measures to protect your information from unauthorized access, misuse, or disclosure. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet is 100% secure.
            </p>
          </PolicySection>

          {/* Section 7 */}
          <PolicySection icon={UserCheck} number="7" title="Your Rights & Choices">
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="space-y-2">
              {[
                "Access your personal information",
                "Request correction or deletion of your data",
                "Opt out of marketing communications",
                "Restrict or object to certain data processing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-3">To exercise these rights, contact us using the details below.</p>
          </PolicySection>

          {/* Section 8 */}
          <PolicySection icon={BarChart3} number="8" title="Use of Analytics & Tracking Tools">
            <p className="text-muted-foreground">
              We may use third-party tools (such as analytics and advertising platforms) to understand user behavior, improve services, and deliver relevant content. These tools may use cookies and similar technologies to collect information about your interaction with our website.
            </p>
          </PolicySection>

          {/* Section 9 */}
          <PolicySection icon={Scale} number="9" title="Legal Compliance">
            <p className="text-muted-foreground mb-3">We may disclose your information if required by law or if necessary to:</p>
            <ul className="space-y-2">
              {["Comply with legal obligations", "Enforce our terms and policies", "Protect our rights, users, or the public"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </PolicySection>

          {/* Section 10 - Grievance */}
          <PolicySection icon={UserCheck} number="10" title="Grievance Officer">
            <p className="text-muted-foreground mb-4">In accordance with applicable Indian laws, you may contact our grievance officer for any concerns:</p>
            <div className="rounded-lg border bg-card p-5 space-y-3">
              <p className="font-semibold text-foreground">Abhi Agri</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 text-primary" />
                <a href="mailto:support@abhiagri.com" className="hover:text-primary transition-colors">support@abhiagri.com</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4 text-primary" />
                1800-123-456
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                Pune, Maharashtra, India
              </div>
            </div>
          </PolicySection>

          {/* Section 11 - Contact */}
          <PolicySection icon={Mail} number="11" title="Contact Us">
            <p className="text-muted-foreground mb-4">If you have any questions about this Privacy Policy, feel free to contact us:</p>
            <div className="rounded-lg border bg-card p-5">
              <p className="font-semibold text-foreground mb-2">Abhi Agri Team</p>
              <a href="mailto:support@abhiagri.com" className="text-sm text-primary hover:underline">support@abhiagri.com</a>
            </div>
          </PolicySection>

          {/* Final CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 text-center text-primary-foreground">
            <Rocket className="size-8 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Trusted by Farmers. Protected by Technology.
            </h2>
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto">
              Abhi Agri is committed to building a secure, transparent, and farmer-friendly digital marketplace. Your trust is our top priority.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* Reusable section wrapper */
const PolicySection: React.FC<{
  icon: React.ElementType;
  number: string;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, number, title, children }) => (
  <section className="scroll-mt-24">
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="size-5" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground">
        <span className="text-primary mr-1">{number}.</span> {title}
      </h2>
    </div>
    <div className="pl-0 md:pl-[52px]">{children}</div>
  </section>
);

export default Privacy;
