"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Drives the hero terrain's depth. Pointer position nudges the plane's tilt;
 * scrolling the hero away slowly flattens and lifts it. Both write CSS custom
 * properties inside a single requestAnimationFrame, and listeners only run
 * while the hero is on screen. Disabled for coarse pointers (tilt) and for
 * reduced motion (everything).
 */
export default function HeroTerrain({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    const hero = stage?.closest<HTMLElement>(".hero");
    if (!stage || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    let px = 0;
    let py = 0;
    let visible = true;

    const apply = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      stage.style.setProperty("--px", `${(py * -5 + progress * 10).toFixed(2)}deg`);
      stage.style.setProperty("--pz", `${(px * 7).toFixed(2)}deg`);
      stage.style.setProperty("--lift", `${(progress * -120).toFixed(1)}px`);
    };
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(apply);
    };
    const onPointer = (event: PointerEvent) => {
      px = event.clientX / window.innerWidth - 0.5;
      py = event.clientY / window.innerHeight - 0.5;
      schedule();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(hero);

    if (fine) hero.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      hero.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div ref={ref} className="terrain" aria-hidden="true">
      {children}
    </div>
  );
}

/** A headline word that highlights the matching terrain pins on hover. */
export function HeroWord({ topic, children }: { topic: string; children: ReactNode }) {
  const set = (value: string | null) => (event: React.PointerEvent<HTMLSpanElement>) => {
    const hero = event.currentTarget.closest<HTMLElement>(".hero");
    if (!hero) return;
    if (value) hero.dataset.focus = value;
    else delete hero.dataset.focus;
  };
  return (
    <span className="t-accent hero-word" onPointerEnter={set(topic)} onPointerLeave={set(null)}>
      {children}
    </span>
  );
}
