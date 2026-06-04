import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

export function AddProduct() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!category || !name || !price || !file) {
      setError("Please fill all fields and select an image.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload Image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // 3. Insert into Database
      const { error: dbError } = await supabase
        .from('products')
        .insert([
          {
            category,
            name,
            price: parseFloat(price),
            image_url: publicUrl,
          }
        ]);

      if (dbError) throw dbError;

      // Success
      setSuccess(true);
      setCategory("");
      setName("");
      setPrice("");
      setFile(null);
      // reset file input visually
      const fileInput = document.getElementById("product-image") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "An error occurred while uploading the product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-sm border border-secondary/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">Add New Product</h2>
        <p className="text-muted-foreground mt-1">Upload a new product to your store catalog.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-700">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">Product successfully added to the database!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Category</label>
          <input
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            placeholder="e.g. Pasupu, Gandam powder"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Product Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            placeholder="e.g. Premium Sandal Agarbathi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Price (₹)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            placeholder="e.g. 150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Product Image</label>
          <div className="relative border-2 border-dashed border-input rounded-lg p-6 hover:bg-secondary/20 transition-colors flex flex-col items-center justify-center text-center">
            <input
              id="product-image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <UploadCloud className="w-8 h-8 text-primary/70 mb-2" />
            <p className="text-sm font-medium text-foreground">
              {file ? file.name : "Click or drag image to upload"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md mt-4 hover:bg-primary/90 transition flex items-center justify-center disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Uploading Product...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
}
