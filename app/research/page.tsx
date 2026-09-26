import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/page-head";
import FieldBand from "@/components/field-band";
import ContinueLinks from "@/components/continue-links";
import ResearchConstellation from "@/components/research-constellation";
import { currentResearch, researchInterests } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Independent, fieldwork-based research on tourist–host relations, pricing and destination trust in Sylhet, and wider interests in cultural and community-based tourism.",
};

export default function ResearchPage() {
  return (
    <main>
      <PageHead
        index="02"
        eyebrow="Research"
        title={
          <>
            Fieldwork on how tourism is <span className="t-accent">lived</span>.
          </>
        }
        lead="Independent research at the meeting point of tourism, culture, communities and destination development — with a focus on Bangladesh."
      />

      <FieldBand className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div data-reveal>
            <p className="eyebrow">
              <span className="idx">Now</span>Current study
            </p>
            <h2 className="t-h2 mt-5">{currentResearch.title}</h2>
            <p className="t-body measure mt-6 !text-ink-2">
              Independent research, ongoing since April 2026, investigating changing tourist behaviour and
              host-community dynamics in Sylhet after COVID-19. The study examines unfair and inflated
              pricing practices affecting tourists, and their impact on destination trust and repeat
              visitation. A draft write-up has been completed.
            </p>
            <dl className="rail mt-9">
              <div>
                <dt>Type</dt>
                <dd>{currentResearch.type}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{currentResearch.period}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{currentResearch.status}</dd>
              </div>
            </dl>
          </div>
          <div className="surface self-end p-6 md:p-8" data-reveal style={{ ["--d" as string]: "100ms" }}>
            <p className="meta">Research questions</p>
            <ol className="mt-5 grid gap-5">
              {currentResearch.questions.map((question, i) => (
                <li key={question} className="grid grid-cols-[2rem_1fr] gap-2 text-[1.0625rem] text-ink">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-marigold">0{i + 1}</span>
                  {question}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </FieldBand>

      <section className="section" aria-labelledby="interests-title">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal>
              <p className="eyebrow">
                <span className="idx">01</span>Interests
              </p>
              <h2 id="interests-title" className="t-h2 mt-5">
                Five threads.
              </h2>
            </div>
            <p className="t-lead measure" data-reveal>
              The questions that connect coursework, fieldwork and the products I build.
            </p>
          </div>

          <div className="mt-4 mb-10" data-reveal>
            <ResearchConstellation />
          </div>

          <ol className="border-t border-[var(--color-line)]">
            {researchInterests.map((interest, i) => (
              <li
                key={interest.title}
                className="grid gap-3 border-b border-[var(--color-line)] py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8"
                data-reveal
                style={{ ["--d" as string]: `${i * 50}ms` }}
              >
                <span className="meta pt-1.5 text-marigold">0{i + 1}</span>
                <h3 className="t-h3">{interest.title}</h3>
                <p className="t-body">{interest.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section rule" aria-labelledby="method-title">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <div className="surface p-7 md:p-9" data-reveal>
            <p className="meta">Method</p>
            <h2 id="method-title" className="t-h3 mt-3">
              Grounded in the field
            </h2>
            <p className="t-body mt-4">
              Research starts on the ground — conversations with travellers, hosts and operators — alongside
              ongoing cultural documentation.
            </p>
            <Link href="/fieldwork" className="group mt-6 inline-flex items-center gap-2 text-sm text-ink">
              <span className="link">See fieldwork</span>
              <span aria-hidden="true" className="arrow text-marigold">→</span>
            </Link>
          </div>
          <div className="surface p-7 md:p-9" data-reveal style={{ ["--d" as string]: "80ms" }}>
            <p className="meta">Direction</p>
            <h2 className="t-h3 mt-3">Towards tourism and cultural heritage</h2>
            <p className="t-body mt-4">
              The long-term direction is deeper research on tourism and cultural heritage, building on this
              independent study and on the community-participation questions CBT Bangladesh explores in practice.
            </p>
            <Link href="/academic" className="group mt-6 inline-flex items-center gap-2 text-sm text-ink">
              <span className="link">Academic background</span>
              <span aria-hidden="true" className="arrow text-marigold">→</span>
            </Link>
          </div>
        </div>
      </section>

      <ContinueLinks current="/research" />
    </main>
  );
}
