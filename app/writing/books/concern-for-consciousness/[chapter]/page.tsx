import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookReader from "@/components/book-reader";
import { getChapter, getChapters } from "@/lib/book";

const BOOK_HREF = "/writing/books/concern-for-consciousness";

type Params = Promise<{ chapter: string }>;

/** Derived from the manuscript, so every existing chapter gets a page. */
export function generateStaticParams() {
  return getChapters().map((chapter) => ({ chapter: String(chapter.number) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { chapter } = await params;
  const found = getChapter(chapter);
  if (!found) return {};
  return {
    title: `${found.current.title} — Concern for Consciousness`,
    description: `Chapter ${found.current.number} of Concern for Consciousness.`,
  };
}

export default async function ChapterPage({ params }: { params: Params }) {
  const { chapter } = await params;
  const found = getChapter(chapter);
  if (!found) notFound();

  const { current, previous, next } = found;
  const total = getChapters().length;

  return (
    <main className="pb-[var(--space-section)] pt-[calc(var(--header-h)+2.5rem)]">
      <div className="wrap">
        <div className="mx-auto max-w-[860px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href={BOOK_HREF} className="group inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
              <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              <span className="link">Concern for Consciousness</span>
            </Link>
            <span className="meta">Chapter {current.number} · {total} in the book</span>
          </div>

          <article className="paper enter mt-8 px-6 py-10 sm:px-10 md:px-16 md:py-16">
            <header className="border-b border-[rgb(28_25_21/0.12)] pb-8">
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-paper-muted)]">
                Chapter {current.number}
              </p>
              <h1 lang="bn" className="mt-4 font-[family-name:var(--font-bangla)] text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-bold leading-[1.35] tracking-normal text-[var(--color-paper-ink)]">
                {current.title}
              </h1>
            </header>
            <div className="mt-10">
              <BookReader content={current.content} />
            </div>
          </article>

          <nav aria-label="Chapter navigation" className="mt-8 grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link href={`${BOOK_HREF}/${previous.number}`} className="surface group p-5">
                <span className="meta">← Previous · {previous.number}</span>
                <span lang="bn" className="mt-2 block font-[family-name:var(--font-bangla)] text-ink-2 group-hover:text-ink">{previous.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link href={`${BOOK_HREF}/${next.number}`} className="surface group p-5 text-right">
                <span className="meta">Next · {next.number} →</span>
                <span lang="bn" className="mt-2 block font-[family-name:var(--font-bangla)] text-ink-2 group-hover:text-ink">{next.title}</span>
              </Link>
            ) : (
              <Link href={BOOK_HREF} className="surface group p-5 text-right">
                <span className="meta">End of book</span>
                <span className="mt-2 block text-ink-2 group-hover:text-ink">Back to contents</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}
