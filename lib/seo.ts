import type { Metadata } from "next";
import { areas } from "./areas";
import { absoluteUrl, site } from "./site";
import { services, type Service } from "./services";
import type { WorkItem } from "./work";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the bare title without the brand suffix (home page). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  /** Social image for this page. Defaults to the site-wide card. */
  image?: string;
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex, image = "/opengraph-image" }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: absoluteTitle ? title : `${title} | ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [image],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

const orgId = `${site.url}/#organization`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // A local business type, so the St. Louis service area reads as a place, not just a mailing city.
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        alternateName: site.alternateName,
        legalName: site.legalName,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        url: site.url,
        logo: absoluteUrl("/icon.svg"),
        description: site.description,
        telephone: site.phone.e164,
        email: site.email,
        hasMap: site.googleMaps,
        sameAs: [site.googleMaps],
        areaServed: [
          ...areas.flatMap((a) => a.served.map((p) => ({ "@type": p.type, name: `${p.name}, ${a.state}` }))),
          { "@type": "Country", name: site.areaServed },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.e164,
          email: site.email,
          contactType: "sales",
          areaServed: "US",
          availableLanguage: "English",
        },
        knowsAbout: [
          "Website design",
          "Web development",
          "Technical SEO",
          "E-commerce development",
          "Business process automation",
          "AI integration",
        ],
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: site.areaServed },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      url: absoluteUrl("/pricing"),
      priceSpecification:
        s.slug === "care-and-training"
          ? { "@type": "UnitPriceSpecification", price: s.fromPrice, priceCurrency: "USD", unitCode: "MON" }
          : { "@type": "PriceSpecification", minPrice: s.fromPrice, priceCurrency: "USD" },
    },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function workLd(w: WorkItem) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${w.client}: ${w.industry}`,
    description: w.summary,
    url: absoluteUrl(`/work/${w.slug}`),
    creator: { "@id": orgId },
    dateCreated: w.year,
    ...(w.image ? { image: absoluteUrl(w.image.desktop) } : {}),
    ...(w.url ? { sameAs: w.url } : {}),
  };
}
