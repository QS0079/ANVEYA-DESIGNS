import { notFound } from "next/navigation";
import Hero from "@/components/site/Hero";
import RoomNav from "@/components/site/RoomNav";
import RoomGallery from "@/components/site/RoomGallery";
import { Lines, RImg, Up, Arrow } from "@/components/site/Lines";
import { ProgressTracker, RelatedProjects, EnquiryCta, SampleNote } from "@/components/site/PortfolioBlocks";
import { COMMERCIAL, getPortfolio, getRelated, projectTitleLines, MAX_PHOTOS, highlights } from "@/lib/portfolio";

export function generateStaticParams() {
  return COMMERCIAL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPortfolio("commercial", slug);
  if (!p) return {};
  return {
    title: `${p.title} Interior Design | Commercial | Anveya Designs`,
    description: p.concept,
    alternates: { canonical: `/portfolio/commercial/${p.slug}` },
    openGraph: { title: `${p.title} | Anveya Designs`, description: p.concept, images: [p.cover] },
  };
}

export default async function CommercialProject({ params }) {
  const { slug } = await params;
  const p = getPortfolio("commercial", slug);
  if (!p) notFound();

  return (
    <>
      {/* Hero + project summary */}
      <div className="hero-stack">
        <Hero
          image={p.hero}
          alt={`${p.title} interior`}
          eyebrow={`Commercial · ${p.sector} · ${p.location}`}
          lines={projectTitleLines(p)}
          lineClass={["", "indent-2"]}
          variant="short"
          copy={[p.concept]}
        >
          <a href="#tour" className="link-arrow">Walk Through the Space <span className="arr"><Arrow /></span></a>
        </Hero>

        <div className="over">
          <section className="section tight bg-cream">
            <div className="wrap">
              <div className="crumbs"><a href="/portfolio">Portfolio</a><span>/</span><a href="/portfolio/commercial">Commercial</a><span>/</span><b>{p.title}</b></div>
              <div className="pfacts">
                {p.glance.map(([k, v], i) => (
                  <Up key={k} delay={i * 80}><span>{k}</span><div>{v}</div></Up>
                ))}
              </div>

              {/* The brief */}
              <div className="pstory3">
                <div className="pstory3-head">
                  <Up className="eyebrow">The Brief</Up>
                  <Lines className="display h2" lines={["What the *S*pace", "Needed to Do"]} />
                </div>
                <div className="pstory3-cols">
                  {p.brief.map(([k, v], i) => (
                    <Up key={k} delay={i * 120}>
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      <h3>{k}</h3>
                      <p>{v}</p>
                    </Up>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Experience + flow */}
      <section className="section bg-dark">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 56px)" }}>
            <div>
              <Up className="eyebrow">Experience & Flow</Up>
              <Lines className="display h2" lines={["The Visitor *J*ourney"]} />
            </div>
            <Up as="p" className="lead" delay={150}>The layout follows the visitor from the entrance through every space, so each step feels clear and unhurried.</Up>
          </div>
          <ol className="pflow">
            {p.flow.map((s, i) => (
              <Up as="li" key={s} delay={i * 90}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{s}</span>
              </Up>
            ))}
          </ol>
        </div>
      </section>

      {/* Zone-wise navigation */}
      <RoomNav items={p.zones} label="Zones" />

      {/* Zones */}
      <section className="section bg-cream rooms">
        <div className="wrap">
          {p.zones.map((z, i) => (
            <article className={`room ${i % 2 ? "rev" : ""}`} id={z.id} key={z.id}>
              <div className="room-txt">
                <Up className="room-n">{String(i + 1).padStart(2, "0")} — {z.name}</Up>
                <Lines as="h2" className="display h3" lines={[z.headline]} fit={false} />
                <Up as="p" className="lead" delay={120}>{z.text}</Up>
              </div>
              <div className={`room-pics n${Math.min(z.images.length, MAX_PHOTOS)}`}>
                {z.images.slice(0, MAX_PHOTOS).map((im, k) => (
                  <figure key={k}>
                    <RImg src={im.src} alt={`${p.title} — ${im.caption}`} dir={k % 2 ? "down" : undefined} delay={k * 120} />
                    <figcaption>{im.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Design details */}
      {p.designDetails?.length > 0 && (
        <section className="section bg-cream2">
          <div className="wrap phl light">
            <div>
              <Up className="eyebrow">Design Details</Up>
              <Lines className="display h2" lines={["The *D*etails", "That Matter"]} />
            </div>
            <ul>
              {p.designDetails.map((h, i) => (
                <Up as="li" key={h} delay={i * 80}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{h}</span>
                </Up>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Image gallery (by zone) */}
      <section className="section bg-cream" id="gallery">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 56px)" }}>
            <div>
              <Up className="eyebrow">Project Gallery</Up>
              <Lines className="display h2" lines={["Inside the *S*pace"]} />
            </div>
            <Up delay={150}>
              <p className="lead">Two highlights from the project. Click an image to view it full screen.</p>
              <SampleNote show={p.sampleImages} />
            </Up>
          </div>
          <RoomGallery groups={[{ name: "Highlights", images: highlights(p.zones, p.gallery) }]} title={p.title} />
        </div>
      </section>

      {/* Outcome / progress */}
      <section className="section tight bg-cream2">
        <div className="wrap">
          <div className="two-col-head">
            <div>
              <Up className="eyebrow">{p.status === "ongoing" ? "Project Progress" : "Outcome"}</Up>
              <Lines className="display h2" lines={p.status === "ongoing" ? ["Where It *S*tands"] : ["What We *D*esigned"]} />
            </div>
            {p.status === "ongoing" ? <ProgressTracker stages={p.stages} note={p.progressNote} /> : <Up as="p" className="lead" delay={150}>{p.outcome}</Up>}
          </div>
        </div>
      </section>

      <RelatedProjects projects={getRelated(p)} />

      <EnquiryCta
        lines={["Planning a *C*linic", "Interior?"]}
        text="Request a commercial design consultation. Tell us about your office or clinic and how you'd like it to work for your team and visitors."
        label="Request a Consultation"
        project={p.title}
        image={p.cover}
      />
    </>
  );
}
