import { createFileRoute } from "@tanstack/react-router";
import { LivingGlobe } from "@/components/LivingGlobe";

export const Route = createFileRoute("/")({
  component: EarthHome,
});

const vitals = [
  { label: "Atmospheric CO₂", value: "421.7", unit: "ppm", trend: "+0.4 / mo", tone: "signal" },
  { label: "Global temperature Δ", value: "+1.28", unit: "°C", trend: "12-mo mean", tone: "solar" },
  { label: "Forest cover", value: "30.6", unit: "%", trend: "−0.11 / yr", tone: "verdant" },
  { label: "Freshwater flux", value: "39.8", unit: "k km³", trend: "stable", tone: "aurora" },
] as const;

const alerts = [
  { region: "Deccan Plateau", title: "Monsoon variance beyond ±2σ", horizon: "72h", severity: "elevated" },
  { region: "Sahel corridor", title: "Cascading food-security signal", horizon: "14d", severity: "watch" },
  { region: "California ISO", title: "Grid load convergence risk", horizon: "48h", severity: "elevated" },
];

const missions = [
  { title: "Restore Cerrado headwaters", partners: 14, impact: "high", ethics: "reviewed" },
  { title: "Cool-roof deployment · Karachi", partners: 6, impact: "moderate", ethics: "reviewed" },
  { title: "Coastal mangrove replant · Sundarbans", partners: 22, impact: "high", ethics: "reviewed" },
];

