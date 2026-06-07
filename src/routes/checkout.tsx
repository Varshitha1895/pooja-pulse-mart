import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { supabase } from "@/lib/supabase";
import { CreditCard, Truck, CheckCircle2, ShoppingBag, Loader2, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [locationArea, setLocationArea] = useState(user?.locationArea || "");
  const [houseNo, setHouseNo] = useState(user?.houseNo || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [pincode, setPincode] = useState(user?.pincode || "");
  const [instructions, setInstructions] = useState("");
  const [gpsLink, setGpsLink] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  
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
          to="/retail"
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
          Thank you for shopping with Divine Hub. Your order has been received and is being processed.
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

  const handleOnlinePayment = async (orderId: string) => {
    const isLoaded = await loadRazorpayScript();
    
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, receipt: orderId }),
      });

      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error || "Failed to create payment order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "", // Fallback will fail cleanly if not set
        amount: order.amount,
        currency: order.currency,
        name: "Divine Hub",
        description: "Pooja Essentials",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              // Update order in Supabase
              await supabase.from("orders").update({
                payment_status: "Paid",
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id
              }).eq("id", orderId);
              
              updateUser({ name, phone, address, locationArea, houseNo, city, state, pincode });
              clear();
              setIsSuccess(true);
            } else {
              alert("Payment verification failed. If money was deducted, it will be refunded.");
              await supabase.from("orders").update({ payment_status: "Failed" }).eq("id", orderId);
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification error.");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: name,
          contact: phone,
        },
        theme: {
          color: "#b07c2a",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            // Optionally update order status to abandoned
          }
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', async function (response: any) {
        console.error("Payment Failed", response.error);
        alert(response.error.description);
        await supabase.from("orders").update({ payment_status: "Failed" }).eq("id", orderId);
        setIsSubmitting(false);
      });

      rzp.open();
      
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to initialize payment.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsSubmitting(true);

    try {
      const fullAddress = [houseNo, address, locationArea, city, state, pincode].filter(Boolean).join(", ");

      const orderData = {
        customer_name: name,
        phone,
        address: fullAddress,
        delivery_instructions: [instructions, gpsLink ? `GPS: ${gpsLink}` : null].filter(Boolean).join("\n\n"),
        total_amount: total,
        payment_method: paymentMethod === "COD" ? "COD" : "Razorpay",
        payment_status: "Pending",
        status: "Pending",
        items: items.map(i => ({ id: i.product.id, name: i.product.name, qty: i.qty, price: i.product.price }))
      };

      const { data, error } = await supabase.from("orders").insert([orderData]).select().single();

      if (error) {
        console.error("Error inserting order:", error);
        alert(`Failed to place order: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      const orderId = data.id;

      if (paymentMethod === "ONLINE") {
        await handleOnlinePayment(orderId);
      } else {
        updateUser({ name, phone, address, locationArea, houseNo, city, state, pincode });
        clear();
        setIsSuccess(true);
        setIsSubmitting(false);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Location / Area *</label>
                    <input
                      type="text"
                      required
                      value={locationArea}
                      onChange={(e) => setLocationArea(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      placeholder="E.g. Andheri West"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-muted-foreground">House / Flat No. (Optional)</label>
                    <input
                      type="text"
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      placeholder="E.g. Flat 402"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Complete Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                    placeholder="Building Name, Street Name, Landmark"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-muted-foreground">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-muted-foreground">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    />
                  </div>
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
                <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100 flex items-start">
                  <span className="mr-2 mt-0.5">ℹ️</span>
                  <span>Online Payments are temporarily disabled while we upgrade our systems. Please use Cash on Delivery.</span>
                </div>
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
