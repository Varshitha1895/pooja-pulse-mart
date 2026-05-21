import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ChatWidget } from "@/components/site/ChatWidget";
import { SpiritualCursor } from "@/components/site/SpiritualCursor";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-7xl font-bold text-primary">404</h1>
        <p className="mt-3 text-muted-foreground">This page is not in our pooja shelf.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-md bg-gradient-gold text-primary-foreground font-medium"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
          >
            Try again
          </button>
          <a href="/" className="px-4 py-2 rounded-md border border-input text-sm">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Divine Purity — Premium Pooja Essentials" },
      {
        name: "description",
        content:
          "Curated premium essentials for your daily spiritual practice. Wholesale & retail.",
      },
      { property: "og:title", content: "Divine Purity — Premium Pooja Essentials" },
      {
        property: "og:description",
        content: "Curated premium essentials for your daily spiritual practice.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { WholesaleCartProvider } from "@/lib/wholesale-cart";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WholesaleCartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
              <ChatWidget />
              <SpiritualCursor />
            </div>
          </WholesaleCartProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
