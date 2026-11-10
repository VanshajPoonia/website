import Link from "next/link";
import Legal from "@/components/Legal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: `The terms for using the ${site.name} website. Client projects are covered by their own written proposals and agreements.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Legal
      title="Terms of service"
      lede="The rules for using this website. Projects we build for clients are covered by their own written agreements."
      path="/terms"
      updated={site.updated}
      sections={[
        {
          id: "agreement",
          title: "Using this site",
          body: (
            <p>
              These terms apply to {site.url.replace("https://", "")} and its pages, run by {site.legalName}, {site.entity}. By
              using the site you agree to them. If you do not agree, please do not use the site.
            </p>
          ),
        },
        {
          id: "conduct",
          title: "Acceptable use",
          body: (
            <ul>
              <li>Use the site lawfully and do not use it to send spam or harmful content.</li>
              <li>Do not try to disrupt the site, overload it, or get around its security.</li>
              <li>Do not test the site for vulnerabilities without our written permission.</li>
            </ul>
          ),
        },
        {
          id: "info",
          title: "Information and prices on the site",
          body: (
            <p>
              The information on this site is general. Prices shown are starting points, not offers. A project is agreed only
              when both sides accept a written proposal or agreement, and that document sets the scope, price, timeline and
              terms.
            </p>
          ),
        },
        {
          id: "projects",
          title: "Client projects",
          body: (
            <p>
              Work we do for clients, including ownership of custom code, payment terms and support, is governed by the written
              proposal or agreement for that project. If it conflicts with these terms, the project agreement wins.
            </p>
          ),
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: (
            <p>
              The content, design and code of this site belong to {site.legalName} or its licensors. Client names, logos and
              website screenshots belong to their owners and appear here as examples of our work. Please do not copy the site
              or its content without permission.
            </p>
          ),
        },
        {
          id: "links",
          title: "Links to other sites",
          body: <p>We link to client websites and other services. We do not control those sites and are not responsible for them.</p>,
        },
        {
          id: "warranty",
          title: "No warranty",
          body: (
            <p>
              The site is provided &ldquo;as is&rdquo;. We work to keep it accurate and available, but we do not promise that it
              will always be error-free or uninterrupted.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <p>
              To the extent the law allows, {site.legalName} is not liable for indirect or consequential losses arising from your
              use of this site. Nothing in these terms limits liability that cannot be limited by law.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of {site.jurisdiction}, United States, without regard to its conflict of
              law rules.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes and contact",
          body: (
            <p>
              We may update these terms and will change the date at the top when we do. Questions go to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. See also our <Link href="/privacy">privacy policy</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
