import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { retailProducts as products } from "@/lib/retail-products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { Zap, ShoppingBag, Search } from "lucide-react";
import shivaImg from "@/assets/gods/shiva.png";

export const Route = createFileRoute("/retail")({
  head: () => ({
    meta: [
      { title: "Retail Store — Divine Hub" },
      {
        name: "description",
        content: "Fast Zepto-style shopping for pooja essentials. Next-day delivery.",
      },
    ],
  }),
  component: Retail,
});

function Retail() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const list = searchQuery.trim() === "" 
    ? products 
    : products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
      
      <div className="relative rounded-2xl bg-[#1a1412] text-white p-8 md:p-12 shadow-2xl overflow-hidden mb-8 group">
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[center_top_-2rem] bg-no-repeat opacity-50 animate-divine-pan"
          style={{ backgroundImage: \`url(\${shivaImg})\` }}
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

      <div className="relative z-10 mb-8 max-w-2xl mx-auto">
        <div className="relative shadow-sm rounded-full overflow-hidden border border-border bg-white/50 backdrop-blur-md">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-primary/70" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-6 py-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:bg-white/80 transition"
            placeholder="Search for pooja items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="relative z-10">
        <section>
          {list.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
              No products found matching "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
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
