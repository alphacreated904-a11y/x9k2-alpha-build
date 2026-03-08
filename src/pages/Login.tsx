import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import logoImg from "@/assets/logo.webp";

const Login: React.FC = () => {
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — real auth requires Lovable Cloud
    toast.info("Authentication requires backend setup. Enable Lovable Cloud to add real login!");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <div className="container max-w-md py-12 md:py-20">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="size-7 text-primary" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {isSignUp ? "Create your AbhiAgri account" : t("login.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? "Join thousands of farmers across India" : "Welcome back! Enter your details"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Abhishek Sharma" required />
              </div>
            )}

            <div>
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>

            <div>
              <Label htmlFor="password">{t("login.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full">
              {isSignUp ? t("login.signup") : t("login.submit")}
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : t("login.no_account")}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-primary hover:underline"
            >
              {isSignUp ? t("login.submit") : t("login.signup")}
            </button>
          </p>
        </div>
      </div>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="AbhiAgri" className="size-8 object-contain" />
            <span className="font-semibold text-foreground">AbhiAgri</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 AbhiAgri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
