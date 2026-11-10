import Link from "next/link";
import { automation, builds, carePlans, careRows, training, type Plan } from "@/lib/pricing";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import Decode from "./Decode";
import Icon from "./Icon";

const colorOf = (n: number) => services.find((s) => s.chapter === n)?.color ?? "blue";

function PlanTable({ plans, detailed, caption }: { plans: Plan[]; detailed?: boolean; caption: string }) {
  return (
    <table className="prices__table">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Plan</th>
          <th scope="col">For</th>
          {detailed ? <th scope="col">Includes</th> : null}
          <th scope="col" className="prices__num">
            From
          </th>
        </tr>
      </thead>
      <tbody>
        {plans.map((t) => (
          <tr key={t.name} data-color={colorOf(t.chapter)}>
            <th scope="row">
              <span className="prices__tab" aria-hidden="true" />
              {t.name}
            </th>
            <td>{t.for}</td>
            {detailed ? (
              <td>
                <ul className="ticks">
                  {t.includes.map((i) => (
                    <li key={i}>
                      <Icon name="check" size={16} />
                      {i}
                    </li>
                  ))}
                </ul>
              </td>
            ) : null}
            <td className="prices__num mono">
              {t.from}
              {t.unit ?? ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Home page summary: the builds, then one line each for the rest. */
export function PriceList() {
  const extras = [
    { name: "Automation", price: `from ${automation[0].from}`, body: "Single workflows and full automation packages." },
    { name: "Care plans", price: `from ${carePlans[0].price}/month`, body: "Hosting, updates and monthly changes by the team that built it." },
    { name: "Training", price: `from ${training[1].from}`, body: "Admin walkthrough included. AI development training by the session." },
  ];
  return (
    <div className="prices">
      <PlanTable plans={builds} caption="Starting prices for builds" />
      <ul className="addons">
        {extras.map((a) => (
          <li key={a.name}>
            <span className="addons__name">{a.name}</span>
            <span className="addons__price mono">{a.price}</span>
            <span className="addons__body">{a.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BuildPrices() {
  return <PlanTable plans={builds} detailed caption="Website, store and platform builds" />;
}

export function AutomationPrices() {
  return <PlanTable plans={automation} detailed caption="Automation" />;
}

/** Care plans as a comparison sheet, one column per plan. */
export function CarePrices() {
  const cell = (v: boolean | string) =>
    v === true ? (
      <Icon name="check" size={18} label="Included" />
    ) : v === false ? (
      <span className="care__no" aria-label="Not included">
        –
      </span>
    ) : (
      v
    );
  return (
    <div className="care">
      <table className="care__table">
        <caption className="sr-only">Monthly care plans</caption>
        <thead>
          <tr>
            <td />
            {carePlans.map((p) => (
              <th key={p.name} scope="col" data-featured={p.featured || undefined}>
                <span className="care__name">{p.name}</span>
                <span className="care__price">
                  <span className="mono">{p.price}</span>
                  <small>/month</small>
                </span>
                <span className="care__for">{p.for}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {careRows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i} data-featured={carePlans[i].featured || undefined}>
                  {cell(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Faq({ items, id }: { items: { q: string; a: string }[]; id?: string }) {
  return (
    <div className="faq" id={id}>
      {items.map((f) => (
        <details key={f.q} className="faq__item">
          <summary>
            <span>{f.q}</span>
            <Icon name="plus" size={18} className="faq__icon" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaPanel({
  title = "Tell us what eats your week.",
  body = "Send a few lines about your business and the work you would rather not do by hand. We reply with questions, then a fixed-scope proposal.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <div className="frame cta__inner">
        <Decode as="h2" text={title} id="cta-h" className="cta__h" />
        <div className="cta__side">
          <p>{body}</p>
          <div className="cta__actions">
            <Link href="/contact" className="btn btn--ink">
              Start a project <Icon name="arrow" size={18} />
            </Link>
            <a href={site.phone.href} className="btn btn--line">
              <Icon name="phone" size={18} /> {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const DOC_SECTIONS = [
  ["1", "System overview", "What it does, what it runs on, who to call"],
  ["2", "Setup", "Running it on a new machine, step by step"],
  ["3", "Data", "Database tables, backups and where files live"],
  ["4", "Deployment", "How a change goes live, and how to roll it back"],
  ["5", "Admin guide", "Products, prices, orders, users and content"],
  ["6", "Integrations", "Payments, CRM, email and booking, with keys listed by name"],
  ["7", "Working with AI agents", "Context files and rules for Claude, Codex and others"],
];

/** A sample handover document, labelled as a sample. */
export function HandoverDoc() {
  return (
    <figure className="doc">
      <div className="doc__page">
        <div className="doc__top mono">
          <span>System guide</span>
          <span>Rev. 1.0</span>
        </div>
        <p className="doc__title">Your business platform</p>
        <p className="doc__sub">Handover documentation</p>
        <ol className="doc__toc">
          {DOC_SECTIONS.map(([n, t, d]) => (
            <li key={n}>
              <span className="doc__n mono">{n}</span>
              <span className="doc__t">{t}</span>
              <span className="doc__leader" aria-hidden="true" />
              <span className="doc__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="doc__page doc__page--under" aria-hidden="true" />
      <figcaption className="doc__cap mono">Sample contents. Every build ships with its own.</figcaption>
    </figure>
  );
}
