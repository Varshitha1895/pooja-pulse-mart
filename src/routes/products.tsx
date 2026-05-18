import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Divine Purity" },
      { name: "description", content: "Browse our complete catalog of premium pooja essentials." },
    ],
  }),
  component: AllProducts,
});

function AllProducts() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Catalog</p>
      <h1 className="mt-2 text-display text-4xl md:text-5xl font-semibold">All Products</h1>
      <p className="mt-3 text-muted-foreground">{products.length} curated essentials for your daily pooja.</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
