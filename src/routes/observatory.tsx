import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold } from "@/components/ChamberScaffold";

const marks = [
  { t: "1850", label: "Pre-industrial baseline" },
  { t: "1950", label: "Great Acceleration begins" },
  { t: "2000", label: "Digital observability" },
  { t: "2026", label: "Now · you are here", now: true },
  { t: "2035", label: "Near-term horizon" },
  { t: "2050", label: "Committed warming envelope" },
  { t: "2100", label: "Long-term trajectory" },
];

export const Route = createFileRoute("/observatory")({
  head: () => ({ meta: [{ title: "Observatory · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold
      eyebrow="Chamber VI · Observatory"
      title="Time as a landscape."
      lede="Traverse the past, dwell in the present, glimpse plausible futures — always with uncertainty made visible."
    >
      <div className="glass-panel rounded-3xl p-8">
        <div className="relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-7">
            {marks.map((m) => (
              <div key={m.t} className="flex flex-col items-center text-center">
                <div className={`size-3 rounded-full ${m.now ? "bg-primary shadow-[0_0_16px_var(--primary)] animate-pulse" : "bg-white/20"}`} />
                <div className="text-display mt-3 text-xl">{m.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { k: "Past", v: "1.8M records", d: "Ice cores, treaties, satellites, testimonies." },
            { k: "Present", v: "214 streams", d: "Live from sensors, models, communities." },
            { k: "Future", v: "36 scenarios", d: "IPCC, SSP, council-authored branches." },
          ].map((c) => (
            <div key={c.k} className="glass-inset rounded-xl p-5">
              <div className="text-eyebrow">{c.k}</div>
              <div className="text-display mt-1 text-2xl">{c.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </ChamberScaffold>
  ),
});
