"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

type CopyEmailProps = { size?: "sm" | "md"; primary?: boolean };

/**
 * Copies the address, with a mailto fallback. The status is announced
 * politely for screen readers; the label reverts after two seconds.
 */
export default function CopyEmail({ size = "sm", primary = false }: CopyEmailProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
    } catch {
      setState("failed");
      window.location.href = `mailto:${site.email}`;
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`btn ${size === "sm" ? "btn-sm" : ""} ${primary ? "btn-primary" : ""}`}
    >
      <span aria-hidden="true" className="font-[family-name:var(--font-mono)] text-[0.8em]">
        {state === "copied" ? "✓" : "@"}
      </span>
      <span>{state === "copied" ? "Email copied" : "Copy email"}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? `${site.email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
