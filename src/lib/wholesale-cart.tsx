import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./types";

type CartItem = { product: Product; qty: number };
type WholesaleCartCtx = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const WholesaleCtx = createContext<WholesaleCartCtx | null>(null);

export function WholesaleCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("dp-wholesale-cart");
      if (raw) {
        // We now save the entire items array to localStorage to support dynamic Supabase products
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const hydrated = parsed.filter(i => i && i.product && i.product.id) as CartItem[];
          setItems(hydrated);
        }
      }
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("dp-wholesale-cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product) => {
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product, qty: 1 }];
    });
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0); // Bulk pricing can be applied here later if needed

  return (
    <WholesaleCtx.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </WholesaleCtx.Provider>
  );
}

export function useWholesaleCart() {
  const c = useContext(WholesaleCtx);
  if (!c) throw new Error("useWholesaleCart must be used within WholesaleCartProvider");
  return c;
}
