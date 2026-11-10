import type { Metadata } from "next";
import Link from "next/link";
import Decode from "@/components/Decode";
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
          <Decode as="p" text="404" trigger="mount" duration={1300} className="lost__code" />
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
              <span className="lost__tab">{s.chapter}</span>
              {s.title}
              <span className="toc__leader" aria-hidden="true" />
            </Link>
          ))}
          <p>Also in this manual</p>
          {other.map((o) => (
            <Link key={o.href} href={o.href}>
              <span className="lost__tab" aria-hidden="true">
                <Icon name="arrow" size={14} />
              </span>
              {o.label}
              <span className="toc__leader" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
