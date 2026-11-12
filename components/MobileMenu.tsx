"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Props = {
  links: readonly { href: string; label: string }[];
  chapters: { href: string; label: string; n: number; color: string }[];
  phone: { display: string; href: string };
};

export default function MobileMenu({ links, chapters, phone }: Props) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "menu"} size={22} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      <div id="mobile-menu" ref={panel} className="menu" data-open={open} hidden={!open}>
        <nav aria-label="Mobile">
          <p className="menu__label mono">Services</p>
          <ul className="menu__chapters">
            {chapters.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="menu__chapter" data-color={c.color}>
                  <span className="marker" aria-hidden="true" />
                  <span className="menu__n mono">{String(c.n).padStart(2, "0")}</span>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="menu__links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <a className="btn btn--ink menu__call" href={phone.href}>
            <Icon name="phone" size={18} />
            Call {phone.display}
          </a>
        </nav>
      </div>
    </>
  );
}
