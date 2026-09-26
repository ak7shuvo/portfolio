import type { Project } from "@/lib/content";

/**
 * A small diagram per project that shows its structure rather than decorating
 * it: a community cluster, a hub-and-spoke operator, a stacked archive index,
 * a destination boundary. Pure SVG, a few hundred bytes each.
 */
export default function ProjectGlyph({ slug }: { slug: Project["slug"] }) {
  return (
    <div className="proj-glyph" aria-hidden="true">
      <svg viewBox="0 0 400 128" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`dots-${slug}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgb(238 234 225 / 0.08)" />
          </pattern>
        </defs>
        <rect width="400" height="128" fill={`url(#dots-${slug})`} />
        {slug === "cbt-bangladesh" && <Community />}
        {slug === "sylhettrail" && <HubSpoke />}
        {slug === "angon" && <Archive />}
        {slug === "opendmo" && <Destination />}
      </svg>
    </div>
  );
}

function Community() {
  const homes = [
    [150, 50], [180, 82], [214, 44], [236, 88], [262, 58], [196, 60],
  ];
  return (
    <g>
      {[18, 36, 54].map((r) => (
        <circle key={r} className="g" cx="206" cy="64" r={r} />
      ))}
      {homes.map(([x, y], i) => (
        <line key={i} className="g" x1="206" y1="64" x2={x} y2={y} />
      ))}
      {homes.map(([x, y], i) => (
        <circle key={`h${i}`} cx={x} cy={y} r="3.5" fill="rgb(238 234 225 / 0.7)" />
      ))}
      <circle cx="206" cy="64" r="6" fill="#f2a93b" />
    </g>
  );
}

function HubSpoke() {
  const spokes = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return [200 + Math.cos(a) * 120, 64 + Math.sin(a) * 46] as const;
  });
  return (
    <g>
      <ellipse className="g" cx="200" cy="64" rx="120" ry="46" strokeDasharray="3 5" />
      {spokes.map(([x, y], i) => (
        <g key={i}>
          <line className="g hot" x1="200" y1="64" x2={x} y2={y} />
          <rect x={x - 4} y={y - 4} width="8" height="8" fill="rgb(238 234 225 / 0.75)" />
        </g>
      ))}
      <circle cx="200" cy="64" r="9" fill="#f2a93b" />
    </g>
  );
}

function Archive() {
  const rows = [30, 52, 74, 96];
  return (
    <g>
      <rect className="g" x="76" y="18" width="248" height="92" rx="4" strokeDasharray="3 5" />
      {rows.map((y, i) => (
        <g key={y}>
          <line className={i === 1 ? "g hot" : "g"} x1="92" y1={y} x2="308" y2={y} />
          <circle cx="104" cy={y} r="3" fill={i === 1 ? "#f2a93b" : "rgb(238 234 225 / 0.6)"} />
        </g>
      ))}
    </g>
  );
}

function Destination() {
  const pts = [
    [120, 40], [150, 70], [178, 34], [200, 88], [226, 52], [252, 80], [276, 42], [300, 72], [168, 96], [240, 102],
  ];
  return (
    <g>
      <path
        className="g hot"
        d="M92 64 C96 26 150 12 206 16 C270 20 320 28 316 70 C312 108 250 118 196 114 C140 110 88 100 92 64 Z"
      />
      <path className="g" d="M112 64 C116 38 158 30 206 32 C258 34 298 42 296 70 C294 96 244 102 198 100 C152 98 110 90 112 64 Z" strokeDasharray="3 5" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="rgb(238 234 225 / 0.7)" />
      ))}
    </g>
  );
}
