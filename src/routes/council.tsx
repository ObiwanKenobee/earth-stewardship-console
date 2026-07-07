import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold } from "@/components/ChamberScaffold";

const council = [
  { role: "Cartographer", says: "Terrain suggests three viable siting corridors; corridor B avoids sacred groves." },
  { role: "Ecologist", says: "Corridor B keeps riparian connectivity above the 0.7 threshold." },
  { role: "Economist", says: "Corridor A returns 1.6× faster but concentrates gains in one district." },
  { role: "Urban Planner", says: "Corridor B integrates with existing transit within 4 years." },
  { role: "Engineer", says: "All three feasible; B requires 12% more concrete but avoids seismic zone 4." },
  { role: "Public Health", says: "PM2.5 exposure drops most under Corridor C near dense settlements." },
  { role: "Climate Scientist", says: "2050 precipitation shift favors Corridor B water reliability." },
  { role: "Emergency Coord.", says: "Evacuation feasibility strongest along Corridor B." },
  { role: "Ethics Advisor", says: "Two indigenous councils oppose Corridor A. Consent process must precede B." },
  { role: "Policy Strategist", says: "Corridor B aligns with 3 existing statutes; A requires new legislation." },
];

export const Route = createFileRoute("/council")({
  head: () => ({ meta: [{ title: "AI Council · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold
      eyebrow="Chamber X · AI Council"
      title="Ten voices. Transparent reasoning."
      lede="Advisors speak in the open before recommending. Dissent is preserved, not smoothed away."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {council.map((c, i) => (
          <div key={c.role} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div
                className="grid size-10 place-items-center rounded-full text-sm"
                style={{ background: `conic-gradient(from ${i * 36}deg, var(--primary), var(--accent), var(--primary))`, color: "oklch(0.1 0.02 240)" }}
              >
                {c.role[0]}
              </div>
              <div>
                <div className="text-display text-lg leading-none">{c.role}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">advisor</div>
              </div>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">confidence 0.{70 + i}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">{c.says}</p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary">reasoning</button>
              <button className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary">sources</button>
              <button className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary">dissent</button>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-panel mt-8 rounded-2xl p-6">
        <div className="text-eyebrow">Council synthesis</div>
        <div className="text-display mt-2 text-2xl">Recommend Corridor B, contingent on indigenous consent.</div>
        <p className="mt-2 text-sm text-muted-foreground">
          8 of 10 advisors concur. Ethics Advisor and Economist recorded structured dissent — see full reasoning trail.
        </p>
      </div>
    </ChamberScaffold>
  ),
});
