import Link from "next/link";
import { CtaPanel, Faq, HandoverDoc, PriceList } from "@/components/Blocks";
import Est, { TimeBack } from "@/components/Est";
import Hero3D from "@/components/Hero3D";
import HoursFlow from "@/components/HoursFlow";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { AutomationRecords, CaseFile, WorkStrip } from "@/components/Work";
import { faq, process } from "@/lib/faq";
import { HOURS_BACK } from "@/lib/hours";
import { faqLd, pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { namedWork, work } from "@/lib/work";

export const metadata = pageMetadata({
  title: `${site.name} | AI automation and web design in St. Louis`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const featured = work.filter((w) => w.featured);
  const more = namedWork.filter((w) => !w.featured);
  const automations = work.filter((w) => w.anonymised);

  return (
    <>
      <section className="cover" aria-labelledby="cover-h">
        <div className="frame cover__grid">
          <div className="cover__copy">
            <h1 id="cover-h" className="cover__h">
              AI that does the busywork.
            </h1>
            <p className="cover__lede">
              AI automation and websites for small businesses. Leads, orders and bookings, filed on their own.
            </p>
            <p className="cover__stat">
              About <strong>{HOURS_BACK} hours a week</strong> back for a typical small business.
              <Est />
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
            <h2 id="contents-h">Four ways we give you hours back.</h2>
            <p>Start with one. Add the next when it pays off.</p>
          </div>
          <ol className="toc">
            {services.map((s) => (
              <li key={s.slug} className="toc__row" data-color={s.color}>
                <Link href={`/services/${s.slug}`} className="toc__link">
                  <span className="toc__n mono">
                    <span className="marker" aria-hidden="true" />
                    {String(s.chapter).padStart(2, "0")}
                  </span>
                  <span className="toc__main">
                    <span className="toc__title">{s.title}</span>
                    <span className="toc__lead">{s.headline}</span>
                  </span>
                  <span className="toc__summary">{s.keywords.join(" · ")}</span>
                  <span className="toc__meta mono">
                    <span>
                      <TimeBack hours={s.hoursBack} />
                    </span>
                    <span>
                      From ${s.fromPrice.toLocaleString("en-US")}
                      {s.slug === "care-and-training" ? " a month" : ""}
                    </span>
                  </span>
                  <Icon name="arrow" size={18} className="toc__arrow" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="where" aria-labelledby="where-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="where-h">Where the hours go.</h2>
            <p>One quote request. By hand, it runs through you four times. Automated, once.</p>
          </div>
          <HoursFlow />
        </div>
      </section>

      <section className="worksec" aria-labelledby="work-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="work-h">Work you can visit.</h2>
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
            <h2 id="own-h">You own it. All of it.</h2>
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
            <h2 id="process-h">How a project runs.</h2>
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
            <h2 id="prices-h">Prices start here.</h2>
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
            <h2 id="faq-h">Questions owners ask.</h2>
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
