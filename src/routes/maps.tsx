import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold, PlaceholderGrid } from "@/components/ChamberScaffold";

export const Route = createFileRoute("/maps")({
  head: () => ({ meta: [{ title: "Maps · Atlas Sanctum" }, { name: "description", content: "The living cartography of Earth — climate, ecosystems, infrastructure, and human systems as one map." }] }),
  component: () => (
    <ChamberScaffold
      eyebrow="Chamber II · Maps"
      title="The living cartography."
      lede="Every layer is a way of seeing the same Earth. Population, water, biodiversity, energy, conflict — merged smoothly, never abruptly."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {["Population","Health","Agriculture","Water","Energy","Transport","Biodiversity","Economy","Conflict","Education","Climate","Infrastructure","Satellite"].map((l) => (
          <button key={l} className="glass-inset rounded-full px-4 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary">{l}</button>
        ))}
      </div>
      <div className="glass-panel relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
        <div className="absolute inset-0 topo-surface opacity-60" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)" }} />
        <div className="absolute inset-6 rounded-2xl border border-primary/20" />
        <div className="absolute left-8 top-8 text-eyebrow">Composite view · 214 sources streaming</div>
        <div className="absolute bottom-8 left-8 text-display text-3xl">Choose a layer to reveal the world.</div>
      </div>
    </ChamberScaffold>
  ),
});
