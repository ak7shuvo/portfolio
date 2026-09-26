import type { Metadata } from "next";
import PageHead from "@/components/page-head";
import CopyEmail from "@/components/copy-email";
import ContinueLinks from "@/components/continue-links";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about tourism research, community-based tourism, collaboration and product work.",
};

const topics = [
  { title: "Research collaboration", body: "Tourist–host relations, pricing and destination trust, community-based and heritage tourism." },
  { title: "Tourism partnerships", body: "Operators, communities and CBT initiatives in Sylhet and across Bangladesh." },
  { title: "Product work", body: "OpenDMO, CBT Bangladesh, Angon and SylhetTrail." },
];

/**
 * Email-first, with no form: the site is a static export with no backend, so
 * a form would either drop messages or depend on a third-party service.
 */
export default function ContactPage() {
  return (
    <main>
      <PageHead
        index="07"
        eyebrow="Contact"
        title={
          <>
            Let’s <span className="t-accent">talk</span>.
          </>
        }
        lead="Open to conversations on tourism research, community-based tourism, collaboration and product work. Email is the fastest way to reach me."
      />

      <section className="section !pt-[var(--space-block)]">
        <div className="wrap grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="surface p-7 md:p-10" data-reveal>
            <p className="meta">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="link mt-4 inline-block font-[family-name:var(--font-display)] text-[clamp(1.2rem,0.8rem+2.4vw,2.75rem)] [overflow-wrap:anywhere] font-medium tracking-[-0.03em] text-ink"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                Write an email <span aria-hidden="true" className="arrow">→</span>
              </a>
              <CopyEmail size="md" />
            </div>
          </div>

          <div className="surface p-7 md:p-10" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <dl className="grid gap-7">
              <div>
                <dt className="meta">Phone</dt>
                <dd className="mt-2">
                  <a href="tel:+8801609347600" className="link text-lg text-ink">
                    +880 1609 347600
                  </a>
                </dd>
              </div>
              <div>
                <dt className="meta">Location</dt>
                <dd className="mt-2 text-lg text-ink">{site.location}</dd>
                <dd className="meta mt-1">{site.coordinates}</dd>
              </div>
              <div>
                <dt className="meta">CV</dt>
                <dd className="mt-2">
                  <a href={site.cv} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-lg text-ink">
                    <span className="link">Download PDF</span>
                    <span aria-hidden="true" className="arrow arrow-ext text-marigold">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="wrap mt-6 grid gap-6 md:grid-cols-3">
          {topics.map((topic, i) => (
            <div key={topic.title} className="surface p-7" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
              <p className="t-h4">{topic.title}</p>
              <p className="t-small mt-3 text-muted">{topic.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ContinueLinks current="/contact" />
    </main>
  );
}
