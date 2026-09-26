const STEPS = ["Community", "Local knowledge", "Experience", "Visitor", "Economic value"];

/** CBT Bangladesh as a cycle, not a one-way listing: value returns to the community it started from. */
export default function CbtLoop() {
  return (
    <div className="eco-loop" role="list" aria-label="Community-based tourism cycle">
      {STEPS.map((step, i) => (
        <div key={step} className="contents">
          <div className="eco-step" role="listitem">
            <span className="n">0{i + 1}</span>
            <span className="t">{step}</span>
          </div>
          {i < STEPS.length - 1 ? (
            <span className="eco-arrow" aria-hidden="true">→</span>
          ) : null}
        </div>
      ))}
      <p className="eco-loop-back">
        <span className="arrow-loop" aria-hidden="true">↺</span> Value returns to the community it started from
      </p>
    </div>
  );
}
