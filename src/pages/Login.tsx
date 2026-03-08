import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.webp";
import { toast } from "sonner";

const Login: React.FC = () => {
  const { t } = useLanguage();
  const lp = useLocalizedPath();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Authentication requires backend setup. Enable Lovable Cloud to add real login!");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <div className="container max-w-md py-12 md:py-20">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="AbhiAgri mascot"
                className="h-14 w-14 object-contain rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {isSignUp ? t("login.create_account") : t("login.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? t("login.join") : t("login.welcome")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">{t("login.full_name")}</Label>
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
                  {t("login.forgot_password")}
                </button>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full">
              {isSignUp ? t("login.signup") : t("login.submit")}
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? t("login.already_account") : t("login.no_account")}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-primary hover:underline"
            >
              {isSignUp ? t("login.submit") : t("login.signup")}
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
