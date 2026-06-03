import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Divine Hub" },
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
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get("name");
              const email = formData.get("email");
              const subject = formData.get("subject") || "New Customer Message from Website";
              const message = formData.get("message");
              
              try {
                const response = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    access_key: "9e67d1c6-6a47-444e-8d09-8497e028373b",
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                  }),
                });
                
                if (response.ok) {
                  setSent(true);
                } else {
                  alert("Something went wrong. Please try again.");
                }
              } catch (error) {
                alert("Something went wrong. Please check your internet connection.");
              }
            }}
            className="rounded-xl border border-border bg-card p-6 space-y-3"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                name="name"
                placeholder="Name"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="px-3 py-2.5 rounded-md border border-input bg-background"
              />
            </div>
            <input
              name="subject"
              placeholder="Subject"
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
            />
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Message"
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background"
            />
            <button type="submit" className="px-6 py-3 rounded-md bg-gradient-gold text-primary-foreground font-semibold">
              Send Message
            </button>
          </form>
        )}
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <Phone className="h-5 w-5 text-accent" />
            <p className="mt-2 font-semibold">+91 96763 98438</p>
            <p className="text-xs text-muted-foreground">Mon–Sat · 9 AM – 8 PM</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Mail className="h-5 w-5 text-accent" />
            <p className="mt-2 font-semibold text-sm sm:text-base break-all">durgabavani.poojaitems@gmail.com</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <MapPin className="h-5 w-5 text-accent" />
            <p className="mt-2 font-semibold">Hyderabad, Telangana</p>
            <p className="text-xs text-muted-foreground">Visits by appointment</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

