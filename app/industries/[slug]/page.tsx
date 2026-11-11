import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaPanel, Faq } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { AutomationRecords, CaseFile } from "@/components/Work";
import { areas } from "@/lib/areas";
import { getIndustry, industries } from "@/lib/industries";
import { faqLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { getWork, type WorkItem } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  return pageMetadata({
    title: ind.metaTitle,
    description: ind.metaDescription,
    path: `/industries/${ind.slug}`,
    image: `/industries/${ind.slug}/opengraph-image`,
  });
}

export default async function IndustryPage({ params }: Params) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const items = ind.work.map(getWork).filter((w): w is WorkItem => Boolean(w));
  const shown = items.filter((w) => !w.anonymised);
  const records = items.filter((w) => w.anonymised);
  const others = industries.filter((x) => x.slug !== ind.slug);
  const inline = ind.name.toLowerCase();

  return (
    <>
      <PageHead
        title={ind.headline}
        lede={ind.lede}
        trail={[
          { name: "Industries", path: "/industries" },
          { name: ind.name, path: `/industries/${ind.slug}` },
        ]}
      />

      <section className="band">
        <div className="frame cols">
          <div>
            <h2 className="cols__h">{ind.name}</h2>
            <ul className="taglist" style={{ marginTop: 20 }} aria-label="Who this is for">
              {ind.who.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
          <div className="body-copy">
            {ind.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--desk" aria-labelledby="focus-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="focus-h">What we build</h2>
            <p>The parts that matter most for {inline}.</p>
          </div>
          <ol className="numbered">
            {ind.focus.map((f, i) => (
              <li key={f.title}>
                <span className="numbered__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>
                  <Link href={f.href}>{f.title}</Link>
                </h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {items.length ? (
        <section className="band" aria-labelledby="seen-h">
          <div className="frame">
            <div className="sechead">
              <h2 id="seen-h">Seen in our work</h2>
              <p>{shown.length ? "Real projects, described as built." : "The client is kept anonymous. Described as built."}</p>
            </div>
            {shown.length ? (
              <div className="cases">
                {shown.map((w) => (
                  <CaseFile key={w.slug} item={w} />
                ))}
              </div>
            ) : null}
            {records.length ? <AutomationRecords items={records} /> : null}
          </div>
        </section>
      ) : null}

      <section className="band band--desk" aria-labelledby="ifaq-h">
        <div className="frame faqsec__grid">
          <h2 className="cols__h" id="ifaq-h">
            Questions we hear
          </h2>
          <Faq items={ind.faq} />
        </div>
      </section>

      <section className="band" aria-labelledby="near-h">
        <div className="frame">
          <div className="sechead sechead--small">
            <h3 id="near-h">Near you</h3>
          </div>
          <p>
            Based in St. Louis, building for {inline} across{" "}
            {areas.map((a, i) => (
              <span key={a.slug}>
                {i > 0 ? (i === areas.length - 1 ? " and " : ", ") : null}
                <Link href={`/areas/${a.slug}`}>{a.name}</Link>
              </span>
            ))}
            . We meet in person anywhere in {site.inPerson}, or on a video call.
          </p>
          <p style={{ marginTop: 16 }}>
            Other industries:{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                {i > 0 ? " · " : null}
                <Link href={`/industries/${o.slug}`}>{o.name}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      <CtaPanel />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: ind.metaTitle,
          serviceType: "Website design and business automation",
          description: ind.metaDescription,
          url: absoluteUrl(`/industries/${ind.slug}`),
          provider: { "@id": `${site.url}/#organization` },
          audience: { "@type": "BusinessAudience", name: ind.name },
          areaServed: { "@type": "City", name: "St. Louis, Missouri" },
        }}
      />
      <JsonLd data={faqLd(ind.faq)} />
    </>
  );
}
