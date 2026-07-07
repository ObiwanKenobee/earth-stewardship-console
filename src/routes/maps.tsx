import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChamberScaffold } from "@/components/ChamberScaffold";

type LayerId = "population" | "health" | "water" | "energy" | "climate";

const LAYERS: {
  id: LayerId;
  label: string;
  hue: string;
  color: string;
  reading: string;
  sources: number;
  description: string;
}[] = [
  {
    id: "population",
    label: "Population",
    hue: "285",
    color: "oklch(0.72 0.18 285)",
    reading: "8.14B · 62% urban",
    sources: 38,
    description: "Human density, migration corridors, urban cores.",
  },
  {
    id: "health",
    label: "Health",
    hue: "155",
    color: "oklch(0.75 0.16 155)",
    reading: "Life expectancy 73.1y",
    sources: 26,
    description: "Disease surveillance, clinic access, air quality.",
  },
  {
    id: "water",
    label: "Water",
    hue: "225",
    color: "oklch(0.75 0.14 225)",
    reading: "39.8k km³ freshwater flux",
    sources: 41,
    description: "Rivers, aquifers, drought and flood signals.",
  },
  {
    id: "energy",
    label: "Energy",
    hue: "75",
    color: "oklch(0.82 0.15 75)",
    reading: "178 TWh · 42% renewable",
    sources: 33,
    description: "Grids, generation mix, load convergence.",
  },
  {
    id: "climate",
    label: "Climate",
    hue: "30",
    color: "oklch(0.72 0.19 30)",
    reading: "+1.28°C anomaly",
    sources: 47,
    description: "Temperature, precipitation, atmospheric composition.",
  },
];

function LayerBlob({
  hue,
  x,
  y,
  size,
  opacity,
}: {
  hue: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
}) {
  return (
    <div
      className="pointer-events-none absolute rounded-full mix-blend-screen transition-[opacity,transform] duration-[1200ms] ease-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        aspectRatio: "1",
        transform: "translate(-50%, -50%)",
        opacity,
        background: `radial-gradient(circle, oklch(0.75 0.16 ${hue} / 0.75), transparent 65%)`,
        filter: "blur(28px)",
      }}
    />
  );
}

export const Route = createFileRoute("/maps")({
  head: () => ({
    meta: [
      { title: "Maps · Atlas Sanctum" },
      {
        name: "description",
        content:
          "The living cartography of Earth — climate, ecosystems, infrastructure, and human systems as one map.",
      },
    ],
  }),
  component: MapsChamber,
});

function MapsChamber() {
  const [active, setActive] = useState<Set<LayerId>>(
    new Set<LayerId>(["water", "climate"]),
  );
  const [intensity, setIntensity] = useState(70);

  const toggle = (id: LayerId) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const activeLayers = LAYERS.filter((l) => active.has(l.id));
  const totalSources = activeLayers.reduce((s, l) => s + l.sources, 0);

  return (
    <ChamberScaffold
      eyebrow="Chamber II · Maps"
      title="The living cartography."
      lede="Every layer is a way of seeing the same Earth. Population, water, biodiversity, energy, climate — merged smoothly, never abruptly."
    >
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {LAYERS.map((l) => {
          const on = active.has(l.id);
          return (
            <button
              key={l.id}
              onClick={() => toggle(l.id)}
              aria-pressed={on}
              className="group flex items-center gap-2 rounded-full px-4 py-1.5 text-xs transition"
              style={{
                background: on
                  ? `linear-gradient(135deg, oklch(0.75 0.16 ${l.hue} / 0.22), transparent)`
                  : "transparent",
                border: `1px solid ${on ? l.color : "var(--glass-border)"}`,
                color: on ? l.color : "var(--muted-foreground)",
              }}
            >
              <span
                className="size-1.5 rounded-full transition"
                style={{
                  background: l.color,
                  boxShadow: on ? `0 0 10px ${l.color}` : "none",
                  opacity: on ? 1 : 0.4,
                }}
              />
              {l.label}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Blend</span>
          <input
            type="range"
            min={20}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="h-1 w-32 accent-[color:var(--primary)]"
          />
          <span className="font-mono">{intensity}%</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-panel relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
          <div className="absolute inset-0 topo-surface opacity-40" />
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ background: "var(--gradient-aurora)", opacity: 0.5 }}
          />

          {/* smoothly blended layer blobs — one per active layer */}
          <LayerBlob hue="285" x={22} y={30} size={38} opacity={active.has("population") ? intensity / 140 : 0} />
          <LayerBlob hue="285" x={72} y={62} size={30} opacity={active.has("population") ? intensity / 160 : 0} />
          <LayerBlob hue="155" x={40} y={70} size={34} opacity={active.has("health") ? intensity / 150 : 0} />
          <LayerBlob hue="225" x={58} y={38} size={44} opacity={active.has("water") ? intensity / 130 : 0} />
          <LayerBlob hue="225" x={18} y={72} size={28} opacity={active.has("water") ? intensity / 170 : 0} />
          <LayerBlob hue="75" x={80} y={28} size={32} opacity={active.has("energy") ? intensity / 150 : 0} />
          <LayerBlob hue="30" x={50} y={50} size={60} opacity={active.has("climate") ? intensity / 180 : 0} />

          {/* graticule */}
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 62.5" preserveAspectRatio="none">
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                x2="100"
                y1={(i + 1) * 6.25}
                y2={(i + 1) * 6.25}
                stroke="oklch(0.78 0.13 195 / 0.25)"
                strokeWidth="0.08"
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`v${i}`}
                y1="0"
                y2="62.5"
                x1={(i + 1) * 6.25}
                x2={(i + 1) * 6.25}
                stroke="oklch(0.78 0.13 195 / 0.25)"
                strokeWidth="0.08"
              />
            ))}
          </svg>

          <div className="absolute inset-6 rounded-2xl border border-primary/20" />
          <div className="absolute left-8 top-8 text-eyebrow">
            Composite view · {totalSources} sources streaming
          </div>
          <div className="absolute bottom-8 left-8 max-w-md">
            <div className="text-display text-3xl">
              {activeLayers.length === 0
                ? "Choose a layer to reveal the world."
                : activeLayers.map((l) => l.label).join(" · ")}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {activeLayers.length === 0
                ? "The Earth waits, quiet."
                : "Layers are blending. No boundaries, only relationships."}
            </div>
          </div>
        </div>

        <aside className="glass-panel flex flex-col gap-4 rounded-3xl p-6">
          <div>
            <div className="text-eyebrow">Active layers</div>
            <div className="text-display mt-1 text-2xl">
              {activeLayers.length} of {LAYERS.length}
            </div>
          </div>
          <div className="space-y-3">
            {activeLayers.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No layers active. Tap a layer above to bring it into the composite.
              </p>
            )}
            {activeLayers.map((l) => (
              <div key={l.id} className="glass-inset rounded-xl p-4 animate-rise">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }}
                    />
                    {l.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {l.sources} sources
                  </span>
                </div>
                <div className="text-display mt-2 text-lg" style={{ color: l.color }}>
                  {l.reading}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{l.description}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </ChamberScaffold>
  );
}
