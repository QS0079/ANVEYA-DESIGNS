import Hero from "@/components/site/Hero";
import { Lines, RImg, Up, Arrow } from "@/components/site/Lines";
import { ApproachStrip, EnquiryCta } from "@/components/site/PortfolioBlocks";
import { IMG } from "@/lib/defaults";
import { RESIDENTIAL, STATUS_LABEL, projectHref } from "@/lib/portfolio";

export const metadata = {
  title: "Residential Interior Design Projects in Pune | Anveya Designs",
  description: "Residential interiors designed for everyday living — completed homes and ongoing projects by Anveya Designs across Pune.",
  alternates: { canonical: "/portfolio/residential" },
};

const NOTE = {
  completed: "Finished home · room-wise tour",
  ongoing: "In progress · design visuals & site updates",
};

export default function ResidentialListing() {
  return (
    <>
      <div className="hero-stack">
        <Hero
          image={IMG.living2}
          alt="Residential interior by Anveya Designs"
          eyebrow="Portfolio · Residential"
          lines={["*R*esidential Interiors", "Designed for Everyday Living."]}
          lineClass={["", "indent-1"]}
          variant="short"
          copy={["Homes planned around the people who live in them — storage that works, rooms that feel calm and details that last."]}
        >
          <a href="#projects" className="btn light">View Projects <Arrow /></a>
        </Hero>

        <div className="over">
          <section className="section bg-cream" id="projects">
            <div className="wrap">
              <div className="crumbs"><a href="/portfolio">Portfolio</a><span>/</span><b>Residential</b></div>
              <div className="plist">
                {RESIDENTIAL.map((p, i) => (
                  <a href={projectHref(p)} className={`prow card-hover ${i % 2 ? "rev" : ""}`} key={p.slug}>
                    <div className="prow-media">
                      <RImg src={p.cover} alt={`${p.title} — ${p.location}`} dir={i % 2 ? "down" : undefined} />
                      {p.status && <span className={`pbadge ${p.status}`}>{STATUS_LABEL[p.status]}</span>}
                    </div>
                    <Up className="prow-txt" delay={120}>
                      <span className="prow-n">Residential {String(i + 1).padStart(2, "0")}</span>
                      <h2 className="display h3">{p.title}</h2>
                      <div className="prow-meta"><span>{p.location}</span>{p.status && <><i /><span>{STATUS_LABEL[p.status]}</span></>}</div>
                      <p>{p.concept}</p>
                      {p.status && <p className="prow-note">{NOTE[p.status]}</p>}
                      <span className="link-arrow">Explore Project <span className="arr"><Arrow /></span></span>
                    </Up>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <ApproachStrip />

      <EnquiryCta
        lines={["Planning an Interior", "Project in *P*une?"]}
        text="Share a few details about your home and we'll call you back to talk it through."
        image={IMG.bedroom1}
      />
    </>
  );
}
