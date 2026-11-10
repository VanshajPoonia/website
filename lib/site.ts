// One place for business facts. Anything marked CONFIRM is a placeholder the
// owner still has to verify before this branch ships to production.

export const site = {
  name: "Kreativ Vantage",
  alternateName: "KreativVantage",
  url: "https://www.kreativvantage.com",
  locale: "en_US",
  description:
    "Kreativ Vantage builds websites, online stores and automations for small businesses. Leads, orders and bookings go where they need to go without anyone re-typing them.",
  phone: { display: "(314) 780-2331", href: "tel:+13147802331", e164: "+1-314-780-2331" },
  // CONFIRM: the domain receives mail through Cloudflare Email Routing, but this
  // exact address has not been confirmed by the owner.
  email: "hello@kreativvantage.com",
  // CONFIRM: legal entity name and the state whose law governs the terms.
  legalName: "Kreativ Vantage",
  jurisdiction: "[State]",
  areaServed: "United States",
  // The manual's revision stamp. Bumped by hand when the content changes.
  revision: "2026.11",
  updated: "2026-11-10",
} as const;

export type ChapterColor = "blue" | "green" | "yellow" | "salmon";

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
