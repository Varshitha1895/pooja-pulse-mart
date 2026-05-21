import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-display text-2xl text-primary font-semibold">Divine Purity</h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Curated premium pooja essentials. Trusted by households and temples across India.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/retail" className="hover:text-accent">
                Retail Store
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="hover:text-accent">
                Wholesale
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-accent">
                All Products
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-accent">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-5 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Divine Purity. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="hover:text-accent">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-accent">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-accent">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
