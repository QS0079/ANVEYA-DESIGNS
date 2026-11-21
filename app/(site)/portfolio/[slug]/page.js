import { notFound } from "next/navigation";
import Hero from "@/components/site/Hero";
import Gallery from "@/components/site/Gallery";
import { Lines, RImg, Up, Arrow } from "@/components/site/Lines";
import { CtaBand } from "@/components/site/Blocks";
import { PROJECTS, getProject, getAdjacent, titleLines } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} | Portfolio | Anveya Designs`,
    description: p.summary,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: { title: `${p.title} | Anveya Designs`, description: p.summary, images: [p.cover] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { prev, next } = getAdjacent(slug);
  const facts = [
    ["Category", p.category],
    ["Location", p.location],
    ["Area", p.area],
    ["Year", p.year],
    ["Spaces", p.spaces],
    ["Scope", p.scope],
  ].filter(([, v]) => v);

  return (
    <>
      <div className="hero-stack">
        <Hero
          image={p.cover}
          alt={p.title}
          eyebrow={`Portfolio · ${p.category}`}
          lines={titleLines(p)}
          lineClass={["", "indent-2"]}
          variant="short"
          copy={[p.summary]}
        >
          <a href="#gallery" className="link-arrow">View the Gallery <span className="arr"><Arrow /></span></a>
        </Hero>

        <div className="over">
          {/* Facts */}
          <section className="section tight bg-cream">
            <div className="wrap">
              <div className="pfacts">
                {facts.map(([k, v], i) => (
                  <Up key={k} delay={i * 80}>
                    <span>{k}</span>
                    <div>{v}</div>
                  </Up>
                ))}
              </div>

              {/* Brief + approach */}
              <div className="pstory">
                <div>
                  <Up className="eyebrow">The Brief</Up>
                  <Lines className="display h3" lines={["Understanding", "the *S*pace"]} />
                </div>
                <div>
                  <Up as="p" className="intro-lg" delay={120}>{p.brief}</Up>
                </div>
                <div>
                  <Up className="eyebrow">Our Approach</Up>
                  <Lines className="display h3" lines={["Designed with", "*P*urpose"]} />
                </div>
                <div>
                  <Up as="p" className="lead" delay={120}>{p.approach}</Up>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Gallery */}
      <section className="section bg-cream" id="gallery" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 60px)" }}>
            <div>
              <Up className="eyebrow">Project Gallery</Up>
              <Lines className="display h2" lines={["Inside the *P*roject"]} />
            </div>
            <Up as="p" className="lead" delay={150}>Click any image to view it full screen.</Up>
          </div>
          <Gallery images={p.gallery} title={p.title} />
        </div>
      </section>

      {/* Highlights */}
      {p.highlights?.length > 0 && (
        <section className="section bg-dark">
          <div className="wrap phl">
            <div>
              <Up className="eyebrow">Design Highlights</Up>
              <Lines className="display h2" lines={["The *D*etails", "That Matter"]} />
            </div>
            <ul>
              {p.highlights.map((h, i) => (
                <Up as="li" key={h} delay={i * 100}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{h}</span>
                </Up>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section className="pnav">
        <a href={`/portfolio/${prev.slug}`} className="pnav-item prev">
          <RImg src={prev.cover} alt={prev.title} />
          <div className="pnav-txt">
            <span>← Previous Project</span>
            <h3 className="display h3">{prev.title}</h3>
          </div>
        </a>
        <a href={`/portfolio/${next.slug}`} className="pnav-item next">
          <RImg src={next.cover} alt={next.title} dir="down" />
          <div className="pnav-txt">
            <span>Next Project →</span>
            <h3 className="display h3">{next.title}</h3>
          </div>
        </a>
      </section>
      <div className="center bg-cream" style={{ padding: "34px 0" }}>
        <a href="/portfolio" className="link-arrow">All Projects <span className="arr"><Arrow /></span></a>
      </div>

      <CtaBand
        lines={["Inspired by", "What You *S*ee?"]}
        text="Your space could be our next design story. Let's discuss your ideas, understand your requirements and explore how we can create something meaningful together."
        primary={{ href: "/contact-us#enquiry", label: "Start Your Interior Design Journey" }}
        image={p.gallery[3] || p.cover}
      />
    </>
  );
}
