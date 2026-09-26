import fs from "fs";
import path from "path";

const bookPath = path.join(
  process.cwd(),
  "content/books/concern-for-consciousness/book.md",
);

export type Chapter = {
  number: number;
  title: string;
  content: string;
};

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

function toNumber(value: string): number {
  return Number(
    value.replace(/[০-৯]/g, (digit) => String(BENGALI_DIGITS.indexOf(digit))),
  );
}

export function getBookSource(): string {
  return fs.readFileSync(bookPath, "utf8");
}

/**
 * Parses chapters out of the manuscript.
 *
 * The chapters are numbered ১–৪ and ৭–১২, not contiguously. The route
 * previously generated params for a hardcoded 1–10, which both produced two
 * dead pages (5, 6) and left chapters 11 and 12 with no page at all. Deriving
 * the list from the source keeps the route in step with the manuscript.
 */
export function getChapters(): Chapter[] {
  const content = getBookSource();

  const matches = [
    ...content.matchAll(
      /^## অধ্যায়\s+([০-৯0-9]+)\s*\n(?:\s*\n)?###\s+(.+)$/gm,
    ),
  ];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end =
      index + 1 < matches.length
        ? (matches[index + 1].index ?? content.length)
        : content.length;

    // Drop the chapter's own "## অধ্যায় N" / "### Title" heading lines: the
    // page renders those in its header, so leaving them in the body repeats
    // the title twice on screen.
    const body = content
      .slice(start, end)
      .trim()
      .replace(/^## অধ্যায়[^\n]*\n+(?:###[^\n]*\n+)?/, "");

    return {
      number: toNumber(match[1]),
      title: match[2].trim(),
      content: body,
    };
  });
}

export function getChapter(chapter: string): {
  current: Chapter;
  previous?: Chapter;
  next?: Chapter;
} | null {
  const chapters = getChapters();
  const index = chapters.findIndex((item) => String(item.number) === chapter);

  if (index === -1) return null;

  return {
    current: chapters[index],
    previous: chapters[index - 1],
    next: chapters[index + 1],
  };
}
