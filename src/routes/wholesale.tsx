import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Package, Loader2 } from "lucide-react";
import { useWholesaleCart } from "@/lib/wholesale-cart";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import shivaImg from "@/assets/gods/shiva.png";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Store — Divine Hub" },
      {
        name: "description",
        content: "Bulk pricing for temples and retailers. Chat on WhatsApp for custom quotes.",
      },
    ],
  }),
  component: Wholesale,
});

const wa = (name: string) =>
  `https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'd like a bulk quote for: ${name}`)}`;

function Wholesale() {
  const { count } = useWholesaleCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        
        const formattedProducts: Product[] = (data || []).map(p => {
          const rawCat = p.category || '';
          const isWholesale = rawCat.toLowerCase().startsWith('[wholesale]');
          const isRetail = rawCat.toLowerCase().startsWith('[retail]');
          const parsedCatalog = (isWholesale ? 'wholesale' : isRetail ? 'retail' : 'retail') as 'retail' | 'wholesale' | 'both';
          const cleanCategory = rawCat.replace(/\[.*?\]\s*/, '');
          
          return {
            id: p.id,
            name: p.name,
            category: cleanCategory,
            price: Number(p.price),
            image: p.image_url,
            catalog: parsedCatalog,
            unit: p.unit || '1 pack'
          };
        }).filter(p => p.catalog === 'wholesale' || p.catalog === 'both');
        
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching wholesale products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <style>{`
        @keyframes divine-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-2%, 1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-divine-pan {
          animation: divine-pan 25s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative rounded-2xl bg-[#1a1412] text-white p-8 md:p-12 shadow-2xl overflow-hidden group">
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[center_top_-2rem] bg-no-repeat opacity-50 animate-divine-pan"
          style={{ backgroundImage: `url(${shivaImg})` }}
        />
        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold opacity-90 text-primary">Wholesale</p>
          <h1 className="mt-3 text-display text-4xl md:text-5xl font-semibold">
            Bulk Orders. Better Pricing.
          </h1>
          <p className="mt-3 max-w-2xl opacity-95">
            Chat with us directly on WhatsApp to negotiate the perfect quote for your temple, store or
            event.
          </p>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-2 mb-6">
        <Package className="h-5 w-5 text-primary animate-pulse" />
        <h2 className="text-display text-2xl font-semibold">Catalog</h2>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Loading wholesale catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
          No wholesale products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-white/40 bg-white/50 backdrop-blur-md overflow-hidden hover:shadow-warm transition flex flex-col group"
            >
              <div className="aspect-square bg-gradient-warm overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-end">
                <Link
                  to={`/product/$productId`}
                  params={{ productId: p.id }}
                  search={{ type: 'wholesale' }}
                  className="mt-4 inline-flex items-center justify-center w-full bg-secondary text-foreground font-semibold py-2.5 rounded-md hover:bg-secondary/80 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {count > 0 && (
        <Link
          to="/wholesale-cart"
          className="fixed bottom-24 right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-foreground text-background shadow-warm font-semibold"
        >
          <Package className="h-5 w-5" />
          <span>{count} items</span>
          <span className="opacity-80">·</span>
          <span>View Wholesale Cart</span>
        </Link>
      )}
    </div>
  );
}

