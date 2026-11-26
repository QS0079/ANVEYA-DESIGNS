import Hero from "@/components/site/Hero";
import { Lines, RImg, Up, Arrow } from "@/components/site/Lines";
import ProjectCard from "@/components/site/ProjectCard";
import PortfolioGrid from "@/components/site/PortfolioGrid";
import { ApproachStrip, EnquiryCta } from "@/components/site/PortfolioBlocks";
import { IMG } from "@/lib/defaults";
import { PROJECTS } from "@/lib/projects";
import { PORTFOLIO, RESIDENTIAL, COMMERCIAL } from "@/lib/portfolio";

export const metadata = {
  title: "Interior Design Portfolio | Residential & Commercial Projects in Pune",
  description:
    "Explore Anveya Designs' residential and commercial interior design projects across Pune — completed homes, ongoing projects, offices and clinics.",
  alternates: { canonical: "/portfolio" },
};

// Example category pages (kept as design-inspiration examples)
const EXAMPLES = PROJECTS.map((p) => ({ t: p.title, d: p.summary, img: p.cover, href: `/portfolio/${p.slug}` }));

export default function PortfolioPage() {
  const featured = PORTFOLIO.filter((p) => p.featured).slice(0, 4);
  const done = RESIDENTIAL.filter((p) => p.status === "completed").length;
  const ongoing = RESIDENTIAL.filter((p) => p.status === "ongoing").length;

  return (
    <>
      {/* 01 — Hero */}
      <div className="hero-stack">
        <Hero
          image={IMG.heroPortfolio}
          alt="Interior designed by Anveya Designs"
          eyebrow="Our Portfolio"
          lines={["*S*paces Designed", "Around Life."]}
          lineClass={["", "indent-2"]}
          variant="short"
          copy={["Homes and workplaces across Pune, each designed around the people who use them. Explore completed projects, work in progress and commercial interiors."]}
        >
          <a href="#all-projects" className="btn light">Explore Projects <Arrow /></a>
        </Hero>

        {/* 02 — Project category selector */}
        <div className="over">
          <section className="section bg-cream">
            <div className="wrap">
              <div className="center" style={{ marginBottom: "clamp(34px, 5vw, 64px)" }}>
                <Up className="eyebrow" style={{ justifyContent: "center" }}>Browse by Category</Up>
                <Lines className="display h2" lines={["Residential &", "*C*ommercial Projects"]} />
              </div>
              <div className="pcats">
                <a href="/portfolio/residential" className="pcat card-hover">
                  <RImg src={IMG.living2} alt="Residential interior projects" />
                  <div className="pcat-txt">
                    <span>{RESIDENTIAL.length} Projects · {done} Completed · {ongoing} Ongoing</span>
                    <h3 className="display h3">Residential Projects</h3>
                    <p>Homes designed for everyday living — from complete apartments to work in progress.</p>
                    <span className="link-arrow">View Residential <span className="arr"><Arrow /></span></span>
                  </div>
                </a>
                <a href="/portfolio/commercial" className="pcat card-hover">
                  <RImg src={COMMERCIAL[0]?.zones?.at(-1)?.images?.[0]?.src || IMG.office2} alt="Commercial interior projects" dir="down" />
                  <div className="pcat-txt">
                    <span>{COMMERCIAL.length} Projects · Offices & Clinics</span>
                    <h3 className="display h3">Commercial Projects</h3>
                    <p>Functional commercial spaces with a distinct identity, including offices and clinics.</p>
                    <span className="link-arrow">View Commercial <span className="arr"><Arrow /></span></span>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 03 — Featured projects */}
      <section className="section bg-cream" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 60px)" }}>
            <div>
              <Up className="eyebrow">Featured Projects</Up>
              <Lines className="display h2" lines={["Selected *W*ork"]} />
            </div>
            <Up as="p" className="lead" delay={150}>A closer look at a few projects — the people they were designed for, the challenges they solved and the details that bring them together.</Up>
          </div>
          <div className="pfeat">
            {featured.map((p, i) => <ProjectCard key={p.slug} p={p} src={p.hero} size={i === 0 ? "lg" : ""} dir={i % 2 ? "down" : undefined} />)}
          </div>
        </div>
      </section>

      {/* 04 — All projects grid (filterable) */}
      <section className="section bg-cream2" id="all-projects">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(26px, 3vw, 44px)" }}>
            <div>
              <Up className="eyebrow">All Projects</Up>
              <Lines className="display h2" lines={["Every *P*roject"]} />
            </div>
            <Up as="p" className="lead" delay={150}>Filter by residential or commercial work, or by project status.</Up>
          </div>
          <PortfolioGrid projects={PORTFOLIO} />
        </div>
      </section>

      {/* Design inspiration — example spaces (kept from the original portfolio) */}
      <section className="section bg-cream" id="categories">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(40px, 6vw, 90px)" }}>
            <div>
              <Up className="eyebrow">Design Inspiration</Up>
              <Lines className="display h2" lines={["Explore Ideas", "by *S*pace"]} />
            </div>
            <Up as="p" className="lead" delay={150}>Example spaces that show how we think about living rooms, bedrooms, kitchens and workplaces.</Up>
          </div>
          <div className="cats">
            {EXAMPLES.map((c, i) => (
              <a href={c.href} className="cat card-hover" key={c.t}>
                <RImg src={c.img} alt={c.t} dir={i % 2 ? "down" : undefined} />
                <Up className="cap" delay={150}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <div>
                    <h3 className="display h4">{c.t}</h3>
                    <p>{c.d}</p>
                  </div>
                  <span className="arr"><Arrow /></span>
                </Up>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Our approach */}
      <ApproachStrip />

      {/* 06 — Consultation CTA */}
      <EnquiryCta
        lines={["Have a *S*pace", "in Mind?"]}
        text="Tell us about your home or commercial space. We'll understand your requirements and talk you through how we can help."
        image={IMG.bedroom2}
      />
    </>
  );
}
