import { createFileRoute } from "@tanstack/react-router";
import { ChamberScaffold } from "@/components/ChamberScaffold";

const nodes = [
  { id: "river", label: "River", x: 50, y: 10 },
  { id: "agri", label: "Agriculture", x: 20, y: 30 },
  { id: "food", label: "Food Security", x: 50, y: 40 },
  { id: "mig", label: "Migration", x: 80, y: 55 },
  { id: "emp", label: "Employment", x: 20, y: 65 },
  { id: "hlth", label: "Health", x: 50, y: 75 },
  { id: "edu", label: "Education", x: 80, y: 82 },
  { id: "econ", label: "Economic Growth", x: 50, y: 95 },
];
const edges: [string, string][] = [
  ["river","agri"],["agri","food"],["food","mig"],["food","hlth"],
  ["mig","emp"],["emp","econ"],["hlth","edu"],["edu","econ"],["hlth","econ"],["agri","emp"],
];

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Graph · Atlas Sanctum" }] }),
  component: () => {
    const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
    return (
      <ChamberScaffold
        eyebrow="Chamber III · Knowledge Graph"
        title="The world as interconnected systems."
        lede="Select any node to feel cascading effects across sectors. Rivers become agriculture become migration become economies."
      >
        <div className="glass-panel relative rounded-3xl p-6">
          <svg viewBox="0 0 100 100" className="mx-auto block h-[560px] w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="edge" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.14 195 / 0.7)" />
                <stop offset="100%" stopColor="oklch(0.62 0.18 285 / 0.7)" />
              </linearGradient>
            </defs>
            {edges.map(([a, b], i) => (
              <line key={i} x1={map[a].x} y1={map[a].y} x2={map[b].x} y2={map[b].y} stroke="url(#edge)" strokeWidth="0.25" />
            ))}
            {nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                <circle r="3" fill="oklch(0.18 0.03 240)" stroke="oklch(0.78 0.14 195)" strokeWidth="0.4" />
                <circle r="1.2" fill="oklch(0.78 0.14 195)">
                  <animate attributeName="r" values="1;1.8;1" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="0" y="-4" textAnchor="middle" fontSize="2.2" fill="oklch(0.94 0.015 220)" fontFamily="Inter Tight">
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </ChamberScaffold>
    );
  },
});
