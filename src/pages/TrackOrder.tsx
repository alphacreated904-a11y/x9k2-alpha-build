import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { PackageSearch, ArrowRight } from "lucide-react";


const TrackOrder: React.FC = () => {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setSearched(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <div className="container max-w-lg py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <PackageSearch className="size-10 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">{t("track.title")}</h1>
        <p className="text-muted-foreground mb-8">
          Enter your order ID to see the latest status and delivery updates.
        </p>

        <form onSubmit={handleTrack} className="flex gap-3 max-w-sm mx-auto">
          <Input
            value={orderId}
            onChange={(e) => { setOrderId(e.target.value); setSearched(false); }}
            placeholder="e.g. ORD-LX1ABC23"
            className="flex-1"
            required
          />
          <Button type="submit" variant="default">
            {t("track.button")}
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </form>

        {searched && (
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <PackageSearch className="size-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{orderId}</p>
                <p className="text-xs text-muted-foreground">Estimated delivery: 3-5 business days</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0 ml-2">
              {[
                { label: "Order Placed", time: "Just now", active: true },
                { label: "Processing", time: "Pending", active: false },
                { label: "Shipped", time: "Pending", active: false },
                { label: "Delivered", time: "Pending", active: false },
              ].map((step, i) => (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full border-2 ${step.active ? "bg-primary border-primary" : "bg-background border-border"}`} />
                    {i < 3 && <div className="w-0.5 h-8 bg-border" />}
                  </div>
                  <div className="-mt-0.5">
                    <p className={`text-sm font-medium ${step.active ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrder;
