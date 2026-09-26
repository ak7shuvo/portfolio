const NODES = [
  { label: "Visitors", color: "var(--color-marigold)" },
  { label: "Communities", color: "var(--color-tea)" },
  { label: "Businesses", color: "var(--color-marigold)" },
  { label: "Data", color: "var(--color-tech)" },
  { label: "Government", color: "var(--color-faint)" },
  { label: "Infrastructure", color: "var(--color-faint)" },
  { label: "Research", color: "var(--color-tech)" },
  { label: "Culture", color: "var(--color-tea)" },
];

const R = 38; // orbit radius, in the same 0–100 units as the viewBox and node percentages

/**
 * OpenDMO is presented as a destination system: a set of stakeholders and
 * signals that a destination management organisation has to coordinate
 * around one place. Purely conceptual — no invented partners or numbers.
 */
export default function DestinationSystem() {
  return (
    <figure className="orbit-map" aria-label="Destination system: visitors, communities, businesses, culture, government, data, infrastructure and research, coordinated around one destination">
      <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {NODES.map((node, i) => {
          const angle = (Math.PI / 4) * i - Math.PI / 2;
          const x = 50 + R * Math.cos(angle);
          const y = 50 + R * Math.sin(angle);
          return <line key={node.label} className="line" x1="50" y1="50" x2={x} y2={y} />;
        })}
      </svg>

      <div className="orbit-hub">
        <span className="n">DESTINATION</span>
      </div>

      {NODES.map((node, i) => {
        const angle = (Math.PI / 4) * i - Math.PI / 2;
        const x = 50 + R * Math.cos(angle);
        const y = 50 + R * Math.sin(angle);
        return (
          <div
            key={node.label}
            className="orbit-node"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              ["--color-node" as string]: node.color,
              ["--pd" as string]: `${i * 260}ms`,
            }}
          >
            <span className="dot" aria-hidden="true" />
            <span className="l">{node.label}</span>
          </div>
        );
      })}
    </figure>
  );
}
