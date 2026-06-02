import { createFileRoute, Link, useParams, useSearch } from "@tanstack/react-router";
import { retailProducts } from "@/lib/retail-products";
import { wholesaleProducts } from "@/lib/wholesale-products";
const products = [...retailProducts, ...wholesaleProducts];
import { useCart } from "@/lib/cart";
import { useWholesaleCart } from "@/lib/wholesale-cart";
import { ShoppingBag, Package, Star, MessageCircle, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { useNavigate } from "@tanstack/react-router";
import { DivineBackground } from "@/components/site/DivineBackground";

export const Route = createFileRoute("/product/$productId")({
  component: ProductDetails,
});

function ProductDetails() {
  const { productId } = Route.useParams();
  const search: any = useSearch({ strict: false });
  const isWholesale = search.type === 'wholesale';
  const product = products.find((p) => p.id === productId);
  const retailCart = useCart();
  const wholesaleCart = useWholesaleCart();
  const [added, setAdded] = useState<'retail' | 'wholesale' | null>(null);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleAddRetail = () => {
    retailCart.add(product.id);
    setAdded('retail');
    setTimeout(() => {
      setAdded(null);
    }, 2000);
  };

  const handleAddWholesale = () => {
    wholesaleCart.add(product.id);
    setAdded('wholesale');
    setTimeout(() => {
      setAdded(null);
    }, 2000);
  };

  const catalogProducts = isWholesale 
    ? products.filter(p => p.catalog === 'wholesale' || p.catalog === 'both')
    : products.filter(p => p.catalog === 'retail' || p.catalog === 'both');

  const relatedProducts = catalogProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Fallback to other products if not enough related
  if (relatedProducts.length < 4) {
    relatedProducts.push(...catalogProducts.filter(p => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 4 - relatedProducts.length));
  }

  return (
    <>
      {isWholesale && <DivineBackground />}
      <div className={`min-h-screen pb-24 relative z-10 ${isWholesale ? 'bg-transparent text-white' : 'bg-muted/10'}`}>
        {/* Breadcrumbs */}
        <div className={isWholesale ? 'bg-black/40 backdrop-blur-md border-b border-white/10' : 'bg-background border-b border-border'}>
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center text-xs text-muted-foreground gap-2">
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/retail" className="hover:text-foreground transition">{product.category}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className={isWholesale ? 'text-white font-medium truncate' : 'text-foreground font-medium truncate'}>{product.name}</span>
          </div>
        </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Main Product Section */}
        <div className={`rounded-2xl shadow-sm border p-4 md:p-8 grid md:grid-cols-[1fr_420px] gap-8 md:gap-12 ${
          isWholesale ? 'bg-black/30 backdrop-blur-md border-white/20 shadow-2xl' : 'bg-background border-border'
        }`}>
          
          {/* Left: Image & Retail Action */}
          <div className="flex flex-col gap-6">
            <div className="aspect-square rounded-xl bg-gradient-warm border border-border overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Details & Wholesale Action */}
          <div className="flex flex-col">
            <div className="mb-2 inline-flex items-center gap-1.5 bg-accent/20 text-accent-foreground text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-fit">
              <Star className="h-3 w-3 fill-current" /> Premium Quality
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold mt-2 leading-tight ${isWholesale ? 'text-white' : 'text-foreground'}`}>
              {product.name}
            </h1>
            <p className={`${isWholesale ? 'text-gray-300' : 'text-muted-foreground'} mt-2 text-sm`}>{product.category} • 1 {product.unit}</p>

            {!isWholesale && (
              <div className="my-6 pt-6 border-t border-border">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through mb-1">₹{Math.round(product.price * 1.3)}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md mb-1">30% OFF</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes</p>
              </div>
            )}

            {/* Product Description */}
            <div className={`rounded-xl p-5 mb-6 border ${
              isWholesale 
                ? 'bg-black/40 border-white/10 mt-6 pt-6' 
                : 'bg-muted/30 border-border'
            }`}>
              <h3 className={`text-sm font-bold mb-3 ${isWholesale ? 'text-white' : 'text-foreground'}`}>Description</h3>
              <p className={`text-sm leading-relaxed ${isWholesale ? 'text-gray-300' : 'text-muted-foreground'}`}>
                {product.description || "Premium divine item for your daily rituals."}
              </p>
            </div>

            {/* Primary Action Button */}
            <div className={`flex flex-col gap-3 ${isWholesale ? 'mb-0' : 'mb-6'}`}>
              {isWholesale ? (
                <button 
                  onClick={handleAddWholesale}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-lg hover:opacity-90 transition shadow-warm"
                >
                  {added === 'wholesale' ? (
                    <><Check className="h-5 w-5" /> Added</>
                  ) : (
                    <><Package className="h-5 w-5" /> Add to Cart</>
                  )}
                </button>
              ) : (
                <button 
                  onClick={handleAddRetail}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition shadow-warm"
                >
                  {added === 'retail' ? (
                    <><Check className="h-5 w-5" /> Added</>
                  ) : (
                    <><ShoppingBag className="h-5 w-5" /> Add to Cart</>
                  )}
                </button>
              )}
              <p className={`text-center text-xs flex items-center justify-center gap-1 ${isWholesale ? 'text-gray-400' : 'text-muted-foreground'}`}>
                <Check className="h-3 w-3 text-green-500" /> Next day delivery by 6 PM
              </p>
            </div>


            {/* Wholesale Action - Only show if in retail mode to upsell */}
            {!isWholesale && (
              <div className="mt-auto border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Buying for a Temple or Store?</h3>
                  <span className="text-xs font-bold bg-secondary text-foreground px-2 py-1 rounded-md">BULK</span>
                </div>
                <button 
                  onClick={handleAddWholesale}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-foreground text-foreground font-bold hover:bg-foreground hover:text-background transition"
                >
                  {added === 'wholesale' ? (
                    <><Check className="h-5 w-5" /> Added to Bulk Quote</>
                  ) : (
                    <><Package className="h-5 w-5" /> Add to Wholesale List</>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Or order directly via <a href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'd like a bulk quote for: ${product.name}`)}`} className="text-[#25D366] font-bold hover:underline" target="_blank" rel="noreferrer">WhatsApp</a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Feedback */}
        <div className="mt-8 bg-background rounded-2xl shadow-sm border border-border p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-accent" /> Customer Devotion & Feedback
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/10 p-5 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-accent">
                  <Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-sm italic text-foreground mb-3">"The purity of this {product.category.toLowerCase()} is unmatched. It truly elevates our daily pooja. Highly recommend!"</p>
              <p className="text-xs font-bold text-muted-foreground">— Rajesh K.</p>
            </div>
            <div className="bg-muted/10 p-5 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-accent">
                  <Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" /><Star className="h-4 w-4 fill-accent" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">1 week ago</span>
              </div>
              <p className="text-sm italic text-foreground mb-3">"Excellent packaging and exactly as described. The aroma fills the entire house with positivity."</p>
              <p className="text-xs font-bold text-muted-foreground">— Sunita M.</p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} isWholesale={isWholesale} />
            ))}
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
