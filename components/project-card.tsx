import Link from "next/link";
import Tilt from "@/components/tilt";
import ProjectGlyph from "@/components/project-glyph";
import type { Project } from "@/lib/content";

/** Supporting project surface: structure glyph, identity, signals, link. */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Tilt as="article" className="surface h-full" max={4}>
      <Link href={`/work/${project.slug}`} className="proj-card group" aria-label={`${project.name} — case study`}>
        <ProjectGlyph slug={project.slug} />
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="meta">
            {String(index).padStart(2, "0")} · {project.scale}
          </span>
          <span className="tag !whitespace-normal">{project.status}</span>
        </div>
        <h3 className="t-h3 mt-5 transition-colors duration-300 group-hover:text-marigold">{project.name}</h3>
        <p className="mt-1 text-[0.9375rem] text-ink-2">{project.tagline}</p>
        <p className="t-small mt-4 text-muted">{project.summary}</p>
        <ul className="mt-5 grid gap-1.5">
          {project.signals.map((signal) => (
            <li key={signal} className="flex items-start gap-2.5 text-[0.8125rem] text-ink-2">
              <span className="dot mt-[0.5em] text-marigold" />
              {signal}
            </li>
          ))}
        </ul>
        <span className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-7 text-sm text-ink">
          <span>{project.role ?? project.category}</span>
          <span className="inline-flex items-center gap-2 text-marigold">
            Case study <span aria-hidden="true" className="arrow">→</span>
          </span>
        </span>
      </Link>
    </Tilt>
  );
}
