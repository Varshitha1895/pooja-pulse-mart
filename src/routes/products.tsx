import { createFileRoute } from "@tanstack/react-router";
import { retailProducts as products } from "@/lib/retail-products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Divine Hub" },
      { name: "description", content: "Browse our complete catalog of premium pooja essentials." },
    ],
  }),
  component: AllProducts,
});

function AllProducts() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] animate-pulse pointer-events-none rounded-full" />
      <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold relative z-10">Catalog</p>
      <h1 className="mt-2 text-display text-4xl md:text-5xl font-semibold relative z-10">All Products</h1>
      <p className="mt-3 text-muted-foreground relative z-10">
        {products.length} curated essentials for your daily pooja.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

