import React from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ReturnRefundPolicy: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <div className="container py-10 md:py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {isHi ? "वापसी, धनवापसी और डिलीवरी नीति" : "Return, Refund & Delivery Policy"}
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          {isHi ? "(केवल प्रीपेड ऑर्डर)" : "(Prepaid Orders Only)"}
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          {isHi ? "अंतिम बार अपडेट: मार्च 2026" : "Last updated: March 2026"}
        </p>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed">

          {/* 1. Payment Policy */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Payment Policy</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li><strong className="text-foreground">We accept 100% advance payment only.</strong></li>
              <li>Orders will be processed only after successful payment confirmation.</li>
              <li>We do not offer Cash on Delivery (COD).</li>
            </ul>
          </section>

          {/* 2. Order Confirmation */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Order Confirmation</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>All orders are considered <strong className="text-foreground">final</strong> after payment is completed.</li>
              <li>Customers are requested to carefully review product details before placing the order.</li>
            </ul>
          </section>

          {/* 3. Delivery & Product Checking */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Delivery & Product Checking <span className="text-xs font-bold uppercase text-destructive">(MANDATORY)</span></h2>
            <p className="text-muted-foreground mb-3">
              Customers <strong className="text-foreground">must open and check the product at the time of delivery</strong> in front of the delivery person.
            </p>
            <p className="text-muted-foreground mb-2 font-medium text-foreground">Please verify:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
              <li>Correct product received</li>
              <li>Proper seal & packaging</li>
              <li>No damage / leakage</li>
            </ul>
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 space-y-3">
              <p className="text-amber-800 dark:text-amber-300 font-medium">⚠️ If any issue is found:</p>
              <ul className="list-disc pl-5 text-amber-700 dark:text-amber-400 space-y-1">
                <li>Do <strong>NOT</strong> accept the delivery</li>
                <li>Immediately inform us</li>
              </ul>
              <p className="text-amber-800 dark:text-amber-300 font-medium mt-3">⚠️ Once delivery is accepted and delivery person leaves:</p>
              <ul className="list-disc pl-5 text-amber-700 dark:text-amber-400 space-y-1">
                <li>Product will be considered delivered in proper condition</li>
                <li><strong>No damage-related claims will be accepted</strong></li>
              </ul>
            </div>
          </section>

          {/* 4. Return Policy */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Return Policy</h2>
            <p className="text-muted-foreground mb-3">We accept returns <strong className="text-foreground">ONLY</strong> in the following cases:</p>
            <ul className="space-y-1.5 text-muted-foreground mb-4 pl-1">
              <li>✅ Damaged product (at delivery time)</li>
              <li>✅ Wrong product delivered</li>
              <li>✅ Expired product (if applicable)</li>
            </ul>
            <p className="text-muted-foreground mb-2 font-medium text-foreground">❌ Returns will NOT be accepted if:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Product is opened or used</li>
              <li>Complaint raised after 48 hours of delivery</li>
              <li>Product was not checked at delivery time</li>
              <li>Customer ordered wrong product</li>
              <li>Change of mind / no longer needed</li>
            </ul>
          </section>

          {/* 5. Return Request Process */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Return Request Process</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground mb-3">
              <li>Customer must raise request <strong className="text-foreground">within 48 hours</strong> of delivery.</li>
              <li><strong className="text-foreground">Mandatory proof:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Clear photos / video of product</li>
                  <li>Packaging condition</li>
                </ul>
              </li>
            </ul>
            <p className="text-amber-700 dark:text-amber-400 font-medium">⚠️ Requests without proof will not be accepted.</p>
          </section>

          {/* 6. Refund Policy */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Refund will be processed only after verification from supplier.</li>
              <li>Refund timeline: <strong className="text-foreground">5–7 working days</strong> after approval.</li>
              <li>Refund will be made via: Original payment method / UPI / bank transfer.</li>
            </ul>
          </section>

          {/* 7. Replacement Policy */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Replacement Policy</h2>
            <p className="text-muted-foreground mb-2">In case of approved return:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Replacement product <strong className="text-foreground">OR</strong></li>
              <li>Refund will be provided (based on availability & supplier decision)</li>
            </ul>
          </section>

          {/* 8. Non-Returnable Products */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Non-Returnable Products</h2>
            <p className="text-muted-foreground mb-2">Due to the nature of agricultural products, the following are <strong className="text-foreground">strictly non-returnable:</strong></p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Opened pesticides</li>
              <li>Used fertilizers</li>
              <li>Seeds after opening</li>
            </ul>
          </section>

          {/* 9. Cancellation Policy */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Cancellation Policy</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Orders can be cancelled <strong className="text-foreground">only before dispatch.</strong></li>
              <li>Once order is shipped, cancellation is not allowed.</li>
            </ul>
          </section>

          {/* 10. Delivery Responsibility */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Delivery Responsibility</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Delivery is handled by third-party suppliers / logistics partners.</li>
              <li>We ensure order coordination and support.</li>
              <li>Delivery timelines may vary depending on location.</li>
            </ul>
          </section>

          {/* 11. Fraud & Abuse Policy */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Fraud & Abuse Policy</h2>
            <p className="text-muted-foreground mb-2">The following activities are <strong className="text-foreground">strictly prohibited:</strong></p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground mb-3">
              <li>False damage claims</li>
              <li>Fake return requests</li>
              <li>Misuse of refund policy</li>
            </ul>
            <p className="text-muted-foreground font-medium text-foreground">👉 Action may include:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Account blocking</li>
              <li>No future orders allowed</li>
            </ul>
          </section>

          {/* 12. Customer Responsibility */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Customer Responsibility</h2>
            <p className="text-muted-foreground mb-2">By placing an order, customer agrees to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Provide accurate delivery details</li>
              <li>Be available at delivery time</li>
              <li>Follow product usage instructions</li>
              <li>Carefully check product at delivery</li>
            </ul>
          </section>

          {/* 13. Policy Updates */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">13. Policy Updates</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this policy at any time without prior notice.
            </p>
          </section>

          {/* Agreement + Legal */}
          <section className="mt-12 pt-6 border-t border-border space-y-4">
            <p className="text-foreground font-semibold">
              ✔ By placing an order, you agree to all above terms.
            </p>
            <div className="space-y-1 text-muted-foreground">
              <p>All disputes are subject to <strong className="text-foreground">Rajkot jurisdiction.</strong></p>
              <p>We act as a facilitator between customer and supplier.</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReturnRefundPolicy;
