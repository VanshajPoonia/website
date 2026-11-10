// A plain-text summary for AI assistants and answer engines (llmstxt.org).
import { tiers } from "@/lib/pricing";
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
    `Website and automation development agency for US small businesses, focused on AI and saving time. Phone ${site.phone.display}.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Work",
    ...work.map((w) => `- [${w.client}](${absoluteUrl(`/work/${w.slug}`)}): ${w.summary}`),
    "",
    "## Pricing",
    ...tiers.map((t) => `- ${t.name}: from ${t.from}. ${t.for}`),
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
