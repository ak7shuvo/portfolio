/**
 * Single source of truth for site identity and navigation.
 */
export const site = {
  name: "Kowser Ahammad Shuvo",
  shortName: "Shuvo",
  role: "Tourism researcher & product builder",
  headline: "Tourism research, turned into tools communities can use.",
  email: "kshuvo789@gmail.com",
  location: "Sylhet, Bangladesh",
  coordinates: "24.8949° N · 91.8687° E",
  cv: "/Kowser-Ahammad-Shuvo-CV.pdf",
  description:
    "Kowser Ahammad Shuvo — tourism researcher and product builder in Sylhet, Bangladesh. Fieldwork on tourist–host relations, and products for communities, operators and destinations: OpenDMO, CBT Bangladesh, Angon and SylhetTrail.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Shown in the footer index and the "continue" links. */
  description: string;
};

/** Primary navigation (header). Contact is rendered separately as the CTA. */
export const navItems: NavItem[] = [
  { label: "Work", href: "/work", description: "Products for communities, operators and destinations." },
  { label: "Research", href: "/research", description: "Current study and research interests." },
  { label: "Writing", href: "/writing", description: "A book on Hegel, and writing in progress." },
  { label: "Fieldwork", href: "/fieldwork", description: "Cultural documentation and field notes." },
  { label: "About", href: "/about", description: "Who I am and how the work connects." },
  { label: "CV", href: "/cv", description: "Education, experience and skills." },
];

/** Everything, including secondary routes — used by the footer index. */
export const indexItems: NavItem[] = [
  ...navItems,
  { label: "Academic", href: "/academic", description: "Degree, coursework and academic direction." },
  { label: "Contact", href: "/contact", description: "Start a conversation." },
];

/** True when `href` is the current page or an ancestor of it. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
