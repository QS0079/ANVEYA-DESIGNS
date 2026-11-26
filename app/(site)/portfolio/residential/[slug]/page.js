import { notFound } from "next/navigation";
import Hero from "@/components/site/Hero";
import RoomNav from "@/components/site/RoomNav";
import RoomGallery from "@/components/site/RoomGallery";
import { Lines, RImg, Up, Arrow } from "@/components/site/Lines";
import { ProgressTracker, RelatedProjects, EnquiryCta, SampleNote } from "@/components/site/PortfolioBlocks";
import { RESIDENTIAL, STATUS_LABEL, getPortfolio, getRelated, projectTitleLines, MAX_PHOTOS, highlights, isPortrait, projectHref } from "@/lib/portfolio";

export function generateStaticParams() {
  return RESIDENTIAL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPortfolio("residential", slug);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.location} | Residential Interior | Anveya Designs`,
    description: p.concept,
    alternates: { canonical: `/portfolio/residential/${p.slug}` },
    openGraph: { title: `${p.title} | Anveya Designs`, description: p.concept, images: [p.cover] },
  };
}

export default async function ResidentialProject({ params }) {
  const { slug } = await params;
  const p = getPortfolio("residential", slug);
  if (!p) notFound();
  const gallery = highlights(p.rooms, p.gallery);
  const ongoing = p.status === "ongoing";

  return (
    <>
      {/* 01 — Hero banner */}
      <div className="hero-stack">
        <Hero
          image={p.hero}
          alt={`${p.title}, ${p.location}`}
          eyebrow={`Residential · ${p.location}${p.status ? ` · ${STATUS_LABEL[p.status]}` : ""}`}
          lines={projectTitleLines(p)}
          lineClass={["", "indent-2"]}
          variant="short"
          copy={[p.concept]}
        >
          <a href="#tour" className="link-arrow">{ongoing ? "See the Design & Progress" : "Take the Room Tour"} <span className="arr"><Arrow /></span></a>
        </Hero>

        <div className="over">
          {/* 02 — Project at a glance */}
          <section className="section tight bg-cream">
            <div className="wrap">
              <div className="crumbs"><a href="/portfolio">Portfolio</a><span>/</span><a href="/portfolio/residential">Residential</a><span>/</span><b>{p.title}</b></div>
              <div className="pfacts">
                {p.glance.map(([k, v], i) => (
                  <Up key={k} delay={i * 80}>
                    <span>{k}</span>
                    <div>{k === "Status" && p.status ? <em className={`pbadge inline ${p.status}`}>{v}</em> : v}</div>
                  </Up>
                ))}
              </div>

              {/* 03 — Design story */}
              <div className="pstory3">
                <div className="pstory3-head">
                  <Up className="eyebrow">The Design Story</Up>
                  <Lines className="display h2" lines={["Understanding", "the *H*ome"]} />
                </div>
                <div className="pstory3-cols">
                  {[["The Brief", p.story.needs], ["The Challenge", p.story.challenge], ["Our Response", p.story.response]].map(([k, v], i) => (
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

      {/* 04 — Room navigation */}
      <RoomNav items={p.rooms} label="Rooms" />

      {/* 05 — Room-wise storytelling */}
      <section className="section bg-cream rooms">
        <div className="wrap">
          {p.rooms.map((r, i) => (
            <article className={`room ${i % 2 ? "rev" : ""}`} id={r.id} key={r.id}>
              <div className="room-txt">
                <Up className="room-n">{String(i + 1).padStart(2, "0")} — {r.name}</Up>
                <Lines as="h2" className="display h3" lines={[r.headline]} fit={false} />
                <Up as="p" className="lead" delay={120}>{r.text}</Up>
              </div>
              <div className={`room-pics n${Math.min(r.images.length, MAX_PHOTOS)}`}>
                {r.images.slice(0, MAX_PHOTOS).map((im, k) => (
                  <figure key={k} className={isPortrait(im.ar) ? "port" : undefined}>
                    <RImg src={im.src} alt={`${p.title} — ${im.caption}`} dir={k % 2 ? "down" : undefined} delay={k * 120} style={im.ar ? { aspectRatio: im.ar } : undefined} />
                    <figcaption>{im.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Special component — "Design details that matter" strip (completed homes) */}
      {!ongoing && p.details?.length > 0 && (
        <section className="section bg-dark dstrip-sec">
          <div className="wrap">
            <div className="two-col-head" style={{ marginBottom: "clamp(28px, 4vw, 54px)" }}>
              <div>
                <Up className="eyebrow">Close-ups</Up>
                <Lines className="display h2" lines={["Design Details", "That *M*atter"]} />
              </div>
              <Up as="p" className="lead" delay={150}>The small decisions — hardware, lighting, finishes — that make a home feel complete.</Up>
            </div>
            <div className="dstrip">
              {p.details.slice(0, MAX_PHOTOS).map((d, i) => (
                <figure key={i}>
                  <RImg src={d.src} alt={`${p.title} — ${d.caption}`} delay={i * 100} />
                  <figcaption>{d.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 06 — Project gallery (by room) — only photos not shown elsewhere on the page */}
      {gallery.length > 0 ? (
        <section className="section bg-cream" id="gallery">
          <div className="wrap">
            <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 56px)" }}>
              <div>
                <Up className="eyebrow">Project Gallery</Up>
                <Lines className="display h2" lines={[ongoing ? "Design *V*isuals" : "Inside the *H*ome"]} />
              </div>
              <Up delay={150}>
                <p className="lead">{ongoing ? "More from the approved design visuals." : "More from the home. Click an image to view it full screen."}</p>
                <SampleNote show={p.sampleImages} />
              </Up>
            </div>
            <RoomGallery groups={[{ name: "Highlights", images: gallery }]} title={p.title} />
          </div>
        </section>
      ) : p.sampleImages ? (
        <div className="wrap" style={{ paddingBottom: 24 }}><SampleNote show /></div>
      ) : null}

      {/* 07 — Process (completed) or progress (ongoing) */}
      <section className="section bg-cream2">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 56px)" }}>
            <div>
              <Up className="eyebrow">{ongoing ? "Project Progress" : "Delivery"}</Up>
              <Lines className="display h2" lines={ongoing ? ["Where the *P*roject", "Stands Today"] : ["From Design", "to *H*andover"]} />
            </div>
            <Up as="p" className="lead" delay={150}>{ongoing ? "This project is in progress. Stages are marked complete only once they are confirmed." : "How the approved design was brought to life on site."}</Up>
          </div>
          {ongoing ? (
            <ProgressTracker stages={p.stages} note={p.progressNote} />
          ) : (
            <div className="pdeliver">
              <Up><b>01</b><h3 className="display h4">Execution</h3><p>{p.delivery?.execution}</p></Up>
              <Up delay={120}><b>02</b><h3 className="display h4">Handover</h3><p>{p.delivery?.handover}</p></Up>
            </div>
          )}
        </div>
      </section>

      {/* 08 — Related projects */}
      <RelatedProjects projects={getRelated(p)} />

      {/* 09 — Enquiry CTA */}
      <EnquiryCta
        lines={["Planning an Interior", "Project in *P*une?"]}
        text="Tell us about your home — we'll call you back to understand your requirements and talk through the next steps."
        project={p.title}
        path={projectHref(p)}
        image={p.sampleImages ? p.cover : null}
      />
    </>
  );
}
