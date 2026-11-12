import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaPanel } from "@/components/Blocks";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { ChapterChips, State } from "@/components/Work";
import { industryFor } from "@/lib/industries";
import { pageMetadata, workLd } from "@/lib/seo";
import { getWork, work } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  const title = w.anonymised ? `${w.client}: ${w.industry} automation` : `${w.client}: ${w.industry}, ${w.location}`;
  return pageMetadata({ title, description: w.summary, path: `/work/${w.slug}`, image: `/work/${w.slug}/opengraph-image` });
}

export default async function WorkDetail({ params }: Params) {
  const w = getWork((await params).slug);
  if (!w) notFound();
  const i = work.indexOf(w);
  const industry = industryFor(w.slug);
  const prev = work[(i - 1 + work.length) % work.length];
  const next = work[(i + 1) % work.length];

  return (
    <>
      <PageHead
        title={w.client}
        lede={w.summary}
        trail={[
          { name: "Work", path: "/work" },
          { name: w.client, path: `/work/${w.slug}` },
        ]}
      >
        <div className="wd-links">
          {w.url ? (
            <a href={w.url} className="btn btn--ink" target="_blank" rel="noopener">
              Visit {w.urlLabel} <Icon name="arrowUpRight" size={18} />
            </a>
          ) : null}
          <Link href="/contact" className="btn btn--line">
            Start a project like this
          </Link>
        </div>
      </PageHead>

      {w.image ? (
        <section className="band band--desk" aria-label="Screenshots">
          <div className="frame">
            <div className="wd-shots">
              <div className="wd-desktop">
                <Image src={w.image.desktop} alt={w.image.alt} width={1600} height={1000} sizes="(min-width: 1300px) 1060px, 86vw" priority />
              </div>
              <div className="wd-mobile">
                <Image src={w.image.mobile} alt={`${w.client} on a phone`} width={390} height={844} sizes="(min-width: 900px) 280px, 22vw" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="band">
        <div className="frame cols">
          <div>
            <h2 className="cols__h">The file</h2>
            <dl className="spec">
              <div>
                <dt>Industry</dt>
                <dd>{industry ? <Link href={`/industries/${industry.slug}`}>{w.industry}</Link> : w.industry}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{w.area ? <Link href={`/areas/${w.area}`}>{w.location}</Link> : w.location}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd className="mono">{w.year}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <State status={w.status} />
                </dd>
              </div>
            </dl>
            <ChapterChips chapters={w.services} />
          </div>
          <div className="body-copy">
            <p>{w.problem}</p>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="built-h">
        <div className="frame cols">
          <h2 className="cols__h" id="built-h">
            What we built
          </h2>
          <ul className="ticklist">
            {w.built.map((b) => (
              <li key={b}>
                <Icon name="check" size={18} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="conn-h">
        <div className="frame cols">
          <div>
            <h2 className="cols__h" id="conn-h">
              Connected to
            </h2>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            <ul className="taglist">
              {w.connected.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div>
              <p className="mono" style={{ color: "var(--ink-3)", marginBottom: 8 }}>
                Built with
              </p>
              <ul className="taglist">
                {w.stack.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--desk" aria-label="More work">
        <nav className="frame pager" aria-label="Case files">
          <Link href={`/work/${prev.slug}`}>
            <small>Previous</small>
            <strong>{prev.client}</strong>
          </Link>
          <Link href={`/work/${next.slug}`}>
            <small>Next</small>
            <strong>{next.client}</strong>
          </Link>
        </nav>
      </section>

      <CtaPanel />
      <JsonLd data={workLd(w)} />
    </>
  );
}
