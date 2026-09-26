"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  as?: "div" | "article" | "li";
};

/**
 * Depth hover for surfaces. Writes --rx/--ry (rotation) and --mx/--my (light
 * position) on the element; the `.depth` class turns them into a perspective
 * transform. Only active for fine pointers with motion allowed, and updates
 * are batched into one requestAnimationFrame per pointer move.
 */
export default function Tilt({ children, className = "", max = 5, as = "div" }: TiltProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let frame = 0;
    let rect: DOMRect | null = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.classList.add("is-hover");
    };
    const onMove = (event: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      rect = null;
      el.classList.remove("is-hover");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`depth ${className}`}>
      {children}
    </Tag>
  );
}
