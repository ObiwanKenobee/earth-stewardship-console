import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold, PlaceholderGrid } from "@/components/ChamberScaffold";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold eyebrow="Chamber IX · Reports" title="The record of what we saw, decided, and did." lede="Every recommendation, every dissent, every outcome — held in the open, retrievable across time.">
      <PlaceholderGrid items={[
        { title: "State of the Planet · 2026 Q3", body: "Composite indicators across 12 domains." },
        { title: "Council decision log", body: "Full reasoning trails, dissent preserved." },
        { title: "Mission outcome audits", body: "Predicted vs realized impact per intervention." },
        { title: "Ethics reviews archive", body: "Every recommendation, every consent process." },
        { title: "Data source ledger", body: "Provenance and confidence for 214 streams." },
        { title: "Community testimonies", body: "Voices from the places we observe." },
      ]} />
    </ChamberScaffold>
  ),
});
