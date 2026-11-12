import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not in the manual. Here is the index.",
  robots: { index: false, follow: true },
};

const other = [
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="lost" aria-labelledby="lost-h">
      <div className="frame lost__grid">
        <div>
          <p className="lost__code">404</p>
          <h1 className="lost__h" id="lost-h">
            This page is not in the manual.
          </h1>
          <p>
            The link may be old, or the page may have moved when we rebuilt the site. The index on the right has everything that
            is here.
          </p>
          <p className="lost__face" aria-hidden="true">
            (・_・?)
          </p>
          <Link href="/" className="btn btn--ink">
            Back to the cover <Icon name="arrow" size={18} />
          </Link>
        </div>
        <nav className="lost__index" aria-label="Site index">
          <p>Chapters</p>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} data-color={s.color}>
              <span className="marker" aria-hidden="true" />
              {s.title}
            </Link>
          ))}
          <p>Also in this manual</p>
          {other.map((o) => (
            <Link key={o.href} href={o.href}>
              <Icon name="arrow" size={14} />
              {o.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
