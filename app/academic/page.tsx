import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/page-head";
import ContinueLinks from "@/components/continue-links";
import { currentResearch, education } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Academic",
  description: "Academic background in tourism and hospitality management, coursework and research direction.",
};

export default function AcademicPage() {
  return (
    <main>
      <PageHead
        index="—"
        eyebrow="Academic"
        title="Tourism and hospitality management."
        lead={`${education.degree}, ${education.institution}, ${education.location}. Expected graduation ${education.graduation}.`}
      >
        <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn">
          CV (PDF) <span aria-hidden="true" className="arrow arrow-ext">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </PageHead>

      <section className="section !pt-[var(--space-block)]">
        <div className="wrap grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="surface p-7 md:p-9" data-reveal>
            <p className="meta">Relevant coursework</p>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {education.coursework.map((course) => (
                <li key={course} className="border-b border-[var(--color-line)] py-3.5 text-ink-2">
                  {course}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6">
            <div className="surface p-7" data-reveal style={{ ["--d" as string]: "80ms" }}>
              <dl className="rail">
                <div>
                  <dt>Graduation</dt>
                  <dd>{education.graduation}</dd>
                </div>
                <div>
                  <dt>CGPA</dt>
                  <dd>{education.cgpa}</dd>
                </div>
              </dl>
            </div>
            <div className="surface p-7" data-reveal style={{ ["--d" as string]: "140ms" }}>
              <p className="meta">Coursework meets fieldwork</p>
              <p className="t-small mt-3 text-ink-2">
                Heritage and eco-tourism, community and cultural issues, and planning and development inform
                — and are informed by — independent research and fieldwork.
              </p>
            </div>
          </div>
        </div>

        <div className="wrap mt-6">
          <Link href="/research" className="surface group flex flex-col gap-4 p-7 md:flex-row md:items-end md:justify-between md:p-9" data-reveal>
            <span>
              <span className="meta block">Academic project · {currentResearch.period}</span>
              <span className="t-h3 mt-3 block max-w-[34ch] transition-colors group-hover:text-marigold">{currentResearch.title}</span>
            </span>
            <span aria-hidden="true" className="arrow text-xl text-marigold">→</span>
          </Link>
        </div>
      </section>

      <ContinueLinks current="/academic" />
    </main>
  );
}
