import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="glass-panel max-w-md rounded-2xl p-10 text-center">
        <p className="text-eyebrow">Uncharted coordinates</p>
        <h1 className="text-display mt-3 text-5xl">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This chamber of the observatory has not been mapped.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm text-primary transition hover:bg-primary/20"
        >
          Return to Earth
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="glass-panel max-w-md rounded-2xl p-10 text-center">
        <p className="text-eyebrow">Signal disturbance</p>
        <h1 className="text-display mt-3 text-3xl">The instrument faltered</h1>
        <p className="mt-3 text-sm text-muted-foreground">A transient anomaly interrupted this view.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition hover:brightness-110"
          >Recalibrate</button>
          <a href="/" className="rounded-full border border-glass-border px-5 py-2 text-sm hover:bg-white/5">Return to Earth</a>
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
      { title: "Atlas Sanctum — Planetary Stewardship Operating System" },
      {
        name: "description",
        content:
          "A living instrument for caring for the Earth. Observe, understand, simulate, and steward planetary systems from a single sacred command surface.",
      },
      { name: "theme-color", content: "#0b1220" },
      { property: "og:title", content: "Atlas Sanctum — Planetary Stewardship OS" },
      { property: "og:description", content: "Wisdom before power. A living instrument for caring for the Earth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

const chambers = [
  { to: "/", label: "Earth", glyph: "◐" },
  { to: "/maps", label: "Maps", glyph: "◉" },
  { to: "/knowledge", label: "Knowledge Graph", glyph: "✦" },
  { to: "/simulation", label: "Simulation", glyph: "◈" },
  { to: "/scenarios", label: "Scenarios", glyph: "◇" },
  { to: "/observatory", label: "Observatory", glyph: "☉" },
  { to: "/missions", label: "Stewardship", glyph: "✧" },
  { to: "/communities", label: "Communities", glyph: "❋" },
  { to: "/reports", label: "Reports", glyph: "▤" },
  { to: "/council", label: "AI Council", glyph: "❂" },
  { to: "/settings", label: "Settings", glyph: "⚙" },
] as const;

function Chambers() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Sanctum chambers" className="flex flex-col gap-1 p-3">
      <div className="px-3 pb-4 pt-2">
        <div className="text-eyebrow">Atlas</div>
        <div className="text-display text-2xl leading-none text-foreground">Sanctum</div>
        <div className="mt-2 h-px w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
      </div>
      {chambers.map((c) => {
        const active = pathname === c.to;
        return (
          <Link
            key={c.to}
            to={c.to}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
              active
                ? "bg-primary/10 text-foreground ring-1 ring-primary/30"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <span
              className={`grid size-7 place-items-center rounded-md border text-[11px] transition ${
                active
                  ? "border-primary/50 bg-primary/20 text-primary"
                  : "border-glass-border bg-white/[0.02] text-muted-foreground group-hover:text-primary"
              }`}
            >
              {c.glyph}
            </span>
            <span className="tracking-wide">{c.label}</span>
            {active && <span className="ml-auto size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />}
          </Link>
        );
      })}
      <div className="mt-auto p-3 pt-6">
        <div className="glass-inset rounded-lg p-3">
          <div className="text-eyebrow">System</div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 animate-shimmer rounded-full bg-verdant" />
            All instruments nominal
          </div>
        </div>
      </div>
    </nav>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-glass-border bg-sidebar/60 backdrop-blur-xl md:flex md:flex-col">
          <Chambers />
        </aside>
        <main className="relative flex-1">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
