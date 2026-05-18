import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { Zap, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/retail")({
  head: () => ({
    meta: [
      { title: "Retail Store — Divine Purity" },
      { name: "description", content: "Fast Zepto-style shopping for pooja essentials. Next-day delivery." },
    ],
  }),
  component: Retail,
});

function Retail() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? products : products.filter((p) => p.category === active);
  const { count, total } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-accent" />
        <p className="text-sm font-semibold text-accent uppercase tracking-wider">Quick Delivery · Next day by 6 PM</p>
      </div>
      <h1 className="text-display text-4xl font-semibold mb-2">Retail Store</h1>
      <p className="text-muted-foreground mb-8">Tap to add. We deliver tomorrow.</p>

      <div className="grid grid-cols-[170px_1fr] md:grid-cols-[220px_1fr] gap-4 md:gap-8">
        <aside className="sticky top-24 self-start">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <p className="px-4 py-3 bg-secondary text-xs font-semibold uppercase tracking-wider">Categories</p>
            <ul className="text-sm">
              {["All", ...categories].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setActive(c)}
                    className={`w-full text-left px-4 py-2.5 border-t border-border transition ${active === c ? "bg-accent/10 text-accent font-semibold border-l-2 border-l-accent" : "hover:bg-secondary"}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>

      {count > 0 && (
        <Link to="/checkout" className="fixed bottom-24 right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-gold text-primary-foreground shadow-warm font-semibold">
          <ShoppingBag className="h-5 w-5" />
          <span>{count} items</span>
          <span className="opacity-80">·</span>
          <span>₹{total}</span>
          <span className="ml-1 opacity-90">→ Checkout</span>
        </Link>
      )}
    </div>
  );
}
