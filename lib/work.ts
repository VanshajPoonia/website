// Case files. Facts come from each project's own repository and docs.
// No results, metrics or quotes are claimed for any client.

export type WorkItem = {
  slug: string;
  client: string;
  /** Anonymised entries have no public name or link. */
  anonymised?: boolean;
  industry: string;
  location: string;
  /** Area page for this client's location (lib/areas.ts), when we have one. */
  area?: string;
  year: string;
  url?: string;
  urlLabel?: string;
  status: string;
  services: number[];
  summary: string;
  problem: string;
  built: string[];
  connected: string[];
  stack: string[];
  image?: { desktop: string; mobile: string; alt: string };
  featured?: boolean;
};

export const work: WorkItem[] = [
  {
    slug: "viro-design-and-finishes",
    client: "VIRO Design & Finishes",
    industry: "Cabinetry and flooring, wholesale and retail",
    location: "St. Louis, MO",
    area: "st-louis",
    year: "2026",
    url: "https://virodesignandfinishes.com",
    urlLabel: "virodesignandfinishes.com",
    status: "Launching",
    services: [1, 3, 4],
    featured: true,
    summary:
      "One online store for cabinets, flooring and surfaces, with dealer accounts, tiered pricing, online payments and every customer synced to the CRM.",
    problem:
      "VIRO sold through an off-the-shelf storefront and a separate flooring site. Dealers needed their own prices, staff needed one place to run orders, and leads needed to reach the CRM without re-typing.",
    built: [
      "Catalog of 46 cabinet door styles and more than 13,000 cabinet products, migrated from the old store",
      "815 floors in 86 collections, sold by the carton",
      "Dealer sign-up, staff approval and pricing tiers with per-dealer overrides",
      "Cart and checkout with card and bank payments through Authorize.Net",
      "Admin for products, prices, orders, dealers and quote requests",
      "Door and floor sample ordering and free 3D design requests",
    ],
    connected: ["Authorize.Net payments", "Reevo CRM contact sync", "Microsoft Bookings appointments"],
    stack: ["Next.js", "Postgres", "Drizzle", "Vercel"],
    image: {
      desktop: "/work/viro-desktop.webp",
      mobile: "/work/viro-mobile.webp",
      alt: "VIRO Design & Finishes launch page showing a shipping label for the new St. Louis store",
    },
  },
  {
    slug: "adventure-unknown",
    client: "Adventure Unknown",
    industry: "Private members club",
    location: "St. Louis, MO",
    area: "st-louis",
    year: "2026",
    url: "https://www.adventure-unknown.com",
    urlLabel: "adventure-unknown.com",
    status: "Live",
    services: [2, 3],
    featured: true,
    summary:
      "A public site for a private club and a member portal behind it: bookings, messages, clubs, events, a member directory and a front-desk check-in.",
    problem:
      "The club ran memberships, events, travel and room bookings by hand. Members needed a place to book and connect, and staff needed one admin for all of it.",
    built: [
      "Marketing site for membership, events, travel and the clubhouse",
      "Membership applications and travel inquiries",
      "Member portal with bookings, calendar, messages, clubs and directory",
      "Event RSVPs and social event pages",
      "Admin with front-desk check-in, inquiries, bookings and messaging",
    ],
    connected: ["Brevo email", "Vercel Blob file storage", "Postgres"],
    stack: ["Next.js", "Auth.js", "Prisma", "Neon Postgres"],
    image: {
      desktop: "/work/adventure-unknown-desktop.webp",
      mobile: "/work/adventure-unknown-mobile.webp",
      alt: "Adventure Unknown homepage with the headline Beyond Networking, Beyond Coworking, Built for Connection",
    },
  },
  {
    slug: "atlas-general-contracting",
    client: "ATLAS General Contracting",
    industry: "Roofing and construction",
    location: "Imperial, MO",
    area: "jefferson-county",
    year: "2025",
    url: "https://goatlasgo.us",
    urlLabel: "goatlasgo.us",
    status: "Live",
    services: [1, 2],
    featured: true,
    summary:
      "A lead-generation site with service and service-area pages, a project gallery and a blog, and lead forms that reach the team by email and text.",
    problem:
      "A contractor working across the St. Louis area needed to show up for each service and town, and needed every quote request in front of the team fast.",
    built: [
      "Service pages for construction, handyman work, shipping containers and golf simulators",
      "Service-area pages for the towns they cover",
      "Project gallery and project pages",
      "Blog with its own admin",
      "Reviews, history, careers and team pages",
      "Separate lead forms for general and handyman requests",
    ],
    connected: ["Email and SMS alerts", "Zapier", "Supabase", "Vercel Blob"],
    stack: ["Next.js", "Supabase", "Vercel"],
    image: {
      desktop: "/work/atlas-desktop.webp",
      mobile: "/work/atlas-mobile.webp",
      alt: "ATLAS General Contracting homepage with the headline Let Us Carry The Weight of your next project",
    },
  },
  {
    slug: "healthy-mechanical",
    client: "Healthy Mechanical Services",
    industry: "HVAC and indoor air quality",
    location: "Charlotte, NC",
    year: "2026",
    url: "https://www.healthymechanical.com",
    urlLabel: "healthymechanical.com",
    status: "Live",
    services: [2],
    summary:
      "A website for an HVAC company built around healthy indoor air, with services, financing, projects and a content admin.",
    problem:
      "The company wanted to stand apart from other HVAC contractors in the Charlotte metro by leading with indoor air quality.",
    built: [
      "Homepage and service sections led by indoor air quality",
      "Financing, projects and learning sections",
      "Quote requests with email delivery",
      "Content admin with secure login",
      "Sitemap and robots setup",
    ],
    connected: ["Resend email", "Vercel Blob"],
    stack: ["Next.js", "Vercel"],
    image: {
      desktop: "/work/healthy-mechanical-desktop.webp",
      mobile: "/work/healthy-mechanical-mobile.webp",
      alt: "Healthy Mechanical Services homepage with the headline The Healthy-Air HVAC Choice for Charlotte",
    },
  },
  {
    slug: "charla-wewers",
    client: "Charla Wewers Personal Training",
    industry: "Personal training",
    location: "St. Louis, MO",
    area: "st-louis",
    year: "2025",
    url: "https://charlawewers.com",
    urlLabel: "charlawewers.com",
    status: "Live",
    services: [2],
    summary:
      "A site for a women-focused training studio, with programs, testimonials, booking and a contact form that reaches her inbox.",
    problem:
      "A private studio needed a site that speaks to its audience and turns visits into booked first sessions.",
    built: [
      "Homepage, about, training, products and testimonials pages",
      "Online booking",
      "Contact form with email delivery and a thank-you page",
      "Privacy policy and SMS terms",
    ],
    connected: ["Cal.com booking", "Resend email"],
    stack: ["Next.js", "Vercel"],
    image: {
      desktop: "/work/charla-desktop.webp",
      mobile: "/work/charla-mobile.webp",
      alt: "Charla Wewers Personal Training homepage with the headline Personal Trainer for Women in St. Louis",
    },
  },
  {
    slug: "oddball-ink",
    client: "Oddball Ink",
    industry: "Screen printing, embroidery and signs",
    location: "Arnold, MO",
    area: "jefferson-county",
    year: "2026",
    url: "https://oddballink.vercel.app",
    urlLabel: "oddballink.vercel.app",
    status: "Redesign preview",
    services: [2],
    summary:
      "A redesign for a family-run print shop that leans into its alien mascot: 3D ships, a face made of letters, and the real work up front.",
    problem:
      "The shop already had a one-of-a-kind identity. The old site hid it, along with the art specs and the phone number customers came for.",
    built: [
      "Services for screen printing, embroidery, signs and vehicle graphics",
      "Interactive art-spec guide for customer files",
      "Gallery of real jobs, filterable by type",
      "Art file upload form",
      "WebGL ships and a character-built face that reacts as you scroll",
    ],
    connected: ["File upload form"],
    stack: ["Next.js", "Three.js", "Vercel"],
    image: {
      desktop: "/work/oddball-desktop.webp",
      mobile: "/work/oddball-mobile.webp",
      alt: "Oddball Ink homepage with the headline Out of This World in dot-matrix letters and an alien face made of characters",
    },
  },
  {
    slug: "restaurant-group-pos-sync",
    client: "Restaurant group",
    anonymised: true,
    industry: "Restaurants, two brands",
    location: "United States",
    year: "2026",
    status: "Automation",
    services: [1],
    summary:
      "Guest data from Toast point of sale reconciled into HubSpot for two restaurant brands, with daily imports and safety checks before any write.",
    problem:
      "A previous sync had left the CRM out of step with the point of sale. The group needed the data reconciled without risking the records they already had.",
    built: [
      "Daily SFTP import of Toast exports, with checks that each file is complete before it is used",
      "Historical export reconciliation per brand",
      "Read-only first stage that compares sources before anything is written",
      "Run logs and manifests for every decision",
    ],
    connected: ["Toast POS", "HubSpot", "SFTP"],
    stack: ["Node.js", "TypeScript"],
  },
  {
    slug: "comic-production-pipeline",
    client: "Comic creator",
    anonymised: true,
    industry: "Webtoon and comic publishing",
    location: "Remote",
    year: "2026",
    status: "Automation",
    services: [1],
    summary:
      "A workflow that turns a plain comic script into a near-finished Canva layout: frames, image prompts, generated art and dialogue placed in a template.",
    problem:
      "Each episode was produced by hand: write prompts, generate images, import them, then place every panel and line of dialogue.",
    built: [
      "Script broken into frames and scenes by an AI model",
      "Image prompts written per frame with character and style context",
      "Image generation through an API",
      "Images and dialogue placed into a saved Canva template",
    ],
    connected: ["n8n", "OpenRouter", "Replicate", "Canva"],
    stack: ["n8n"],
  },
];

export const namedWork = work.filter((w) => !w.anonymised);

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}
