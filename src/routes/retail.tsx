import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { retailProducts as products, categories } from "@/lib/retail-products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { Zap, ShoppingBag } from "lucide-react";
import shivaImg from "@/assets/gods/shiva.png";

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
      <style>{`
        @keyframes divine-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(2%, -1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-divine-pan {
          animation: divine-pan 25s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative rounded-2xl bg-[#1a1412] text-white p-8 md:p-12 shadow-2xl overflow-hidden mb-10 group">
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[center_top_-2rem] bg-no-repeat opacity-50 animate-divine-pan"
          style={{ backgroundImage: `url(${shivaImg})` }}
        />
        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary animate-bounce" style={{ animationDuration: '3s' }} />
            <p className="text-sm font-bold text-primary uppercase tracking-wider">
              Quick Delivery · Next day by 6 PM
            </p>
          </div>
          <h1 className="text-display text-4xl font-semibold mb-2 text-white">Retail Store</h1>
          <p className="text-gray-300">Tap to add. We deliver tomorrow.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-8 relative z-10">
        <aside className="md:sticky md:top-24 self-start">
          <div className="rounded-xl border border-white/40 bg-white/50 backdrop-blur-md overflow-hidden">
            <p className="hidden md:block px-4 py-3 bg-white/60 text-xs font-semibold uppercase tracking-wider">
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
