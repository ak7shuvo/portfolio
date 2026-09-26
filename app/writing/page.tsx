import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/page-head";
import BookObject from "@/components/book-object";
import ContinueLinks from "@/components/continue-links";
import { books, writingInProgress } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "A book on Hegel’s philosophy in Bangla, and writing in progress on tourism, culture and technology.",
};

export default function WritingPage() {
  return (
    <main>
      <PageHead
        index="03"
        eyebrow="Writing"
        title={
          <>
            Making hard ideas <span className="t-accent">readable</span>.
          </>
        }
        lead="Books, essays and research-oriented writing on philosophy, tourism, culture and technology."
      />

      <section className="section !pt-[var(--space-block)]" aria-labelledby="published-title">
        <div className="wrap">
          <h2 id="published-title" className="eyebrow mb-8">
            <span className="idx">01</span>Published
          </h2>
          {books.map((book) => (
            <Link
              key={book.slug}
              href={book.href}
              className="surface group grid items-center gap-12 overflow-hidden p-8 md:grid-cols-[auto_1fr] md:p-14"
              data-reveal
            >
              <div className="flex justify-center py-6 md:px-10">
                <BookObject title={book.title} subtitle="Kowser Ahammad Shuvo" />
              </div>
              <div className="max-w-[52ch]">
                <p className="meta">{book.category}</p>
                <h3 className="t-h2 mt-4 transition-colors group-hover:text-marigold">{book.title}</h3>
                <p className="t-body mt-5">{book.summary}</p>
                <span className="btn btn-primary mt-9">
                  Read the book <span aria-hidden="true" className="arrow">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section rule !pt-[var(--space-block)]" aria-labelledby="progress-title">
        <div className="wrap">
          <h2 id="progress-title" className="eyebrow mb-8">
            <span className="idx">02</span>In progress
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {writingInProgress.map((item) => (
              <li key={item} className="bg-[var(--color-void)] p-6">
                <p className="t-h4">{item}</p>
                <p className="meta mt-3">Not yet published</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContinueLinks current="/writing" />
    </main>
  );
}
