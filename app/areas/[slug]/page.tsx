import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaPanel, Faq } from "@/components/Blocks";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { CaseFile } from "@/components/Work";
import { areas, getArea } from "@/lib/areas";
import { faqLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { getWork, type WorkItem } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/areas/${a.slug}`,
    image: `/areas/${a.slug}/opengraph-image`,
  });
}

export default async function AreaPage({ params }: Params) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const items = a.work.map(getWork).filter((w): w is WorkItem => Boolean(w));
  const others = areas.filter((x) => x.slug !== a.slug);

  return (
    <>
      <PageHead
        title={a.headline}
        lede={a.lede}
        trail={[
          { name: "Areas", path: "/areas" },
          { name: a.name, path: `/areas/${a.slug}` },
        ]}
      />

      <section className="band">
        <div className="frame cols">
          <div>
            <h2 className="cols__h">{a.name}</h2>
            <ul className="taglist" style={{ marginTop: 20 }} aria-label={`Places we cover in ${a.name}`}>
              {a.places.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="body-copy">
            {a.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--desk" aria-labelledby="focus-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="focus-h">What we build here</h2>
            <p>The work {a.name} businesses ask us for most.</p>
          </div>
          <ol className="numbered">
            {a.focus.map((f, i) => (
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
        <section className="band" aria-labelledby="near-h">
          <div className="frame">
            <div className="sechead">
              <h2 id="near-h">Work nearby</h2>
              <p>{a.workLine}</p>
            </div>
            <div className="cases">
              {items.slice(0, 2).map((w) => (
                <CaseFile key={w.slug} item={w} />
              ))}
            </div>
            {items.length > 2 ? (
              <p style={{ marginTop: 32 }}>
                Also:{" "}
                {items.slice(2).map((w, i) => (
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

      <section className="band band--desk" aria-labelledby="afaq-h">
        <div className="frame faqsec__grid">
          <h2 className="cols__h" id="afaq-h">
            Questions from {a.name}
          </h2>
          <Faq items={a.faq} />
        </div>
      </section>

      <section className="band" aria-labelledby="other-h">
        <div className="frame">
          <div className="sechead sechead--small">
            <h3 id="other-h">Other areas we serve</h3>
          </div>
          <p>
            {others.map((o, i) => (
              <span key={o.slug}>
                {i > 0 ? " · " : null}
                <Link href={`/areas/${o.slug}`}>{o.name}</Link>
              </span>
            ))}
          </p>
          <p style={{ marginTop: 16 }}>
            <Link href="/pricing" className="textlink">
              See pricing <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <CtaPanel title={`Start a project in ${a.name}.`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: a.metaTitle,
          serviceType: "Website design and business automation",
          description: a.metaDescription,
          url: absoluteUrl(`/areas/${a.slug}`),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: a.served.map((p) => ({
            "@type": p.type,
            name: `${p.name}, Missouri`,
          })),
        }}
      />
      <JsonLd data={faqLd(a.faq)} />
    </>
  );
}
