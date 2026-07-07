import type { ReactNode } from "react";

export function ChamberScaffold({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <div className="topo-surface relative min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <header>
          <p className="text-eyebrow">{eyebrow}</p>
          <h1 className="text-display mt-2 text-5xl leading-[1.05]">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{lede}</p>
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

export function PlaceholderGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <div key={it.title} className="glass-panel rounded-2xl p-6">
          <div className="text-eyebrow">module</div>
          <div className="text-display mt-2 text-xl">{it.title}</div>
          <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          <div className="mt-4 h-24 rounded-lg glass-inset animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
