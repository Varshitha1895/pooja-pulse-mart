import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicy,
});

function ShippingPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl mt-20">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 font-serif text-center">Shipping Policy</h1>
        
        <div className="prose prose-amber max-w-none bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">1. Processing Time</h2>
          <p className="text-gray-700 mb-4">All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>

          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">2. Shipping Rates & Delivery Estimates</h2>
          <p className="text-gray-700 mb-4">Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur due to unforeseen circumstances or courier issues.</p>

          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">3. Shipment Confirmation & Order Tracking</h2>
          <p className="text-gray-700 mb-4">You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>

          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">4. Damages</h2>
          <p className="text-gray-700 mb-4">Divine Hub is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

