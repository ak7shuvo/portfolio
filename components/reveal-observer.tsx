"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveals for the whole page. Elements opt in with `data-reveal` (and
 * an optional `--d` delay) and get `.is-in` once.
 *
 * An IntersectionObserver handles normal scrolling. A rAF-throttled sweep
 * backs it up: when the page jumps past an element within a single frame
 * (End key, scrollbar drag, anchor links) the observer never sees it
 * intersect, so anything already above the fold line is revealed directly.
 * The sweep detaches itself once everything is shown.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __rv?: boolean }).__rv = true;
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!pending.length) return;

    const show = (el: Element) => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) {
      pending.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => io.observe(el));

    let frame = 0;
    const sweep = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.classList.contains("is-in")) return false;
        if (el.getBoundingClientRect().top < line) {
          show(el);
          io.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
