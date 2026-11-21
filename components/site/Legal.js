import Hero from "./Hero";
import { Up } from "./Lines";
import { getContactBlock } from "@/lib/data";
import { IMG } from "@/lib/defaults";

/**
 * Two-column legal page.
 * sections: [{ h, body: [ string | {ul:[...]} | {h3:string} | {contact:true} ] }]
 * Strings may contain {jurisdiction}, filled from CONTACT in lib/defaults.js.
 */
export default async function Legal({ title, swash, image = IMG.detail1, updated, intro, sections }) {
  const c = await getContactBlock();
  const fill = (s) => s.replaceAll("{jurisdiction}", c.jurisdiction);
  const first = title.indexOf(swash);
  const heading = first >= 0 ? `${title.slice(0, first)}*${swash}*${title.slice(first + 1)}` : title;
  const num = (i) => String(i + 1).padStart(2, "0");

  // Split sections into two balanced columns (by text length), keeping reading order:
  // left column = first sections, right column = the rest.
  const weight = (sec) => 120 + sec.body.reduce((n, b) => n + (typeof b === "string" ? b.length : b.ul ? b.ul.join(" ").length + b.ul.length * 40 : b.contact ? 260 : 60), 0);
  const total = sections.reduce((n, sec) => n + weight(sec), 0);
  let acc = 0, split = sections.length;
  for (let i = 0; i < sections.length; i++) {
    const w = weight(sections[i]);
    if (acc + w / 2 > total / 2) { split = i; break; }
    acc += w;
  }
  const columns = [sections.slice(0, split).map((sec, i) => [sec, i]), sections.slice(split).map((sec, i) => [sec, i + split])];

  const renderSection = (sec, i) => (
    <Up className="lg-sec" key={sec.h} id={`sec-${i + 1}`}>
      <h2><i>{num(i)}</i>{sec.h}</h2>
      {sec.body.map((b, j) =>
        typeof b === "string" ? <p key={j}>{fill(b)}</p>
        : b.ul ? <ul key={j}>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
        : b.h3 ? <h3 key={j}>{b.h3}</h3>
        : b.contact ? (
          <div className="lg-contact" key={j}>
            <strong>Anveya Designs</strong>
            <div><span>Email</span>{c.email}</div>
            <div><span>Phone</span>{c.phone}</div>
            <div><span>Address</span><em style={{ whiteSpace: "pre-line", fontStyle: "normal" }}>{c.address}</em></div>
          </div>
        ) : null
      )}
    </Up>
  );

  return (
    <>
      <Hero image={image} alt="" eyebrow="Anveya Designs" lines={[heading]} variant="mini" center />
      <section className="section tight bg-cream">
        <div className="wrap legal2">
          {/* intro + at-a-glance card */}
          <div className="lg-top">
            <div>
              {intro.map((p, i) => <Up as="p" className={i === 0 ? "lg-intro" : "lg-p"} key={i} delay={i * 80}>{p}</Up>)}
            </div>
            <Up className="lg-card" delay={150}>
              <div className="lg-updated"><span>Last Updated</span>{updated}</div>
              <div className="lg-toc-h">On this page</div>
              <ol className="lg-toc">
                {sections.map((s, i) => (
                  <li key={s.h}><a href={`#sec-${i + 1}`}><b>{num(i)}</b>{s.h}</a></li>
                ))}
              </ol>
            </Up>
          </div>

          {/* sections in two columns */}
          <div className="lg-cols">
            {columns.map((col, k) => (
              <div className="lg-col" key={k}>{col.map(([sec, i]) => renderSection(sec, i))}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
