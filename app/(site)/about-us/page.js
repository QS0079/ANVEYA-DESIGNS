import Hero from "@/components/site/Hero";
import { Lines, Sw, RImg, Up, Arrow, Statement } from "@/components/site/Lines";
import { CtaBand } from "@/components/site/Blocks";
import { IMG } from "@/lib/defaults";

export const metadata = {
  title: "About Anveya Designs | Residential & Commercial Interior Designers",
  description:
    "Get to know Anveya Designs, an interior design studio creating thoughtfully designed residential and commercial spaces.",
  alternates: { canonical: "/about-us" },
};

const PHIL = [
  { s: "A", t: "Thoughtful Aesthetics", d: "We carefully consider colours, materials, textures, lighting and design elements to create visually cohesive spaces with a distinct character." },
  { s: "F", t: "Everyday Functionality", d: "We believe every corner should serve a purpose. Our designs focus on practical layouts, efficient space utilisation and comfortable movement." },
  { s: "P", t: "Personalised Experiences", d: "Every client has a unique vision. We create design concepts that reflect individual lifestyles, preferences and the intended purpose of each space." },
];

const APPROACH = [
  ["Understanding Your Requirements", "We begin by understanding your vision, preferences, space requirements and expectations."],
  ["Concept & Space Planning", "We develop design concepts and layouts that balance functionality with aesthetics."],
  ["Design & Material Selection", "We explore suitable colours, textures, materials, furniture and finishes."],
  ["Project Development", "We work towards translating the approved design into reality according to the agreed project scope."],
  ["Final Review", "We focus on the finer details to bring the overall design together."],
];

