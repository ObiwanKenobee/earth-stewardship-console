import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChamberScaffold } from "@/components/ChamberScaffold";

type NodeId =
  | "river"
  | "agri"
  | "food"
  | "mig"
  | "emp"
  | "hlth"
  | "edu"
  | "econ"
  | "biodiv"
  | "energy";

type Node = {
  id: NodeId;
  label: string;
  sector: string;
  x: number;
  y: number;
  detail: string;
};

const NODES: Node[] = [
  { id: "river", label: "River", sector: "Water", x: 50, y: 8, detail: "Freshwater flux and seasonal pulse — origin of most cascades." },
  { id: "agri", label: "Agriculture", sector: "Land", x: 18, y: 28, detail: "Crops depend on river timing; yields shape food supply and rural employment." },
  { id: "biodiv", label: "Biodiversity", sector: "Ecology", x: 82, y: 28, detail: "Riparian ecosystems and pollinators underwrite agriculture and public health." },
  { id: "food", label: "Food security", sector: "Human", x: 40, y: 46, detail: "Aggregate access to nutrition. Volatility ripples into migration and health." },
  { id: "energy", label: "Energy", sector: "Infrastructure", x: 60, y: 46, detail: "Grid stability affects irrigation, cold-chain, hospitals, and mobility." },
  { id: "mig", label: "Migration", sector: "Human", x: 78, y: 62, detail: "People move when food, water, or work falter — a signal, not a failure." },
  { id: "emp", label: "Employment", sector: "Economy", x: 22, y: 62, detail: "Livelihood density stabilizes families and moderates displacement." },
  { id: "hlth", label: "Health", sector: "Human", x: 50, y: 76, detail: "Clinical capacity + air, water, nutrition; the body of the whole system." },
  { id: "edu", label: "Education", sector: "Human", x: 78, y: 88, detail: "Learning capacity converts today's crises into tomorrow's resilience." },
  { id: "econ", label: "Economic growth", sector: "Economy", x: 40, y: 94, detail: "A downstream reading — not a cause. Rises with equity, falls with fragility." },
];

const EDGES: [NodeId, NodeId][] = [
  ["river", "agri"], ["river", "biodiv"], ["river", "energy"],
  ["agri", "food"], ["biodiv", "food"], ["biodiv", "hlth"],
  ["food", "mig"], ["food", "hlth"], ["food", "emp"],
  ["energy", "hlth"], ["energy", "emp"], ["energy", "econ"],
  ["mig", "emp"], ["emp", "econ"], ["hlth", "edu"], ["edu", "econ"], ["hlth", "econ"], ["agri", "emp"],
];

const CASCADES: Record<NodeId, { sector: string; effect: string; direction: "up" | "down" }[]> = {
  river: [
    { sector: "Agriculture", effect: "Irrigation windows shift; kharif planting delays 5–14 days.", direction: "down" },
    { sector: "Biodiversity", effect: "Riparian species stress; migratory birds re-route.", direction: "down" },
    { sector: "Energy", effect: "Hydro output varies ±18% seasonally.", direction: "down" },
  ],
  agri: [
    { sector: "Food security", effect: "Local supply thins; prices rise in 3–8 weeks.", direction: "down" },
    { sector: "Employment", effect: "Farm labor demand drops in rain-fed districts.", direction: "down" },
    { sector: "Migration", effect: "Seasonal outflow to cities climbs.", direction: "down" },
  ],
  biodiv: [
    { sector: "Health", effect: "Vector patterns shift; zoonotic exposure changes.", direction: "down" },
    { sector: "Agriculture", effect: "Pollinator loss trims yields 4–11%.", direction: "down" },
  ],
  food: [
    { sector: "Health", effect: "Micronutrient deficits rise in children under 5.", direction: "down" },
    { sector: "Migration", effect: "Household relocation decisions accelerate.", direction: "down" },
    { sector: "Employment", effect: "Informal food economy contracts.", direction: "down" },
  ],
  energy: [
    { sector: "Health", effect: "Cold-chain and dialysis reliability drops.", direction: "down" },
    { sector: "Economic growth", effect: "Industrial output falls with outage minutes.", direction: "down" },
    { sector: "Employment", effect: "Shift work and small manufacturing at risk.", direction: "down" },
  ],
  mig: [
    { sector: "Employment", effect: "Urban labor pools swell; wages compress.", direction: "down" },
    { sector: "Food security", effect: "Origin communities lose remittance if flows break.", direction: "up" },
  ],
  emp: [
    { sector: "Economic growth", effect: "Household demand strengthens or weakens.", direction: "down" },
    { sector: "Agriculture", effect: "Off-farm work stabilizes farm-family income.", direction: "up" },
  ],
  hlth: [
    { sector: "Education", effect: "School attendance tracks child health closely.", direction: "down" },
    { sector: "Economic growth", effect: "Working-age illness costs 2–5% of regional GDP.", direction: "down" },
    { sector: "Biodiversity", effect: "One-Health interventions co-benefit ecosystems.", direction: "up" },
  ],
  edu: [
    { sector: "Economic growth", effect: "Learning gains compound over 15–20 years.", direction: "down" },
    { sector: "Health", effect: "Health literacy reduces preventable disease.", direction: "up" },
  ],
  econ: [
    { sector: "Employment", effect: "Growth without equity does not lower fragility.", direction: "up" },
    { sector: "Education", effect: "Public spending expands access when equitable.", direction: "up" },
  ],
};

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph · Atlas Sanctum" },
      {
        name: "description",
        content: "Navigate the world as interconnected systems. Select any node to feel cascading effects across sectors.",
      },
    ],
  }),
  component: KnowledgeChamber,
});

