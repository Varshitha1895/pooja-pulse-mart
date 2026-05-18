import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { MessageCircle, Package } from "lucide-react";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Store — Divine Purity" },
      { name: "description", content: "Bulk pricing for temples and retailers. Chat on WhatsApp for custom quotes." },
    ],
  }),
  component: Wholesale,
});

const wa = (name: string) =>
  `https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'd like a bulk quote for: ${name}`)}`;

function Wholesale() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="rounded-2xl bg-gradient-gold text-primary-foreground p-8 md:p-12 shadow-warm">
        <p className="uppercase tracking-[0.3em] text-xs font-semibold opacity-90">Wholesale</p>
        <h1 className="mt-3 text-display text-4xl md:text-5xl font-semibold">Bulk Orders. Better Pricing.</h1>
        <p className="mt-3 max-w-2xl opacity-95">Tiered rates for 10+ units. Chat with us directly on WhatsApp to negotiate the perfect quote for your temple, store or event.</p>
        <div className="mt-6 grid grid-cols-3 max-w-md gap-3 text-center text-sm">
          {[["10+", "₹250/pc"], ["50+", "₹210/pc"], ["100+", "₹185/pc"]].map(([q, p]) => (
            <div key={q} className="bg-white/15 backdrop-blur rounded-lg py-3"><p className="text-2xl font-bold">{q}</p>{p}</div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center gap-2 mb-6">
        <Package className="h-5 w-5 text-primary" />
        <h2 className="text-display text-2xl font-semibold">Catalog</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-warm transition flex flex-col">
            <div className="aspect-[4/3] bg-gradient-warm overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.category}</p>
              <h3 className="mt-1 text-lg font-semibold leading-snug">{p.name}</h3>
              <div className="mt-3 grid grid-cols-3 gap-1 text-xs text-center bg-secondary rounded-md p-2">
                <div><p className="font-semibold text-primary">₹{p.price}</p>1-10</div>
                <div><p className="font-semibold text-primary">₹{Math.round(p.price * 0.84)}</p>11-50</div>
                <div><p className="font-semibold text-primary">₹{Math.round(p.price * 0.74)}</p>50+</div>
              </div>
              <a
                href={wa(p.name)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold py-2.5 rounded-md hover:opacity-90 transition"
              >
                <MessageCircle className="h-4 w-4" /> Chat with Us on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
