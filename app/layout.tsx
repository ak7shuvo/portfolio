import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/geist";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/noto-serif-bengali";
import "@fontsource/instrument-serif/400-italic.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RevealObserver from "@/components/reveal-observer";
import { site } from "@/lib/site";
import "./globals.css";

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0d0c",
  colorScheme: "dark",
};

/**
 * Marks the document as JS-capable before first paint so scroll reveals can
 * start hidden, with a safety net: if hydration hasn't started the observer
 * within 2.5s, everything is shown anyway.
 */
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__rv)document.documentElement.classList.add('rv-fallback')},2500);`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a href="#main" className="btn btn-primary sr-only-focusable fixed left-4 top-3 z-[60]">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main" className="flex-1" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
