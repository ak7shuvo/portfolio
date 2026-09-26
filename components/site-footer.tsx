import Link from "next/link";
import CopyEmail from "@/components/copy-email";
import { indexItems, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer relative mt-auto border-t border-[var(--color-line)] bg-[var(--color-deep)]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div>
          <p className="meta">{site.coordinates}</p>
          <p className="t-h3 mt-4 max-w-[22ch]">
            Research in the field. Products for the people who live there.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail />
            <a href={site.cv} className="btn btn-sm" target="_blank" rel="noopener noreferrer">
              CV <span aria-hidden="true" className="arrow arrow-ext">↗</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="meta mb-5">Index</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
            {indexItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link link-muted text-[0.9375rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-[var(--color-line)] py-6 md:flex-row md:items-center md:justify-between">
        <span className="meta">© {new Date().getFullYear()} {site.name}</span>
        <span className="meta">{site.location}</span>
      </div>
    </footer>
  );
}
