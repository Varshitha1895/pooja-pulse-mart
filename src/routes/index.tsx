import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, Truck, ShieldCheck, Zap, ChevronRight, Package } from "lucide-react";
import hero from "@/assets/hero-pooja.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divine Purity — Premium Pooja Essentials" },
      { name: "description", content: "Curated premium essentials for your daily spiritual practice. Wholesale & retail with next-day delivery." },
    ],
  }),
  component: Home,
});

function Home() {
  const scroller = useRef<HTMLDivElement>(null);
  const featured = products.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur border border-accent/40 text-cream text-xs uppercase tracking-[0.2em]">
            Hybrid B2B & B2C Platform
          </span>
          <h1 className="mt-6 text-display text-5xl md:text-7xl font-semibold text-cream leading-tight">
            Experience <em className="text-accent not-italic">Divine Purity</em> in Every Ritual
          </h1>
          <p className="mt-5 text-lg text-cream/85 max-w-2xl mx-auto">
            Curated premium essentials for your daily spiritual practice.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/retail" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-gradient-gold text-primary-foreground font-semibold tracking-wide shadow-warm hover:shadow-glow transition">
              EXPLORE RETAIL <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/wholesale" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border-2 border-cream/80 text-cream font-semibold tracking-wide hover:bg-cream hover:text-foreground transition">
              BULK ORDERS
            </Link>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 text-sm font-medium">
          <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" /> Orders delivered next day by 6 PM</span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> No returns after delivery</span>
        </div>
      </section>

      {/* SPLIT CARDS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Two ways to shop</p>
          <h2 className="mt-3 text-display text-4xl md:text-5xl font-semibold">Built for Households & Businesses</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Wholesale */}
          <div className="rounded-2xl border border-border bg-card p-10 md:p-14 shadow-warm flex flex-col items-start">
            <div className="h-14 w-14 rounded-full bg-primary/10 grid place-items-center">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-5 text-display text-3xl md:text-4xl font-semibold">Wholesale</h3>
            <p className="mt-3 text-muted-foreground text-lg">Bulk solutions for temples and retailers.</p>
            <Link to="/wholesale" className="mt-auto pt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold tracking-wide hover:opacity-90 transition">
              ENTER WHOLESALE STORE <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Retail */}
          <div className="rounded-2xl border border-border bg-gradient-gold text-primary-foreground p-10 md:p-14 shadow-warm flex flex-col items-start">
            <div className="h-14 w-14 rounded-full bg-white/20 grid place-items-center backdrop-blur">
              <Zap className="h-7 w-7 fill-current" />
            </div>
            <h3 className="mt-5 text-display text-3xl md:text-4xl font-semibold">Retail</h3>
            <p className="mt-3 text-primary-foreground/90 text-lg">Quick delivery for your home pooja needs.</p>
            <Link to="/retail" className="mt-auto pt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-semibold tracking-wide hover:opacity-90 transition">
              SHOP RETAIL NOW <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Bestsellers</p>
            <h2 className="mt-2 text-display text-3xl md:text-4xl font-semibold">Featured Agarbathis & More</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div ref={scroller} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x">
          {featured.map((p) => (
            <div key={p.id} className="snap-start shrink-0 w-[210px] md:w-[240px] rounded-xl overflow-hidden border border-border bg-card">
              <div className="aspect-square overflow-hidden bg-gradient-warm">
                <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
            </div>
          ))}
          <Link to="/products" className="snap-start shrink-0 w-[210px] md:w-[240px] rounded-xl border-2 border-dashed border-primary/40 grid place-items-center hover:bg-primary/5 transition">
            <div className="text-center px-4">
              <p className="text-display text-2xl font-semibold text-primary">View All</p>
              <p className="text-xs text-muted-foreground mt-1">Browse 20+ products</p>
              <ArrowRight className="mx-auto mt-3 h-5 w-5 text-primary" />
            </div>
          </Link>
        </div>
        <Link to="/products" className="md:hidden mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View All <ChevronRight className="h-4 w-4" /></Link>
      </section>
    </>
  );
}
