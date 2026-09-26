/**
 * Content shared across routes — the single source of truth for projects,
 * practices, research, fieldwork and the professional timeline.
 *
 * Everything here comes from the existing site copy, the CV, or the CBT
 * Bangladesh prototype itself. Where a project has not been documented yet
 * (OpenDMO, Angon), the record says so rather than inventing detail: fill in
 * the optional fields and the case-study page grows to show them.
 */

/* ───────────────────────── Projects ───────────────────────── */

/** The scale a product works at — the thread that links the four projects. */
export type Scale = "Community" | "Operator" | "Destination";

export type ProjectSection = {
  heading: string;
  body: string;
  /** Optional bullet points rendered under the body. */
  points?: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
  /** Opens in a new tab and carries an ↗ indicator. */
  external?: boolean;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "desktop" frames get browser chrome, "mobile" frames a device bezel. */
  frame: "desktop" | "mobile";
};

export type Project = {
  slug: string;
  name: string;
  /** One line under the name. */
  tagline: string;
  category: string;
  scale: Scale;
  /** Omitted when the role has not been documented yet. */
  role?: string;
  status: string;
  year?: string;
  summary: string;
  stack: string[];
  sections: ProjectSection[];
  links: ProjectLink[];
  images?: ProjectImage[];
  /** Short facts shown on project surfaces — never metrics. */
  signals: string[];
  related: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "opendmo",
    name: "OpenDMO",
    tagline: "A data and machine-learning approach to destination management",
    category: "Destination intelligence · ML / data analysis (concept)",
    scale: "Destination",
    status: "Case study being documented",
    summary:
      "A project at the scale of the whole destination, approached through data and machine learning rather than manual coordination — the work destination management organisations (DMOs) do in planning, coordinating and promoting a place across many businesses and communities.",
    stack: [],
    signals: [
      "Destination-level scope",
      "Confirmed direction: ML / data analysis",
      "Architecture and dataset not yet documented",
    ],
    sections: [
      {
        heading: "Why destinations",
        body:
          "A destination management organisation sits above individual operators and communities. It coordinates planning, data, promotion and standards for a place as a whole — the level at which questions about fair pricing, visitor trust and repeat visits eventually have to be answered.",
      },
      {
        heading: "Where it fits",
        body:
          "OpenDMO completes the scales this portfolio works across: communities (CBT Bangladesh) and operations (SylhetTrail), extended to the destination itself through data and ML. It connects directly to the research interest in destination management and tourism development in Bangladesh.",
      },
      {
        heading: "Confirmed direction, undocumented detail",
        body:
          "The direction — an ML and data-analysis approach to destination management — is confirmed. The specific architecture, datasets, models and pilot scope are not yet documented in this project's source material, so they are not described here.",
      },
      {
        heading: "Project record",
        body:
          "The full case study — scope, architecture, stack and repository — is being documented and will be published on this page.",
      },
    ],
    links: [],
    related: ["cbt-bangladesh", "sylhettrail"],
  },
  {
    slug: "cbt-bangladesh",
    name: "CBT Bangladesh",
    tagline: "Operational platform for community-based tourism",
    category: "Tourism technology · Progressive web app",
    scale: "Community",
    role: "Product concept & direction",
    status: "Working prototype · v4.0",
    year: "2026",
    featured: true,
    summary:
      "A working prototype of the software a community-based tourism initiative needs day to day — journey planning, reservations, partner operations and transparent benefit sharing — designed so the community, not a listing, comes first.",
    stack: ["HTML", "CSS", "JavaScript", "localStorage", "PWA manifest"],
    signals: [
      "Two complete roles: traveller and community partner",
      "Service logs generate a community impact receipt",
      "One self-contained file — no framework, no backend",
    ],
    sections: [
      {
        heading: "The problem",
        body:
          "Community-based tourism in Bangladesh is usually presented through homestay-style listings. That hides what makes it different: travellers are visiting an initiative run by a committee, with its own guidelines, a community fund and several local providers. Existing tools book a room; they don’t run the initiative.",
      },
      {
        heading: "The approach",
        body:
          "The journey starts with the initiative, not the bed. A traveller chooses a CBT initiative, adds community experiences and local services, decides whether to stay overnight, picks dates, reviews a day-by-day plan and only then sends a reservation request. Community hosts confirm before anyone pays.",
        points: [
          "Initiative → experiences & services → optional stay → dates → journey plan → request",
          "Reservation lifecycle: request, acceptance, payment, check-in, completion",
          "A consistent CBT vocabulary — traveller, community partner, community host, local enterprise",
        ],
      },
      {
        heading: "What was built",
        body:
          "Both sides of the platform, switchable in the demo. Travellers plan journeys, message hosts, carry an offline journey pass and see where their money went. Community partners manage availability, respond to requests, check travellers in, record the services they delivered and track their income.",
        points: [
          "Availability calendars, reservation requests, QR-style check-in and messaging",
          "Service logs that become each traveller’s community impact receipt",
          "Configurable benefit-sharing rules between host, community fund and platform",
          "An independent support-and-concerns process with a visible case timeline",
        ],
      },
      {
        heading: "Engineering notes",
        body:
          "The prototype is deliberately one self-contained HTML file — no framework and no server — so it can be shared, opened offline and reviewed by stakeholders without any setup. State persists in the browser under a versioned key, and startup is fault-tolerant: it keeps working where storage or console APIs are blocked.",
        points: [
          "Responsive from 320px phones to wide desktops, with safe-area support",
          "Keyboard navigation, focus management in dialogs, reduced-motion support",
          "Presentation mode and demo controls for walking stakeholders through the flow",
        ],
      },
      {
        heading: "Status",
        body:
          "Version 4.0 is a complete, clickable prototype with demo data. Payments, sign-in and the camera preview are simulated and nothing is sent to a server — it is built for review and testing with CBT initiatives, not yet for live operations.",
      },
    ],
    links: [
      {
        label: "Open the live prototype",
        href: "/projects/cbt-bangladesh/prototype.html",
        external: true,
      },
    ],
    images: [
      {
        src: "/projects/cbt-bangladesh/desktop-home.webp",
        alt: "CBT Bangladesh traveller home screen with journey search and CBT initiatives",
        width: 1440,
        height: 900,
        frame: "desktop",
      },
      {
        src: "/projects/cbt-bangladesh/mobile-journey.webp",
        alt: "A journey on mobile: progress tracker, journey pass and day-by-day plan",
        width: 780,
        height: 1688,
        frame: "mobile",
      },
      {
        src: "/projects/cbt-bangladesh/desktop-partner.webp",
        alt: "Community partner dashboard with reservation requests and availability",
        width: 1440,
        height: 900,
        frame: "desktop",
      },
      {
        src: "/projects/cbt-bangladesh/desktop-initiative.webp",
        alt: "A CBT initiative page with community experiences, local services and guidelines",
        width: 1440,
        height: 900,
        frame: "desktop",
      },
      {
        src: "/projects/cbt-bangladesh/mobile-home.webp",
        alt: "Traveller home screen on a phone",
        width: 780,
        height: 1688,
        frame: "mobile",
      },
    ],
    related: ["opendmo", "angon"],
  },
  /**
   * V2.2 reconciliation: Angon was previously described here as a reservation
   * system built inside SylhetTrail's operator platform. That has been
   * corrected per confirmed identity: Angon is an independent documentation /
   * documentary platform. Deliberately left sparse (no stack, no built
   * features, no content-model detail) because none of that is documented in
   * this project's source material yet — see the open question about its
   * `scale` field below.
   */
  {
    slug: "angon",
    name: "Angon",
    tagline: "Documentation and documentary platform",
    category: "Culture & documentation · Documentary platform (concept)",
    // NOTE: "Operator" is left over from Angon's old identity and no longer fits
    // a documentation/documentary project. Scale is a required 3-value field
    // (Community | Operator | Destination) tied to the homepage/work "three
    // scales" narrative — flagging rather than silently reassigning it.
    scale: "Operator",
    status: "Identity confirmed · scope and features pending documentation",
    summary:
      "A documentation and documentary platform for culture and place — an independent project, separate from SylhetTrail's booking and reservation flows. Its scope, content model and feature set are being documented and will be published here.",
    stack: [],
    signals: [
      "Independent project — not part of SylhetTrail's operator platform",
      "Scope and feature set pending documentation",
    ],
    sections: [
      {
        heading: "Identity",
        body:
          "Angon is a documentation and documentary platform, built around culture, heritage and place — not a travel booking or reservation system.",
      },
      {
        heading: "Independent from SylhetTrail",
        body:
          "Angon is a separate project from SylhetTrail. It does not implement SylhetTrail's booking or reservation flows, and the two should not be read as the same product.",
      },
      {
        heading: "Status",
        body:
          "The detailed content model, features and current build status are not yet documented in this project's source material, so they are not claimed here.",
      },
    ],
    links: [],
    related: ["cbt-bangladesh"],
  },
  {
    slug: "sylhettrail",
    name: "SylhetTrail",
    tagline: "End-to-end tour operator platform for Sylhet",
    category: "Tourism · Entrepreneurship",
    scale: "Operator",
    role: "Co-founder, with three co-founders",
    status: "Building",
    summary:
      "A commission-based tour operator for Sylhet, covering fixed and custom booking flows and organised around a hub-and-spoke operating model.",
    stack: ["Business planning", "Operations", "Partner coordination"],
    signals: ["Hub-and-spoke operator model", "Seed-funding proposal prepared"],
    sections: [
      {
        heading: "Overview",
        body:
          "SylhetTrail is a tour operator initiative focused on tourism operations and travel experiences in Sylhet, Bangladesh.",
      },
      {
        heading: "Model",
        body:
          "A commission-based platform covering both fixed and custom booking flows, organised as a hub-and-spoke operator model with a five-partner structure and remote operations.",
      },
      {
        heading: "Work so far",
        body:
          "Drafting the business plan, preparing an investment proposal for seed funding, and coordinating on the ground with local operators and partners.",
      },
    ],
    links: [],
    related: ["cbt-bangladesh"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const scales: { scale: Scale; description: string }[] = [
  { scale: "Community", description: "Tools a community initiative uses to host travellers well." },
  { scale: "Operator", description: "Ventures and systems that package and sell travel." },
  { scale: "Destination", description: "Coordination across a whole place and its stakeholders." },
];

/* ───────────────────────── Practices ─────────────────────────
   Four practices forming one loop. Replaces a flat skills list: each practice
   names its tools and the outputs it feeds, so the relationships are visible. */

export type Practice = {
  id: "field" | "analyse" | "build" | "tell";
  label: string;
  question: string;
  description: string;
  tools: string[];
  outputs: { label: string; href: string }[];
};

export const practices: Practice[] = [
  {
    id: "field",
    label: "Field",
    question: "What is actually happening?",
    description:
      "Start on the ground — interviews, observation and documentation with travellers, hosts and cultural practitioners.",
    tools: ["Fieldwork", "Interviews & field notes", "Photography", "Videography"],
    outputs: [
      { label: "Post-COVID tourist–host study", href: "/research" },
      { label: "Baul & Shadhok documentation", href: "/fieldwork" },
    ],
  },
  {
    id: "analyse",
    label: "Analyse",
    question: "What does the evidence say?",
    description:
      "Turn what the field shows into evidence — behaviour patterns, pricing practices and what they do to trust.",
    tools: ["Data analysis with Python", "SQL", "Research design"],
    outputs: [{ label: "Pricing & destination-trust research", href: "/research" }],
  },
  {
    id: "build",
    label: "Build",
    question: "What would help?",
    description:
      "Design products that answer those findings — for communities, for operators and for whole destinations.",
    tools: ["Web development", "HTML · CSS · JavaScript", "Product design", "Reservation flows"],
    outputs: [
      { label: "CBT Bangladesh", href: "/work/cbt-bangladesh" },
      { label: "Angon", href: "/work/angon" },
      { label: "SylhetTrail", href: "/work/sylhettrail" },
      { label: "OpenDMO", href: "/work/opendmo" },
    ],
  },
  {
    id: "tell",
    label: "Tell",
    question: "How do others understand it?",
    description:
      "Explain the work plainly — in essays, a book, documentary and product writing — then take the new questions back to the field.",
    tools: ["Writing in English & Bangla", "Documentary", "Blogging"],
    outputs: [
      { label: "Concern for Consciousness", href: "/writing/books/concern-for-consciousness" },
      { label: "Gram Banglar Concert", href: "/fieldwork" },
    ],
  },
];

/* ───────────────────────── Research ───────────────────────── */

export const currentResearch = {
  title: "Tourist–Host Relations and Post-COVID Behavioural Shifts in Sylhet’s Tourism Sector",
  period: "April 2026 – present",
  type: "Independent research",
  status: "Draft write-up completed",
  questions: [
    "How have tourist behaviour patterns in Sylhet changed since COVID-19?",
    "How do host communities experience those shifts?",
    "How do unfair and inflated prices affect destination trust and repeat visits?",
  ],
};

export const researchInterests = [
  {
    title: "Intangible cultural heritage",
    description:
      "Living practices and traditions, and how they are sustained through tourism and daily life.",
  },
  {
    title: "Cultural & heritage tourism",
    description:
      "How cultural practice, heritage and place shape tourism experiences and destination identity.",
  },
  {
    title: "Tourist behaviour & host communities",
    description:
      "How tourists behave, how hosts experience tourism, and how that relationship shapes a destination.",
  },
  {
    title: "Community-based tourism",
    description:
      "Tourism built around community participation and benefit — explored in practice through CBT Bangladesh.",
  },
  {
    title: "Tourism development in Bangladesh",
    description: "Development, destination management and the changes emerging across the country.",
  },
];

/* ───────────────────────── Fieldwork ───────────────────────── */

export const fieldworkAreas = [
  {
    title: "Cultural documentation",
    description:
      "Baul and Shadhok traditions, shrine-based folk practices, rural heritage and living cultural expression.",
  },
  {
    title: "Photography & videography",
    description:
      "Visual documentation of cultural landscapes, community life, rituals and traditional practice.",
  },
  {
    title: "Interviews & field notes",
    description:
      "Conversations with practitioners, community members and cultural keepers, kept as ongoing field notes.",
  },
];

export const fieldExposure = [
  {
    title: "Research fieldwork",
    description: "Post-COVID tourist behaviour and host–tourist interaction in Sylhet.",
  },
  {
    title: "Documentary fieldwork",
    description:
      "Interviews with Baul and Shadhok artists at rural shrine-based gatherings, with live filming and song recording.",
  },
  {
    title: "Tourism operations",
    description: "On-the-ground coordination with local operators and partners for SylhetTrail.",
  },
];

/* ───────────────────────── Timeline ───────────────────────── */

export type TimelineEntry = {
  period: string;
  title: string;
  context: string;
  kind: "Research" | "Venture" | "Product" | "Documentary" | "Education";
  points: string[];
  href?: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2026",
    title: "CBT Bangladesh",
    context: "Community-based tourism platform · prototype",
    kind: "Product",
    points: [
      "Product concept and CBT vocabulary, refined across four prototype versions",
      "Traveller and community-partner flows, benefit sharing and impact receipts",
    ],
    href: "/work/cbt-bangladesh",
  },
  {
    period: "Apr 2026 – present",
    title: "Independent research",
    context: "Tourist–host relations in Sylhet after COVID-19",
    kind: "Research",
    points: [
      "Changing tourist behaviour and host-community dynamics",
      "Inflated pricing and its effect on destination trust and repeat visits",
      "Draft write-up completed",
    ],
    href: "/research",
  },
  {
    period: "Ongoing",
    title: "Co-founder, SylhetTrail",
    context: "Commission-based tour operator · with three co-founders",
    kind: "Venture",
    points: [
      "Leading product design for Angon, the reservation system",
      "Business plan: hub-and-spoke model, five-partner structure, remote operations",
      "Investment proposal prepared for seed funding",
    ],
    href: "/work/sylhettrail",
  },
  {
    period: "Ongoing",
    title: "Documentary & blog creator",
    context: "Gram Banglar Concert · shrine-based faith traditions",
    kind: "Documentary",
    points: [
      "Documenting Baul and Shadhok traditions — Lalon Shah, Karim Shah and others",
      "Live photography and videography of shrine-based gatherings and their songs",
    ],
    href: "/fieldwork",
  },
  {
    period: "Graduating Sep 2027",
    title: "BTHM, Leading University",
    context: "Bachelor of Tourism and Hospitality Management · Sylhet",
    kind: "Education",
    points: ["Heritage & eco-tourism, community and cultural issues, planning and development, e-tourism"],
    href: "/academic",
  },
];

/* ───────────────────────── Writing ───────────────────────── */

export const books = [
  {
    slug: "concern-for-consciousness",
    title: "Concern for Consciousness",
    href: "/writing/books/concern-for-consciousness",
    category: "Book · Bangla",
    summary:
      "A reading of Hegel’s philosophy — consciousness, self-consciousness, conflict, recognition, spirit, religion and history — written for readers who are wary of philosophy but curious about it.",
  },
];

export const writingInProgress = ["Articles", "Essays", "Research-oriented writing", "Field notes"];

/* ───────────────────────── Education ───────────────────────── */

export const education = {
  degree: "Bachelor of Tourism and Hospitality Management (BTHM)",
  institution: "Leading University (LU)",
  location: "Sylhet, Bangladesh",
  graduation: "September 2027",
  cgpa: "3.25 / 4.00",
  coursework: [
    "Heritage and Eco-Tourism Management",
    "Community and Cultural Issues in Tourism",
    "Tourism and Hospitality Planning and Development",
    "E-Tourism",
    "Managing Tour Operation",
    "Tourism Promotional Management",
  ],
};
