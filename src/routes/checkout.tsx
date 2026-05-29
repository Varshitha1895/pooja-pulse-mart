import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { supabase } from "@/lib/supabase";
import { CreditCard, Truck, CheckCircle2, ShoppingBag, Loader2, MapPin } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [gpsLink, setGpsLink] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setGpsLink(`https://www.google.com/maps?q=${lat},${lng}`);
        },
        (error) => {
          alert("Could not get your location. Please check your browser permissions or try typing it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some items to your cart to checkout.</p>
        <Link
          to="/products"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Thank you for shopping with Divine Purity. Your order has been received and is being processed.
        </p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: name,
        phone,
        address,
        delivery_instructions: [instructions, gpsLink ? `GPS: ${gpsLink}` : null].filter(Boolean).join("\n\n"),
        total_amount: total,
        payment_method: paymentMethod,
        status: paymentMethod === "COD" ? "Pending" : "Pending Payment",
        items: items.map(i => ({ id: i.product.id, name: i.product.name, qty: i.qty, price: i.product.price }))
      };

      const { error } = await supabase.from("orders").insert([orderData]);

      if (error) {
        console.error("Error inserting order:", error);
        alert(`Failed to place order: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      clear();
      setIsSuccess(true);

      if (paymentMethod === "UPI") {
        // Trigger UPI Intent deep link
        const upiUrl = `upi://pay?pa=merchant@ybl&pn=PoojaPulseMart&am=${total}&cu=INR`;
        window.location.href = upiUrl;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-primary-dark">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-secondary/50 space-y-6">
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary-dark border-b pb-2">1. Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Detailed Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                    placeholder="House/Flat No., Building Name, Street, Area, City, Pincode"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-muted-foreground">Delivery Instructions / Landmark</label>
                    <button 
                      type="button" 
                      onClick={handleGetLocation} 
                      className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-md transition ${gpsLink ? 'bg-green-100 text-green-700' : 'text-primary bg-primary/10 hover:underline'}`}
                    >
                      {gpsLink ? (
                        <><CheckCircle2 className="w-3 h-3" /> Location Captured</>
                      ) : (
                        <><MapPin className="w-3 h-3" /> Share Current Location</>
                      )}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    placeholder="e.g., Near the big banyan tree, ring the bell twice"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4 text-primary-dark border-b pb-2">2. Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/20'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <Truck className="w-5 h-5 ml-3 mr-2 text-primary" />
                  <span className="font-medium text-foreground">Cash on Delivery (COD)</span>
                </label>

                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'UPI' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/20'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <CreditCard className="w-5 h-5 ml-3 mr-2 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">Pay Online (PhonePe / UPI / GPay)</span>
                    <span className="text-xs text-muted-foreground mt-0.5">Secure payment via UPI app</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg mt-6 hover:bg-primary/90 transition flex items-center justify-center shadow-md disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                paymentMethod === 'COD' ? 'Place Order (COD)' : `Pay ₹${total.toLocaleString()} Now`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 p-6 rounded-xl border border-secondary/50 sticky top-24">
            <h3 className="font-semibold text-lg mb-4 text-primary-dark">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-secondary/50">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <h4 className="font-medium text-foreground line-clamp-2">{item.product.name}</h4>
                    <p className="text-muted-foreground mt-1">Qty: {item.qty}</p>
                    <p className="font-semibold text-primary-dark mt-1">₹{(item.product.price * item.qty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-secondary pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-secondary">
                <span className="text-primary-dark">Total</span>
                <span className="text-primary-dark">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
