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
          {isHi ? "वापसी और धनवापसी नीति" : "Return & Refund Policy"}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {isHi ? "अंतिम बार अपडेट: मार्च 2026" : "Last updated: March 2026"}
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none text-foreground space-y-6">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
              1. {isHi ? "वापसी नीति" : "Return Policy"}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">{isHi ? "डिलीवरी के समय जांचें:" : "Check at delivery:"}</strong>{" "}
                {isHi
                  ? "कृपया डिलीवरी बॉय की उपस्थिति में उत्पाद की जांच करें।"
                  : "Please inspect the product in the presence of the delivery person."}
              </li>
              <li>
                <strong className="text-foreground">{isHi ? "क्षतिग्रस्त/गलत उत्पाद:" : "Damaged/wrong product:"}</strong>{" "}
                {isHi
                  ? "यदि उत्पाद क्षतिग्रस्त, टूटा हुआ, या गलत प्राप्त होता है, तो डिलीवरी पर तुरंत रिपोर्ट करें।"
                  : "If the product is damaged, broken, or incorrect, report it immediately at delivery."}
              </li>
              <li>
                <strong className="text-foreground">{isHi ? "स्वीकृति के बाद:" : "After acceptance:"}</strong>{" "}
                {isHi
                  ? "एक बार उत्पाद स्वीकार करने के बाद, क्षति-संबंधित दावे स्वीकार नहीं किए जाएंगे।"
                  : "Once the product is accepted, damage-related claims will not be accepted."}
              </li>
              <li>
                <strong className="text-foreground">{isHi ? "खोले/उपयोग किए गए उत्पाद:" : "Opened/used products:"}</strong>{" "}
                {isHi
                  ? "खोले या उपयोग किए गए उत्पाद वापसी के लिए पात्र नहीं हैं।"
                  : "Opened or used items are not eligible for return."}
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
              2. {isHi ? "धनवापसी नीति" : "Refund Policy"}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                {isHi
                  ? "धनवापसी केवल डिलीवरी के समय रिपोर्ट किए गए क्षतिग्रस्त या गलत उत्पादों के लिए जारी की जाती है।"
                  : "Refunds are only issued for damaged or incorrect products reported at the time of delivery."}
              </li>
              <li>
                {isHi
                  ? "अनुमोदित धनवापसी 7-10 कार्य दिवसों में मूल भुगतान विधि पर वापस की जाएगी।"
                  : "Approved refunds will be credited back to the original payment method within 7–10 business days."}
              </li>
              <li>
                {isHi
                  ? "कैश ऑन डिलीवरी (COD) ऑर्डर के लिए, धनवापसी बैंक ट्रांसफर के माध्यम से जारी की जाएगी।"
                  : "For Cash on Delivery (COD) orders, refunds will be issued via bank transfer."}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
              3. {isHi ? "डिलीवरी नीति" : "Delivery Policy"}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                {isHi
                  ? "हम भारत भर में पिन कोड के अनुसार डिलीवरी करते हैं।"
                  : "We deliver across India based on PIN code serviceability."}
              </li>
              <li>
                {isHi
                  ? "अनुमानित डिलीवरी समय: ऑर्डर की पुष्टि से 5-10 कार्य दिवस।"
                  : "Estimated delivery time: 5–10 business days from order confirmation."}
              </li>
              <li>
                {isHi
                  ? "₹999 से ऊपर के ऑर्डर पर मुफ्त डिलीवरी। इससे कम ऑर्डर पर ₹99 शिपिंग शुल्क लागू होगा।"
                  : "Free delivery on orders above ₹999. Orders below this amount will incur a ₹99 shipping fee."}
              </li>
              <li>
                {isHi
                  ? "डिलीवरी का समय स्थान और उत्पाद उपलब्धता के अनुसार भिन्न हो सकता है।"
                  : "Delivery times may vary based on location and product availability."}
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
              4. {isHi ? "ऑर्डर रद्दीकरण" : "Order Cancellation"}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                {isHi
                  ? "ऑर्डर शिप होने से पहले रद्द किए जा सकते हैं। हमसे संपर्क करें।"
                  : "Orders can be cancelled before they are shipped. Contact us to cancel."}
              </li>
              <li>
                {isHi
                  ? "शिप किए गए ऑर्डर रद्द नहीं किए जा सकते।"
                  : "Once shipped, orders cannot be cancelled."}
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
              5. {isHi ? "शिकायत कैसे दर्ज करें" : "How to Raise a Complaint"}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                {isHi
                  ? "हमें ईमेल करें: support@abhiagri.com ऑर्डर आईडी और उत्पाद की फोटो के साथ।"
                  : "Email us at support@abhiagri.com with your Order ID and photos of the product."}
              </li>
              <li>
                {isHi
                  ? "हमारी टीम 24-48 घंटों में जवाब देगी।"
                  : "Our team will respond within 24–48 hours."}
              </li>
            </ul>
          </section>

          {/* Legal Note */}
          <section className="mt-12 pt-6 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {isHi ? "कानूनी नोट" : "Legal Note"}
            </h2>
            <p className="text-muted-foreground">
              {isHi
                ? "सभी विवाद राजकोट अधिकार क्षेत्र के अधीन हैं।"
                : "All disputes are subject to Rajkot jurisdiction."}
            </p>
            <p className="text-muted-foreground mt-2">
              {isHi
                ? "हम ग्राहक और आपूर्तिकर्ता के बीच एक सुविधाकर्ता के रूप में कार्य करते हैं।"
                : "We act as a facilitator between customer and supplier."}
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReturnRefundPolicy;
