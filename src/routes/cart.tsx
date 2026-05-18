import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Divine Purity" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40" />
        <h1 className="mt-6 text-display text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start with our retail bestsellers.</p>
        <Link to="/retail" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold">Shop Retail <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <h1 className="text-display text-4xl font-semibold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-3">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
              <img src={product.image} alt={product.name} className="h-20 w-20 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-primary font-semibold mt-1">₹{product.price}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                <div className="flex items-center gap-1 text-sm">
                  <button onClick={() => setQty(product.id, qty - 1)} className="h-7 w-7 rounded-md bg-secondary">−</button>
                  <span className="w-6 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(product.id, qty + 1)} className="h-7 w-7 rounded-md bg-accent text-accent-foreground">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="self-start rounded-xl border border-border bg-card p-6 sticky top-24">
          <h2 className="text-display text-xl font-semibold">Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>Free</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between font-semibold text-lg">
            <span>Total</span><span className="text-primary">₹{total}</span>
          </div>
          <Link to="/checkout" className="mt-6 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold">
            Checkout <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
