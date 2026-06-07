import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "./supabase";

interface User {
  name: string;
  phone: string;
  avatar_url?: string;
  address?: string;
  locationArea?: string;
  houseNo?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, phone: string) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("pooja_pulse_user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error("Failed to parse user from local storage");
        }
      }
    }
    return null;
  });

  // Background Sync: Recover stranded local reviews and push them to Supabase
  useEffect(() => {
    const syncStrandedReviews = async () => {
      try {
        const localReviews = JSON.parse(localStorage.getItem('dp_reviews') || '[]');
        if (localReviews.length === 0) return;
        
        let updated = false;
        for (const review of localReviews) {
          if (review.synced) continue;
          
          const { data: order } = await supabase.from('orders').select('delivery_instructions').eq('id', review.orderId).single();
          if (order) {
            const currentInst = order.delivery_instructions || '';
            if (!currentInst.includes('||REVIEW||')) {
              const newInst = currentInst + (currentInst ? " " : "") + `||REVIEW||${review.rating}||${review.feedback}`;
              await supabase.from('orders').update({ delivery_instructions: newInst }).eq('id', review.orderId);
            }
          }
          review.synced = true;
          updated = true;
        }
        
        if (updated) {
          localStorage.setItem('dp_reviews', JSON.stringify(localReviews));
        }
      } catch (err) {
        console.error("Failed to sync stranded reviews:", err);
      }
    };
    
    // Give the app a few seconds to load before running background sync
    const timer = setTimeout(syncStrandedReviews, 3000);
    return () => clearTimeout(timer);
  }, []);

  const login = (name: string, phone: string) => {
    const newUser = { name, phone };
    setUser(newUser);
    localStorage.setItem("pooja_pulse_user", JSON.stringify(newUser));
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updates };
      setUser(newUser);
      localStorage.setItem("pooja_pulse_user", JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pooja_pulse_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
