import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl mt-20">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 font-serif text-center">Cancellation & Refund Policy</h1>
        
        <div className="prose prose-amber max-w-none bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">1. Cancellations</h2>
          <p className="text-gray-700 mb-4">You may request a cancellation within 24 hours of placing your order. If the order has not been dispatched, we will process a full refund. Once the order has been handed over to the courier, we cannot process cancellations.</p>

          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">2. Returns</h2>
          <p className="text-gray-700 mb-4">We accept returns within 7 days of delivery only for items that are damaged, defective, or incorrectly delivered. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.</p>

          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">3. Refunds</h2>
          <p className="text-gray-700 mb-4">Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to the original method of payment within 5-7 business days.</p>

          <h2 className="text-2xl font-bold text-amber-800 mt-8 mb-4">4. Non-returnable Items</h2>
          <p className="text-gray-700 mb-4">Perishable goods (such as fresh flowers or specific prasad items) and customized pooja items cannot be returned due to hygiene and religious sanctity reasons.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
