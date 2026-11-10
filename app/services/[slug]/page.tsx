import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaPanel, Faq } from "@/components/Blocks";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { AutomationRecords, CaseFile } from "@/components/Work";
import { faqLd, pageMetadata, serviceLd } from "@/lib/seo";
import { getService, services } from "@/lib/services";
import { getWork, type WorkItem } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    image: `/services/${s.slug}/opengraph-image`,
  });
}

export default async function ServicePage({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const next = services[(services.indexOf(s) + 1) % services.length];
  const items = s.work.map(getWork).filter((w): w is WorkItem => Boolean(w));
  const shown = items.filter((w) => !w.anonymised);
  const records = items.filter((w) => w.anonymised);

  return (
    <>
      <PageHead
        title={s.headline}
        lede={s.summary}
        trail={[
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ]}
        color={s.color}
        chapter={s.chapter}
      />

      <section className="band">
        <div className="frame cols">
          <h2 className="cols__h">{s.title}</h2>
          <div className="body-copy">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band" data-color={s.color} aria-labelledby="included-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="included-h">What is included</h2>
            <p>The standard contents of this chapter. Your proposal lists exactly what applies to your project.</p>
          </div>
          <ol className="numbered">
            {s.included.map((x, i) => (
              <li key={x.title}>
                <span className="numbered__n">
                  {s.chapter}.{i + 1}
                </span>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band--desk" aria-labelledby="changes-h">
        <div className="frame cols">
          <div>
            <h2 className="cols__h" id="changes-h">
              What changes for you
            </h2>
          </div>
          <div>
            <ul className="changes">
              {s.changes.map((c) => (
                <li key={c}>
                  <Icon name="check" size={20} />
                  {c}
                </li>
              ))}
            </ul>
            <div className="pricenote" style={{ marginTop: 32 }}>
              <p>{s.priceNote}</p>
              <Link href="/pricing" className="textlink">
                See pricing <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {items.length ? (
        <section className="band" aria-labelledby="examples-h">
          <div className="frame">
            <div className="sechead">
              <h2 id="examples-h">Seen in our work</h2>
              <p>Projects where this chapter did the heavy lifting.</p>
            </div>
            <div className="cases">
              {shown.slice(0, 2).map((w) => (
                <CaseFile key={w.slug} item={w} />
              ))}
            </div>
            {records.length ? <AutomationRecords items={records} /> : null}
            {shown.length > 2 ? (
              <p style={{ marginTop: 32 }}>
                Also:{" "}
                {shown.slice(2).map((w, i) => (
                  <span key={w.slug}>
                    {i > 0 ? ", " : null}
                    <Link href={`/work/${w.slug}`}>{w.client}</Link>
                  </span>
                ))}
                .
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="band" aria-labelledby="sfaq-h">
        <div className="frame faqsec__grid">
          <h2 className="cols__h" id="sfaq-h">
            Questions about {s.title.toLowerCase()}
          </h2>
          <Faq items={s.faq} />
        </div>
      </section>

      <section className="band band--desk">
        <div className="frame nextch" data-color={next.color}>
          <p className="cols__h" style={{ fontSize: "1.5rem" }}>
            Next chapter
          </p>
          <Link href={`/services/${next.slug}`}>
            <small>Chapter {next.chapter}</small>
            <strong>{next.title}</strong>
          </Link>
        </div>
      </section>

      <CtaPanel title={`Start with ${s.title.toLowerCase()}.`} />
      <JsonLd data={serviceLd(s)} />
      <JsonLd data={faqLd(s.faq)} />
    </>
  );
}
