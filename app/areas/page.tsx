import Link from "next/link";
import { CtaPanel } from "@/components/Blocks";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import { areas } from "@/lib/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Areas we serve around St. Louis",
  description:
    "KreativVantage builds websites and automations for businesses in St. Louis, Fenton, Jefferson County, South County and West County. Based in St. Louis.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHead
        title="Based in St. Louis. Building for the whole area."
        lede="Most of our clients are in St. Louis city and county and Jefferson County. Pick your area to see the work nearby."
        trail={[{ name: "Areas", path: "/areas" }]}
      />
      <section className="band">
        <div className="frame">
          <ol className="toc">
            {areas.map((a, i) => (
              <li key={a.slug} className="toc__row">
                <Link href={`/areas/${a.slug}`} className="toc__link">
                  <span className="toc__tab" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="toc__title">{a.name}</span>
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__summary">{a.places.slice(0, 5).join(" · ")}</span>
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
