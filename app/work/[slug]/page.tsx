import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContourField from "@/components/contour-field";
import DeviceFrame from "@/components/device-frame";
import ProjectCard from "@/components/project-card";
import ContinueLinks from "@/components/continue-links";
import DestinationSystem from "@/components/destination-system";
import CbtLoop from "@/components/cbt-loop";
import { getProject, projects } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

const toId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  const related = project.related.map(getProject).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const images = project.images ?? [];
  const heroDesktop = images.find((image) => image.frame === "desktop");
  const heroMobile = images.find((image) => image.frame === "mobile");
  const gallery = images.filter((image) => image !== heroDesktop && image !== heroMobile);

  const facts = [
    project.role ? { label: "Role", value: project.role } : null,
    { label: "Status", value: project.status },
    { label: "Scale", value: project.scale },
    project.year ? { label: "Year", value: project.year } : null,
    project.stack.length ? { label: "Stack", value: project.stack.join(" · ") } : null,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <main>
      <header className="page-head">
        <ContourField className="contours" />
        <div className="wrap">
          <Link href="/work" className="group enter inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            <span className="link">All work</span>
          </Link>
          <p className="eyebrow enter mt-10" style={{ ["--e" as string]: 1 }}>
            <span className="idx">{String(index).padStart(2, "0")}</span>
            {project.category}
          </p>
          <h1 className="t-mega enter mt-6" style={{ ["--e" as string]: 2 }}>
            {project.name}
          </h1>
          <p className="t-lead enter mt-5 max-w-[44ch]" style={{ ["--e" as string]: 3 }}>
            {project.tagline}
          </p>

          <dl className="rail enter mt-12 border-t border-[var(--color-line)] pt-8" style={{ ["--e" as string]: 4 }}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {project.links.length ? (
            <div className="enter mt-9 flex flex-wrap gap-3" style={{ ["--e" as string]: 5 }}>
              {project.links.map((link, i) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${i === 0 ? "btn-primary" : ""}`}
                  >
                    {link.label} <span aria-hidden="true" className="arrow arrow-ext">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className={`btn ${i === 0 ? "btn-primary" : ""}`}>
                    {link.label} <span aria-hidden="true" className="arrow">→</span>
                  </Link>
                ),
              )}
            </div>
          ) : null}
        </div>
      </header>

      {heroDesktop ? (
        <section className="wrap pt-[var(--space-block)]" aria-label="Product screens">
          <div className="surface feature-stage !min-h-0 overflow-hidden !rounded-[var(--radius-lg)] !border !border-[var(--color-line)]" data-reveal>
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[1100px]">
              <div className="stage-desktop !left-[5%] !top-[9%] !w-[80%]">
                <DeviceFrame image={heroDesktop} url={`${project.slug} · prototype`} eager />
              </div>
              {heroMobile ? (
                <div className="stage-mobile !bottom-[-18%] !right-[4%] !w-[22%]">
                  <DeviceFrame image={heroMobile} eager />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section !pt-[var(--space-block)]">
        <div className="wrap grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="meta mb-4">On this page</p>
              <ol className="grid gap-2.5 border-l border-[var(--color-line)]">
                {project.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#${toId(section.heading)}`}
                      className="-ml-px flex gap-3 border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-[var(--color-marigold)] hover:text-ink"
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-faint">0{i + 1}</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div>
            <p className="t-lead max-w-[58ch] !text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] !leading-[1.45] text-ink" data-reveal>
              {project.summary}
            </p>

            {project.slug === "opendmo" ? (
              <div className="surface mt-12 p-[clamp(1.5rem,1rem+2vw,3rem)]" data-reveal>
                <p className="meta text-center">Destination system</p>
                <div className="mt-8">
                  <DestinationSystem />
                </div>
                <p className="t-small measure mx-auto mt-8 text-center text-muted">
                  A destination management organisation coordinates all of these at once — not a single
                  product, but the relationships between them.
                </p>
              </div>
            ) : null}

            {project.slug === "cbt-bangladesh" ? (
              <div className="surface mt-12 p-[clamp(1.5rem,1rem+2vw,3rem)]" data-reveal>
                <p className="meta">Community-based tourism, as a cycle</p>
                <div className="mt-6">
                  <CbtLoop />
                </div>
              </div>
            ) : null}

            <div className="mt-14 grid gap-2">
              {project.sections.map((section, i) => (
                <section
                  key={section.heading}
                  id={toId(section.heading)}
                  className="grid gap-4 border-t border-[var(--color-line)] py-10 md:grid-cols-[3rem_minmax(0,1fr)]"
                  data-reveal
                >
                  <span className="meta pt-2 text-marigold">0{i + 1}</span>
                  <div>
                    <h2 className="t-h3">{section.heading}</h2>
                    <p className="t-body measure mt-4">{section.body}</p>
                    {section.points ? (
                      <ul className="ticks measure mt-6">
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            {gallery.length ? (
              <section className="mt-6 border-t border-[var(--color-line)] pt-10" aria-labelledby="gallery-title">
                <h2 id="gallery-title" className="meta mb-6">
                  More screens
                </h2>
                <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)]">
                  <div className="grid gap-6">
                    {gallery
                      .filter((image) => image.frame === "desktop")
                      .map((image) => (
                        <figure key={image.src} data-reveal>
                          <DeviceFrame image={image} url={`${project.slug} · prototype`} />
                          <figcaption className="t-small mt-3 text-muted">{image.alt}</figcaption>
                        </figure>
                      ))}
                  </div>
                  <div className="grid gap-6">
                    {gallery
                      .filter((image) => image.frame === "mobile")
                      .map((image) => (
                        <figure key={image.src} data-reveal className="mx-auto w-full max-w-[260px]">
                          <DeviceFrame image={image} />
                          <figcaption className="t-small mt-3 text-muted">{image.alt}</figcaption>
                        </figure>
                      ))}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section rule" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" className="eyebrow mb-8">
              <span className="idx">→</span>Related projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <div key={item.slug} className="min-w-0" data-reveal>
                  <ProjectCard project={item} index={projects.findIndex((p) => p.slug === item.slug) + 1} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContinueLinks current="/work" />
    </main>
  );
}
