import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Leaf, Sparkles } from "lucide-react";
import heroImg from "@/assets/about-hero.png";
import sourcingImg from "@/assets/about-sourcing.png";
import purityImg from "@/assets/about-purity.png";
import packagingImg from "@/assets/about-packaging.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Divine Purity" },
      {
        name: "description",
        content: "Discover the legacy of devotion and our sacred process at Divine Purity.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Ornate Diya in Temple"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center flex flex-col items-center">
          <span className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Legacy of Devotion
          </span>
          <h1 className="text-white text-display text-5xl md:text-7xl font-bold mb-6">
            Our Story
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
      </section>

      {/* Bridging Tradition and Modernity */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6 font-display">
          Bridging Tradition and Modernity
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          At PoojaVaibhava, we believe that the purity of one's ritual tools directly reflects the sincerity of their devotion. Our journey began with a simple observation: the sacred rituals that ground us were being served by mass-produced, diluted materials. We committed ourselves to sourcing only the most authentic, Vedic-grade elements—from the heart of Mysore's sandalwood forests to the most pristine Goshala ghee—ensuring that every ritual you perform is supported by professional reliability and ancient purity.
        </p>
      </section>

      {/* The Sacred Process */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent font-display">
              The Sacred Process
            </h2>
            <p className="text-muted-foreground mt-2">Crafting excellence from source to shrine</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Row Grid */}
            <div className="grid md:grid-cols-5 gap-6">
              
              {/* 01. Sourcing (Spans 3 cols) */}
              <div className="md:col-span-3 bg-card border border-border rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-sm">
                <div className="p-8 md:p-10 flex flex-col justify-center w-full sm:w-1/2 shrink-0">
                  <span className="text-accent font-bold text-lg mb-1">01. Sourcing</span>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Authentic Origins</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We travel to the origins. Whether it is sourcing aged Mysore Sandalwood or hand-rolled incense from traditional artisans, our materials are selected for their ritual potency and ethical footprints.
                  </p>
                </div>
                <div className="w-full sm:w-1/2 p-6 sm:pl-0">
                  <div className="w-full h-[250px] sm:h-full min-h-[250px] rounded-lg overflow-hidden relative shadow-md">
                    <img src={sourcingImg} alt="Sourcing Sandalwood" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* 02. Purity (Spans 2 cols) */}
              <div className="md:col-span-2 bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
                <div className="w-full h-[250px] p-6 pb-0">
                   <div className="w-full h-full rounded-t-lg overflow-hidden relative shadow-md">
                      <img src={purityImg} alt="Purity Ghee" className="absolute inset-0 w-full h-full object-cover" />
                   </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-end">
                  <span className="text-accent font-bold text-lg mb-1">02. Purity</span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Vedic Standard Checks</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every batch of Ghee and Samagri undergoes rigorous purity checks to ensure no adulterants touch your sacred space.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Row - 03. Packaging (Full Width) */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm">
              <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-[40%] shrink-0">
                <span className="text-accent font-bold text-lg mb-1">03. Packaging</span>
                <h3 className="text-2xl font-bold text-foreground mb-4">Professional Reliability</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our packaging is designed to preserve freshness and sanctity, using eco-friendly materials that respect the earth while providing modern convenience.
                </p>
              </div>
              <div className="w-full md:w-[60%] p-6 md:pl-0">
                <div className="w-full h-[250px] md:h-full min-h-[300px] rounded-lg overflow-hidden relative shadow-md">
                  <img src={packagingImg} alt="Elegant Packaging" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values/Icons Grid */}
      <section className="bg-[#FFFDF9] py-20 border-t border-border/50">
        <div className="mx-auto max-w-5xl px-4 md:px-8 grid sm:grid-cols-3 gap-12 text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">Purity Guaranteed</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
              We lab-test all consumables to ensure they meet the highest Vedic standards for your rituals.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
              <Leaf className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">Ethically Sourced</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
              Fair wages and sustainable harvesting practices for all our forest-derived ingredients.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">Modern Convenience</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
              A seamless digital experience to help you focus on your devotion, not the logistics.
            </p>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-accent to-orange-400 py-16 md:py-24 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 font-display shadow-sm">
            Ready to elevate your devotion?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/retail"
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#664100] hover:bg-[#4d3100] text-white font-bold tracking-wider uppercase text-sm transition shadow-lg text-center block"
            >
              Explore Our Collection
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#10C35B] hover:bg-[#0da64d] text-white font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WHATSAPP FOR CUSTOM ORDERS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
