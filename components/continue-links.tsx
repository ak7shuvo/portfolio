import Link from "next/link";
import { indexItems } from "@/lib/site";

/** End-of-page wayfinding: two next destinations, never the current page. */
export default function ContinueLinks({ current }: { current: string }) {
  const order = ["/work", "/research", "/writing", "/fieldwork", "/about", "/cv", "/academic", "/contact"];
  const start = Math.max(0, order.indexOf(current));
  const next = [order[(start + 1) % order.length], order[(start + 2) % order.length]]
    .map((href) => indexItems.find((item) => item.href === href))
    .filter((item): item is (typeof indexItems)[number] => Boolean(item));

  return (
    <nav aria-label="Continue exploring" className="wrap pb-[var(--space-section)]">
      <p className="meta mb-5">Continue</p>
      <div className="grid gap-4 md:grid-cols-2">
        {next.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="surface group flex items-end justify-between gap-6 p-6 transition-colors duration-300 hover:border-[var(--color-line-3)] md:p-8"
          >
            <span>
              <span className="t-h3 block">{item.label}</span>
              <span className="t-small mt-2 block text-muted">{item.description}</span>
            </span>
            <span aria-hidden="true" className="arrow text-xl text-marigold">→</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
