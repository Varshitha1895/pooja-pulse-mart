import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Trash2, Package, Pencil, Check, X } from "lucide-react";
import type { Product } from "@/lib/types";

export function ManageProducts({ catalogType }: { catalogType: 'retail' | 'wholesale' }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, [catalogType]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      const formattedProducts: Product[] = (data || [])
        .map(p => {
          const rawCat = p.category || '';
          const isWholesale = rawCat.toLowerCase().startsWith('[wholesale]');
          const isRetail = rawCat.toLowerCase().startsWith('[retail]');
          const parsedCatalog = (isWholesale ? 'wholesale' : isRetail ? 'retail' : 'retail') as 'retail' | 'wholesale' | 'both';
          const cleanCategory = rawCat.replace(/\[.*?\]\s*/, '');
          
          return {
            id: p.id,
            name: p.name,
            category: cleanCategory,
            price: Number(p.price),
            image: p.image_url,
            catalog: parsedCatalog,
            unit: p.unit || ''
          };
        })
        .filter(p => p.catalog === catalogType);
      
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

    setIsProcessing(id);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
      
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product. Check your database permissions.");
    } finally {
      setIsProcessing(null);
    }
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
    });
  };

  const handleSave = async (id: string) => {
    if (!editForm.name || !editForm.category || !editForm.price) {
      alert("Name, Category, and Price are required.");
      return;
    }

    setIsProcessing(id);
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editForm.name,
          category: `[${catalogType}] ${editForm.category}`,
          price: editForm.price,
          unit: editForm.unit,
        })
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.map(p => p.id === id ? { ...p, ...editForm } as Product : p));
      setEditingId(null);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update the product. Check your database permissions.");
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary/50 overflow-hidden w-full">
      <div className="flex justify-between items-center p-4 border-b border-secondary/50 bg-secondary/10">
        <h3 className="font-semibold text-primary-dark flex items-center gap-2">
          <Package className="w-5 h-5" />
          Manage {catalogType === 'retail' ? 'Retail' : 'Wholesale'} Catalog
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
              <th className="px-6 py-4 font-semibold w-40 text-center">Actions</th>
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
              products.map((product) => {
                const isEditing = editingId === product.id;
                return (
                  <tr key={product.id} className="hover:bg-secondary/5 transition group">
                    <td className="px-6 py-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover border border-secondary/50" />
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.name || ""} 
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-2 py-1 border rounded-md"
                        />
                      ) : (
                        <span className="font-medium text-foreground">{product.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.category || ""} 
                          onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                          className="w-full px-2 py-1 border rounded-md text-sm"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={editForm.price || ""} 
                          onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                          className="w-full px-2 py-1 border rounded-md font-semibold text-primary-dark"
                        />
                      ) : (
                        <span className="font-semibold text-primary-dark">₹{product.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.unit || ""} 
                          onChange={e => setEditForm({ ...editForm, unit: e.target.value })}
                          className="w-full px-2 py-1 border rounded-md text-sm"
                          placeholder="e.g. 1 kg"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{product.unit || <span className="italic text-gray-400">None</span>}</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(product.id)}
                              disabled={isProcessing === product.id}
                              className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
                              title="Save"
                            >
                              {isProcessing === product.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={isProcessing === product.id}
                              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition"
                              title="Cancel"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(product)}
                              disabled={isProcessing === product.id}
                              className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
                              title="Edit Product"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              disabled={isProcessing === product.id}
                              className="p-2 rounded-md text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                              title="Delete Product"
                            >
                              {isProcessing === product.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
