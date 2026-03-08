import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart, formatINR } from "@/contexts/CartContext";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    setOrderComplete(true);
    clearCart();
    toast.success("Order placed successfully!");
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <div className="container py-16 max-w-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-10 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. Your order ID is <span className="font-semibold text-foreground">{orderId}</span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            We've sent a confirmation email to <span className="font-medium">{form.email}</span>
          </p>
          <Button variant="default" onClick={() => navigate("/collection")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to proceed with checkout</p>
          <Button variant="default" onClick={() => navigate("/collection")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <div className="container py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address, apartment, etc."
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="110001"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Payment</h2>
              <div className="rounded-xl border border-border p-4 bg-secondary/30">
                <p className="text-sm text-muted-foreground">
                  💳 <span className="font-medium text-foreground">Cash on Delivery (COD)</span> — Pay when your order arrives.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Online payment options coming soon!
                </p>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Place Order — ${formatINR(grandTotal)}`}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.unit}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-secondary"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × {formatINR(item.price)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatINR(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatINR(shipping)}
                  </span>
                </div>
                {totalPrice <= 500 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders above ₹500
                  </p>
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
