import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/site/ProductCard";
import { Loader2 } from "lucide-react";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        const formattedProducts: Product[] = (data || []).map(p => {
          const rawCat = p.category || '';
          const isW = rawCat.toLowerCase().startsWith('[wholesale]');
          const isR = rawCat.toLowerCase().startsWith('[retail]');
          const parsedCatalog = (isW ? 'wholesale' : isR ? 'retail' : 'retail') as 'retail' | 'wholesale' | 'both';
          const cleanCategory = rawCat.replace(/\[.*?\]\s*/, '');
          
          return {
            id: p.id,
            name: p.name,
            category: cleanCategory,
            price: Number(p.price),
            image: p.image_url,
            catalog: parsedCatalog,
            unit: p.unit || '1 pack'
          };
        }).filter(p => p.catalog === 'retail' || p.catalog === 'both');
        
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] animate-pulse pointer-events-none rounded-full" />
      <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold relative z-10">Catalog</p>
      <h1 className="mt-2 text-display text-4xl md:text-5xl font-semibold relative z-10">All Products</h1>
      <p className="mt-3 text-muted-foreground relative z-10">
        {products.length} curated essentials for your daily pooja.
      </p>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Loading products...</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

