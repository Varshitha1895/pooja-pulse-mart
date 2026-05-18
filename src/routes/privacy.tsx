import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Divine Purity" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 prose">
      <h1 className="text-display text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">We collect only what's needed to fulfill your order. We never sell your data. Contact us anytime to delete your account.</p>
    </div>
  ),
});
