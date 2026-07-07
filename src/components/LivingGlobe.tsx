import { useEffect, useRef, useState } from "react";

type Pulse = { lat: number; lon: number; label: string; kind: "alert" | "steward" | "flow" };

const PULSES: Pulse[] = [
  { lat: 14, lon: 78, label: "Monsoon anomaly · Deccan", kind: "alert" },
  { lat: -3, lon: -62, label: "Reforestation · Amazon basin", kind: "steward" },
  { lat: 34, lon: -118, label: "Grid stress · Southern California", kind: "alert" },
  { lat: 51, lon: 10, label: "Wind flow surge · North Sea", kind: "flow" },
  { lat: -1, lon: 36, label: "Aquifer recovery · Rift Valley", kind: "steward" },
  { lat: 39, lon: 116, label: "Air quality · N. China plain", kind: "alert" },
  { lat: -33, lon: 151, label: "Marine bloom · Tasman", kind: "flow" },
  { lat: 60, lon: 24, label: "Grid balance · Nordic", kind: "steward" },
];

function project(lat: number, lon: number, rot: number, r: number) {
  const φ = (lat * Math.PI) / 180;
  const λ = ((lon + rot) * Math.PI) / 180;
  const x = Math.cos(φ) * Math.sin(λ);
  const y = Math.sin(φ);
  const z = Math.cos(φ) * Math.cos(λ);
  return { x: x * r, y: -y * r, z, visible: z > -0.05 };
}

export function LivingGlobe() {
  const [rot, setRot] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setRot((r) => (r + dt * 4) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const R = 220;
  const cx = 260;
  const cy = 260;

  // meridians and parallels
  const meridians = Array.from({ length: 12 }, (_, i) => (i * 15) - rot);
  const parallels = [-60, -30, 0, 30, 60];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* outer atmospheric glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(0.78_0.14_195/0.35),transparent_65%)] blur-2xl" />
      {/* rotating orbital rings */}
      <div className="animate-drift-slow pointer-events-none absolute inset-6 rounded-full border border-primary/15" />
      <div className="animate-drift-slower pointer-events-none absolute inset-12 rounded-full border border-accent/15" />

      <svg
        viewBox="0 0 520 520"
        className="animate-breathe relative size-full drop-shadow-[0_0_60px_oklch(0.78_0.14_195/0.25)]"
        role="img"
        aria-label="Living planetary status globe"
      >
        <defs>
          <radialGradient id="planet" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="oklch(0.86 0.14 195)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="oklch(0.42 0.12 235)" />
            <stop offset="100%" stopColor="oklch(0.14 0.05 240)" />
          </radialGradient>
          <radialGradient id="terminator" cx="70%" cy="70%" r="70%">
            <stop offset="0%" stopColor="oklch(0.05 0.02 240)" stopOpacity="0" />
            <stop offset="100%" stopColor="oklch(0.05 0.02 240)" stopOpacity="0.55" />
          </radialGradient>
          <clipPath id="clip">
            <circle cx={cx} cy={cy} r={R} />
          </clipPath>
        </defs>

        {/* planet body */}
        <circle cx={cx} cy={cy} r={R} fill="url(#planet)" />

        {/* graticule */}
        <g clipPath="url(#clip)" opacity={0.35}>
          {parallels.map((lat) => {
            const φ = (lat * Math.PI) / 180;
            const ry = Math.cos(φ) * R;
            const oy = -Math.sin(φ) * R;
            return (
              <ellipse
                key={lat}
                cx={cx}
                cy={cy + oy}
                rx={ry}
                ry={ry * 0.12}
                fill="none"
                stroke="oklch(0.78 0.14 195 / 0.35)"
                strokeWidth={0.5}
              />
            );
          })}
          {meridians.map((lon, i) => {
            const λ = (lon * Math.PI) / 180;
            const rx = Math.abs(Math.sin(λ)) * R;
            const facing = Math.cos(λ) > 0;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={R}
                fill="none"
                stroke={facing ? "oklch(0.78 0.14 195 / 0.4)" : "oklch(0.78 0.14 195 / 0.12)"}
                strokeWidth={0.5}
              />
            );
          })}
        </g>

        {/* topographic continents (abstract blobs, projected) */}
        <g clipPath="url(#clip)" opacity={0.55}>
          {CONTINENT_BLOBS.map((blob, bi) => {
            const pts = blob
              .map(([lat, lon]) => project(lat, lon, rot, R))
              .filter((p) => p.visible);
            if (pts.length < 3) return null;
            const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${cx + p.x},${cy + p.y}`).join(" ") + " Z";
            return (
              <path
                key={bi}
                d={d}
                fill="oklch(0.32 0.08 165 / 0.75)"
                stroke="oklch(0.75 0.16 155 / 0.5)"
                strokeWidth={0.6}
              />
            );
          })}
        </g>

        {/* terminator shadow */}
        <circle cx={cx} cy={cy} r={R} fill="url(#terminator)" pointerEvents="none" />

        {/* pulses */}
        {PULSES.map((p, i) => {
          const pt = project(p.lat, p.lon, rot, R);
          if (!pt.visible) return null;
          const color =
            p.kind === "alert" ? "oklch(0.72 0.19 30)" : p.kind === "steward" ? "oklch(0.75 0.16 155)" : "oklch(0.82 0.15 75)";
          return (
            <g key={i} transform={`translate(${cx + pt.x}, ${cy + pt.y})`}>
              <circle r="10" fill={color} opacity="0.15">
                <animate attributeName="r" from="4" to="16" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle
                r={hover === i ? 4.5 : 3}
                fill={color}
                stroke="oklch(0.98 0 0 / 0.9)"
                strokeWidth={0.8}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer transition-all"
              />
            </g>
          );
        })}

        {/* limb highlight */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="oklch(0.78 0.14 195 / 0.4)" strokeWidth={0.8} />
      </svg>

      {/* hover chip */}
      {hover !== null && (
        <div className="glass-panel animate-rise pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs">
          <span className="text-muted-foreground">signal · </span>
          <span className="text-foreground">{PULSES[hover].label}</span>
        </div>
      )}
    </div>
  );
}

// Extremely abstract continental silhouettes as lat/lon polygons — evocative, not cartographic.
const CONTINENT_BLOBS: [number, number][][] = [
  // Africa
  [[35, -6],[32, 10],[22, 25],[12, 43],[-1, 41],[-15, 40],[-33, 27],[-30, 18],[-15, 12],[0, 9],[14, -17],[26, -14]],
  // Eurasia (compressed)
  [[70, 20],[60, 60],[55, 100],[45, 135],[30, 130],[22, 110],[10, 100],[20, 78],[28, 55],[38, 40],[45, 20],[60, 5],[70, 20]],
  // Americas (single blob)
  [[70, -100],[55, -130],[35, -120],[20, -105],[8, -78],[-10, -75],[-30, -70],[-45, -68],[-52, -70],[-30, -55],[-5, -50],[15, -60],[30, -85],[50, -95]],
  // Australia
  [[-12, 132],[-15, 145],[-25, 152],[-35, 148],[-35, 138],[-32, 120],[-22, 115],[-14, 125]],
];
