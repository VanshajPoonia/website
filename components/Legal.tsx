import PageHead from "./PageHead";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export default function Legal({
  title,
  lede,
  path,
  updated,
  sections,
}: {
  title: string;
  lede: string;
  path: string;
  updated: string;
  sections: LegalSection[];
}) {
  const date = new Date(updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <PageHead title={title} lede={lede} trail={[{ name: title, path }]} />
      <section className="band">
        <div className="frame legal">
          <nav className="legal__toc" aria-label="On this page">
            <p>On this page</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="prose">
            <p className="prose__meta">
              Last updated <time dateTime={updated}>{date}</time>
            </p>
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
