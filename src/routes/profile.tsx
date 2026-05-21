import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { 
  User, 
  ShoppingBag, 
  Headphones, 
  Heart, 
  MapPin, 
  LogOut, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  ChevronLeft
} from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

// Dummy order data using existing products
const dummyOrders = [
  {
    id: "ORD-101",
    status: "delivered",
    date: "12th May 2026, 12:47 pm",
    price: 113,
    items: [products[0], products[1], products[2], products[3]],
    rateable: true,
  },
  {
    id: "ORD-102",
    status: "cancelled",
    date: "12th May 2026, 12:41 pm",
    price: 231,
    items: [products[4], products[5], products[6], products[7]],
    rateable: false,
  },
  {
    id: "ORD-103",
    status: "delivered",
    date: "29th Mar 2026, 01:34 pm",
    price: 141,
    items: [products[8], products[9], products[10], products[11]],
    rateable: false,
  },
  {
    id: "ORD-104",
    status: "delivered",
    date: "25th Feb 2026, 02:05 pm",
    price: 172,
    items: [products[12], products[13]],
    rateable: false,
  },
  {
    id: "ORD-105",
    status: "cancelled",
    date: "13th Feb 2026, 02:35 am",
    price: 142,
    items: [products[14], products[15], products[16], products[17]],
    rateable: false,
  }
];

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 flex flex-col items-center text-center">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-display text-3xl font-semibold">Not Logged In</h1>
        <p className="mt-2 text-muted-foreground">Please sign in to view your profile.</p>
        <Link
          to="/login"
          className="mt-6 px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 bg-background rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
            
            {/* User Header */}
            <div className="p-5 flex items-center gap-4 border-b border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
                {getInitials(user.name)}
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg leading-tight">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>

            {/* Wallet Section */}
            <div className="px-5 py-4 border-b border-border bg-muted/10">
              <div className="flex items-center justify-between text-sm font-medium mb-4">
                <span className="flex items-center gap-2 text-primary">
                  <div className="w-4 h-4 rounded bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">D</div>
                  Divine Cash & Gift Card
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Available Balance: <strong className="text-foreground text-sm font-semibold">₹0</strong></span>
                <button className="bg-foreground text-background text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-foreground/90 transition">
                  Add Balance
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col py-2">
              <Link to="/profile" className="flex items-center gap-4 px-5 py-3 bg-secondary/50 border-l-4 border-primary">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Orders</span>
              </Link>
              <button className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/50 transition border-l-4 border-transparent text-left">
                <Headphones className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Customer Support</span>
              </button>
              <button className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/50 transition border-l-4 border-transparent text-left">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Manage Referrals</span>
              </button>
              <button className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/50 transition border-l-4 border-transparent text-left">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Saved Addresses</span>
              </button>
              <button className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/50 transition border-l-4 border-transparent text-left">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Profile</span>
              </button>
            </nav>

            {/* Logout Button */}
            <div className="p-5 mt-auto border-t border-border">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-2.5 rounded-md border border-destructive/30 text-destructive font-semibold hover:bg-destructive/5 transition text-sm"
              >
                Log Out
              </button>
              <div className="mt-6 text-center">
                 <span className="text-display text-2xl font-bold text-muted-foreground/30 uppercase tracking-widest">Divine Purity</span>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 w-full bg-background rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-full lg:h-[700px]">
            
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border sticky top-0 bg-background z-10">
              <button className="p-1 hover:bg-secondary rounded-md transition">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold">Orders</h1>
            </div>

            {/* Scrollable Orders List */}
            <div className="p-4 md:p-6 space-y-4 overflow-y-auto bg-muted/10 flex-1">
              {dummyOrders.map((order) => (
                <div key={order.id} className="bg-background rounded-xl border border-border p-5 shadow-sm">
                  
                  {/* Thumbnails Row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="h-12 w-12 rounded bg-muted/30 border border-border overflow-hidden p-1 shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                      </div>
                    ))}
                  </div>

                  {/* Status & Price Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                        {order.status === "delivered" ? (
                          <>Order delivered <CheckCircle2 className="h-4 w-4 text-green-500" /></>
                        ) : (
                          <>Order cancelled <XCircle className="h-4 w-4 text-muted-foreground" /></>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Placed at {order.date}</p>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm font-bold shrink-0">
                      ₹{order.price} <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Optional Rate Button */}
                  {order.rateable && (
                    <>
                      <div className="h-px w-full bg-border mt-4 mb-3" />
                      <div className="text-center">
                        <button className="text-sm font-semibold text-foreground hover:text-primary transition">
                          Rate your order
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
