import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Divine Purity" },
      { name: "description", content: "Curating premium pooja essentials with devotion since 2015." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8 py-16">
      <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Our Story</p>
      <h1 className="mt-3 text-display text-5xl font-semibold">Crafted with devotion. Delivered with care.</h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        Divine Purity began with a simple promise — to make the finest pooja essentials accessible to every home and temple in India. From hand-rolled agarbathis to brass diyas crafted by artisans in Tamil Nadu, every product passes our purity standard before reaching your shelf.
      </p>

      <div className="mt-12 grid sm:grid-cols-3 gap-5">
        {[
          { i: Sparkles, t: "100% Authentic", d: "Sourced directly from trusted artisans and certified suppliers." },
          { i: Heart, t: "Made with Bhakti", d: "Every batch is blessed before it leaves our facility." },
          { i: Users, t: "Trusted by Thousands", d: "500+ retailers and 50,000+ households across India." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card p-6">
            <Icon className="h-8 w-8 text-accent" />
            <h3 className="mt-3 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
