import Link from "next/link";
import { ESTIMATE_NOTE } from "@/lib/hours";
import { areas } from "@/lib/areas";
import { legalNav, site } from "@/lib/site";
import { services } from "@/lib/services";
import Icon from "./Icon";
import Mark from "./Mark";

export default function Footer() {
  const year = new Date(site.updated).getFullYear();
  return (
    <footer className="footer">
      <div className="frame footer__grid">
        <div className="footer__about">
          <Link href="/" className="brand">
            <Mark id="mk-foot" />
            <span className="brand__name">
              Kreativ<span>Vantage</span>
            </span>
            <span className="sr-only"> home</span>
          </Link>
          <p>
            Websites, online stores and automations for small businesses. Based in{" "}
            <Link href="/areas/st-louis">St. Louis, Missouri</Link>, working across the US.
          </p>
          <ul className="footer__contact">
            <li>
              <a href={site.phone.href}>
                <Icon name="phone" size={16} />
                <span className="mono">{site.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={16} />
                <span className="mono">{site.email}</span>
              </a>
            </li>
          </ul>
        </div>
        <nav className="footer__col" aria-label="Services">
          <h2 className="footer__h">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>
                  <span className="footer__n" data-color={s.color}>
                    {s.chapter}
                  </span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Company">
          <h2 className="footer__h">Company</h2>
          <ul>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Areas">
          <h2 className="footer__h">Areas</h2>
          <ul>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Legal">
          <h2 className="footer__h">Legal</h2>
          <ul>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={l.href.endsWith(".xml") ? false : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p id="estimates" className="frame footer__note">
        * {ESTIMATE_NOTE}
      </p>
      <div className="frame footer__base mono">
        <span>
          © {year} {site.legalName}. All rights reserved.
        </span>
        <span>
          Rev. {site.revision} · Last updated{" "}
          <time dateTime={site.updated}>
            {new Date(site.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}
          </time>
        </span>
      </div>
    </footer>
  );
}
