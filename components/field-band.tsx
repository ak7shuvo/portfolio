"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A full-bleed band over the Sylhet hills photograph. The photo drifts a
 * little slower than the page — a single transform, updated in one rAF per
 * scroll and only while the band is visible.
 */
export default function FieldBand({ children, className = "" }: { children: ReactNode; className?: string }) {
  const band = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    const img = photo.current;
    if (!el || !img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      // Clamped so the photo never slides out of its 12% overscan.
      const offset = Math.max(-60, Math.min(60, center * -0.12));
      img.style.setProperty("--py", `${offset.toFixed(1)}px`);
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={band} className={`field-band ${className}`}>
      <div
        ref={photo}
        className="photo"
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
