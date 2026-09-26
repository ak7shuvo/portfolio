import type { Metadata } from "next";
import Link from "next/link";
import BookObject from "@/components/book-object";
import ContourField from "@/components/contour-field";
import { getChapters } from "@/lib/book";

export const metadata: Metadata = {
  title: "Concern for Consciousness",
  description:
    "A reading of Hegel’s philosophy — consciousness, self-consciousness, conflict, recognition, spirit, religion and history — presented chapter by chapter, in Bangla.",
};

const BOOK_HREF = "/writing/books/concern-for-consciousness";

export default function ConcernForConsciousnessPage() {
  const chapters = getChapters();

  return (
    <main>
      <header className="page-head">
        <ContourField className="contours" />
        <div className="wrap grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Link href="/writing" className="group enter inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
              <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              <span className="link">Writing</span>
            </Link>
            <p className="eyebrow enter mt-10" style={{ ["--e" as string]: 1 }}>
              <span className="idx">Book</span>Bangla · {chapters.length} chapters
            </p>
            <h1 className="t-display enter mt-6 max-w-[14ch]" style={{ ["--e" as string]: 2 }}>
              Concern for Consciousness
            </h1>
            <p lang="bn" className="enter mt-6 max-w-[40ch] font-[family-name:var(--font-bangla)] text-[1.15rem] leading-[1.9] text-ink-2" style={{ ["--e" as string]: 3 }}>
              চেতনা, আত্ম-চেতনা, দ্বন্দ্ব, স্বীকৃতি, স্পিরিট, ধর্ম ও ইতিহাসের মধ্য দিয়ে হেগেলের দর্শনের একটি পাঠযাত্রা।
            </p>
            {chapters.length > 0 ? (
              <div className="enter mt-9" style={{ ["--e" as string]: 4 }}>
                <Link href={`${BOOK_HREF}/${chapters[0].number}`} className="btn btn-primary">
                  Start reading <span aria-hidden="true" className="arrow">→</span>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="enter hidden justify-center md:flex md:px-12" style={{ ["--e" as string]: 3 }}>
            <div className="group">
              <BookObject title="Concern for Consciousness" subtitle="Kowser Ahammad Shuvo" />
            </div>
          </div>
        </div>
      </header>

      <section className="section !pt-[var(--space-block)]">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div data-reveal>
            <p className="meta">About this book</p>
            <p lang="bn" className="mt-5 font-[family-name:var(--font-bangla)] text-[1.0625rem] leading-[1.95] text-ink-2">
              এই বইটি তাঁদের জন্য, যাঁরা দর্শনকে ভয় পান কিন্তু জানতে চান। বইটি হেগেলের চেতনার বিকাশকে সহজ ভাষা,
              উদাহরণ এবং আধুনিক জীবনের অভিজ্ঞতার সঙ্গে মিলিয়ে অনুসরণ করার চেষ্টা করে।
            </p>
          </div>

          <div>
            <h2 className="meta mb-5">Chapters</h2>
            <ol className="border-t border-[var(--color-line)]">
              {chapters.map((chapter, i) => (
                <li key={chapter.number} data-reveal style={{ ["--d" as string]: `${Math.min(i, 8) * 40}ms` }}>
                  <Link
                    href={`${BOOK_HREF}/${chapter.number}`}
                    className="index-row group !grid-cols-[3rem_minmax(0,1fr)_2rem]"
                  >
                    <span className="meta">{String(chapter.number).padStart(2, "0")}</span>
                    <span lang="bn" className="font-[family-name:var(--font-bangla)] text-[1.125rem] leading-snug text-ink transition-colors group-hover:text-marigold">
                      {chapter.title}
                    </span>
                    <span aria-hidden="true" className="arrow justify-self-end text-marigold">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
