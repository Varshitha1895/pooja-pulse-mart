import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Trash2, Package, Pencil, Check, X } from "lucide-react";
import type { Product } from "@/lib/types";

export function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

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
        catalog: p.catalog || 'retail',
        description: p.description || '',
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
      catalog: product.catalog,
      description: product.description,
    });
  };

  const handleSave = async (id: string) => {
    if (!editForm.name || !editForm.category || (editForm.catalog === 'retail' && editForm.price === undefined)) {
      alert("Name, Category, and Price are required for retail items.");
      return;
    }

    setIsProcessing(id);
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editForm.name,
          category: editForm.category,
          price: editForm.catalog === 'wholesale' ? 0 : editForm.price,
          unit: editForm.unit,
          catalog: editForm.catalog,
          description: editForm.description || null,
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
          Manage Catalog
        </h3>
        <span className="text-sm font-medium text-muted-foreground">Total: <strong className="text-primary-dark">{products.length}</strong></span>
      </div>
      
      <div className="overflow-x-auto max-h-[700px]">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="sticky top-0 bg-secondary/30 z-10 shadow-sm">
            <tr className="text-primary-dark text-sm border-b border-secondary/50">
              <th className="px-6 py-4 font-semibold w-24">Image</th>
              <th className="px-6 py-4 font-semibold">Product Details</th>
              <th className="px-6 py-4 font-semibold w-32">Catalog Type</th>
              <th className="px-6 py-4 font-semibold w-32">Price</th>
              <th className="px-6 py-4 font-semibold w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/30">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading catalog...</p>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No products found in the database.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isEditing = editingId === product.id;
                return (
                  <tr key={product.id} className="hover:bg-secondary/5 transition group">
                    <td className="px-6 py-4 align-top">
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover border border-secondary/50" />
                    </td>
                    <td className="px-6 py-4 align-top">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={editForm.name || ""} 
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3 py-1.5 border border-input rounded-md font-medium text-sm"
                            placeholder="Product Name"
                          />
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={editForm.category || ""} 
                              onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                              className="w-1/2 px-3 py-1.5 border border-input rounded-md text-sm"
                              placeholder="Category"
                            />
                            <input 
                              type="text" 
                              value={editForm.unit || ""} 
                              onChange={e => setEditForm({ ...editForm, unit: e.target.value })}
                              className="w-1/2 px-3 py-1.5 border border-input rounded-md text-sm"
                              placeholder="Unit (e.g. 1 kg)"
                            />
                          </div>
                          <textarea 
                            value={editForm.description || ""} 
                            onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full px-3 py-1.5 border border-input rounded-md text-sm resize-none"
                            placeholder="Description"
                            rows={2}
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-foreground text-base">{product.name}</div>
                          <div className="text-sm text-muted-foreground mt-0.5">
                            {product.category} {product.unit && `• ${product.unit}`}
                          </div>
                          {product.description && (
                            <div className="text-xs text-muted-foreground mt-1.5 line-clamp-2 italic">
                              {product.description}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top">
                      {isEditing ? (
                        <select 
                          value={editForm.catalog || 'retail'} 
                          onChange={e => setEditForm({ ...editForm, catalog: e.target.value as any })}
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                        >
                          <option value="retail">Retail</option>
                          <option value="wholesale">Wholesale</option>
                          <option value="both">Both</option>
                        </select>
                      ) : (
                        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${
                          product.catalog === 'wholesale' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 
                          product.catalog === 'both' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                          'bg-green-100 text-green-700 border border-green-200'
                        }`}>
                          {product.catalog?.toUpperCase() || 'RETAIL'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top">
                      {isEditing ? (
                        editForm.catalog !== 'wholesale' ? (
                          <div className="relative">
                            <span className="absolute left-3 top-1.5 text-muted-foreground text-sm">₹</span>
                            <input 
                              type="number" 
                              value={editForm.price || ""} 
                              onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                              className="w-full pl-6 pr-2 py-1.5 border border-input rounded-md font-semibold text-primary-dark text-sm"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground italic px-2 py-1.5 inline-block">N/A</span>
                        )
                      ) : (
                        <span className="font-bold text-primary-dark text-base">
                          {product.catalog === 'wholesale' ? 'Quote' : `₹${product.price}`}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(product.id)}
                              disabled={isProcessing === product.id}
                              className="p-1.5 rounded-md text-green-600 hover:bg-green-50 transition border border-transparent hover:border-green-200"
                              title="Save"
                            >
                              {isProcessing === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={isProcessing === product.id}
                              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(product)}
                              disabled={isProcessing === product.id}
                              className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition border border-transparent hover:border-blue-200 disabled:opacity-50"
                              title="Edit Product"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
                              disabled={isProcessing === product.id}
                              className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-200 disabled:opacity-50"
                              title="Delete Product"
                            >
                              {isProcessing === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
