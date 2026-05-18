import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add, items, setQty } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);

  return (
    <div className={`group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-warm transition ${compact ? "" : ""}`}>
      <div className="aspect-square overflow-hidden bg-gradient-warm">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-3">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <h3 className="mt-0.5 text-sm font-medium leading-snug line-clamp-2">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base font-semibold text-primary">₹{product.price}</p>
          {inCart ? (
            <div className="flex items-center gap-1 text-sm">
              <button onClick={() => setQty(product.id, inCart.qty - 1)} className="h-7 w-7 rounded-md bg-secondary">−</button>
              <span className="w-6 text-center font-medium">{inCart.qty}</span>
              <button onClick={() => setQty(product.id, inCart.qty + 1)} className="h-7 w-7 rounded-md bg-accent text-accent-foreground">+</button>
            </div>
          ) : (
            <button
              onClick={() => add(product.id)}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition"
            >
              <Plus className="h-3.5 w-3.5" /> ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
