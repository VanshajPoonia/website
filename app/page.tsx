import Link from "next/link";
import { CtaPanel, Faq, HandoverDoc, PriceList } from "@/components/Blocks";
import Decode from "@/components/Decode";
import Hero3D from "@/components/Hero3D";
import HoursFlow from "@/components/HoursFlow";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PreparedFor from "@/components/PreparedFor";
import { AutomationRecords, CaseFile, WorkStrip } from "@/components/Work";
import { faq, process } from "@/lib/faq";
import { faqLd, pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { namedWork, work } from "@/lib/work";

export const metadata = pageMetadata({
  title: `${site.name} | AI automation and websites for small businesses`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const featured = work.filter((w) => w.featured);
  const more = namedWork.filter((w) => !w.featured);
  const automations = work.filter((w) => w.anonymised);
  const workBySlug = Object.fromEntries(work.map((w) => [w.slug, w]));

  return (
    <>
      <section className="cover" aria-labelledby="cover-h">
        <div className="frame cover__grid">
          <div className="cover__copy">
            <Decode as="h1" id="cover-h" text="AI that does the busywork." trigger="mount" duration={1150} className="cover__h" />
            <p className="cover__lede">
              AI automation and websites for small businesses. Leads, orders and bookings, filed on their own.
            </p>
            <div className="cover__actions">
              <Link href="/contact" className="btn btn--ink">
                Start a project <Icon name="arrow" size={18} />
              </Link>
              <a href={site.phone.href} className="btn btn--line">
                <Icon name="phone" size={18} />
                {site.phone.display}
              </a>
            </div>
            <PreparedFor revision={site.revision} />
          </div>
          <div className="cover__stage">
            <Hero3D />
          </div>
        </div>
      </section>

      <section className="proof" aria-labelledby="proof-h">
        <div className="frame proof__inner">
          <h2 id="proof-h" className="proof__k mono">
            Recent work
          </h2>
          <ul className="proof__list">
            {namedWork.map((w) => (
              <li key={w.slug}>
                <Link href={`/work/${w.slug}`}>{w.client}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contents" aria-labelledby="contents-h">
        <div className="frame">
          <div className="sechead">
            <Decode as="h2" id="contents-h" text="Four ways we give you hours back." />
            <p>Start with one. Add the next when it pays off.</p>
          </div>
          <ol className="toc">
            {services.map((s) => (
              <li key={s.slug} className="toc__row" data-color={s.color}>
                <Link href={`/services/${s.slug}`} className="toc__link">
                  <span className="toc__tab" aria-hidden="true">
                    {s.chapter}
                  </span>
                  <span className="toc__title">{s.title}</span>
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__summary">{s.keywords.join(" · ")}</span>
                  <Icon name="arrow" size={20} className="toc__arrow" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="where" aria-labelledby="where-h">
        <div className="frame">
          <div className="sechead">
            <Decode as="h2" id="where-h" text="Where the hours go." />
            <p>One quote request. By hand, it runs through you four times. Automated, once.</p>
          </div>
          <HoursFlow />
        </div>
      </section>

      <section className="chapters" aria-label="Service chapters">
        {services.map((s, i) => (
          <article key={s.slug} id={`chapter-${s.slug}`} className="divider" data-color={s.color} style={{ ["--i" as string]: i }}>
            <div className="divider__tab" aria-hidden="true">
              <span className="divider__tabn">{s.chapter}</span>
              {s.tab}
            </div>
            <div className="frame divider__body">
              <div className="divider__main">
                <h2 className="divider__h">{s.title}</h2>
                <p className="divider__lead">{s.headline}</p>
                <Link href={`/services/${s.slug}`} className="btn btn--ink">
                  Read chapter {s.chapter} <Icon name="arrow" size={18} />
                </Link>
              </div>
              <div className="divider__side">
                <h3 className="divider__k">Includes</h3>
                <ul className="divider__list">
                  {s.included.slice(0, 4).map((x) => (
                    <li key={x.title}>
                      <Icon name="check" size={16} />
                      {x.title}
                    </li>
                  ))}
                </ul>
                <h3 className="divider__k">Seen in</h3>
                <ul className="divider__work">
                  {s.work.map((slug) => (
                    <li key={slug}>
                      <Link href={`/work/${slug}`}>{workBySlug[slug]?.client}</Link>
                    </li>
                  ))}
                </ul>
                <p className="divider__price mono">{s.priceNote}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="worksec" aria-labelledby="work-h">
        <div className="frame">
          <div className="sechead">
            <Decode as="h2" id="work-h" text="Work you can visit." />
            <p>Live sites for real businesses. Click around.</p>
          </div>
          <div className="cases">
            {featured.map((w) => (
              <CaseFile key={w.slug} item={w} />
            ))}
          </div>
          <WorkStrip items={more} />
          <div className="worksec__auto">
            <div className="sechead sechead--small">
              <h3>Automation and AI work</h3>
              <p>No homepage to show, so client names are left out.</p>
            </div>
            <AutomationRecords items={automations} />
          </div>
          <Link href="/work" className="textlink">
            All work <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      <section className="own" aria-labelledby="own-h">
        <div className="frame own__grid">
          <div className="sechead sechead--stack">
            <Decode as="h2" id="own-h" text="You own it. All of it." />
            <p>Once it is paid, it is yours. Stay with us, hire someone else, or hand it to an AI coding agent.</p>
            <ul className="own__list">
              <li>
                <strong>Your code.</strong> No builder subscription, no hostage hosting.
              </li>
              <li>
                <strong>Your docs.</strong> How it works and how to change it.
              </li>
              <li>
                <strong>Your team, trained.</strong> On the admin and on AI tools like Claude and Codex.
              </li>
            </ul>
          </div>
          <HandoverDoc />
        </div>
      </section>

      <section className="process" aria-labelledby="process-h">
        <div className="frame">
          <div className="sechead">
            <Decode as="h2" id="process-h" text="How a project runs." />
            <p>Five steps, every time.</p>
          </div>
          <ol className="steps">
            {process.map((p, i) => (
              <li key={p.step} className="steps__item">
                <span className="steps__n mono">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="steps__h">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pricesec" aria-labelledby="prices-h">
        <div className="frame">
          <div className="sechead">
            <Decode as="h2" id="prices-h" text="Prices start here." />
            <p>A fixed-scope proposal comes first. These are starting prices.</p>
          </div>
          <PriceList />
          <Link href="/pricing" className="textlink">
            Pricing details <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      <section className="faqsec" aria-labelledby="faq-h">
        <div className="frame faqsec__grid">
          <div className="sechead sechead--stack">
            <Decode as="h2" id="faq-h" text="Questions owners ask." />
            <p>
              Something else? Call <a href={site.phone.href}>{site.phone.display}</a>.
            </p>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaPanel />
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
