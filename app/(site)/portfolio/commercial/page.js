import Hero from "@/components/site/Hero";
import { Lines, RImg, Up, Arrow } from "@/components/site/Lines";
import { EnquiryCta } from "@/components/site/PortfolioBlocks";
import { IMG } from "@/lib/defaults";
import { COMMERCIAL, projectHref } from "@/lib/portfolio";

export const metadata = {
  title: "Commercial & Clinic Interior Design Projects | Anveya Designs",
  description: "Functional commercial spaces with a distinct identity — clinic and healthcare interiors by Anveya Designs.",
  alternates: { canonical: "/portfolio/commercial" },
};

const APPROACH = [
  ["Visitor journey first", "We map how people arrive, wait and move through the space, and plan the layout around that flow."],
  ["Built for daily operation", "Durable, easy-clean surfaces and storage planned around how the team actually works."],
  ["A distinct identity", "Materials, lighting and signage that reflect the brand and make a confident first impression."],
];

export default function CommercialListing() {
  return (
    <>
      <div className="hero-stack">
        <Hero
          image={COMMERCIAL[0]?.hero || IMG.office1}
          alt="Clinic interior by Anveya Designs"
          eyebrow="Portfolio · Commercial"
          lines={["*F*unctional Commercial", "Spaces with a Distinct Identity."]}
          lineClass={["", "indent-1"]}
          variant="short"
          copy={["Workplaces and clinics designed around the people who use them — clear journeys, practical details and a confident identity."]}
        >
          <a href="#projects" className="btn light">View Projects <Arrow /></a>
        </Hero>

        <div className="over">
          <section className="section bg-cream" id="projects">
            <div className="wrap">
              <div className="crumbs"><a href="/portfolio">Portfolio</a><span>/</span><b>Commercial</b></div>
              <div className="pcats">
                {COMMERCIAL.map((p, i) => (
                  <a href={projectHref(p)} className="pcat card-hover" key={p.slug}>
                    <RImg src={p.cover} alt={`${p.title} interior`} dir={i % 2 ? "down" : undefined} />
                    <div className="pcat-txt">
                      <span>Commercial / Healthcare · {p.location}</span>
                      <h2 className="display h3">{p.title}</h2>
                      <p>{p.subtitle}</p>
                      <span className="link-arrow">Explore Project <span className="arr"><Arrow /></span></span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="section bg-cream2">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 60px)" }}>
            <div>
              <Up className="eyebrow">Our Commercial Approach</Up>
              <Lines className="display h2" lines={["Designed to *W*ork", "Every Day"]} />
            </div>
            <Up as="p" className="lead" delay={150}>Commercial interiors have to look right and work hard. Every decision balances the visitor experience with the realities of daily operation.</Up>
          </div>
          <ol className="astrip">
            {APPROACH.map(([t, d], i) => (
              <Up as="li" key={t} delay={i * 120}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3 className="display h4">{t}</h3>
                <p>{d}</p>
              </Up>
            ))}
          </ol>
        </div>
      </section>

      <EnquiryCta
        lines={["Planning a *C*linic", "Interior?"]}
        text="Request a commercial design consultation — tell us about your clinic or workspace and how you'd like it to work."
        label="Request a Consultation"
        image={COMMERCIAL[1]?.cover || IMG.office3}
      />
    </>
  );
}
