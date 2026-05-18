import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

type CartItem = { product: Product; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("dp-cart");
      if (raw) {
        const parsed: { id: string; qty: number }[] = JSON.parse(raw);
        const hydrated = parsed
          .map((r) => {
            const product = products.find((p) => p.id === r.id);
            return product ? { product, qty: r.qty } : null;
          })
          .filter(Boolean) as CartItem[];
        setItems(hydrated);
      }
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("dp-cart", JSON.stringify(items.map((i) => ({ id: i.product.id, qty: i.qty }))));
  }, [items]);

  const add = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === id);
      if (existing) return prev.map((i) => i.product.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) => qty <= 0 ? prev.filter((i) => i.product.id !== id) : prev.map((i) => i.product.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
