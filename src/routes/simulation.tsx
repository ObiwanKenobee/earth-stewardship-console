import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChamberScaffold } from "@/components/ChamberScaffold";

type OutcomeKey =
  | "economy"
  | "carbon"
  | "employment"
  | "health"
  | "water"
  | "resilience"
  | "equity"
  | "biodiversity";

const OUTCOME_META: { key: OutcomeKey; label: string; unit: string; tone: string; good: "up" | "down" }[] = [
  { key: "economy", label: "Economy", unit: "%", tone: "verdant", good: "up" },
  { key: "carbon", label: "Carbon", unit: "Mt/yr", tone: "aurora", good: "down" },
  { key: "employment", label: "Employment", unit: "jobs", tone: "verdant", good: "up" },
  { key: "health", label: "Public health", unit: "QALY/1k", tone: "aurora", good: "up" },
  { key: "water", label: "Water", unit: "%", tone: "solar", good: "up" },
  { key: "resilience", label: "Resilience", unit: "%", tone: "verdant", good: "up" },
  { key: "equity", label: "Equity", unit: "Gini Δ", tone: "aurora", good: "down" },
  { key: "biodiversity", label: "Biodiversity", unit: "%", tone: "verdant", good: "up" },
];

type Intervention = {
  id: string;
  label: string;
  eyebrow: string;
  effects: Partial<Record<OutcomeKey, number>>;
  uncertainty: number;
  benefits: string[];
  harms: string[];
};

const INTERVENTIONS: Intervention[] = [
  {
    id: "dam",
    label: "Construct a dam",
    eyebrow: "Water · Energy",
    effects: { economy: 1.1, carbon: -0.4, employment: 6200, water: -4.2, resilience: 4, equity: 0.05, biodiversity: -3.1 },
    uncertainty: 18,
    benefits: ["Firm hydropower for 3 grid regions", "Irrigation for 220k hectares"],
    harms: ["Riparian ecosystem loss", "Displacement risk in 3 downstream districts"],
  },
  {
    id: "rail",
    label: "Expand a railway",
    eyebrow: "Mobility",
    effects: { economy: 1.4, carbon: -0.8, employment: 9800, health: 0.3, resilience: 5, equity: -0.03 },
    uncertainty: 12,
    benefits: ["Freight mode-shift from road", "Regional labor markets integrate"],
    harms: ["Right-of-way disputes", "Habitat fragmentation on 2 corridors"],
  },
  {
    id: "forest",
    label: "Restore a forest",
    eyebrow: "Land · Climate",
    effects: { carbon: -2.1, health: 0.4, water: 3.1, resilience: 8, biodiversity: 6.4, employment: 3400, equity: -0.04 },
    uncertainty: 14,
    benefits: ["Long-run carbon sink", "Watershed and pollinator recovery"],
    harms: ["Short-term crop-land tradeoff for local farmers"],
  },
  {
    id: "clinics",
    label: "Deploy clinics",
    eyebrow: "Health",
    effects: { health: 1.2, employment: 5400, resilience: 6, equity: -0.06, economy: 0.4 },
    uncertainty: 9,
    benefits: ["Primary care access in 180 villages", "Maternal outcomes improve"],
    harms: ["Recurring staffing cost without training pipeline"],
  },
  {
    id: "solar",
    label: "Build solar farms",
    eyebrow: "Energy · Climate",
    effects: { carbon: -1.6, economy: 0.9, employment: 7100, resilience: 5, water: 1.2, equity: -0.02, biodiversity: -1.1 },
    uncertainty: 11,
    benefits: ["Zero-fuel generation", "Local revenue via community solar shares"],
    harms: ["Arid-land ecosystem disturbance if poorly sited"],
  },
];

