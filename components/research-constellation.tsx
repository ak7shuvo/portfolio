import { researchInterests } from "@/lib/content";

const R = 36;

/** The five research threads, drawn as a constellation around the central Tourism concept. */
export default function ResearchConstellation() {
  const nodes = researchInterests.map((interest) => interest.title);

  return (
    <figure
      className="orbit-map"
      aria-label={`Tourism, connected to its five research threads: ${nodes.join(", ")}`}
    >
      <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((label, i) => {
          const angle = ((Math.PI * 2) / nodes.length) * i - Math.PI / 2;
          const x = 50 + R * Math.cos(angle);
          const y = 50 + R * Math.sin(angle);
          return <line key={label} className="line" x1="50" y1="50" x2={x} y2={y} />;
        })}
      </svg>

      <div className="orbit-hub" style={{ borderColor: "var(--color-line-2)" }}>
        <span className="n">TOURISM</span>
      </div>

      {nodes.map((label, i) => {
        const angle = ((Math.PI * 2) / nodes.length) * i - Math.PI / 2;
        const x = 50 + R * Math.cos(angle);
        const y = 50 + R * Math.sin(angle);
        return (
          <div
            key={label}
            className="orbit-node"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              ["--color-node" as string]: "var(--color-tea)",
              ["--pd" as string]: `${i * 320}ms`,
            }}
          >
            <span className="dot" aria-hidden="true" />
            <span className="l">{label}</span>
          </div>
        );
      })}
    </figure>
  );
}
