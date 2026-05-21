import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate({ to: "/profile" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      login(name, phone);
      navigate({ to: "/profile" });
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-display text-4xl font-semibold text-primary">Welcome Back</h1>
        <p className="mt-2 text-muted-foreground">Sign in to manage your orders</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full bg-card border border-border rounded-xl p-6 shadow-warm">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition shadow-warm"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
