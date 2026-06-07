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
import { DivineScrollBackground } from "@/components/site/DivineScrollBackground";
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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


import { WholesaleCartProvider } from "@/lib/wholesale-cart";
import { useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate({ to: '/login' });
    }
  }, [user, location.pathname, navigate]);

  if (!user && location.pathname !== '/login') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouter().state;
  const location = routerState.location;
  const isHome = location.pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WholesaleCartProvider>
            <AuthGuard>
              <DivineScrollBackground />
              <div className="min-h-screen flex flex-col relative z-0">
                <Navbar />
                <main className={`flex-1 ${!isHome && location.pathname !== '/login' ? 'pt-16 md:pt-20' : ''}`}>
                  <Outlet />
                </main>
                <Footer />
                <ChatWidget />
                <SpiritualCursor />
              </div>
            </AuthGuard>
          </WholesaleCartProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
