// A plain-text summary for AI assistants and answer engines (llmstxt.org).
import { automation, builds, carePlans } from "@/lib/pricing";
import { services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";
import { work } from "@/lib/work";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.legalName}, a website and automation development agency in ${site.location.city}, ${site.location.regionName}, for US small businesses. Focused on AI and saving time. Phone ${site.phone.display}, email ${site.email}.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Work",
    ...work.map((w) => `- [${w.client}](${absoluteUrl(`/work/${w.slug}`)}): ${w.summary}`),
    "",
    "## Pricing",
    ...[...builds, ...automation].map((t) => `- ${t.name}: from ${t.from}. ${t.for}`),
    ...carePlans.map((c) => `- ${c.name} care plan: ${c.price} a month. ${c.for}`),
    `- Details: ${absoluteUrl("/pricing")}`,
    "",
    "## Company",
    `- [About](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    `- [Privacy policy](${absoluteUrl("/privacy")})`,
    `- [Terms of service](${absoluteUrl("/terms")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
