import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import Icon from "./Icon";
import Mark from "./Mark";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner frame">
        <Link href="/" className="brand">
          <Mark />
          <span className="brand__name">
            Kreativ<span>Vantage</span>
          </span>
          <span className="sr-only"> home</span>
        </Link>
        <nav className="header__nav" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <a className="header__phone" href={site.phone.href}>
            <Icon name="phone" size={16} />
            <span className="mono">{site.phone.display}</span>
          </a>
          <Link className="btn btn--ink btn--sm" href="/contact">
            Start a project
          </Link>
          <MobileMenu
            links={[...nav, { href: "/contact", label: "Contact" }]}
            chapters={services.map((s) => ({ href: `/services/${s.slug}`, label: s.title, n: s.chapter, color: s.color }))}
            phone={site.phone}
          />
        </div>
      </div>
    </header>
  );
}
