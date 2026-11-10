import Link from "next/link";
import { CtaPanel } from "@/components/Blocks";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import { process } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About: a website and automation agency for small businesses",
  description:
    "KreativVantage is a website and automation development agency focused on AI and saving time. We build, document and hand over, so you stay in control.",
  path: "/about",
});

const principles = [
  {
    title: "Show the work",
    body: "Every project on this site is real and live, or clearly marked when it is not. We describe what we built and never invent numbers.",
  },
  {
    title: "Plain words",
    body: "You should not need to speak developer to buy a website. Proposals, updates and docs are written for business owners.",
  },
  {
    title: "You stay in control",
    body: "You own the code, you get the documentation, and we train your team. Staying with us is a choice, not a trap.",
  },
  {
    title: "Fast and findable by default",
    body: "Speed, accessibility and technical SEO are part of every build, not an upsell. This site is held to the same standard.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        title="We build the systems small businesses run on."
        lede="KreativVantage is a website and automation development agency in St. Louis, Missouri, with a focus on AI and saving time."
        trail={[{ name: "About", path: "/about" }]}
      />
      <section className="band">
        <div className="frame cols">
          <h2 className="cols__h">What we do</h2>
          <div className="body-copy">
            <p>
              We design and build websites, online stores, dealer and member portals, and the automations that connect them to
              the rest of a business.
            </p>
            <p>
              Most of our clients are US small businesses: contractors, home services, retail and wholesale, fitness,
              hospitality and real estate. We are based in St. Louis, and many of our clients are nearby. Others are across the
              country.
            </p>
            <p>
              The thread through all of it is time. A good site brings in work. A connected one stops you re-typing it. A
              documented one means you are never stuck waiting on us.
            </p>
          </div>
        </div>
      </section>
      <section className="band band--desk" aria-labelledby="principles-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="principles-h">How we work</h2>
            <p>Four rules we hold every project to.</p>
          </div>
          <ul className="principles">
            {principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="band" aria-labelledby="steps-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="steps-h">A project, start to finish</h2>
            <p>The same five steps every time.</p>
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
          <p style={{ marginTop: 40 }}>
            <Link href="/work" className="textlink">
              See the work <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
