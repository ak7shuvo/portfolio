import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/page-head";
import Timeline from "@/components/timeline";
import ContinueLinks from "@/components/continue-links";
import { education, fieldExposure } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Education, experience, research, fieldwork and skills of Kowser Ahammad Shuvo.",
};

const skills = [
  { group: "Technical", items: ["Data analysis with Python", "SQL", "Web development", "Product design"] },
  { group: "Research", items: ["Fieldwork", "Interviews & field notes", "Independent research"] },
  { group: "Documentation", items: ["Photography", "Videography", "Blogging", "Writing in English & Bangla"] },
  { group: "Instruments", items: ["Drumming", "Guitar (riffs)", "Tabla", "Dotara"] },
];

export default function CVPage() {
  return (
    <main>
      <PageHead
        index="06"
        eyebrow="Curriculum vitae"
        title="Tourism, technology, research, documentation."
        lead="I work at the intersection of tourism, technology and writing — studying how people travel and choose experiences, and building products for the tourism businesses and communities that serve them."
      >
        <a href={site.cv} download className="btn btn-primary">
          Download CV <span aria-hidden="true">↓</span>
        </a>
        <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn">
          View PDF <span aria-hidden="true" className="arrow arrow-ext">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </PageHead>

      <section className="section !pt-[var(--space-block)]" aria-labelledby="experience-title">
        <div className="wrap">
          <h2 id="experience-title" className="eyebrow mb-10">
            <span className="idx">01</span>Experience, research &amp; education
          </h2>
          <Timeline />
        </div>
      </section>

      <section className="section rule" aria-labelledby="education-title">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <div className="surface p-7 md:p-9" data-reveal>
            <h2 id="education-title" className="meta">Education</h2>
            <p className="t-h3 mt-4">{education.degree}</p>
            <p className="t-small mt-2 text-ink-2">
              {education.institution} — {education.location}
            </p>
            <dl className="rail mt-7">
              <div>
                <dt>Graduation</dt>
                <dd>{education.graduation}</dd>
              </div>
              <div>
                <dt>CGPA</dt>
                <dd>{education.cgpa}</dd>
              </div>
            </dl>
            <p className="meta mt-8">Relevant coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <li key={course} className="tag">
                  {course}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface p-7 md:p-9" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <h2 className="meta">Skills</h2>
            <dl className="mt-4 grid gap-6">
              {skills.map((skill) => (
                <div key={skill.group}>
                  <dt className="t-h4">{skill.group}</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="wrap mt-6">
          <div className="surface p-7 md:p-9" data-reveal>
            <h2 className="meta">Field exposure</h2>
            <ul className="mt-5 grid gap-6 md:grid-cols-3">
              {fieldExposure.map((item) => (
                <li key={item.title}>
                  <p className="t-h4">{item.title}</p>
                  <p className="t-small mt-2 text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="wrap mt-10 flex flex-wrap items-center justify-between gap-4" data-reveal>
          <p className="t-small text-muted">The PDF is the complete, formatted version.</p>
          <Link href="/contact" className="group inline-flex items-center gap-2 text-ink">
            <span className="link">Get in touch</span>
            <span aria-hidden="true" className="arrow text-marigold">→</span>
          </Link>
        </div>
      </section>

      <ContinueLinks current="/cv" />
    </main>
  );
}