function EarthHome() {
  return (
    <div className="topo-surface relative min-h-dvh overflow-hidden">
      {/* aurora backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-aurora)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-eyebrow">Chamber I · Earth</p>
            <h1 className="text-display mt-2 text-5xl leading-[1.05] lg:text-6xl">
              A living instrument
              <br />
              for caring for the Earth.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Atlas Sanctum listens to the planet as a single organism — climate, ecosystems, infrastructure,
              and human life woven into one instrument of understanding.
            </p>
          </div>
          <div className="glass-panel flex items-center gap-6 rounded-full px-5 py-3 text-xs">
            <TimeReadout />
            <span className="h-4 w-px bg-glass-border" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="size-1.5 animate-shimmer rounded-full bg-verdant" />
              Streaming · 214 sources
            </span>
          </div>
        </header>

        {/* Globe + Intelligence */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="glass-panel relative flex flex-col items-center justify-center rounded-3xl p-8">
            <div className="absolute left-6 top-6 text-eyebrow">Live · planetary state</div>
            <div className="absolute right-6 top-6 flex gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <Legend color="oklch(0.72 0.19 30)" label="alert" />
              <Legend color="oklch(0.75 0.16 155)" label="steward" />
              <Legend color="oklch(0.82 0.15 75)" label="flow" />
            </div>
            <LivingGlobe />
            <div className="mt-6 grid w-full grid-cols-4 gap-3">
              {vitals.map((v) => (
                <div key={v.label} className="glass-inset rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{v.label}</div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-display text-2xl text-foreground">{v.value}</span>
                    <span className="text-xs text-muted-foreground">{v.unit}</span>
                  </div>
                  <div className={`mt-1 text-[10px] text-${v.tone}`} style={{ color: `var(--${v.tone})` }}>
                    {v.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <IntelligencePanel />
        </section>

        {/* The five questions */}
        <section className="mt-14">
          <p className="text-eyebrow">Every screen answers five questions</p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {[
              "What is happening?",
              "Why is it happening?",
              "What could happen next?",
              "What should we do?",
              "Why is that the wisest decision?",
            ].map((q, i) => (
              <div key={q} className="glass-inset rounded-xl p-4">
                <div className="text-eyebrow">0{i + 1}</div>
                <div className="text-display mt-2 text-lg leading-tight">{q}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Alerts + Missions */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-eyebrow">Active signals</p>
                <h2 className="text-display mt-1 text-2xl">The planet is speaking</h2>
              </div>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs text-signal">
                {alerts.length} elevated
              </span>
            </div>
            <ul className="mt-5 divide-y divide-glass-border">
              {alerts.map((a) => (
                <li key={a.title} className="flex items-start gap-4 py-4">
                  <span className="mt-1.5 size-2 rounded-full bg-signal shadow-[0_0_10px_var(--signal)]" />
                  <div className="flex-1">
                    <div className="text-eyebrow">{a.region}</div>
                    <div className="text-foreground">{a.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Confidence 0.82 · Horizon {a.horizon} · Ethics reviewed
                    </div>
                  </div>
                  <button className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                    Open panel →
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-eyebrow">Stewardship opportunities</p>
                <h2 className="text-display mt-1 text-2xl">Where wisdom can act</h2>
              </div>
              <span className="rounded-full border border-verdant/30 bg-verdant/10 px-3 py-1 text-xs text-verdant">
                council approved
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {missions.map((m) => (
                <li
                  key={m.title}
                  className="glass-inset flex items-center justify-between rounded-xl px-4 py-3"
                >
                  <div>
                    <div className="text-foreground">{m.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {m.partners} partner communities · impact {m.impact} · ethics {m.ethics}
                    </div>
                  </div>
                  <span className="text-primary">→</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* AI Council preview */}
        <section className="mt-12 glass-panel relative overflow-hidden rounded-3xl p-8">
          <div
            aria-hidden
            className="absolute -right-32 -top-32 size-96 rounded-full opacity-40"
            style={{ background: "var(--gradient-aurora)" }}
          />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-eyebrow">The AI Council</p>
              <h2 className="text-display mt-2 text-3xl">Ten advisors. One transparent conversation.</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Each specialist reasons in the open before recommending. Stewardship never happens by decree.
              </p>
            </div>
            <a
              href="/council"
              className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
            >
              Enter the chamber
            </a>
          </div>
          <div className="relative mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              "Cartographer","Ecologist","Economist","Urban Planner","Engineer",
              "Public Health","Climate Scientist","Emergency Coord.","Ethics Advisor","Policy Strategist",
            ].map((a, i) => (
              <div key={a} className="glass-inset flex items-center gap-3 rounded-xl p-3">
                <div
                  className="grid size-9 shrink-0 place-items-center rounded-full text-xs"
                  style={{
                    background: `conic-gradient(from ${i * 36}deg, var(--primary), var(--accent), var(--primary))`,
                    color: "oklch(0.1 0.02 240)",
                  }}
                >
                  {a[0]}
                </div>
                <div>
                  <div className="text-sm">{a}</div>
                  <div className="text-[10px] text-muted-foreground">listening</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-16 flex items-center justify-between border-t border-glass-border pt-6 text-xs text-muted-foreground">
          <span>Atlas Sanctum · Planetary Stewardship OS</span>
          <span className="font-mono">v0.1 · observatory build</span>
        </footer>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      {label}
    </span>
  );
}

function TimeReadout() {
  return (
    <span className="font-mono tracking-widest text-muted-foreground">
      UTC · {new Date().toISOString().slice(11, 16)}
    </span>
  );
}

function IntelligencePanel() {
  return (
    <div className="glass-panel flex flex-col rounded-3xl p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-eyebrow">Intelligence panel</p>
          <h2 className="text-display mt-1 text-2xl">Deccan Plateau · India</h2>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</div>
          <div className="text-display text-2xl text-primary">0.82</div>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <Row label="What is happening">
          Monsoon precipitation is running <span className="text-solar">−31%</span> against the 30-year mean across seven districts.
        </Row>
        <Row label="Why">
          Persistent MJO phase 2 and a weakened Somali jet are suppressing convective transport inland.
        </Row>
        <Row label="What could happen next">
          72-hour window: kharif crop stress escalates in 4 of 7 districts. Reservoir headroom drops below 18%.
        </Row>
        <Row label="What we could do">
          Pre-position drought contingency; open aquifer recharge basins; coordinate PDS grain flows via rail corridor 8.
        </Row>
        <Row label="Why this is wise">
          Cost / lives-affected ratio is 6.4× lower than reactive response. Council ethics review: no displacement risk. Two dissents recorded.
        </Row>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { k: "Communities", v: "1.4M" },
          { k: "Est. cost", v: "$12.6M" },
          { k: "Timeline", v: "9 days" },
        ].map((s) => (
          <div key={s.k} className="glass-inset rounded-lg p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
            <div className="text-display text-lg">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110">
          Convene AI Council
        </button>
        <button className="rounded-full border border-glass-border px-4 py-2.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary">
          View sources
        </button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-primary/30 pl-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <p className="mt-1 leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
