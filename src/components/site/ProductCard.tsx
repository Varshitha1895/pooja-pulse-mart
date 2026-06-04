import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProductCard({ product, compact = false, isWholesale = false }: { product: Product; compact?: boolean, isWholesale?: boolean }) {
  const { add, items, setQty } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);

  const inner = (
    <>
      <div className="aspect-square overflow-hidden bg-gradient-warm relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>
      <div className="p-3">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-0.5 text-sm font-medium leading-snug line-clamp-2">{product.name}</h3>
        {product.unit && product.unit !== 'item' && (
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">{product.unit}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          {!isWholesale && <p className="text-base font-semibold text-primary">₹{product.price}</p>}
          {isWholesale && <p className="text-sm font-medium text-muted-foreground mt-1 text-center w-full bg-secondary py-1 rounded-md">View Details</p>}
          
          {!isWholesale && (
            inCart ? (
              <div className="flex items-center gap-1 text-sm">
                <button
                  onClick={(e) => { e.preventDefault(); setQty(product.id, inCart.qty - 1); }}
                  className="h-7 w-7 rounded-md bg-secondary"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">{inCart.qty}</span>
                <button
                  onClick={(e) => { e.preventDefault(); setQty(product.id, inCart.qty + 1); }}
                  className="h-7 w-7 rounded-md bg-accent text-accent-foreground"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.preventDefault(); add(product.id); }}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition"
              >
                <Plus className="h-3.5 w-3.5" /> ADD
              </button>
            )
          )}
        </div>
      </div>
    </>
  );

  if (isWholesale) {
    return (
      <Link 
        to={`/product/$productId`} 
        params={{ productId: product.id }} 
        search={{ type: 'wholesale' }}
        className={`group relative rounded-xl border border-white/40 bg-white/50 backdrop-blur-md overflow-hidden hover:shadow-warm hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 block`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      className={`group relative rounded-xl border border-white/40 bg-white/50 backdrop-blur-md overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(255,165,0,0.2)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 ${compact ? "" : ""}`}
    >
      {inner}
    </div>
  );
}
