import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold, PlaceholderGrid } from "@/components/ChamberScaffold";

export const Route = createFileRoute("/missions")({
  head: () => ({ meta: [{ title: "Stewardship Missions · Atlas Sanctum" }] }),
  component: () => (
    <ChamberScaffold eyebrow="Chamber VII · Stewardship" title="Where wisdom becomes action." lede="Every mission carries its ethics review, its costs, its dissenting voices — nothing is hidden from those who act.">
      <PlaceholderGrid items={[
        { title: "Cerrado headwaters restoration", body: "14 partners · high impact · ethics reviewed · 9-month horizon." },
        { title: "Cool-roof deployment · Karachi", body: "6 partners · moderate impact · heat mortality −18% projected." },
        { title: "Sundarbans mangrove replant", body: "22 partners · surge attenuation +32% by 2032." },
        { title: "Rift Valley aquifer stewardship", body: "9 partners · community-governed monitoring network." },
        { title: "Arctic methane vigil", body: "4 institutions · continuous release monitoring array." },
        { title: "Andes glacial memory archive", body: "Community-led ice core & oral history preservation." },
      ]} />
    </ChamberScaffold>
  ),
});
