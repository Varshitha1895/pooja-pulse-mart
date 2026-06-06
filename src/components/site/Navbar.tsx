import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingCart, User, Menu, X, Package } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { useCart } from "@/lib/cart";
import { useWholesaleCart } from "@/lib/wholesale-cart";
import { useAuth } from "@/lib/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/retail", label: "Retail" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count: retailCount } = useCart();
  const { count: wholesaleCount } = useWholesaleCart();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const headerClasses = isTransparent
    ? "bg-transparent border-b border-transparent"
    : "backdrop-blur-md bg-background/85 border-b border-border shadow-sm";

  const textColor = isTransparent ? "text-white hover:text-white/80" : "text-foreground/80 hover:text-accent";
  const logoColor = isTransparent ? "text-white" : "text-primary";
  const iconColor = isTransparent ? "text-white hover:bg-white/20" : "text-foreground/80 hover:bg-secondary";

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerClasses}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="Divine Hub"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className={`hidden sm:block text-display text-xl font-semibold tracking-wide transition-colors duration-500 ${logoColor}`}>
            Divine Hub
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors duration-500 ${textColor}`}
              activeProps={{ className: isTransparent ? "font-bold text-white" : "text-accent font-bold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/profile"
              aria-label="Profile"
              title="Your Profile"
              className={`h-10 w-10 flex items-center justify-center rounded-full transition overflow-hidden shrink-0 ${isTransparent ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-primary/10 hover:bg-primary/20 ring-1 ring-primary/30 text-primary'}`}
            >
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-500 ${isTransparent ? 'bg-white text-black hover:bg-white/90' : 'bg-primary text-primary-foreground hover:opacity-90'}`}
              >
                <User className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/login"
                aria-label="Login"
                className={`sm:hidden h-10 w-10 grid place-items-center rounded-full transition-colors duration-500 ${iconColor}`}
              >
                <User className="h-5 w-5" />
              </Link>
            </>
          )}
          <div className="flex items-center gap-1">
            <Link
              to="/cart"
              aria-label="Retail Cart"
              title="Retail Cart"
              className={`relative h-10 w-10 grid place-items-center rounded-full transition-colors duration-500 ${iconColor}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {retailCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                  {retailCount}
                </span>
              )}
            </Link>
            <Link
              to="/wholesale-cart"
              aria-label="Wholesale Cart"
              title="Wholesale Quote Cart"
              className={`relative h-10 w-10 grid place-items-center rounded-full transition-colors duration-500 ${iconColor}`}
            >
              <Package className="h-5 w-5" />
              {wholesaleCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-foreground text-background text-[10px] font-bold">
                  {wholesaleCount}
                </span>
              )}
            </Link>
          </div>
          <button
            className={`md:hidden h-10 w-10 grid place-items-center rounded-full transition-colors duration-500 ml-1 ${iconColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-foreground/80 hover:text-accent transition-colors"
                activeProps={{ className: "text-accent font-semibold" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

