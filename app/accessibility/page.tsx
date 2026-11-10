import Legal from "@/components/Legal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Accessibility statement",
  description: `${site.name} aims to meet WCAG 2.2 level AA. How the site supports keyboard, screen reader and reduced-motion users, and how to report a problem.`,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <Legal
      title="Accessibility"
      lede="Everyone should be able to use this site, whatever device, browser or assistive technology they rely on."
      path="/accessibility"
      updated={site.updated}
      sections={[
        {
          id: "goal",
          title: "Our goal",
          body: <p>We aim for this site to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>,
        },
        {
          id: "measures",
          title: "What we do",
          body: (
            <ul>
              <li>Pages use real headings, landmarks and lists, so they make sense to screen readers.</li>
              <li>Everything works with a keyboard, with a visible focus outline and a skip link to the main content.</li>
              <li>Text and controls are checked for color contrast.</li>
              <li>
                If your device asks for reduced motion, the letter animations and moving cards stop and the 3D scene shows a single
                still frame.
              </li>
              <li>
                The 3D scene on the home page is decorative. The same information is in the text log beside it, which screen readers
                can read.
              </li>
              <li>Form fields have labels, and errors say what went wrong and how to fix it.</li>
            </ul>
          ),
        },
        {
          id: "limits",
          title: "Known limitations",
          body: (
            <p>
              Screenshots on our work pages are pictures of other businesses&rsquo; websites. Their text is described in the image
              descriptions and the case files, but the screenshots themselves cannot be read as text.
            </p>
          ),
        },
        {
          id: "feedback",
          title: "Tell us about a problem",
          body: (
            <p>
              If something on this site is hard to use, email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
              <a href={site.phone.href}>{site.phone.display}</a>. Tell us the page and what happened, and we will fix it or get you
              the information another way.
            </p>
          ),
        },
      ]}
    />
  );
}
