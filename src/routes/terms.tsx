import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Divine Purity" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 prose">
      <h1 className="text-display text-4xl font-semibold">Terms of Service</h1>
      <p className="mt-4 text-muted-foreground">Orders are delivered next day by 6 PM. No returns are accepted after delivery. By placing an order, you agree to these terms.</p>
    </div>
  ),
});
