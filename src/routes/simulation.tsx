import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold } from "@/components/ChamberScaffold";

const outcomes = [
  { k: "Economy", v: "+2.1%", tone: "verdant" },
  { k: "Carbon", v: "−1.4 Mt/yr", tone: "aurora" },
  { k: "Employment", v: "+18,400", tone: "verdant" },
  { k: "Public Health", v: "+0.6 QALY/1k", tone: "aurora" },
  { k: "Water", v: "−4.2%", tone: "solar" },
  { k: "Resilience", v: "+11%", tone: "verdant" },
  { k: "Equity", v: "+0.08 Gini", tone: "aurora" },
  { k: "Biodiversity", v: "+3.1%", tone: "verdant" },
];

const options = [
  "Construct a dam","Expand a railway","Restore a forest","Deploy clinics",
  "Build solar farms","Reduce emissions","Introduce new policy",
];

export const Route = createFileRoute("/simulation")({
  head: () => ({ meta: [{ title: "Simulation Studio · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold
      eyebrow="Chamber IV · Simulation Studio"
      title="Test tomorrow, before it arrives."
      lede="Every simulation reports outcomes with uncertainty ranges — no false certainty, only better questions."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="glass-panel rounded-2xl p-6">
          <div className="text-eyebrow">Interventions</div>
          <div className="mt-4 space-y-2">
            {options.map((o, i) => (
              <label key={o} className="glass-inset flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm">
                <span>{o}</span>
                <input type="checkbox" defaultChecked={i < 3} className="accent-[color:var(--primary)]" />
              </label>
            ))}
          </div>
          <button className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm text-primary-foreground shadow-[var(--shadow-glow)]">
            Run scenario
          </button>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-eyebrow">Projected outcomes · 10-year horizon</div>
              <div className="text-display mt-1 text-2xl">Composite intervention · A</div>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              uncertainty ±14%
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.k} className="glass-inset rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{o.k}</div>
                <div className="text-display mt-1 text-xl" style={{ color: `var(--${o.tone})` }}>{o.v}</div>
                <div className="mt-3 h-1.5 rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${40 + Math.random() * 55}%`, background: `var(--${o.tone})` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-glass-border p-4 text-sm text-muted-foreground">
            <span className="text-foreground">Ethics note.</span> Water reduction in 3 downstream districts requires council review before deployment.
          </div>
        </div>
      </div>
    </ChamberScaffold>
  ),
});
