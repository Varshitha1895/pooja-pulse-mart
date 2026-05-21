import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Divine Purity" },
      { name: "description", content: "Get in touch for wholesale enquiries and support." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-16">
      <p className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Get in Touch</p>
      <h1 className="mt-3 text-display text-5xl font-semibold">We'd love to hear from you</h1>

      <div className="mt-10 grid md:grid-cols-[1fr_320px] gap-8">
        {sent ? (
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-display text-2xl font-semibold text-accent">Message received 🙏</h2>
            <p className="mt-2 text-muted-foreground">We'll reply within one business day.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-xl border border-border bg-card p-6 space-y-3"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Name"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
            </div>
            <input
              placeholder="Subject"
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
            />
            <textarea
              required
              rows={5}
              placeholder="Message"
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
            />
            <button className="px-6 py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold">
              Send Message
            </button>
          </form>
        )}
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <Phone className="h-5 w-5 text-accent" />
            <p className="mt-2 font-semibold">+91 99999 99999</p>
            <p className="text-xs text-muted-foreground">Mon–Sat · 9 AM – 8 PM</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Mail className="h-5 w-5 text-accent" />
            <p className="mt-2 font-semibold">hello@divinepurity.in</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <MapPin className="h-5 w-5 text-accent" />
            <p className="mt-2 font-semibold">Chennai, Tamil Nadu</p>
            <p className="text-xs text-muted-foreground">Visits by appointment</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
