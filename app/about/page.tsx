/* eslint-disable @next/next/no-img-element -- static export serves images as-is */
import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/page-head";
import Tilt from "@/components/tilt";
import ContinueLinks from "@/components/continue-links";
import { practices, projects } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kowser Ahammad Shuvo — tourism researcher and product builder in Sylhet, working across fieldwork, data analysis, web development and writing.",
};

const problems = [
  {
    title: "When prices break trust",
    body: "Inflated and unfair pricing is one of the clearest ways a destination loses visitors. It is a central thread of my current research in Sylhet.",
  },
  {
    title: "When the host is invisible",
    body: "Booking tools often hide the community behind a room. CBT Bangladesh starts from the initiative and shows where the money goes.",
  },
  {
    title: "When travel won’t fit a package",
    body: "Travellers now plan flexibly while many operators still sell fixed tours. SylhetTrail is designed for both.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHead
        index="05"
        eyebrow="About"
        title={
          <>
            A researcher who <span className="t-accent">builds</span>.
          </>
        }
        lead="I study tourism in Bangladesh — how people travel, how hosts experience them and how destinations change — and I build products where that research points to a gap."
      />

      <section className="section !pt-[var(--space-block)]">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <Tilt className="surface overflow-hidden p-2" max={5}>
              <img
                src="/media/profile-960.webp"
                srcSet="/media/profile-480.webp 480w, /media/profile-960.webp 960w"
                sizes="(max-width: 1024px) 90vw, 400px"
                width={960}
                height={942}
                alt={`Portrait of ${site.name}`}
                decoding="async"
                className="lift w-full rounded-[10px]"
                style={{ ["--z" as string]: "20px" }}
              />
            </Tilt>
            <dl className="rail mt-8">
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Studying</dt>
                <dd>BTHM, Leading University · 2027</dd>
              </div>
            </dl>
          </div>

          <div>
            <div className="measure space-y-6" data-reveal>
              <p className="t-lead text-ink">
                I’m Kowser Ahammad Shuvo, a tourism and hospitality management student at Leading
                University and an independent researcher in Sylhet.
              </p>
              <p className="t-body">
                My research is fieldwork-first. Since April 2026 I have been studying how tourist
                behaviour and host-community relations in Sylhet changed after COVID-19, and how inflated
                pricing affects trust and repeat visits. On the technical side I work with Python for data
                analysis, SQL and web development.
              </p>
              <p className="t-body">
                The building comes from the same questions. I co-founded SylhetTrail, a commission-based
                tour operator built around fixed and custom booking flows. Angon is a separate project — a
                documentation and documentary platform for culture and place, not part of SylhetTrail’s
                booking system. CBT Bangladesh is my prototype for how community-based tourism initiatives
                could run day to day, and OpenDMO takes a data and ML approach to the same questions at the
                scale of a whole destination.
              </p>
              <p className="t-body">
                Alongside that I write — including a book on Hegel in Bangla — and document Baul and
                Shadhok traditions at rural shrine gatherings. My direction from here is deeper research
                on tourism and cultural heritage, with products that stay close to the people they serve.
              </p>
            </div>

            <div className="mt-16" data-reveal>
              <p className="meta mb-6">Problems I keep returning to</p>
              <div className="grid gap-4 md:grid-cols-3">
                {problems.map((problem) => (
                  <div key={problem.title} className="surface p-6">
                    <h2 className="t-h4">{problem.title}</h2>
                    <p className="t-small mt-3 text-muted">{problem.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16" data-reveal>
              <p className="meta mb-6">How the work connects</p>
              <ol className="border-t border-[var(--color-line)]">
                {practices.map((practice, i) => (
                  <li
                    key={practice.id}
                    className="grid gap-2 border-b border-[var(--color-line)] py-6 md:grid-cols-[3rem_9rem_minmax(0,1fr)] md:gap-6"
                  >
                    <span className="meta text-marigold">0{i + 1}</span>
                    <span className="t-h4">{practice.label}</span>
                    <span>
                      <span className="t-small block text-ink-2">{practice.description}</span>
                      <span className="mt-3 flex flex-wrap gap-2">
                        {practice.tools.map((tool) => (
                          <span key={tool} className="tag">
                            {tool}
                          </span>
                        ))}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-2" data-reveal>
              <div className="surface p-6">
                <p className="meta">Currently building</p>
                <ul className="mt-4 grid gap-2">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link href={`/work/${project.slug}`} className="group flex items-center justify-between gap-3 text-ink-2 hover:text-ink">
                        <span className="link">{project.name}</span>
                        <span className="meta">{project.scale}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface p-6">
                <p className="meta">Off the desk</p>
                <p className="t-small mt-4 text-ink-2">
                  Drumming, guitar riffs, tabla and dotara.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContinueLinks current="/about" />
    </main>
  );
}
