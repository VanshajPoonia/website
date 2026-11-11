import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact: start a website or automation project",
  description: `Tell us about your business and the work you would rather not do by hand. Call ${site.phone.display} or send the project form.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHead
        title="Start a project."
        lede="A few lines about your business is plenty. We reply with questions, then a written, fixed-scope proposal."
        trail={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="band">
        <div className="frame contact">
          <ContactForm email={site.email} phone={site.phone} />
          <aside className="aside" aria-label="Other ways to reach us">
            <div>
              <a className="aside__line" href={site.phone.href}>
                <Icon name="phone" size={20} />
                <span className="mono">{site.phone.display}</span>
              </a>
              <a className="aside__line" href={`mailto:${site.email}`}>
                <Icon name="mail" size={20} />
                <span className="mono">{site.email}</span>
              </a>
            </div>
            <div className="aside__card">
              <h2>What happens next</h2>
              <ol>
                <li>We read your message and reply by email, often with a few questions.</li>
                <li>We talk about how your business runs and where the time goes, in person anywhere in {site.inPerson} or on a video call.</li>
                <li>You get a written proposal with scope, price and timeline. No work starts until you agree to it.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
