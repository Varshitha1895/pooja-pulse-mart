import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { 
  User, 
  MapPin, 
  Headphones, 
  LogOut, 
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Home,
  Briefcase,
  Building,
  Loader2,
  Camera
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
export const Route = createFileRoute("/profile")({
  component: Profile,
});
import { supabase } from "@/lib/supabase";


type Address = {
  id: string;
  name: string;
  phone: string;
  type: 'home' | 'office' | 'hostel';
  houseNo?: string;
  location: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  instructions?: string;
};

function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Keep it under 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be smaller than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeTab, setActiveTab] = useState<'delivery' | 'orders'>('delivery');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(true); // Default to adding if none exist
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setIsLoadingOrders(true);
      
      // Match the last 10 digits of the phone number to handle +91 or leading 0s
      const phoneSuffix = user.phone.replace(/\D/g, '').slice(-10);
      
      const { data } = await supabase
        .from('orders')
        .select('*')
        .ilike('phone', `%${phoneSuffix}%`)
        .order('created_at', { ascending: false });
        
      setOrders(data || []);
      setIsLoadingOrders(false);
    };
    fetchOrders();
  }, [user]);

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

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress: Address = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      type: formData.get('type') as 'home' | 'office' | 'hostel',
      houseNo: formData.get('houseNo') as string,
      location: formData.get('location') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      pincode: formData.get('pincode') as string,
      instructions: formData.get('instructions') as string,
    };
    setAddresses([...addresses, newAddress]);
    setIsAddingNew(false);
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const renderInstructions = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold flex items-center gap-1 mt-1 w-max">
            <MapPin className="w-3.5 h-3.5" /> View on Google Maps
          </a>
        );
      }
      return <span key={i} className="whitespace-pre-wrap">{part.replace("GPS: ", "").trim()}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 bg-background rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
            
            {/* User Header */}
            <div className="p-5 flex items-center gap-4 border-b border-border">
              <div className="relative group shrink-0">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl overflow-hidden relative cursor-pointer ring-1 ring-border hover:ring-primary transition"
                  title="Upload Profile Picture"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    getInitials(user.name)
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </button>
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg leading-tight">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col py-2">
              <button 
                onClick={() => setActiveTab('delivery')}
                className={`flex items-center gap-4 px-5 py-3 transition border-l-4 text-left ${activeTab === 'delivery' ? 'bg-secondary/50 border-primary' : 'border-transparent hover:bg-secondary/50'}`}
              >
                <MapPin className={`h-5 w-5 ${activeTab === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm ${activeTab === 'delivery' ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>Delivery Details</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-4 px-5 py-3 transition border-l-4 text-left ${activeTab === 'orders' ? 'bg-secondary/50 border-primary' : 'border-transparent hover:bg-secondary/50'}`}
              >
                <ShoppingBag className={`h-5 w-5 ${activeTab === 'orders' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm ${activeTab === 'orders' ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>My Orders</span>
              </button>

              <a 
                href="https://wa.me/919032597329?text=Hi%20Divine%20Hub%20Support" 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  activeTab === 'support' ? 'bg-muted/50 border-l-4 border-primary' : 'border-l-4 border-transparent'
                }`}
                onClick={() => setActiveTab('support')}
              >
                <Headphones className={`h-5 w-5 ${activeTab === 'support' ? 'text-primary' : 'text-green-500'}`} />
                <span className={`text-sm font-medium ${activeTab === 'support' ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                  Customer Support
                </span>
              </a>
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
                 <span className="text-display text-2xl font-bold text-muted-foreground/30 uppercase tracking-widest">Divine Hub</span>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 w-full bg-background rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-full lg:h-[700px]">
            
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-background z-10 sticky top-0">
              <button className="p-1 hover:bg-secondary rounded-md transition">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold">
                {activeTab === 'delivery' ? 'Delivery & Location Details' : 'My Orders'}
              </h1>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-muted/5">
              {activeTab === 'delivery' ? (
                <div className="p-6 md:p-8 max-w-2xl">
                  
                  {/* Saved Addresses View */}
                  {addresses.length > 0 && !isAddingNew && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Saved Addresses</h2>
                      </div>
                      
                      <div className="grid gap-4">
                        {addresses.map((addr) => (
                          <div key={addr.id} className="relative p-5 rounded-xl border-2 border-primary/20 bg-primary/5 cursor-pointer hover:border-primary transition shadow-sm">
                            <div className="flex items-start gap-4">
                              <div className="mt-1">
                                {addr.type === 'home' && <Home className="h-5 w-5 text-primary" />}
                                {addr.type === 'office' && <Briefcase className="h-5 w-5 text-primary" />}
                                {addr.type === 'hostel' && <Building className="h-5 w-5 text-primary" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-foreground capitalize">{addr.type}</h3>
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">{addr.name}</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {addr.houseNo ? `${addr.houseNo}, ` : ''}{addr.address}<br/>
                                  {addr.location}, {addr.city}, {addr.state} - {addr.pincode}
                                </p>
                                <p className="text-sm font-medium mt-2 text-foreground">Phone: {addr.phone}</p>
                              </div>
                            </div>
                            
                            {/* Checkmark icon for selection indication */}
                            <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-border mt-8">
                        <button 
                          onClick={() => setIsAddingNew(true)}
                          className="w-full md:w-auto px-6 py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition"
                        >
                          + Add New Location
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Address Form */}
                  {(addresses.length === 0 || isAddingNew) && (
                    <div>
                      {addresses.length > 0 && (
                        <button 
                          onClick={() => setIsAddingNew(false)}
                          className="text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" /> Back to saved addresses
                        </button>
                      )}
                      
                      <p className="text-sm text-muted-foreground mb-6">
                        Enter your delivery location details so we can ensure your divine pooja items reach you safely.
                      </p>

                      <form onSubmit={handleSaveAddress} className="space-y-6">
                        
                        {/* Address Type Selection */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-foreground">Save address as</label>
                          <div className="flex gap-3">
                            <label className="flex-1 cursor-pointer">
                              <input type="radio" name="type" value="home" defaultChecked className="peer sr-only" />
                              <div className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition font-medium text-sm">
                                <Home className="h-4 w-4" /> Home
                              </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                              <input type="radio" name="type" value="office" className="peer sr-only" />
                              <div className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition font-medium text-sm">
                                <Briefcase className="h-4 w-4" /> Office
                              </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                              <input type="radio" name="type" value="hostel" className="peer sr-only" />
                              <div className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition font-medium text-sm">
                                <Building className="h-4 w-4" /> Hostel
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Full Name</label>
                            <input 
                              type="text" 
                              name="name"
                              defaultValue={user.name}
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Phone Number</label>
                            <input 
                              type="tel" 
                              name="phone"
                              defaultValue={user.phone}
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Location / Area</label>
                            <input 
                              type="text" 
                              name="location"
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              placeholder="E.g. Andheri West"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">House / Flat No. <span className="text-muted-foreground font-normal">(Optional)</span></label>
                            <input 
                              type="text" 
                              name="houseNo"
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              placeholder="E.g. Flat 402"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-foreground">Complete Address</label>
                          <textarea 
                            name="address"
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none h-20" 
                            placeholder="Building Name, Street Name, Landmark"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">City</label>
                            <input 
                              type="text" 
                              name="city"
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              required
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-1">
                            <label className="text-sm font-medium text-foreground">State</label>
                            <input 
                              type="text" 
                              name="state"
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              required
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-1">
                            <label className="text-sm font-medium text-foreground">Pincode</label>
                            <input 
                              type="text" 
                              name="pincode"
                              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50" 
                              required
                            />
                          </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                          <button 
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition shadow-warm"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              ) : (
                <div className="p-4 md:p-6 space-y-4">
                  {isLoadingOrders ? (
                    <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                  ) : orders.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground">You have no orders yet.</div>
                  ) : orders.map((order) => (
                    <div key={order.id} className="bg-background rounded-xl border border-border p-5 shadow-sm">
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex flex-col gap-1 text-sm bg-secondary/20 px-3 py-1.5 rounded border border-border">
                            <span className="font-medium">{item.qty}x {item.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="flex items-center gap-1.5 text-sm font-bold text-foreground capitalize">
                            {order.status === "Delivered" ? (
                              <>Order Delivered <CheckCircle2 className="h-4 w-4 text-green-500" /></>
                            ) : order.status === "Cancelled" ? (
                              <>Order Cancelled <XCircle className="h-4 w-4 text-red-500" /></>
                            ) : (
                              <>Order {order.status} <ShoppingBag className="h-4 w-4 text-primary" /></>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">Placed at {new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm font-bold shrink-0">
                          ₹{order.total_amount} <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      {order.delivery_instructions && (
                        <div className="text-sm bg-yellow-50 text-yellow-800 p-3 rounded-md border border-yellow-200 mt-3">
                          <strong className="block mb-1 text-yellow-900">Delivery Instructions / Location:</strong>
                          {renderInstructions(order.delivery_instructions)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

