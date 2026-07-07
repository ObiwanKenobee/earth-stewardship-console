import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChamberScaffold } from "@/components/ChamberScaffold";

type Location = {
  id: string;
  name: string;
  region: string;
  confidence: number;
  now: { label: string; value: string; tone: string }[];
  history: { year: string; note: string }[];
  predictions: { horizon: string; text: string }[];
  risks: string[];
  opportunities: string[];
  ethics: { text: string; note: string };
};

const LOCATIONS: Location[] = [
  {
    id: "deccan",
    name: "Deccan Plateau",
    region: "India · 7 districts",
    confidence: 0.82,
    now: [
      { label: "Precipitation", value: "−31%", tone: "solar" },
      { label: "Reservoir head", value: "18%", tone: "signal" },
      { label: "Air quality", value: "AQI 132", tone: "solar" },
      { label: "Grid stability", value: "nominal", tone: "verdant" },
    ],
    history: [
      { year: "2018", note: "Deficit monsoon · −22%, kharif recovered by rail-fed grain flows." },
      { year: "2021", note: "MJO phase 2 blocking · similar Somali-jet weakening pattern." },
      { year: "2024", note: "Aquifer recharge basins commissioned in 3 of 7 districts." },
    ],
    predictions: [
      { horizon: "72h", text: "Crop stress escalates in 4 of 7 districts. Reservoir headroom < 18%." },
      { horizon: "14d", text: "Migration signal from northern taluks; grain-price volatility rises." },
      { horizon: "6mo", text: "Kharif yield −18% vs. baseline unless intervention begins within 9 days." },
    ],
    risks: [
      "Rural livelihood collapse in tail-end villages",
      "Communal tension over shared water allocations",
      "Cascading food-price shock across 3 states",
    ],
    opportunities: [
      "Pre-position drought contingency via PDS rail corridor 8",
      "Open aquifer recharge basins ahead of the pulse",
      "Activate cool-roof and shade-net cooperatives",
    ],
    ethics: {
      text: "No forced displacement. Two council dissents recorded on equity of grain allocation.",
      note: "Cost / lives-affected ratio 6.4× lower than reactive response.",
    },
  },
  {
    id: "sahel",
    name: "Sahel Corridor",
    region: "West Africa · 5 nations",
    confidence: 0.74,
    now: [
      { label: "Vegetation NDVI", value: "0.31", tone: "solar" },
      { label: "Displacement", value: "+12k / wk", tone: "signal" },
      { label: "Grain reserves", value: "42 days", tone: "solar" },
      { label: "Rainfall onset", value: "−11 days", tone: "aurora" },
    ],
    history: [
      { year: "2012", note: "Regional food emergency; 18M affected across belt." },
      { year: "2020", note: "Locust incursion compounded rain deficit." },
      { year: "2023", note: "Community seed banks activated in 240 villages." },
    ],
    predictions: [
      { horizon: "14d", text: "Cross-border movement rises 22% along corridor 3." },
      { horizon: "60d", text: "Food-insecure population +2.1M without pre-positioning." },
      { horizon: "1y", text: "Restoration of 40 kha savanna feasible if funded now." },
    ],
    risks: [
      "Displacement pressure on already-stressed host communities",
      "Aid-diversion by armed factions on eastern route",
      "Loss of pastoralist knowledge as families disperse",
    ],
    opportunities: [
      "Extend seed-bank network to 400 villages",
      "Rain-index insurance pilot with local cooperatives",
      "Solar-borehole clusters in the 12 driest districts",
    ],
    ethics: {
      text: "Consent-first data sharing with community councils; no biometric enrollment.",
      note: "Council reviewed; one abstention on cross-border data flows.",
    },
  },
  {
    id: "california",
    name: "California ISO",
    region: "USA · grid region",
    confidence: 0.88,
    now: [
      { label: "Load", value: "44.2 GW", tone: "aurora" },
      { label: "Renewable share", value: "61%", tone: "verdant" },
      { label: "Heat index", value: "42°C peak", tone: "signal" },
      { label: "Reserve margin", value: "6.4%", tone: "solar" },
    ],
    history: [
      { year: "2020", note: "Rolling blackouts during heat dome; 3.3M households affected." },
      { year: "2022", note: "Battery capacity crossed 4 GW; flex-load pilots begin." },
      { year: "2025", note: "Virtual power plant enrollments cross 800k homes." },
    ],
    predictions: [
      { horizon: "48h", text: "Load convergence risk between 17:00–20:00 on Wed." },
      { horizon: "7d", text: "Battery reserves refill overnight; risk clears if flex-load activated." },
      { horizon: "3y", text: "Peak-shift feasible to net-zero with current build pipeline." },
    ],
    risks: [
      "Involuntary curtailment in medically-dependent households",
      "Communication gaps in non-English customer segments",
      "Wildfire-linked transmission derates in the north",
    ],
    opportunities: [
      "Pre-cool commercial spaces via VPP dispatch",
      "Community cooling centers with multilingual outreach",
      "Battery pre-charge from surplus midday solar",
    ],
    ethics: {
      text: "Prioritize medical-baseline customers; transparent flex-event notifications.",
      note: "Council approved; auto-enroll disabled by default.",
    },
  },
];

