import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-primary bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-display text-2xl text-primary font-semibold">Divine Purity</h3>
          <p className="mt-4 text-sm text-background/70 max-w-md leading-relaxed">
            Curated premium pooja essentials. Trusted by households and temples across India.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Shop</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li>
              <Link to="/retail" className="hover:text-primary transition-colors">
                Retail Store
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="hover:text-primary transition-colors">
                Wholesale
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-primary transition-colors">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-background/60">
          <p>© {new Date().getFullYear()} Divine Purity. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
