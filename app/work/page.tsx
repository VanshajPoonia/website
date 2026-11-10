import { CtaPanel } from "@/components/Blocks";
import PageHead from "@/components/PageHead";
import { AutomationRecords, CaseFile, WorkStrip } from "@/components/Work";
import { pageMetadata } from "@/lib/seo";
import { namedWork, work } from "@/lib/work";

export const metadata = pageMetadata({
  title: "Work: websites, stores, portals and automations",
  description:
    "Client work by Kreativ Vantage: VIRO Design & Finishes, Adventure Unknown, ATLAS General Contracting, Healthy Mechanical Services, Charla Wewers Personal Training and Oddball Ink.",
  path: "/work",
});

export default function WorkPage() {
  const featured = namedWork.filter((w) => w.featured);
  const more = namedWork.filter((w) => !w.featured);
  const records = work.filter((w) => w.anonymised);
  return (
    <>
      <PageHead
        title="Work you can visit."
        lede="Live sites for real businesses, plus the automations that run behind them. We describe what we built. We do not invent results."
        trail={[{ name: "Work", path: "/work" }]}
      />
      <section className="band">
        <div className="frame">
          <div className="cases">
            {featured.map((w, i) => (
              <CaseFile key={w.slug} item={w} priority={i === 0} headingLevel={2} />
            ))}
          </div>
          <WorkStrip items={more} />
        </div>
      </section>
      <section className="band band--desk" aria-labelledby="auto-h">
        <div className="frame">
          <div className="sechead">
            <h2 id="auto-h">Behind the scenes</h2>
            <p>Automation work has no homepage to show. Client names are left out.</p>
          </div>
          <AutomationRecords items={records} />
        </div>
      </section>
      <CtaPanel title="Your business could be next." />
    </>
  );
}
