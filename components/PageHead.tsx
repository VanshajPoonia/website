import Link from "next/link";
import type { ChapterColor } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";
import JsonLd from "./JsonLd";

type Crumb = { name: string; path: string };

export default function PageHead({
  title,
  lede,
  trail,
  color,
  chapter,
  children,
}: {
  title: string;
  lede?: string;
  trail: Crumb[];
  color?: ChapterColor;
  chapter?: number;
  children?: React.ReactNode;
}) {
  return (
    <header className="pagehead" data-color={color}>
      <div className="frame pagehead__inner">
        <nav aria-label="Breadcrumb" className="crumbs mono">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {trail.map((c, i) => (
              <li key={c.path}>
                {i === trail.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="pagehead__title">
          {chapter ? (
            <span className="pagehead__chapter" aria-hidden="true">
              {chapter}
            </span>
          ) : null}
          <h1 className="pagehead__h1">{title}</h1>
        </div>
        {lede ? <p className="pagehead__lede">{lede}</p> : null}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(trail)} />
    </header>
  );
}
