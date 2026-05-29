import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { retailProducts as products, categories } from "@/lib/retail-products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { Zap, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/retail")({
  head: () => ({
    meta: [
      { title: "Retail Store — Divine Purity" },
      {
        name: "description",
        content: "Fast Zepto-style shopping for pooja essentials. Next-day delivery.",
      },
    ],
  }),
  component: Retail,
});

function Retail() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? products : products.filter((p) => p.category === active);
  const { count, total } = useCart();

  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-8">
      <div className="absolute top-10 left-10 w-48 h-48 bg-primary/5 blur-[80px] animate-pulse pointer-events-none rounded-full" />
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Zap className="h-5 w-5 text-accent animate-bounce" style={{ animationDuration: '3s' }} />
        <p className="text-sm font-semibold text-accent uppercase tracking-wider">
          Quick Delivery · Next day by 6 PM
        </p>
      </div>
      <h1 className="text-display text-4xl font-semibold mb-2 relative z-10">Retail Store</h1>
      <p className="text-muted-foreground mb-8 relative z-10">Tap to add. We deliver tomorrow.</p>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-8 relative z-10">
        <aside className="md:sticky md:top-24 self-start">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <p className="hidden md:block px-4 py-3 bg-secondary text-xs font-semibold uppercase tracking-wider">
              Categories
            </p>
            <ul className="text-sm flex md:flex-col overflow-x-auto scrollbar-hide">
              {["All", ...categories].map((c) => (
                <li key={c} className="shrink-0">
                  <button
                    onClick={() => setActive(c)}
                    className={`w-full text-center md:text-left px-4 py-3 md:py-2.5 border-r md:border-r-0 md:border-t border-border transition whitespace-nowrap ${active === c ? "bg-accent/10 text-accent font-semibold md:border-l-2 md:border-l-accent border-b-2 border-b-accent md:border-b-0" : "hover:bg-secondary"}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {count > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-24 right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-gold text-primary-foreground shadow-warm font-semibold"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>{count} items</span>
          <span className="opacity-80">·</span>
          <span>₹{total}</span>
          <span className="ml-1 opacity-90">→ Cart</span>
        </Link>
      )}
    </div>
  );
}