export const Route = createFileRoute("/observatory")({
  head: () => ({
    meta: [
      { title: "Intelligence Panel · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Select any location to read its current conditions, history, predictions, risks, opportunities, and ethical recommendations.",
      },
    ],
  }),
  component: ObservatoryChamber,
});

function ObservatoryChamber() {
  const [id, setId] = useState<string>(LOCATIONS[0].id);
  const loc = LOCATIONS.find((l) => l.id === id)!;

  return (
    <ChamberScaffold
      eyebrow="Chamber I · Intelligence Panel"
      title="Read a place as a living system."
      lede="Every location speaks in five voices — what is, what was, what could be, what threatens, and what is possible."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {LOCATIONS.map((l) => {
          const on = l.id === id;
          return (
            <button
              key={l.id}
              onClick={() => setId(l.id)}
              className="rounded-full px-4 py-1.5 text-xs transition"
              style={{
                border: `1px solid ${on ? "var(--primary)" : "var(--glass-border)"}`,
                background: on ? "oklch(0.78 0.13 195 / 0.12)" : "transparent",
                color: on ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              {l.name}
            </button>
          );
        })}
      </div>

      <div key={loc.id} className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] animate-rise">
        <section className="glass-panel rounded-3xl p-7">
          <header className="flex items-start justify-between gap-4">
            <div>
              <div className="text-eyebrow">Selected place</div>
              <h2 className="text-display mt-1 text-3xl">{loc.name}</h2>
              <div className="text-xs text-muted-foreground">{loc.region}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</div>
              <div className="text-display text-3xl text-primary">{loc.confidence.toFixed(2)}</div>
              <div className="mt-1 h-1 w-24 rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${loc.confidence * 100}%`, boxShadow: "0 0 12px var(--primary)" }}
                />
              </div>
            </div>
          </header>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {loc.now.map((n) => (
              <div key={n.label} className="glass-inset rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{n.label}</div>
                <div className="text-display mt-1 text-xl" style={{ color: `var(--${n.tone})` }}>
                  {n.value}
                </div>
              </div>
            ))}
          </div>

          <Block label="History">
            <ul className="space-y-2">
              {loc.history.map((h) => (
                <li key={h.year} className="flex gap-3 text-sm text-foreground/90">
                  <span className="font-mono text-primary">{h.year}</span>
                  <span>{h.note}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Predictions">
            <ul className="space-y-2">
              {loc.predictions.map((p) => (
                <li key={p.horizon} className="flex gap-3 text-sm text-foreground/90">
                  <span className="w-14 shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-center text-[10px] font-mono uppercase tracking-widest text-primary">
                    {p.horizon}
                  </span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </Block>
        </section>

        <aside className="flex flex-col gap-4">
          <Card label="Risks" tone="signal">
            <ul className="space-y-2 text-sm">
              {loc.risks.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_8px_var(--signal)]" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>
          <Card label="Opportunities" tone="verdant">
            <ul className="space-y-2 text-sm">
              {loc.opportunities.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-verdant shadow-[0_0_8px_var(--verdant)]" />
                  {o}
                </li>
              ))}
            </ul>
          </Card>
          <Card label="Ethical recommendation" tone="aurora">
            <p className="text-sm text-foreground/90">{loc.ethics.text}</p>
            <p className="mt-2 text-xs text-muted-foreground">{loc.ethics.note}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground shadow-[var(--shadow-glow)]">
                Convene AI Council
              </button>
              <button className="rounded-full border border-glass-border px-4 py-2 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary">
                Sources
              </button>
            </div>
          </Card>
        </aside>
      </div>
    </ChamberScaffold>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-l border-primary/30 pl-4">
      <div className="text-eyebrow">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Card({
  label,
  tone,
  children,
}: {
  label: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-2">
        <span
          className="size-1.5 rounded-full"
          style={{ background: `var(--${tone})`, boxShadow: `0 0 8px var(--${tone})` }}
        />
        <div className="text-eyebrow">{label}</div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
