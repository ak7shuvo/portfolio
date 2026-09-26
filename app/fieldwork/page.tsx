import type { Metadata } from "next";
import PageHead from "@/components/page-head";
import FieldBand from "@/components/field-band";
import ContinueLinks from "@/components/continue-links";
import { fieldExposure, fieldworkAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fieldwork",
  description:
    "Cultural documentation of Baul and Shadhok traditions, photography, interviews and tourism fieldwork in Sylhet and rural Bangladesh.",
};

export default function FieldworkPage() {
  return (
    <main>
      <PageHead
        index="04"
        eyebrow="Fieldwork"
        title={
          <>
            Where the work <span className="t-accent">starts</span>.
          </>
        }
        lead="On-the-ground documentation of cultural traditions, communities and tourism in Sylhet and rural Bangladesh."
      />

      <section className="section !pt-[var(--space-block)]" aria-label="Areas of fieldwork">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {fieldworkAreas.map((area, i) => (
            <article key={area.title} className="surface p-7" data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
              <span className="meta text-marigold">0{i + 1}</span>
              <h2 className="t-h3 mt-6">{area.title}</h2>
              <p className="t-body mt-3">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <FieldBand className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          <div data-reveal>
            <p className="eyebrow">
              <span className="idx">Documentary</span>Gram Banglar Concert
            </p>
            <h2 className="t-h2 mt-5">Shrine-based faith traditions</h2>
            <p className="t-body measure mt-6 !text-ink-2">
              Documenting Baul and Shadhok traditions — Lalon Shah, Karim Shah and others — through video
              and blog content, with live photography and videography of shrine-based folk gatherings and
              their songs.
            </p>
          </div>
          <ol className="grid gap-4" data-reveal style={{ ["--d" as string]: "100ms" }}>
            {fieldExposure.map((item, i) => (
              <li key={item.title} className="surface grid grid-cols-[2.5rem_1fr] gap-3 p-6">
                <span className="meta pt-1 text-marigold">0{i + 1}</span>
                <span>
                  <span className="t-h4 block">{item.title}</span>
                  <span className="t-small mt-1.5 block text-muted">{item.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </FieldBand>

      <div className="pt-[var(--space-section)]">
        <ContinueLinks current="/fieldwork" />
      </div>
    </main>
  );
}
