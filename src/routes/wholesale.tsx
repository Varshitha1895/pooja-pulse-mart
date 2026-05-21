import { createFileRoute, Link } from "@tanstack/react-router";
import { wholesaleProducts as products } from "@/lib/products";
import { Package } from "lucide-react";
import { useWholesaleCart } from "@/lib/wholesale-cart";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Store — Divine Purity" },
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

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="relative rounded-2xl bg-gradient-gold text-primary-foreground p-8 md:p-12 shadow-warm overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] animate-pulse pointer-events-none rounded-full" />
        <div className="relative z-10">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold opacity-90">Wholesale</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-warm transition flex flex-col group"
          >
            <div className="aspect-[4/3] bg-gradient-warm overflow-hidden relative">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {p.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold leading-snug flex-1">{p.name}</h3>
              <Link
                to={`/product/$productId`}
                params={{ productId: p.id }}
                search={{ type: 'wholesale' }}
                className="mt-4 inline-flex items-center justify-center w-full bg-secondary text-foreground font-semibold py-2.5 rounded-md hover:bg-secondary/80 transition"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>

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
