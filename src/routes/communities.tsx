import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold, PlaceholderGrid } from "@/components/ChamberScaffold";

export const Route = createFileRoute("/communities")({
  head: () => ({ meta: [{ title: "Communities · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold eyebrow="Chamber VIII · Communities" title="The stewards themselves." lede="Atlas Sanctum is nothing without the people who tend the places it observes.">
      <PlaceholderGrid items={[
        { title: "Bioregional councils", body: "142 active councils across 6 continents." },
        { title: "Indigenous knowledge partners", body: "Consent-first data sharing agreements." },
        { title: "Researcher collectives", body: "Open peer review of every model & method." },
        { title: "Municipal partners", body: "Cities sharing sensor networks and outcomes." },
        { title: "Youth stewardship circles", body: "Long-horizon voices in every council." },
        { title: "Public witnesses", body: "Anyone can observe, question, and dissent." },
      ]} />
    </ChamberScaffold>
  ),
});
