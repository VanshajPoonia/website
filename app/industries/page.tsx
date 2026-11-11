import Link from "next/link";
import { CtaPanel } from "@/components/Blocks";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries: contractors, retail, restaurants, fitness and clubs",
  description:
    "Websites, online stores and automation for contractors, retail and wholesale, restaurants, fitness studios and member clubs. Each backed by real work in St. Louis.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHead
        title="Built for the way your trade works."
        lede="Every industry here has a real project behind it. Pick yours to see what we built and what it costs."
        trail={[{ name: "Industries", path: "/industries" }]}
      />
      <section className="band">
        <div className="frame">
          <ol className="toc">
            {industries.map((ind, i) => (
              <li key={ind.slug} className="toc__row">
                <Link href={`/industries/${ind.slug}`} className="toc__link">
                  <span className="toc__tab" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="toc__title">{ind.name}</span>
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__summary">{ind.who.slice(0, 4).join(" · ")}</span>
                  <Icon name="arrow" size={20} className="toc__arrow" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
