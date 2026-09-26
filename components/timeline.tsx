import Link from "next/link";
import { timeline } from "@/lib/content";

const KIND_CLASS: Record<string, string> = {
  Product: "tag-signal",
  Research: "tag-tea",
};

/** Professional context as a depth track: period rail, then layered cards. */
export default function Timeline() {
  return (
    <ol className="timeline">
      {timeline.map((entry, i) => (
        <li key={entry.title} className="tl-item" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
          <p className="meta pt-6 md:text-right">{entry.period}</p>
          <div className="tl-card surface mt-2 p-6 md:mt-0 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`tag ${KIND_CLASS[entry.kind] ?? ""}`}>{entry.kind}</span>
              {entry.href ? (
                <Link href={entry.href} className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
                  <span className="link">Details</span>
                  <span aria-hidden="true" className="arrow">→</span>
                </Link>
              ) : null}
            </div>
            <h3 className="t-h4 mt-4 !text-[1.25rem]">{entry.title}</h3>
            <p className="t-small mt-1 text-ink-2">{entry.context}</p>
            <ul className="ticks mt-4 text-[0.9375rem]">
              {entry.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
