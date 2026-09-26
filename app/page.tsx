/* eslint-disable @next/next/no-img-element -- static export serves images as-is */
import Link from "next/link";
import Hero from "@/components/hero";
import SectionHead from "@/components/section-head";
import MethodLoop from "@/components/method-loop";
import ProjectFeature from "@/components/project-feature";
import ProjectCard from "@/components/project-card";
import FieldBand from "@/components/field-band";
import BookObject from "@/components/book-object";
import Timeline from "@/components/timeline";
import Tilt from "@/components/tilt";
import CopyEmail from "@/components/copy-email";
import { books, currentResearch, fieldworkAreas, projects, scales } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const supporting = projects.filter((project) => project.slug !== featured.slug);
  const book = books[0];

  return (
    <main>
      <Hero />

      {/* 01 — How the work connects */}
      <section className="section" aria-labelledby="practice-title">
        <div className="wrap">
          <SectionHead index="01" eyebrow="Practice" title="One practice, not a list of skills." id="practice-title">
            Research tells me what travellers and hosts actually experience. Python and data analysis make
            that evidence. Web development turns it into something people can use — and writing carries it
            back out. Select a stage to see its tools and what it feeds.
          </SectionHead>
          <MethodLoop />
        </div>
      </section>

      {/* 02 — Work */}
      <section className="section rule" aria-labelledby="work-title">
        <div className="wrap">
          <SectionHead index="02" eyebrow="Selected work" title="Products at three scales." id="work-title">
            Tourism works at the level of a community, an operator and a whole destination. Each project
            takes on one of them.
          </SectionHead>

          <div className="ladder mb-10" data-reveal>
            {scales.map((item, i) => (
              <div key={item.scale}>
                <p className="meta">
                  <span className="text-marigold">0{i + 1}</span> · {item.scale}
                </p>
                <p className="mt-3 text-[0.9375rem] text-ink-2">{item.description}</p>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {projects
                    .filter((project) => project.scale === item.scale)
                    .map((project) => (
                      <Link key={project.slug} href={`/work/${project.slug}`} className="link text-ink">
                        {project.name}
                      </Link>
                    ))}
                </p>
              </div>
            ))}
          </div>

          <ProjectFeature project={featured} />

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {supporting.map((project, i) => (
              <div key={project.slug} className="min-w-0" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <ProjectCard project={project} index={i + 2} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end" data-reveal>
            <Link href="/work" className="group inline-flex items-center gap-2 text-ink">
              <span className="link">The full work archive</span>
              <span aria-hidden="true" className="arrow text-marigold">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 03 — Research, over the landscape it studies */}
      <FieldBand className="section" >
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
            <div data-reveal>
              <p className="eyebrow">
                <span className="idx">03</span>Current research
              </p>
              <h2 className="t-h2 mt-5 max-w-[20ch]">{currentResearch.title}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="tag tag-tea">{currentResearch.type}</span>
                <span className="tag">{currentResearch.period}</span>
                <span className="tag">{currentResearch.status}</span>
              </div>
            </div>

            <div className="surface p-6 backdrop-blur-sm md:p-8" data-reveal style={{ ["--d" as string]: "100ms" }}>
              <p className="meta">Questions</p>
              <ol className="mt-4 grid gap-4">
                {currentResearch.questions.map((question, i) => (
                  <li key={question} className="grid grid-cols-[2rem_1fr] gap-2 text-ink-2">
                    <span className="font-[family-name:var(--font-mono)] text-sm text-marigold">0{i + 1}</span>
                    {question}
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/research" className="btn btn-sm btn-primary">
                  Research <span aria-hidden="true" className="arrow">→</span>
                </Link>
                <Link href="/fieldwork" className="btn btn-sm">
                  Fieldwork
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FieldBand>

      {/* 04 — Writing & documentation */}
      <section className="section" aria-labelledby="writing-title">
        <div className="wrap">
          <SectionHead index="04" eyebrow="Writing & documentation" title="Explaining ideas, recording culture." id="writing-title">
            A book on Hegel written in Bangla, and ongoing documentation of Baul and Shadhok traditions at
            rural shrine gatherings.
          </SectionHead>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <Link
              href={book.href}
              className="surface group grid items-center gap-10 overflow-hidden p-7 sm:grid-cols-[auto_1fr] md:p-10"
              data-reveal
            >
              <div className="flex justify-center py-4 sm:pl-4">
                <BookObject title={book.title} subtitle="Kowser Ahammad Shuvo" />
              </div>
              <div>
                <p className="meta">{book.category}</p>
                <h3 className="t-h3 mt-3 transition-colors group-hover:text-marigold">{book.title}</h3>
                <p className="t-small mt-4 text-muted">{book.summary}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm text-marigold">
                  Read chapter by chapter <span aria-hidden="true" className="arrow">→</span>
                </span>
              </div>
            </Link>

            <div className="surface p-7 md:p-9" data-reveal style={{ ["--d" as string]: "100ms" }}>
              <p className="meta">Fieldwork</p>
              <ul className="mt-2">
                {fieldworkAreas.map((area) => (
                  <li key={area.title} className="border-b border-[var(--color-line)] py-5 last:border-b-0">
                    <p className="t-h4">{area.title}</p>
                    <p className="t-small mt-1.5 text-muted">{area.description}</p>
                  </li>
                ))}
              </ul>
              <Link href="/fieldwork" className="group mt-3 inline-flex items-center gap-2 text-sm text-ink">
                <span className="link">Field notes and documentation</span>
                <span aria-hidden="true" className="arrow text-marigold">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Who, and where the work fits */}
      <section className="section rule" aria-labelledby="context-title">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow" data-reveal>
              <span className="idx">05</span>Context
            </p>
            <h2 id="context-title" className="t-h2 mt-5" data-reveal>
              Between the classroom, the field and the build.
            </h2>
            <Tilt className="surface mt-9 max-w-[320px] overflow-hidden p-2" max={6}>
              <img
                src="/media/profile-480.webp"
                srcSet="/media/profile-480.webp 480w, /media/profile-960.webp 960w"
                sizes="320px"
                width={480}
                height={471}
                alt={`Portrait of ${site.name}`}
                loading="lazy"
                decoding="async"
                className="lift w-full rounded-[10px]"
                style={{ ["--z" as string]: "20px" }}
              />
              <p className="meta px-2 pb-1 pt-3">
                {site.location} · BTHM, Leading University
              </p>
            </Tilt>
            <Link href="/about" className="group mt-7 inline-flex items-center gap-2 text-ink">
              <span className="link">More about me</span>
              <span aria-hidden="true" className="arrow text-marigold">→</span>
            </Link>
          </div>

          <Timeline />
        </div>
      </section>

      {/* 06 — Contact */}
      <section className="section rule overflow-hidden" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            <span className="idx">06</span>Contact
          </p>
          <h2 id="contact-title" className="t-display mt-6 max-w-[16ch]" data-reveal>
            Working on tourism, communities or travel products?{" "}
            <span className="t-accent">Let’s talk.</span>
          </h2>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between" data-reveal>
            <a
              href={`mailto:${site.email}`}
              className="link [overflow-wrap:anywhere] font-[family-name:var(--font-display)] text-[clamp(1.2rem,0.8rem+2vw,2.4rem)] font-medium tracking-[-0.03em] text-ink-2 hover:text-ink"
            >
              {site.email}
            </a>
            <div className="flex flex-wrap gap-3">
              <CopyEmail size="md" primary />
              <Link href="/contact" className="btn">
                Other ways to reach me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
