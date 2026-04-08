import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import {
  Sprout,
  Target,
  Globe,
  Wheat,
  Star,
  Heart,
  Users,
  Rocket,
  CheckCircle2,
  Tractor,
} from "lucide-react";

const values = [
  { icon: CheckCircle2, label: "Quality", desc: "Delivering only the best products" },
  { icon: Heart, label: "Trust", desc: "Building long-term relationships with our customers" },
  { icon: Sprout, label: "Innovation", desc: "Continuously improving through technology" },
  { icon: Globe, label: "Sustainability", desc: "Supporting environmentally responsible farming" },
  { icon: Users, label: "Farmer Support", desc: "Putting farmers at the heart of everything we do" },
];

const whyChoose = [
  "Trusted Quality – We focus on providing reliable and genuine agricultural products",
  "Farmer-Centric Approach – Everything we build is designed keeping farmers in mind",
  "Wide Network – Connecting farmers, distributors, retailers, and exporters",
  "Transparent Pricing – Fair and competitive prices with no hidden costs",
  "Future-Ready Platform – Built with innovation to support the evolving agri ecosystem",
];

const offerings = [
  "Seeds and crop essentials",
  "Fertilizers and plant growth products",
  "Crop protection solutions",
  "Agricultural tools and equipment",
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D6A4F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <Sprout className="size-3.5" /> About Abhi Agri
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
            Empowering Farmers.{" "}
            <span className="text-primary">Simplifying Agriculture.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Abhi Agri is an emerging digital agriculture marketplace built with a simple yet powerful vision — to make quality farming products accessible, affordable, and reliable for every farmer across India.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">

        {/* Our Story */}
        <section className="py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Tractor className="size-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Story</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px] sm:text-base">
            <p>
              Abhi Agri was founded with a deep understanding of the real challenges faced by Indian farmers — from lack of access to genuine products to inconsistent pricing and limited technical guidance.
            </p>
            <blockquote className="border-l-4 border-primary/40 pl-5 py-2 italic text-foreground/80 my-6 bg-primary/[0.03] rounded-r-lg">
              "Why should farmers struggle to find the right products at the right price?"
            </blockquote>
            <p>
              With this vision, our founders set out to build a platform that bridges the gap between quality agricultural products and the people who need them the most.
            </p>
            <p>
              Currently in its launch phase, Abhi Agri is committed to building a strong foundation that will transform how agriculture commerce works in India.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="pb-16 sm:pb-20">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-primary/[0.04] border border-primary/10 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Target className="size-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                To empower farmers and agri-businesses across India by providing easy access to high-quality agricultural products, transparent pricing, and reliable services — all in one platform.
              </p>
            </div>
            <div className="rounded-2xl bg-accent/[0.06] border border-accent/15 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                  <Globe className="size-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                To become India's most trusted and farmer-first digital agriculture marketplace, enabling sustainable growth, innovation, and prosperity in the agricultural ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wheat className="size-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What We Offer</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-[15px]">
            At Abhi Agri, we aim to provide a complete range of agricultural solutions, including:
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {offerings.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-[15px]">
            Our goal is to ensure that every customer finds the right product for their farming needs — quickly, easily, and at the best value.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
              <Star className="size-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why Choose Abhi Agri?</h2>
          </div>
          <div className="space-y-3">
            {whyChoose.map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-card)]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Heart className="size-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <div key={v.label} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{v.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="size-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Team</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-[15px]">
            Abhi Agri is led by passionate individuals committed to transforming agriculture:
          </p>
          <p className="text-muted-foreground text-[15px]">
            Our team is led by passionate individuals committed to transforming agriculture. Together, they bring vision, dedication, and a strong commitment to building a platform that truly serves the agricultural community.
          </p>
          <p className="text-muted-foreground mt-6 text-[15px] text-center">
            Together, they bring vision, dedication, and a strong commitment to building a platform that truly serves the agricultural community.
          </p>
        </section>

        {/* CTA */}
        <section className="pb-20 sm:pb-28">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center text-primary-foreground">
            <Rocket className="size-8 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Join Us on This Journey</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto leading-relaxed text-sm sm:text-base mb-6">
              Abhi Agri is more than just a marketplace — it's a step towards a better, smarter, and more connected agricultural future. We are excited to launch soon and serve farmers and agri-businesses across India.
            </p>
            <p className="text-lg sm:text-xl font-bold">
              👉 Grow Better. Farm Smarter. Trust Abhi Agri.
            </p>
            <p className="text-primary-foreground/70 text-sm mt-2">
              Get ready to experience a new way of agriculture shopping.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
