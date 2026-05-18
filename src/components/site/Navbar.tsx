import { Link } from "@tanstack/react-router";
import { ShoppingCart, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/retail", label: "Retail" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Divine Purity" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="hidden sm:block text-display text-xl text-primary font-semibold tracking-wide">Divine Purity</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button aria-label="Account" className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary transition">
            <User className="h-5 w-5 text-foreground/80" />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary transition">
            <ShoppingCart className="h-5 w-5 text-foreground/80" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="md:hidden border-t border-border overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-4 py-2 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="whitespace-nowrap text-foreground/70" activeProps={{ className: "text-accent font-semibold" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
