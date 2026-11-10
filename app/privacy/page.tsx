import Legal from "@/components/Legal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects information from visitors and people who contact us.`,
  path: "/privacy",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy policy"
      lede="What we collect when you use this site or contact us, why, and what you can ask us to do with it. Written to be read."
      path="/privacy"
      updated={site.updated}
      sections={[
        {
          id: "who",
          title: "Who we are",
          body: (
            <p>
              {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a website and automation development agency. We run{" "}
              {site.url.replace("https://", "")}. Questions about this policy go to {mail} or{" "}
              <a href={site.phone.href}>{site.phone.display}</a>.
            </p>
          ),
        },
        {
          id: "collect",
          title: "What we collect",
          body: (
            <>
              <h3>Information you give us</h3>
              <p>
                When you send the project form we receive your name, email address and message, plus anything optional you add:
                business name, phone number, current website, the services you are interested in and a budget range. If you
                email or call us, we receive what you choose to share.
              </p>
              <h3>Information collected automatically</h3>
              <p>
                Our hosting provider processes technical information needed to deliver the site and keep it secure, such as your
                IP address, browser type and the pages requested. We do not use this to build a profile of you.
              </p>
              <h3>Information stored only in your browser</h3>
              <p>
                If you type your business name into the &ldquo;Operating manual for&rdquo; box on the home page, it is saved in
                your browser&rsquo;s local storage on your own device so the site can remember it and pre-fill the project form.
                It is not sent to us unless you submit the form. You can clear it by emptying the box or clearing site data in
                your browser.
              </p>
              <h3>Cookies and tracking</h3>
              <p>
                We do not set advertising or tracking cookies, and we do not run third-party analytics or ad scripts on this site.
                If that changes, we will update this policy first.
              </p>
            </>
          ),
        },
        {
          id: "use",
          title: "How we use it",
          body: (
            <ul>
              <li>To reply to your enquiry and talk about your project.</li>
              <li>To prepare proposals and, if we work together, to deliver and support the work.</li>
              <li>To keep the site secure and working, and to prevent spam and abuse.</li>
              <li>To meet legal, tax and accounting obligations.</li>
            </ul>
          ),
        },
        {
          id: "share",
          title: "Who we share it with",
          body: (
            <>
              <p>We share information only with service providers that help us run the site and the business, and only for that purpose:</p>
              <ul>
                <li>Website hosting and delivery.</li>
                <li>Email delivery for form submissions, and our email inbox provider.</li>
              </ul>
              <p>
                We do not sell personal information, and we do not share it for cross-context behavioral advertising. We may
                disclose information if the law requires it or to protect our rights, our clients or the public.
              </p>
            </>
          ),
        },
        {
          id: "keep",
          title: "How long we keep it",
          body: (
            <p>
              We keep enquiries for as long as we need them to respond, to work with you, and to keep reasonable business records.
              When we no longer need them, we delete them. You can ask us to delete your enquiry at any time.
            </p>
          ),
        },
        {
          id: "rights",
          title: "Your choices and rights",
          body: (
            <>
              <p>
                You can ask us to tell you what personal information we hold about you, to correct it, or to delete it. Depending
                on where you live, including California and other US states with privacy laws, you may have further rights, and
                you will not be treated differently for using them.
              </p>
              <p>To make a request, email {mail}. We may need to confirm your identity before acting on it.</p>
            </>
          ),
        },
        {
          id: "security",
          title: "Security",
          body: (
            <p>
              The site is served over HTTPS, and access to enquiries is limited to the people who need them. No method of
              transmission or storage is perfectly secure, but we take reasonable steps to protect what you send us.
            </p>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: <p>This site is for businesses and is not directed at children under 13. We do not knowingly collect their information.</p>,
        },
        {
          id: "links",
          title: "Links to other sites",
          body: (
            <p>
              Our work pages link to client websites. Those sites are run by their owners and have their own privacy policies.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>When we change this policy we update the date at the top. Significant changes will be noted on this page.</p>,
        },
      ]}
    />
  );
}
