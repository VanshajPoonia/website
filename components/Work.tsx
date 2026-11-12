import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import type { WorkItem } from "@/lib/work";
import Icon from "./Icon";

const colorOf = (n: number) => services.find((s) => s.chapter === n)?.color ?? "blue";

export function ChapterChips({ chapters }: { chapters: number[] }) {
  return (
    <ul className="chips" aria-label="Services used">
      {chapters.map((n) => {
        const s = services.find((x) => x.chapter === n)!;
        return (
          <li key={n} className="chip" data-color={colorOf(n)}>
            <span className="marker" aria-hidden="true" />
            {s.tab}
          </li>
        );
      })}
    </ul>
  );
}

/** Where a project stands: a filled dot when it is live, a ring otherwise. */
export function State({ status }: { status: string }) {
  return (
    <span className="state mono" data-live={status === "Live" || undefined}>
      <span className="state__dot" aria-hidden="true" />
      {status}
    </span>
  );
}

/** A full case file: screenshot beside a spec sheet. */
export function CaseFile({ item, priority = false, headingLevel = 3 }: { item: WorkItem; priority?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="case">
      <Link href={`/work/${item.slug}`} className="case__shot" tabIndex={-1} aria-hidden="true">
        {item.image ? (
          <Image
            src={item.image.desktop}
            alt=""
            width={1600}
            height={1000}
            sizes="(min-width: 1100px) 640px, 92vw"
            priority={priority}
          />
        ) : null}
      </Link>
      <div className="case__sheet">
        <H className="case__h">
          <Link href={`/work/${item.slug}`}>{item.client}</Link>
        </H>
        <p className="case__summary">{item.summary}</p>
        <dl className="spec">
          <div>
            <dt>Status</dt>
            <dd>
              <State status={item.status} />
            </dd>
          </div>
          <div>
            <dt>Industry</dt>
            <dd>{item.industry}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{item.location}</dd>
          </div>
          <div>
            <dt>Connected</dt>
            <dd>{item.connected.join(", ")}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd className="mono">{item.year}</dd>
          </div>
        </dl>
        <ChapterChips chapters={item.services} />
        <div className="case__links">
          <Link href={`/work/${item.slug}`} className="textlink">
            Read the case file <Icon name="arrow" size={16} />
          </Link>
          {item.url ? (
            <a href={item.url} className="textlink textlink--quiet" target="_blank" rel="noopener">
              {item.urlLabel} <Icon name="arrowUpRight" size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** A contact-sheet row: thumbnail, name, one line, link. */
export function WorkStrip({ items }: { items: WorkItem[] }) {
  return (
    <ul className="strip">
      {items.map((item) => (
        <li key={item.slug} className="strip__item">
          <Link href={`/work/${item.slug}`} className="strip__link">
            {item.image ? (
              <span className="strip__thumb">
                <Image src={item.image.desktop} alt="" width={1600} height={1000} sizes="(min-width: 900px) 380px, 92vw" />
              </span>
            ) : null}
            <span className="strip__name">{item.client}</span>
            <span className="strip__meta mono">
              {item.location} · {item.year}
            </span>
            <span className="strip__line">{item.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Automation entries have no screenshot: they read as log records. */
export function AutomationRecords({ items }: { items: WorkItem[] }) {
  return (
    <ul className="records">
      {items.map((item) => (
        <li key={item.slug} className="record">
          <div className="record__head">
            <h3 className="record__h">
              <Link href={`/work/${item.slug}`}>{item.client}</Link>
            </h3>
            <span className="record__meta mono">{item.industry}</span>
          </div>
          <p>{item.summary}</p>
          <ul className="record__tools mono" aria-label="Tools connected">
            {item.connected.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
