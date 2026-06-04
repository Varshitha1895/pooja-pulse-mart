import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Package, RefreshCw, Phone, MapPin, Calendar, CreditCard, LogOut, LockKeyhole, PlusCircle, ListOrdered, Grid } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { AddProduct } from "@/components/admin/AddProduct";
import { ManageProducts } from "@/components/admin/ManageProducts";

export const Route = createFileRoute("/admin")({
  component: AdminWrapper,
});

function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("dp_admin_logged_in");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => {
      localStorage.setItem("dp_admin_logged_in", "true");
      setIsAuthenticated(true);
    }} />;
  }

  return <AdminDashboard onSignOut={() => {
    localStorage.removeItem("dp_admin_logged_in");
    setIsAuthenticated(false);
  }} />;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMsg("");

    // Simulate small network delay for effect
    await new Promise((r) => setTimeout(r, 500));

    // Hardcoded allowed users (You can change these passwords safely here!)
    const validUsers = [
      { email: "varshithabommisetti@gmail.com", password: "password123" },
      { email: "client@poojapulsemart.com", password: "password123" } // Replace with your client's actual email
    ];

    const user = validUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      onLogin();
    } else {
      setErrorMsg("Invalid email or password.");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/10 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-secondary/50">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-display text-primary-dark">Admin Login</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your email and password to access the dashboard.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md mt-2 hover:bg-primary/90 transition flex items-center justify-center disabled:opacity-70"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Existing Admin Dashboard Code Below ----

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  address: string;
  delivery_instructions?: string;
  total_amount: number;
  payment_method: string;
  status: string;
  items: { id: string; name: string; qty: number; price: number }[];
};

function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "add-product" | "manage-products">("orders");

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as Order[]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsUpdating(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status");
      } else {
        // Update local state
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Pending Payment': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Dispatched': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderInstructions = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold flex items-center gap-1 mt-1.5 w-max">
            <MapPin className="w-3.5 h-3.5" /> View on Google Maps
          </a>
        );
      }
      return <span key={i} className="whitespace-pre-wrap">{part.replace("GPS: ", "").trim()}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Admin Header */}
      <header className="bg-white border-b border-secondary/50 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold font-display text-primary-dark">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={fetchOrders}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={onSignOut}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Admin Control Panel</h2>
            <p className="text-muted-foreground mt-1">Manage your store orders and catalog</p>
          </div>
          
          <div className="flex bg-secondary/30 p-1 rounded-lg border border-secondary/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition whitespace-nowrap ${activeTab === "orders" ? "bg-white text-primary-dark shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <ListOrdered className="w-4 h-4" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("add-product")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition whitespace-nowrap ${activeTab === "add-product" ? "bg-white text-primary-dark shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <PlusCircle className="w-4 h-4" />
              Add Product
            </button>
            <button
              onClick={() => setActiveTab("manage-products")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition whitespace-nowrap ${activeTab === "manage-products" ? "bg-white text-primary-dark shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid className="w-4 h-4" />
              Manage Catalog
            </button>
          </div>
        </div>

        {activeTab === "orders" ? (
          /* Orders Table */
          <div className="bg-white rounded-xl shadow-sm border border-secondary/50 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-secondary/50 bg-secondary/10">
              <span className="text-sm font-medium text-muted-foreground">Total Orders: <strong className="text-primary-dark">{orders.length}</strong></span>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-secondary/30 text-primary-dark text-sm border-b border-secondary/50">
                  <th className="px-6 py-4 font-semibold w-24">Order ID</th>
                  <th className="px-6 py-4 font-semibold w-40">Date</th>
                  <th className="px-6 py-4 font-semibold">Customer Details</th>
                  <th className="px-6 py-4 font-semibold w-64">Items</th>
                  <th className="px-6 py-4 font-semibold w-32">Total</th>
                  <th className="px-6 py-4 font-semibold w-40">Payment</th>
                  <th className="px-6 py-4 font-semibold w-48">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/30">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Loading orders...</p>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium text-foreground">No orders found</p>
                      <p className="text-muted-foreground mt-1">When customers place orders, they will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-secondary/10 transition group">
                      <td className="px-6 py-4 align-top">
                        <span className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded text-primary-dark">
                          #{order.id.split('-')[0]}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="font-medium text-foreground">{order.customer_name}</div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Phone className="w-3.5 h-3.5 mr-1.5" />
                          {order.phone}
                        </div>
                        <div className="flex items-start text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2" title={order.address}>{order.address}</span>
                        </div>
                        {order.delivery_instructions && (
                          <div className="mt-2 bg-yellow-50 text-yellow-800 p-2.5 rounded-md border border-yellow-200 text-sm">
                            <strong className="block mb-1 text-yellow-900">Delivery Instructions / Location:</strong>
                            {renderInstructions(order.delivery_instructions)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="space-y-1.5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm flex justify-between gap-2 border-b border-secondary/20 pb-1.5 last:border-0 last:pb-0">
                              <span className="truncate flex-1" title={item.name}>
                                {item.qty}x {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <span className="font-bold text-primary-dark">
                          ₹{order.total_amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-center text-sm">
                          <CreditCard className="w-4 h-4 mr-1.5 text-muted-foreground" />
                          <span className="font-medium">{order.payment_method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        {isUpdating === order.id ? (
                          <div className="flex items-center text-sm text-muted-foreground h-9">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin text-primary" />
                            Updating...
                          </div>
                        ) : (
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`w-full text-sm font-medium border rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/50 transition appearance-none cursor-pointer ${getStatusColor(order.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Pending Payment">Pending Payment</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        ) : activeTab === "add-product" ? (
          <div className="flex justify-center">
            <AddProduct />
          </div>
        ) : (
          <ManageProducts />
        )}
      </main>
    </div>
  );
}
