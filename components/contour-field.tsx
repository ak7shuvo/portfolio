import { buildContours } from "@/lib/terrain";

/** Static contour art for page headers — the same terrain, drawn flat. */
export default function ContourField({ className = "" }: { className?: string }) {
  const levels = buildContours();
  return (
    <svg viewBox="0 0 1000 690" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {levels.map((level) => (
        <path
          key={level.level}
          d={level.d}
          fill="none"
          stroke={level.major ? "rgb(238 234 225 / 0.22)" : "rgb(238 234 225 / 0.1)"}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
