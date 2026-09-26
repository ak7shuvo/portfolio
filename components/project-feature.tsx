import Link from "next/link";
import DeviceFrame from "@/components/device-frame";
import type { Project } from "@/lib/content";

/**
 * The featured project: story on one side, a dimensional stage of real
 * product screenshots on the other. The stage straightens on hover.
 */
export default function ProjectFeature({ project }: { project: Project }) {
  const desktop = project.images?.find((image) => image.frame === "desktop");
  const mobile = project.images?.find((image) => image.frame === "mobile");
  const live = project.links.find((link) => link.external);

  return (
    <article className="surface feature" data-reveal>
      <div className="flex flex-col p-[clamp(1.5rem,1rem+2vw,3rem)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag tag-signal">
            <span className="dot" /> Featured · {project.scale} scale
          </span>
          <span className="tag">{project.status}</span>
        </div>

        <h3 className="t-h2 mt-7">{project.name}</h3>
        <p className="mt-2 text-lg text-ink-2">{project.tagline}</p>
        <p className="t-body mt-6 max-w-[52ch]">{project.summary}</p>

        <ul className="mt-7 grid gap-3 border-t border-[var(--color-line)] pt-6">
          {project.signals.map((signal) => (
            <li key={signal} className="flex items-start gap-3 text-[0.9375rem] text-ink-2">
              <span className="dot mt-[0.55em] text-marigold" />
              {signal}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.map((item) => (
            <li key={item} className="tag tag-tech">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-9">
          <Link href={`/work/${project.slug}`} className="btn btn-primary">
            Read the case study <span aria-hidden="true" className="arrow">→</span>
          </Link>
          {live ? (
            <a href={live.href} target="_blank" rel="noopener noreferrer" className="btn">
              Live prototype <span aria-hidden="true" className="arrow arrow-ext">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="feature-stage">
        {desktop ? (
          <div className="stage-desktop">
            <DeviceFrame image={desktop} url="cbt-bangladesh · traveller" />
          </div>
        ) : null}
        {mobile ? (
          <div className="stage-mobile">
            <DeviceFrame image={mobile} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
