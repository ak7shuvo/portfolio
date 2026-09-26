import Link from "next/link";
import HeroTerrain, { HeroWord } from "@/components/hero-terrain";
import { buildContours } from "@/lib/terrain";
import { site } from "@/lib/site";

/** Signals pinned on the terrain — each one is a real piece of work. */
const pins = [
  { x: 46, y: 40, h: 118, title: "CBT Bangladesh", note: "Community platform · v4.0", topic: "host" },
  { x: 55, y: 62, h: 92, title: "Field study, Sylhet", note: "Tourist–host relations · 2026", topic: "travel host" },
  { x: 71, y: 40, h: 190, title: "Angon", note: "Documentation platform", topic: "travel" },
  { x: 52, y: 12, h: 112, title: "OpenDMO", note: "Destination · data & ML", topic: "host" },
  { x: 44, y: 78, h: 60, title: "Baul & Shadhok", note: "Documentation", topic: "travel" },
];

const signals = [
  { label: "Latest build", value: "CBT Bangladesh · prototype v4.0", href: "/work/cbt-bangladesh" },
  { label: "Current research", value: "Tourist–host relations after COVID-19", href: "/research" },
  { label: "Based in", value: `${site.location}`, href: "/about" },
];

export default function Hero() {
  const levels = buildContours();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <HeroTerrain>
        <div className="terrain-plane">
          <div className="terrain-shadow" />
          <svg viewBox="0 0 1000 690" preserveAspectRatio="none">
            <rect className="frame" x="0" y="0" width="1000" height="690" />
            {levels.map((level) => (
              <path
                key={level.level}
                d={level.d}
                className={`c${level.major ? " major" : ""}${level.level === 10 ? " hi" : ""}`}
              />
            ))}
          </svg>
          {pins.map((pin) => (
            <div
              key={pin.title}
              className={`pin${pin.x >= 55 ? " flip" : ""}`}
              data-topic={pin.topic}
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, ["--h" as string]: `${pin.h}px` }}
            >
              <span className="pin-ring" />
              <span className="pin-post">
                <span className="pin-stick" />
                <span className="pin-label">
                  <b>{pin.title}</b>
                  <i>{pin.note}</i>
                </span>
              </span>
            </div>
          ))}
        </div>
      </HeroTerrain>

      <div className="wrap flex flex-1 flex-col justify-center pb-10 pt-14 md:pt-20">
        <p className="eyebrow enter" style={{ ["--e" as string]: 0 }}>
          <span className="idx">{site.coordinates}</span>
        </p>

        <h1
          id="hero-title"
          className="enter mt-7 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,0.9rem+5vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
          style={{ ["--e" as string]: 1 }}
        >
          I study how people <HeroWord topic="travel">travel</HeroWord>, and build tools that help
          communities <HeroWord topic="host">host</HeroWord> them.
        </h1>

        <p className="t-lead enter mt-8 max-w-[46ch]" style={{ ["--e" as string]: 2 }}>
          <span className="text-ink">{site.name}</span> — tourism researcher and product builder.
          Fieldwork, data analysis with Python and web development, joined into one practice.
        </p>

        <div className="enter mt-10 flex flex-wrap gap-3" style={{ ["--e" as string]: 3 }}>
          <Link href="/work" className="btn btn-primary">
            See the work <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <Link href="/research" className="btn">
            Read the research
          </Link>
        </div>
      </div>

      <div className="wrap enter pb-8" style={{ ["--e" as string]: 5 }}>
        <div className="grid gap-x-8 sm:grid-cols-3">
          {signals.map((signal) => (
            <Link key={signal.label} href={signal.href} className="hero-signal group">
              <span className="meta">{signal.label}</span>
              <b className="flex items-center justify-between gap-3">
                {signal.value}
                <span aria-hidden="true" className="arrow text-faint group-hover:text-marigold">→</span>
              </b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
