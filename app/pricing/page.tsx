import { CtaPanel, Faq, PriceList } from "@/components/Blocks";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { pricingNotes } from "@/lib/pricing";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: websites from $499, care plans from $100 a month",
  description:
    "Starting prices for small business websites, online stores, custom builds, care plans and training. Every project gets a fixed-scope proposal before work starts.",
  path: "/pricing",
});

const pricingFaq = [
  {
    q: "Why 'from' prices?",
    a: "Every business is different. The starting price covers the package as listed. Your proposal prices the exact scope, and that number does not change unless the scope does.",
  },
  {
    q: "How do payments work?",
    a: "The payment schedule is written into your proposal, so you see it before any work starts.",
  },
  {
    q: "What costs extra?",
    a: "Third-party services such as domains, payment processing fees, email services and paid APIs. We list any that apply in your proposal and talk them through before work starts.",
  },
  {
    q: "Is there a discount for a care plan?",
    a: "Sometimes. On larger builds we have reduced the development price when the client signs up for hosting and maintenance. Ask on the call.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHead
        title="Prices start here."
        lede="Clear starting points, then a fixed-scope proposal for your exact project. You know the price before any work starts."
        trail={[{ name: "Pricing", path: "/pricing" }]}
      />
      <section className="band band--desk">
        <div className="frame">
          <PriceList detailed />
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
    </>
  );
}
