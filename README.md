# Kowser Ahammad Shuvo — Portfolio

Portfolio of a tourism researcher and product builder — research,
products (CBT Bangladesh, Angon, SylhetTrail, OpenDMO), writing and fieldwork.

## Stack

- Next.js 16 (App Router, Turbopack, static export)
- React 19 · TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, no JS config)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Fonts are self-hosted through Fontsource, so no network access is needed at build time.

## Scripts

| Script            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Development server                          |
| `npm run build`   | Static export to `out/`                     |
| `npm run start`   | Serve a production build                    |
| `npm run lint`    | ESLint (`eslint-config-next`)               |

## Environment

| Variable               | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, OG tags, sitemap  |

See `.env.example`. Without it, metadata falls back to `https://example.com`.

## Structure

```
app/                    Routes (App Router)
  writing/books/concern-for-consciousness/[chapter]/
components/             Shared UI
content/books/          Manuscript markdown
lib/
  site.ts               Identity + navigation (single source of truth)
  content.ts            Projects, practices, research, timeline
  terrain.ts            Build-time contour generator for the hero
  book.ts               Manuscript parsing
public/                 CV PDF, optimised imagery, CBT prototype
```

## Design system — "Field Atlas"

Tokens live in `@theme` in `app/globals.css`; components are defined once
there (`.surface`, `.depth`, `.btn`, `.tag`, `.eyebrow`, `.meta`, `.reading`).

- **Colour** — near-black field `#0A0D0C`, bone ink `#EEEAE1`, marigold
  signal `#F2A93B` (from the Sylhet dawn photograph), tea green `#7CC3A5`,
  and paper `#F3EEE3` for long-form Bangla reading. Contrast ratios are
  noted beside each text colour.
- **Type** — Bricolage Grotesque (display), Geist (UI/body), JetBrains Mono
  (metadata), Instrument Serif italic (accent words only), Noto Serif
  Bengali (the book). All self-hosted via Fontsource, so builds need no
  network access to Google Fonts.
- **Depth** — the hero terrain is generated at build time
  (`lib/terrain.ts`, marching squares) and tilted with CSS perspective;
  cards use `components/tilt.tsx`. No WebGL, no per-frame drawing.
- **Motion** — `--dur-fast/--dur/--dur-slow/--dur-reveal` with an
  ease-out curve; everything collapses under `prefers-reduced-motion`.

## Projects

All project data lives in `lib/content.ts`. Case-study pages are generated
from it by `app/work/[slug]/page.tsx`: add an entry and the page, sitemap,
cards and index update automatically. Optional fields (`role`, `year`,
`stack`, `links`, `images`) appear only when filled in — OpenDMO is
intentionally sparse until its details are documented.

The CBT Bangladesh prototype ships as a static file at
`public/projects/cbt-bangladesh/prototype.html`, with real screenshots
beside it.

## Content

The book is parsed from `content/books/concern-for-consciousness/book.md`.
Chapters are discovered from the manuscript's `## অধ্যায় N` headings, so
adding or renumbering a chapter needs no code change.

## Deployment

`next.config.ts` sets `output: "export"` and `trailingSlash: true` (so
`/work` and `/work/[slug]` both resolve on GitHub Pages); `.github/workflows/deploy.yml`
publishes `out/` to GitHub Pages on push to `main`.
