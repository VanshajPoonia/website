"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { services } from "@/lib/services";

// Index tabs standing off the right edge of the page, one per chapter.
// On the home page they follow the chapter you are reading; on a service
// page they mark the chapter you are in. Hidden below desktop widths.
export default function TabRail() {
  const path = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const onHome = path === "/";

  useEffect(() => {
    if (!onHome) {
      setActive(path.startsWith("/services/") ? path.split("/")[2] : null);
      return;
    }
    const sheets = services
      .map((s) => document.getElementById(`chapter-${s.slug}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sheets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.replace("chapter-", ""));
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    sheets.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [path, onHome]);

  const showRail = onHome || path.startsWith("/services");
  if (!showRail) return null;

  return (
    <nav className="rail" aria-label="Chapters">
      <ol>
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={onHome ? `/#chapter-${s.slug}` : `/services/${s.slug}`}
              className="rail__tab"
              data-color={s.color}
              aria-current={active === s.slug ? "true" : undefined}
            >
              <span className="rail__n">{s.chapter}</span>
              <span className="rail__t">{s.tab}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
