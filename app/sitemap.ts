import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";
import { work } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updated);
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/work", 0.8),
    ...work.map((w) => page(`/work/${w.slug}`, 0.7)),
    page("/areas", 0.8),
    ...areas.map((a) => page(`/areas/${a.slug}`, 0.8)),
    page("/pricing", 0.8),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/accessibility", 0.2, "yearly"),
  ];
}