function KnowledgeChamber() {
  const [selected, setSelected] = useState<NodeId>("river");
  const map = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NodeId, Node>, []);
  const neighbors = useMemo(() => {
    const s = new Set<NodeId>();
    for (const [a, b] of EDGES) {
      if (a === selected) s.add(b);
      if (b === selected) s.add(a);
    }
    return s;
  }, [selected]);

  const node = map[selected];
  const cascades = CASCADES[selected] ?? [];

  return (
    <ChamberScaffold
      eyebrow="Chamber III · Knowledge Graph"
      title="The world as interconnected systems."
      lede="Select any node to feel cascading effects across sectors. Rivers become agriculture become migration become economies."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="glass-panel relative rounded-3xl p-6">
          <svg viewBox="0 0 100 100" className="mx-auto block h-[560px] w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="edge-idle" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.14 195 / 0.35)" />
                <stop offset="100%" stopColor="oklch(0.62 0.18 285 / 0.35)" />
              </linearGradient>
              <linearGradient id="edge-live" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.14 195 / 1)" />
                <stop offset="100%" stopColor="oklch(0.62 0.18 285 / 1)" />
              </linearGradient>
            </defs>
            {EDGES.map(([a, b], i) => {
              const live = a === selected || b === selected;
              return (
                <line
                  key={i}
                  x1={map[a].x}
                  y1={map[a].y}
                  x2={map[b].x}
                  y2={map[b].y}
                  stroke={live ? "url(#edge-live)" : "url(#edge-idle)"}
                  strokeWidth={live ? 0.4 : 0.18}
                  opacity={live ? 1 : 0.5}
                  style={{ transition: "all 400ms ease" }}
                />
              );
            })}
            {NODES.map((n) => {
              const isSel = n.id === selected;
              const isNbr = neighbors.has(n.id);
              const dim = !isSel && !isNbr;
              const r = isSel ? 4.2 : isNbr ? 3.2 : 2.4;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x} ${n.y})`}
                  onClick={() => setSelected(n.id)}
                  style={{ cursor: "pointer", opacity: dim ? 0.45 : 1, transition: "opacity 300ms" }}
                >
                  <circle
                    r={r}
                    fill="oklch(0.18 0.03 240)"
                    stroke={isSel ? "oklch(0.82 0.15 75)" : "oklch(0.78 0.14 195)"}
                    strokeWidth={isSel ? 0.6 : 0.35}
                  />
                  <circle r={isSel ? 2.2 : 1.2} fill={isSel ? "oklch(0.82 0.15 75)" : "oklch(0.78 0.14 195)"}>
                    <animate attributeName="r" values={`${isSel ? 1.6 : 1};${isSel ? 2.6 : 1.8};${isSel ? 1.6 : 1}`} dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text
                    x="0"
                    y="-5"
                    textAnchor="middle"
                    fontSize={isSel ? 2.8 : 2.2}
                    fill="oklch(0.94 0.015 220)"
                    fontFamily="Inter Tight"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute left-6 top-6 text-eyebrow">Constellation · {NODES.length} systems · {EDGES.length} relations</div>
        </div>

        <aside className="glass-panel flex flex-col rounded-3xl p-6 animate-rise" key={selected}>
          <div className="text-eyebrow">{node.sector}</div>
          <h2 className="text-display mt-1 text-3xl">{node.label}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{node.detail}</p>

          <div className="mt-6">
            <div className="text-eyebrow">Related systems</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[...neighbors].map((nid) => (
                <button
                  key={nid}
                  onClick={() => setSelected(nid)}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary transition hover:border-primary hover:bg-primary/20"
                >
                  {map[nid].label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex-1">
            <div className="text-eyebrow">Cascading effects</div>
            <ul className="mt-3 space-y-2">
              {cascades.map((c) => (
                <li key={c.sector} className="glass-inset rounded-xl p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{c.sector}</span>
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: c.direction === "down" ? "var(--signal)" : "var(--verdant)" }}
                    >
                      {c.direction === "down" ? "downstream" : "upstream"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{c.effect}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </ChamberScaffold>
  );
}
