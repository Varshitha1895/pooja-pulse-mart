import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Trash2, Package } from "lucide-react";
import type { Product } from "@/lib/types";

export function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      const formattedProducts: Product[] = (data || []).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: Number(p.price),
        image: p.image_url,
        catalog: 'retail',
        unit: p.unit || ''
      }));
      
      setProducts(formattedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to completely delete "${name}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(id);
    try {
      // Note: We are just deleting from the database. 
      // Supabase storage files can also be deleted here if needed, but DB deletion removes it from the store.
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update UI
      setProducts(products.filter(p => p.id !== id));
      
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product. Check your database permissions.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary/50 overflow-hidden w-full">
      <div className="flex justify-between items-center p-4 border-b border-secondary/50 bg-secondary/10">
        <h3 className="font-semibold text-primary-dark flex items-center gap-2">
          <Package className="w-5 h-5" />
          Manage Catalog
        </h3>
        <span className="text-sm font-medium text-muted-foreground">Total: <strong className="text-primary-dark">{products.length}</strong></span>
      </div>
      
      <div className="overflow-x-auto max-h-[600px]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="sticky top-0 bg-secondary/30 z-10">
            <tr className="text-primary-dark text-sm border-b border-secondary/50">
              <th className="px-6 py-4 font-semibold w-24">Image</th>
              <th className="px-6 py-4 font-semibold">Product Name</th>
              <th className="px-6 py-4 font-semibold w-40">Category</th>
              <th className="px-6 py-4 font-semibold w-32">Price</th>
              <th className="px-6 py-4 font-semibold w-32">Unit/Weight</th>
              <th className="px-6 py-4 font-semibold w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/30">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading catalog...</p>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No products found in the database.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/5 transition group">
                  <td className="px-6 py-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover border border-secondary/50" />
                  </td>
                  <td className="px-6 py-3 font-medium text-foreground">{product.name}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-3 font-semibold text-primary-dark">₹{product.price}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{product.unit || <span className="italic text-gray-400">None</span>}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={isDeleting === product.id}
                      className="inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition disabled:opacity-50"
                      title="Delete Product"
                    >
                      {isDeleting === product.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
