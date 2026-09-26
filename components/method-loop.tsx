"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { practices } from "@/lib/content";

/** Node positions around the loop, clockwise from the top (percent). */
const POS = [
  { x: 50, y: 10 },
  { x: 90, y: 50 },
  { x: 50, y: 90 },
  { x: 10, y: 50 },
];
const R = 40; // orbit radius in viewBox units (100 × 100)
const CIRC = 2 * Math.PI * R;

/**
 * The practice loop: Field → Analyse → Build → Tell → back to Field.
 * A tablist — arrow keys move between practices — with the orbit drawing
 * itself up to the selected node, so the relationship reads at a glance.
 */
export default function MethodLoop() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const practice = practices[active];

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    let next: number | null = null;
    if (delta) next = (active + delta + practices.length) % practices.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = practices.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  // Arc drawn from the top node clockwise to the active node (quarter per step).
  const shown = active === 0 ? CIRC * 0.02 : (CIRC * active) / 4;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <div className="loop" data-reveal>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="orbit" cx="50" cy="50" r={R} />
          <circle
            className="orbit-dash"
            cx="50"
            cy="50"
            r={R}
            strokeDasharray={`${shown} ${CIRC}`}
            transform="rotate(-90 50 50)"
          />
          {/* Direction ticks between nodes. */}
          {[45, 135, 225, 315].map((deg) => {
            const a = ((deg - 90) * Math.PI) / 180;
            const cx = 50 + R * Math.cos(a);
            const cy = 50 + R * Math.sin(a);
            return (
              <path
                key={deg}
                d="M -1.4 -1.6 L 1 0 L -1.4 1.6"
                fill="none"
                stroke="rgb(238 234 225 / 0.35)"
                strokeWidth="0.5"
                transform={`translate(${cx} ${cy}) rotate(${deg})`}
              />
            );
          })}
        </svg>

        <div className="loop-core">
          <p className="meta">One practice</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[clamp(0.95rem,0.85rem+0.4vw,1.15rem)] font-semibold leading-tight tracking-[-0.02em] text-ink-2">
            Field to product, and back
          </p>
        </div>

        <div role="tablist" aria-label="Practices" aria-orientation="horizontal">
          {practices.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${p.id}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel`}
              tabIndex={active === i ? 0 : -1}
              className="loop-node"
              style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
            >
              <span>
                <span className="n block">0{i + 1}</span>
                <span className="l mt-1 block">{p.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        key={practice.id}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${practice.id}`}
        className="practice-panel"
      >
        <p className="meta">
          0{active + 1} / 04 · {practice.label}
        </p>
        <h3 className="t-h2 mt-4">{practice.question}</h3>
        <p className="t-lead mt-5 max-w-[46ch]">{practice.description}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="meta mb-3">Tools &amp; methods</p>
            <ul className="flex flex-wrap gap-2">
              {practice.tools.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="meta mb-3">Feeds into</p>
            <ul className="grid gap-2">
              {practice.outputs.map((output) => (
                <li key={output.label}>
                  <Link href={output.href} className="group inline-flex items-center gap-2 text-ink-2 hover:text-ink">
                    <span className="link">{output.label}</span>
                    <span aria-hidden="true" className="arrow text-marigold">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setActive((active + 1) % practices.length)}
          >
            Next: {practices[(active + 1) % practices.length].label}
            <span aria-hidden="true" className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
