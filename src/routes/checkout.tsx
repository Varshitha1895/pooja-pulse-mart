import { createFileRoute, Link, useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { Check, Lock } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Divine Purity" }] }),
  component: Checkout,
});

function Checkout() {
  const { user } = useAuth();
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<"upi" | "card" | "cod">("upi");
  const [done, setDone] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <p>Your cart is empty.</p>
        <Link to="/retail" className="mt-4 inline-block text-primary underline">
          Shop now
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-accent/15 grid place-items-center">
          <Check className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mt-6 text-display text-3xl font-semibold">Order placed 🙏</h1>
        <p className="mt-2 text-muted-foreground">
          A simulated order has been created. We'll deliver by 6 PM tomorrow.
        </p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-8 px-6 py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold"
        >
          Back home
        </button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      clear();
      setDone(true);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <h1 className="text-display text-4xl font-semibold mb-8">Checkout</h1>
      <form onSubmit={onSubmit} className="grid md:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-display text-xl font-semibold mb-4">Delivery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Full name"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
              <input
                required
                placeholder="Phone"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
              <input
                required
                placeholder="Address"
                className="sm:col-span-2 px-3 py-2.5 rounded-md border border-input bg-background"
              />
              <input
                required
                placeholder="City"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
              <input
                required
                placeholder="Pincode"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-display text-xl font-semibold mb-4">Payment</h2>
            <div className="grid grid-cols-3 gap-2">
              {(["upi", "card", "cod"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPay(m)}
                  className={`py-3 rounded-md border text-sm font-medium uppercase transition ${pay === m ? "border-accent bg-accent/10 text-accent" : "border-input hover:bg-secondary"}`}
                >
                  {m}
                </button>
              ))}
            </div>
            
            <div className="mt-4">
              {pay === "upi" && (
                <input
                  type="text"
                  required
                  placeholder="Enter UPI ID (e.g., yourname@okbank)"
                  className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
                />
              )}
              {pay === "card" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVV"
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
                    />
                  </div>
                </div>
              )}
              {pay === "cod" && (
                <p className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">
                  Pay with cash when your order arrives.
                </p>
              )}
            </div>

            <p className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-1">
              <Lock className="h-3 w-3" /> Simulated checkout — no real payment is taken.
            </p>
          </section>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 self-start sticky top-24">
          <h2 className="text-display text-xl font-semibold">Order</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-2">
                <span className="truncate">
                  {product.name} × {qty}
                </span>
                <span>₹{qty * product.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
          <button
            type="submit"
            className="mt-5 w-full py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold"
          >
            Place Order
          </button>
        </aside>
      </form>
    </div>
  );
}
