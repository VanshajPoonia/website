import Link from "next/link";
import { CtaPanel } from "@/components/Blocks";
import { TimeBack } from "@/components/Est";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = pageMetadata({
  title: "Services: websites, online stores, automation and AI",
  description:
    "Four services for small businesses: websites, online stores and portals, automation and AI, and care and training. Every build is documented and yours to keep.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHead
        title="Four chapters, one goal: fewer hours on busywork."
        lede="Each service is a chapter of the same manual. Start with the one you need now. Add the next when it pays for itself."
        trail={[{ name: "Services", path: "/services" }]}
      />
      <section className="band">
        <div className="frame svcindex">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="svcrow" data-color={s.color}>
              <span className="svcrow__n mono" aria-hidden="true">
                <span className="marker" />
                {String(s.chapter).padStart(2, "0")}
              </span>
              <div>
                <h2>{s.title}</h2>
                <p style={{ marginTop: 12 }}>{s.headline}</p>
              </div>
              <div>
                <p>{s.summary}</p>
                <p className="svcrow__time mono">
                  <TimeBack hours={s.hoursBack} />
                </p>
                <span className="textlink">
                  Read chapter {s.chapter} <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="band" aria-labelledby="by-industry-h">
        <div className="frame cols">
          <h2 className="cols__h" id="by-industry-h">
            By industry
          </h2>
          <ul className="ticklist">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Icon name="arrow" size={16} />
                <span>
                  <Link href={`/industries/${ind.slug}`}>{ind.name}</Link>. {ind.lede}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
