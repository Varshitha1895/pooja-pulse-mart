import { createFileRoute, Link } from "@tanstack/react-router";
import { useWholesaleCart } from "@/lib/wholesale-cart";
import { Trash2, ArrowRight, Package, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/wholesale-cart")({
  head: () => ({ meta: [{ title: "Wholesale Quote Cart — Divine Hub" }] }),
  component: WholesaleCartPage,
});

function WholesaleCartPage() {
  const { items, setQty, remove } = useWholesaleCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="flex justify-center mb-10 opacity-70">
          <Package className="h-16 w-16 text-muted-foreground/40" />
        </div>
        <h1 className="text-display text-3xl font-semibold">Your bulk list is empty</h1>
        <p className="mt-2 text-muted-foreground">Add items to request a wholesale quote on WhatsApp.</p>
        <Link
          to="/wholesale"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-semibold"
        >
          View Catalog <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const generateWhatsAppLink = () => {
    let msg = "Hello Divine Hub, I would like a bulk quote for the following items:%0A%0A";
    items.forEach((item, index) => {
      msg += `${index + 1}. ${item.product.name} - ${item.qty} ${item.product.unit || 'units'}%0A`;
    });
    msg += `%0APlease let me know the best wholesale pricing for this order.`;
    return `https://wa.me/919999999999?text=${msg}`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <h1 className="text-display text-4xl font-semibold mb-8">Wholesale Quote Request</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex gap-4 p-4 rounded-xl border border-border bg-card shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-24 w-24 object-cover rounded-lg border border-border"
              />
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => remove(product.id)}
                  className="text-muted-foreground hover:text-destructive p-2 rounded-md hover:bg-destructive/10 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1 text-sm bg-secondary rounded-md p-1">
                  <button
                    onClick={() => setQty(product.id, qty - 1)}
                    className="h-7 w-7 rounded-md bg-background hover:bg-muted transition flex items-center justify-center font-medium shadow-sm"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(product.id, qty + 1)}
                    className="h-7 w-7 rounded-md bg-background hover:bg-muted transition flex items-center justify-center font-medium shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="self-start rounded-xl border border-border bg-card p-6 shadow-sm sticky top-24">
          <h2 className="text-display text-xl font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-accent" /> Quote Summary
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Submit your list via WhatsApp. Our team will review the quantities and provide you with our best bulk pricing.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="font-medium">Total Items</span>
              <span className="font-bold">{items.length} unique products</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="font-medium">Total Quantity</span>
              <span className="font-bold">{items.reduce((acc, item) => acc + item.qty, 0)} units</span>
            </div>
          </div>
          
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:opacity-90 transition shadow-warm"
          >
            <MessageCircle className="h-5 w-5" /> Get Quote on WhatsApp
          </a>
        </aside>
      </div>
    </div>
  );
}

