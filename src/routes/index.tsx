import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, Truck, ShieldCheck, Zap, ChevronRight, Package } from "lucide-react";
import hero from "@/assets/hero-pooja.jpg";
import muralBgRealistic from "@/assets/rama-sita-realistic.png";
import { DivinePetals } from "@/components/site/DivinePetals";
import { retailProducts as staticProducts } from "@/lib/retail-products";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import ganeshaImg from "@/assets/gods/ganesha.png";
import krishnaImg from "@/assets/gods/krishna.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divine Hub — Premium Pooja Essentials" },
      {
        name: "description",
        content:
          "Curated premium essentials for your daily spiritual practice. Wholesale & retail with next-day delivery.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const scroller = useRef<HTMLDivElement>(null);
  const [featured, setFeatured] = useState<Product[]>(staticProducts.slice(0, 8));

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedProducts: Product[] = data.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: Number(p.price),
            image: p.image_url,
            catalog: p.catalog || 'retail',
            description: p.description || '',
            unit: p.unit || '1 pack'
          })).filter(p => p.catalog === 'retail' || p.catalog === 'both');
          
          if (formattedProducts.length > 0) {
            setFeatured(formattedProducts.slice(0, 8));
          }
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="relative mt-6 inline-block">

            <h1 className="text-display text-5xl md:text-7xl font-semibold text-cream leading-tight">
              Experience <em className="text-accent not-italic">Divine Hub</em> in Every Ritual
            </h1>
          </div>
          <p className="mt-5 text-lg text-cream/85 max-w-2xl mx-auto">
            Curated premium essentials for your daily spiritual practice.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/retail"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-gradient-gold text-primary-foreground font-semibold tracking-wide shadow-warm hover:shadow-glow transition"
            >
              EXPLORE RETAIL <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/wholesale"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border-2 border-cream/80 text-cream font-semibold tracking-wide hover:bg-cream hover:text-foreground transition"
            >
              BULK ORDERS
            </Link>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4" /> Orders delivered next day by 6 PM
          </span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> No returns after delivery
          </span>
        </div>
      </section>

      {/* DIVINE MURAL BACKGROUND WRAPPER - SINGLE FIXED BACKGROUND */}
      <div 
        className="relative"
        style={{
          backgroundImage: `url(${muralBgRealistic})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Divine Falling Petals Effect */}
        <DivinePetals count={40} />
        
        {/* Subtle Overlay - Reduced opacity to 60 for better visibility */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] pointer-events-none" />
        
        {/* SPLIT CARDS - REDESIGNED */}
        <section className="relative px-4 md:px-8 py-24 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs uppercase tracking-[0.3em] mb-4 font-semibold">
              Two ways to shop
            </span>
            <h2 className="mt-3 text-display text-4xl md:text-6xl font-bold text-foreground">
              Built for Households & Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
          {/* Wholesale */}
          <div className="group/revealcard relative rounded-2xl border border-border bg-card p-10 md:p-14 shadow-warm flex flex-col items-start overflow-hidden transition-all duration-500 hover:shadow-glow">
            {/* Background Reveal */}
            <div 
              className="absolute -right-10 -bottom-10 w-72 h-72 z-0 bg-no-repeat bg-right-bottom bg-contain opacity-0 group-hover/revealcard:opacity-10 transition-opacity duration-1000 ease-out" 
              style={{ backgroundImage: `url(${krishnaImg})` }} 
            />
            <div className="relative z-10 flex flex-col items-start h-full w-full">
              <div className="h-14 w-14 rounded-full bg-primary/10 grid place-items-center group-hover/revealcard:-translate-y-1 transition-transform duration-300">
                <Package className="h-7 w-7 text-primary group-hover/revealcard:animate-pulse" />
              </div>
              <h3 className="mt-5 text-display text-3xl md:text-4xl font-semibold">Wholesale</h3>
              <p className="mt-3 text-muted-foreground text-lg">
                Bulk solutions for temples and retailers.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  to="/wholesale"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold tracking-wide hover:opacity-90 transition"
                >
                  ENTER WHOLESALE STORE <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Retail */}
          <div className="group/revealcard relative rounded-2xl border border-border bg-gradient-gold text-primary-foreground p-10 md:p-14 shadow-warm flex flex-col items-start overflow-hidden transition-all duration-500 hover:shadow-glow">
            {/* Background Reveal */}
            <div 
              className="absolute -right-10 -bottom-10 w-72 h-72 z-0 bg-no-repeat bg-right-bottom bg-contain opacity-0 group-hover/revealcard:opacity-20 mix-blend-overlay transition-opacity duration-1000 ease-out" 
              style={{ backgroundImage: `url(${ganeshaImg})` }} 
            />
            <div className="relative z-10 flex flex-col items-start h-full w-full">
              <div className="h-14 w-14 rounded-full bg-white/20 grid place-items-center backdrop-blur group-hover/revealcard:-translate-y-1 transition-transform duration-300">
                <Zap className="h-7 w-7 fill-current group-hover/revealcard:animate-pulse" />
              </div>
              <h3 className="mt-5 text-display text-3xl md:text-4xl font-semibold">Retail</h3>
              <p className="mt-3 text-primary-foreground/90 text-lg">
                Quick delivery for your home pooja needs.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  to="/retail"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-foreground text-background font-semibold tracking-wide hover:opacity-90 transition"
                >
                  SHOP RETAIL NOW <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          </div>
          </div>
        </section>

        {/* PRODUCT PREVIEW - REDESIGNED */}
        <section className="relative mx-auto max-w-7xl px-4 md:px-8 py-20 z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-2">
              Bestsellers
            </p>
            <h2 className="text-display text-4xl md:text-5xl font-bold">
              Featured Agarbathis & More
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-300 shadow-sm"
          >
            View All Collection <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        {/* Carousel Container */}
        <div className="relative group">
          <div
            ref={scroller}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-10 -mx-4 px-4 md:px-12 snap-x"
          >
            {featured.map((p) => (
              <Link
                to={`/retail`}
                key={p.id}
                className="group/card snap-center shrink-0 w-[260px] md:w-[320px] rounded-3xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 relative flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-[320px] w-full overflow-hidden bg-muted/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-in-out mix-blend-multiply"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm">
                       {p.category}
                     </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 bg-card relative z-10 transform transition-transform duration-500 group-hover/card:-translate-y-2">
                  <h3 className="text-xl font-bold font-display text-foreground leading-tight line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">₹{p.price}</p>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Shop Now <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* View All Card */}
            <Link
              to="/products"
              className="snap-center shrink-0 w-[260px] md:w-[320px] rounded-3xl border-2 border-dashed border-primary/30 grid place-items-center hover:bg-primary/5 hover:border-primary transition-all duration-500 group/viewall"
            >
              <div className="text-center px-6">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 grid place-items-center mb-6 group-hover/viewall:scale-110 transition-transform duration-500">
                  <ArrowRight className="h-8 w-8 text-primary group-hover/viewall:translate-x-1 transition-transform" />
                </div>
                <p className="text-display text-3xl font-bold text-foreground">View All</p>
                <p className="text-sm font-medium text-muted-foreground mt-2">Explore our full catalog</p>
              </div>
            </Link>
          </div>
        </div>
        <Link
          to="/products"
          className="md:hidden mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
        </section>
      </div> {/* END DIVINE MURAL WRAPPER */}
    </>
  );
}

