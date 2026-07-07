import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold } from "@/components/ChamberScaffold";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold eyebrow="Chamber XI · Settings" title="Tune the instrument." lede="Language, contrast, motion, bandwidth — Atlas Sanctum should meet you where you are.">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { k: "Language", v: "English · 42 available" },
          { k: "Contrast", v: "Observatory · High available" },
          { k: "Motion", v: "Living · Reduced available" },
          { k: "Bandwidth mode", v: "Full · Low-bandwidth available" },
          { k: "Offline resilience", v: "72h cached · configurable" },
          { k: "Screen reader", v: "Optimized" },
        ].map((s) => (
          <div key={s.k} className="glass-panel flex items-center justify-between rounded-2xl p-5">
            <div>
              <div className="text-eyebrow">{s.k}</div>
              <div className="text-display mt-1 text-xl">{s.v}</div>
            </div>
            <button className="rounded-full border border-glass-border px-4 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary">adjust</button>
          </div>
        ))}
      </div>
    </ChamberScaffold>
  ),
});