const FMT: Record<string, (n: number) => string> = {
  "%": (n) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`,
  "Mt/yr": (n) => `${n > 0 ? "+" : ""}${n.toFixed(1)} Mt/yr`,
  jobs: (n) => `${n > 0 ? "+" : ""}${Math.round(n).toLocaleString()}`,
  "QALY/1k": (n) => `${n > 0 ? "+" : ""}${n.toFixed(2)} QALY/1k`,
  "Gini Δ": (n) => `${n > 0 ? "+" : ""}${n.toFixed(2)}`,
};

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Simulation Studio · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Compose interventions and read their projected benefits and potential harms with honest uncertainty ranges.",
      },
    ],
  }),
  component: SimulationChamber,
});

function SimulationChamber() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["forest", "clinics", "solar"]));
  const [ran, setRan] = useState(0);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const active = INTERVENTIONS.filter((i) => selected.has(i.id));

  const composite = useMemo(() => {
    const acc: Partial<Record<OutcomeKey, number>> = {};
    for (const i of active) {
      for (const [k, v] of Object.entries(i.effects) as [OutcomeKey, number][]) {
        acc[k] = (acc[k] ?? 0) + v;
      }
    }
    return acc;
  }, [active]);

  const uncertainty = active.length
    ? Math.round(
        Math.sqrt(active.reduce((s, i) => s + i.uncertainty ** 2, 0)) / Math.sqrt(active.length),
      )
    : 0;

  const benefits = active.flatMap((i) => i.benefits.map((b) => ({ from: i.label, text: b })));
  const harms = active.flatMap((i) => i.harms.map((h) => ({ from: i.label, text: h })));

  return (
    <ChamberScaffold
      eyebrow="Chamber IV · Simulation Studio"
      title="Test tomorrow, before it arrives."
      lede="Compose interventions and read their projected outcomes with honest uncertainty. No false certainty — only better questions."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="glass-panel rounded-2xl p-6">
          <div className="text-eyebrow">Interventions</div>
          <div className="mt-4 space-y-2">
            {INTERVENTIONS.map((i) => {
              const on = selected.has(i.id);
              return (
                <label
                  key={i.id}
                  className="glass-inset flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm transition"
                  style={{
                    borderColor: on ? "var(--primary)" : "var(--glass-border)",
                    background: on
                      ? "linear-gradient(135deg, oklch(0.78 0.13 195 / 0.15), transparent)"
                      : undefined,
                  }}
                >
                  <span>
                    <span className="block">{i.label}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {i.eyebrow}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(i.id)}
                    className="accent-[color:var(--primary)]"
                  />
                </label>
              );
            })}
          </div>
          <button
            onClick={() => setRan((r) => r + 1)}
            disabled={active.length === 0}
            className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110 disabled:opacity-50"
          >
            {active.length === 0 ? "Select an intervention" : `Run scenario · ${active.length} selected`}
          </button>
          {ran > 0 && (
            <div className="mt-3 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Run #{ran} · 10-year horizon
            </div>
          )}
        </div>

        <div className="glass-panel rounded-2xl p-6" key={`${[...selected].join("-")}-${ran}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-eyebrow">Projected outcomes · 10-year horizon</div>
              <div className="text-display mt-1 text-2xl">
                {active.length === 0
                  ? "No composition"
                  : active.length === 1
                    ? active[0].label
                    : `Composite of ${active.length} interventions`}
              </div>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              uncertainty ±{uncertainty}%
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {OUTCOME_META.map((m) => {
              const v = composite[m.key] ?? 0;
              const good = m.good === "up" ? v > 0 : v < 0;
              const magnitude = Math.min(100, Math.abs(v) * (m.unit === "jobs" ? 0.008 : m.unit === "Gini Δ" ? 400 : 12));
              return (
                <div key={m.key} className="glass-inset rounded-xl p-4 animate-rise">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                  <div
                    className="text-display mt-1 text-xl"
                    style={{ color: `var(--${good ? "verdant" : v === 0 ? "aurora" : "signal"})` }}
                  >
                    {v === 0 ? "—" : FMT[m.unit](v)}
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{
                        width: `${magnitude}%`,
                        background: `var(--${good ? "verdant" : "signal"})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-verdant/25 bg-verdant/5 p-4">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-verdant shadow-[0_0_8px_var(--verdant)]" />
                <div className="text-eyebrow">Expected benefits</div>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {benefits.length === 0 && (
                  <li className="text-muted-foreground">Select interventions to project benefits.</li>
                )}
                {benefits.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-verdant" />
                    <span>
                      <span className="text-foreground">{b.text}</span>
                      <span className="ml-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        · {b.from}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-signal/25 bg-signal/5 p-4">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--signal)]" />
                <div className="text-eyebrow">Potential harms</div>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {harms.length === 0 && (
                  <li className="text-muted-foreground">No harms projected. Council review still required.</li>
                )}
                {harms.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-signal" />
                    <span>
                      <span className="text-foreground">{h.text}</span>
                      <span className="ml-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        · {h.from}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-glass-border p-4 text-sm text-muted-foreground">
            <span className="text-foreground">Ethics note.</span>{" "}
            {harms.length > 0
              ? "Downstream harms detected. Council review is required before deployment."
              : "No harms detected in composition, but affected communities must still be consulted."}
          </div>
        </div>
      </div>
    </ChamberScaffold>
  );
}
