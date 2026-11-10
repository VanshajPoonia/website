import { AutomationPrices, BuildPrices, CarePrices, CtaPanel, Faq } from "@/components/Blocks";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { automation, builds, carePlanDiscount, carePlans, pricingNotes, training } from "@/lib/pricing";
import { faqLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pricing: websites from $599, care plans from $99 a month",
  description:
    "Plans and starting prices for small business websites, online stores, portals, automation, monthly care plans and AI development training. Fixed-scope proposals, no surprises.",
  path: "/pricing",
});

const pricingFaq = [
  {
    q: "Why 'from' prices?",
    a: "Every business is different. The starting price covers the plan as listed. Your proposal prices the exact scope, and that number does not change unless the scope does.",
  },
  {
    q: "How do payments work?",
    a: "The payment schedule is written into your proposal, so you see it before any work starts. Care plans are billed monthly.",
  },
  {
    q: "Do I need a care plan?",
    a: "No. You own the code and can host it anywhere. A care plan is there if you want a team that already knows your site to keep it running and keep improving it.",
  },
  {
    q: "Is there a discount for a care plan?",
    a: carePlanDiscount,
  },
  {
    q: "What costs extra?",
    a: "Third-party services such as domains, payment processing fees, email services and paid APIs. We list any that apply in your proposal and talk them through before work starts.",
  },
  {
    q: "Can I change care plans later?",
    a: "Yes. Move up or down a plan from the next month by sending us an email.",
  },
];

function catalogLd() {
  const offer = (name: string, min: number, monthly = false) => ({
    "@type": "Offer",
    name,
    priceCurrency: "USD",
    priceSpecification: monthly
      ? { "@type": "UnitPriceSpecification", price: min, priceCurrency: "USD", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } }
      : { "@type": "PriceSpecification", minPrice: min, priceCurrency: "USD" },
    seller: { "@id": `${site.url}/#organization` },
  });
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} plans and pricing`,
    url: absoluteUrl("/pricing"),
    itemListElement: [
      ...builds.map((p) => offer(p.name, p.min)),
      ...automation.map((p) => offer(p.name, p.min)),
      ...carePlans.map((p) => offer(`${p.name} care plan`, p.min, true)),
      ...training.filter((t) => t.min > 0).map((t) => offer(t.name, t.min)),
    ],
  };
}

export default function PricingPage() {
  return (
    <>
      <PageHead
        title="Plans and pricing."
        lede="Clear starting points for every kind of project, then a fixed-scope proposal for yours. You know the price before any work starts."
        trail={[{ name: "Pricing", path: "/pricing" }]}
      />

      <section className="band band--desk" aria-labelledby="builds-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="builds-h">Builds</h2>
            <p>One-time projects. Each starts with a call and a written proposal.</p>
          </div>
          <BuildPrices />
        </div>
      </section>

      <section className="band" aria-labelledby="auto-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="auto-h">Automation</h2>
            <p>Add it to any build, or connect the tools you already use.</p>
          </div>
          <AutomationPrices />
        </div>
      </section>

      <section className="band band--desk" aria-labelledby="care-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="care-h">Care plans</h2>
            <p>Monthly, cancel any time. {carePlanDiscount}</p>
          </div>
          <CarePrices />
        </div>
      </section>

      <section className="band" aria-labelledby="training-h">
        <div className="frame cols">
          <h2 className="cols__h" id="training-h">
            Training
          </h2>
          <ul className="addons addons--two">
            {training.map((t) => (
              <li key={t.name}>
                <span className="addons__name">{t.name}</span>
                <span className="addons__price mono">
                  {t.from}
                  {t.unit ?? ""}
                </span>
                <span className="addons__body">{t.for}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="terms-h">
        <div className="frame cols">
          <h2 className="cols__h" id="terms-h">
            How pricing works
          </h2>
          <ul className="ticklist">
            {pricingNotes.map((n) => (
              <li key={n}>
                <Icon name="check" size={18} />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="pfaq-h">
        <div className="frame faqsec__grid">
          <h2 className="cols__h" id="pfaq-h">
            Pricing questions
          </h2>
          <Faq items={pricingFaq} />
        </div>
      </section>

      <CtaPanel title="Get a fixed price for your project." />
      <JsonLd data={faqLd(pricingFaq)} />
      <JsonLd data={catalogLd()} />
    </>
  );
}
