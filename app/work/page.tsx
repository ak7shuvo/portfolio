import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/page-head";
import ProjectFeature from "@/components/project-feature";
import ProjectCard from "@/components/project-card";
import ContinueLinks from "@/components/continue-links";
import { projects, scales } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products for communities, operators and destinations — OpenDMO, CBT Bangladesh, Angon and SylhetTrail.",
};

export default function WorkPage() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.slug !== featured.slug);

  return (
    <main>
      <PageHead
        index="01"
        eyebrow="Work"
        title={
          <>
            Products for communities, operators and <span className="t-accent">destinations</span>.
          </>
        }
        lead="Each project answers a question that came out of research or fieldwork — at the scale where the problem actually sits."
      />

      <section className="section !pt-[var(--space-block)]" aria-label="Projects">
        <div className="wrap">
          <ProjectFeature project={featured} />
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((project, i) => (
              <div key={project.slug} className="min-w-0" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <ProjectCard project={project} index={i + 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section rule" aria-labelledby="index-title">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="idx">Index</span>All projects
              </p>
              <h2 id="index-title" className="t-h3 mt-4">
                At a glance
              </h2>
            </div>
            <p className="t-small max-w-[44ch] text-muted">
              {scales.map((s) => s.scale).join(" · ")} — the three scales tourism products work at.
            </p>
          </div>

          <ul className="border-t border-[var(--color-line)]" data-reveal>
            {projects.map((project, i) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="index-row group">
                  <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-marigold">
                      {project.name}
                    </span>
                    <span className="t-small block text-muted">{project.tagline}</span>
                  </span>
                  <span className="t-small hidden text-ink-2 md:block">{project.category}</span>
                  <span className="hidden md:block">
                    <span className="tag">{project.scale}</span>
                  </span>
                  <span aria-hidden="true" className="arrow justify-self-end text-marigold">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContinueLinks current="/work" />
    </main>
  );
}
