import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold, PlaceholderGrid } from "@/components/ChamberScaffold";

export const Route = createFileRoute("/scenarios")({
  head: () => ({ meta: [{ title: "Scenarios · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold eyebrow="Chamber V · Scenarios" title="Branches of possibility." lede="Curated futures held side by side — each with assumptions, dissent, and confidence made legible.">
      <PlaceholderGrid items={[
        { title: "SSP1 · Sustainability", body: "Cooperation, low material growth, restored ecosystems." },
        { title: "SSP2 · Middle Road", body: "Historical trends continue with regional heterogeneity." },
        { title: "SSP3 · Regional Rivalry", body: "Fragmentation, slow tech transfer, high inequality." },
        { title: "SSP5 · Fossil-fueled", body: "High growth, high emissions, geoengineering pressure." },
        { title: "Council branch · Restoration", body: "Aggressive rewilding + circular economies." },
        { title: "Council branch · Localism", body: "Bioregional governance, food sovereignty first." },
      ]} />
    </ChamberScaffold>
  ),
});
