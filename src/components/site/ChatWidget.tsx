import { useState } from "react";
import { MessageCircle, X, Send, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Msg = { from: "bot" | "user"; text: string };

const OPTIONS = ["Track My Order", "Wholesale Inquiry", "Talk to Human"] as const;

const RESPONSES: Record<string, string> = {
  "Track My Order":
    "Please share your order ID (e.g. DP-12345). Our team will share real-time status on WhatsApp.",
  "Wholesale Inquiry":
    "We offer tiered bulk pricing on 50+ units. Tap below to chat on WhatsApp for a custom quote.",
  "Talk to Human": "Connecting you to our care team — they're available 9 AM to 8 PM, Mon–Sat.",
};

const WHATSAPP = "https://wa.me/919032597329?text=Hi%20Divine%20Hub";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Namaste 🙏 How can we help you today?" },
  ]);

  const handle = (option: string) => {
    setMsgs((m) => [
      ...m,
      { from: "user", text: option },
      { from: "bot", text: RESPONSES[option] },
    ]);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-gradient-gold text-primary-foreground shadow-warm hover:scale-105 transition grid place-items-center"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Floating Track Order Button */}
      <Link
        to="/profile?tab=orders"
        className={`fixed right-5 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-background text-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border hover:scale-105 transition-all duration-300 font-semibold text-sm ${open ? 'bottom-[400px] opacity-0 pointer-events-none' : 'bottom-24 opacity-100'}`}
      >
        <ShoppingCart className="w-4 h-4 text-primary" />
        Track Order
      </Link>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] rounded-xl border border-border bg-card shadow-warm overflow-hidden flex flex-col">
          <div className="bg-gradient-gold text-primary-foreground px-4 py-3">
            <p className="font-semibold">Divine Hub Care</p>
            <p className="text-xs opacity-90">Typically replies in minutes</p>
          </div>
          <div className="p-4 space-y-3 max-h-72 overflow-y-auto bg-background">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "bot" ? "flex" : "flex justify-end"}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.from === "bot" ? "bg-secondary text-foreground" : "bg-accent text-accent-foreground"}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border space-y-2">
            <div className="flex flex-wrap gap-2">
              {OPTIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => handle(o)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition"
                >
                  {o}
                </button>
              ))}
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-sm font-medium py-2 rounded-md hover:opacity-90 transition"
            >
              <Send className="h-4 w-4" /> Continue on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}

