// One place for business facts. Confirmed by the owner on 2026-11-11.

export const site = {
  name: "KreativVantage",
  alternateName: "Kreativ Vantage",
  url: "https://www.kreativvantage.com",
  locale: "en_US",
  description:
    "KreativVantage builds AI automations, websites and online stores for small businesses in St. Louis and across the US. Leads, orders and bookings go where they need to go without anyone re-typing them.",
  phone: { display: "(314) 780-2331", href: "tel:+13147802331", e164: "+1-314-780-2331" },
  email: "hello@kreativvantage.com",
  legalName: "KreativVantage LLC",
  entity: "a Missouri limited liability company",
  location: { city: "St. Louis", region: "MO", regionName: "Missouri", country: "US" },
  jurisdiction: "the State of Missouri",
  areaServed: "United States",
  // Google Business Profile, listed as "Kreativ Vantage". Confirmed live 2026-11-11.
  googleMaps: "https://maps.google.com/?cid=1054968527674761563",
  // The manual's revision stamp. Bumped by hand when the content changes.
  revision: "2026.11",
  updated: "2026-11-11",
} as const;

export type ChapterColor = "blue" | "green" | "yellow" | "purple";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/sitemap.xml", label: "Sitemap" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
