import Hero from "@/components/site/Hero";
import { Lines, Sw, RImg, Up, Arrow, Statement } from "@/components/site/Lines";
import { CtaBand } from "@/components/site/Blocks";
import { IMG } from "@/lib/defaults";
import { PROJECTS } from "@/lib/projects";

export const metadata = {
  title: "Interior Design Portfolio | Residential & Commercial Projects",
  description:
    "Explore Anveya Designs' residential and commercial interior design portfolio featuring thoughtfully planned and beautifully designed spaces.",
  alternates: { canonical: "/portfolio" },
};

const CATS = PROJECTS.map((p) => ({ t: p.title, d: p.summary, img: p.cover, href: `/portfolio/${p.slug}` }));

export default function PortfolioPage() {
  return (
    <>
      <div className="hero-stack">
        <Hero
          image={IMG.heroPortfolio}
          alt="Portfolio of Anveya Designs"
          eyebrow="Our Portfolio"
          lines={["*S*paces That", "Tell a Story"]}
          lineClass={["", "indent-2"]}
          variant="short"
          copy={[
            "Every space begins with an idea, and every project brings that idea to life in its own way.",
            "Explore the Anveya Designs portfolio to discover our approach to residential and commercial interior design. From thoughtfully designed homes to functional commercial environments, each project reflects creativity, careful planning and attention to detail.",
          ]}
        >
          <a href="/contact-us#enquiry" className="btn light">Discuss Your Project <Arrow /></a>
        </Hero>

        <div className="over">
          <section className="section bg-cream">
            <div className="wrap">
              <div className="center">
                <Up className="eyebrow" style={{ justifyContent: "center" }}>Portfolio</Up>
                <Lines className="display h2" lines={["Explore Our Interior", "*D*esign Projects"]} />
              </div>
              <div className="mt-3">
                <Statement text="We believe every project deserves an individual design approach. Our portfolio showcases spaces designed around different lifestyles, functional requirements and aesthetic preferences." />
              </div>
              <Up as="p" className="lead mx-auto center mt-3" delay={100}>Discover how thoughtful layouts, carefully selected materials, colours, textures and design elements come together to create distinctive interiors.</Up>
            </div>
          </section>
        </div>
      </div>

      <section className="section bg-cream" style={{ paddingTop: 0 }} id="categories">
        <div className="wrap">
          <div className="two-col-head" style={{ marginBottom: "clamp(40px, 6vw, 90px)" }}>
            <div>
              <Up className="eyebrow">Portfolio Categories</Up>
              <Lines className="display h2" lines={["Explore Projects", "by *S*pace"]} />
            </div>
            <Up as="p" className="lead" delay={150}>From complete homes to individual rooms and working environments — every category reflects a different set of needs, and a design response made for them.</Up>
          </div>
          <div className="cats">
            {CATS.map((c, i) => (
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

      <CtaBand
        lines={["Inspired by", "What You *S*ee?"]}
        text="Your space could be our next design story. Let's discuss your ideas, understand your requirements and explore how we can create something meaningful together."
        primary={{ href: "/contact-us#enquiry", label: "Start Your Interior Design Journey" }}
        image={IMG.bedroom2}
      />
    </>
  );
}