export default function AboutPage() {
  return (
    <>
      <div className="hero-stack">
        <Hero
          image={IMG.heroAbout}
          alt="Interior designed by Anveya Designs"
          eyebrow="About Anveya Designs"
          lines={["Designing Spaces.", "*C*reating", "Experiences."]}
          lineClass={["", "indent-2", "indent-3"]}
          copy={[
            "At Anveya Designs, we believe every space has a story waiting to be expressed. We bring together creativity, functionality and thoughtful design to transform ordinary spaces into environments that inspire, connect and feel truly personal.",
            "From welcoming homes to inspiring commercial spaces, we create interiors that reflect individual preferences, complement everyday needs and bring ideas to life.",
          ]}
        >
          <a href="/portfolio" className="btn light">Explore Our Projects <Arrow /></a>
        </Hero>

        <div className="over">
          {/* Who we are */}
          <section className="section bg-cream">
            <div className="wrap split">
              <div className="imgs">
                <RImg src={IMG.living2} alt="Warm, welcoming living space" className="tall" parallax="0.5" />
                <div>
                  <RImg src={IMG.detail1} alt="Material and texture detail" className="small" dir="down" delay={250} />
                  <Up as="p" className="caption mt-1" delay={400}>For us, every project is an opportunity to create something distinctive, meaningful and lasting.</Up>
                </div>
              </div>
              <div>
                <Up className="eyebrow">Who We Are</Up>
                <Lines className="display h2" lines={["Creating Interiors", "That Reflect", "Your *V*ision"]} />
                <Up as="p" className="lead" delay={150}>Anveya Designs is an interior design studio specialising in residential and commercial interior design. We believe that great design is not just about how a space looks, but also about how it feels and functions.</Up>
                <Up as="p" className="lead" delay={220}>Our approach begins with understanding the people who use the space, their preferences, aspirations and practical requirements. We translate these insights into carefully planned interiors that balance aesthetics, comfort and functionality.</Up>
                <Up as="p" className="lead" delay={290}>Whether it is designing a home that feels warm and welcoming or developing a commercial environment that reflects a brand&apos;s identity, we approach every project with creativity, attention to detail and a commitment to thoughtful design.</Up>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Philosophy */}
      <section className="section bg-dark">
        <div className="wrap">
          <div className="two-col-head">
            <div>
              <Up className="eyebrow">Our Design Philosophy</Up>
              <Lines className="display h2" lines={["Good Design Goes", "Beyond *A*esthetics"]} />
            </div>
            <div>
              <Up as="p" className="lead" delay={150}>We believe the best interiors are created when beauty and functionality work together. A well-designed space should not only look appealing but also make everyday experiences better.</Up>
              <Up as="p" className="lead" delay={220}>At Anveya Designs, our philosophy is built around three important principles:</Up>
            </div>
          </div>
          <div className="phil">
            {PHIL.map((p, i) => (
              <Up key={p.t} delay={150 + i * 140}>
                <span className="ic">{p.s}</span>
                <h3 className="display h4" style={{ marginBottom: 14 }}>{p.t}</h3>
                <p className="small">{p.d}</p>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section bg-cream">
        <div className="wrap">
          <div className="center" style={{ marginBottom: "clamp(50px, 7vw, 100px)" }}>
            <Up className="eyebrow" style={{ justifyContent: "center" }}>What We Do</Up>
            <Lines className="display h2" lines={["Residential & Commercial", "Interiors, *T*houghtfully Designed"]} />
            <Up as="p" className="lead mx-auto mt-2" delay={200}>We bring a considered design approach to different environments, creating spaces that are both visually appealing and practical.</Up>
          </div>
          <div className="feature">
            <div className="media"><RImg src={IMG.living1} alt="Residential interior design" dir="left" /></div>
            <div>
              <Up className="eyebrow">01</Up>
              <Lines as="h3" className="display h3" lines={["Residential", "Interior Design"]} />
              <Up as="p" className="lead mt-2" delay={150}>We design homes that reflect the personalities and lifestyles of the people living in them. From living rooms and bedrooms to kitchens and complete home interiors, our focus is on comfort, functionality and timeless appeal.</Up>
            </div>
          </div>
          <div className="feature rev">
            <div className="media"><RImg src={IMG.office2} alt="Commercial interior design" dir="right" /></div>
            <div>
              <Up className="eyebrow">02</Up>
              <Lines as="h3" className="display h3" lines={["Commercial", "Interior Design"]} />
              <Up as="p" className="lead mt-2" delay={150}>We create commercial spaces that support business requirements and reflect brand identity. Our design approach considers workflow, space utilisation, employee experience and customer interaction.</Up>
              <Up delay={250}><a href="/#services" className="link-arrow mt-1">Discover Our Services <span className="arr"><Arrow /></span></a></Up>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-cream2">
        <div className="wrap">
          <div className="two-col-head">
            <div>
              <Up className="eyebrow">Our Approach</Up>
              <Lines className="display h2" lines={["Every Project Begins", "With *U*nderstanding"]} />
            </div>
            <div>
              <Up as="p" className="lead" delay={150}>We believe a successful design journey is built on clear communication, thoughtful planning and attention to detail.</Up>
              <Up as="p" className="lead" delay={220}>Our approach follows a structured process:</Up>
            </div>
          </div>
          <div className="rows-wrap">
            <div className="rows">
              {APPROACH.map(([t, d], i) => (
                <Up className="row" key={t} delay={i * 100}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display h4">{t}</h3>
                  <p>{d}</p>
                  <span className="arr"><Arrow size={18} /></span>
                </Up>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="section bg-cream">
        <div className="wrap">
          <Up className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>Our Portfolio</Up>
          <Lines className="display h2 center" lines={["Every Project Has a *U*nique Story"]} />
          <div className="mt-3">
            <Statement text="Our portfolio reflects our passion for creating thoughtful interiors across residential and commercial spaces. Each project represents a different vision, design direction and set of requirements." />
          </div>
          <div className="strip">
            <RImg src={IMG.living3} alt="Living room project" />
            <RImg src={IMG.bedroom3} alt="Bedroom project" delay={180} dir="down" />
            <RImg src={IMG.kitchen2} alt="Kitchen project" delay={320} />
          </div>
          <div className="center mt-3">
            <Up as="p" className="lead mx-auto">Explore our work and discover how we bring spaces to life through considered design and creative thinking.</Up>
            <Up delay={150}><a href="/portfolio" className="btn mt-1">Explore Our Portfolio <Arrow /></a></Up>
          </div>
        </div>
      </section>

      <CtaBand
        lines={["Let's Create a *S*pace", "That Feels Right."]}
        text="Whether you are planning your dream home or reimagining a commercial space, Anveya Designs is here to help you explore the possibilities. Let's start with your ideas and create interiors that bring together design, comfort and functionality."
        primary={{ href: "/contact-us#enquiry", label: "Book a Consultation" }}
        secondary={{ href: "/contact-us", label: "Get in Touch" }}
        image={IMG.living4}
      />
    </>
  );
}
