"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navItems, site } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  // The sheet is "open on" a pathname, so navigating anywhere closes it
  // without an effect that sets state.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((current: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenOn(next ? pathname : null);
  };
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll state + reading progress, batched into one frame per scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty("--progress", max > 0 ? String(Math.min(1, y / max)) : "0");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Sheet: lock scroll, close on Escape, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-scrolled={scrolled}
        data-open={open}
      >
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Mark />
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                {site.name}
              </span>
              <span className="meta mt-1 hidden !text-[0.6rem] sm:block">{site.role}</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              >
                <span className="n">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-sm btn-primary ml-1">
              Contact
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="menu-btn lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="progress" aria-hidden="true" />
      </header>

      <div id="site-menu" className="mobile-sheet lg:hidden" data-open={open} inert={!open}>
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10 pt-4">
          {[...navItems, { label: "Contact", href: "/contact", description: "" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="sheet-link"
              style={{ ["--i" as string]: i }}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
            >
              <span className="n">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-10">
            <p className="meta">{site.location}</p>
            <a href={`mailto:${site.email}`} className="link mt-2 inline-block text-ink-2">
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

/** Monogram: a contour ring with a pinned point — the atlas motif, small. */
function Mark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="shrink-0">
      <rect x="0.5" y="0.5" width="33" height="33" rx="8" fill="#131817" stroke="rgb(238 234 225 / 0.14)" />
      <path d="M7 21c3-5 6-7 10-7s7 2 10 7" fill="none" stroke="rgb(238 234 225 / 0.35)" strokeWidth="1.2" />
      <path d="M10 25c2.4-3.3 4.6-4.6 7-4.6s4.6 1.3 7 4.6" fill="none" stroke="rgb(238 234 225 / 0.22)" strokeWidth="1.2" />
      <circle cx="17" cy="10.5" r="3" fill="#f2a93b" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
    </svg>
  );
}
