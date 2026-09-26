import Link from "next/link";
import ContourField from "@/components/contour-field";

export default function NotFound() {
  return (
    <main className="page-head !border-b-0 flex min-h-[80svh] items-center">
      <ContourField className="contours" />
      <div className="wrap">
        <p className="eyebrow">
          <span className="idx">404</span>Off the map
        </p>
        <h1 className="t-display mt-6 max-w-[14ch]">This page isn’t on the map.</h1>
        <p className="t-lead measure mt-6">The address may have changed, or the page never existed.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <Link href="/work" className="btn">
            See the work
          </Link>
        </div>
      </div>
    </main>
  );
}
