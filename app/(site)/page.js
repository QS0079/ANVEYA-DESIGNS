import Hero from "@/components/site/Hero";
import Slider from "@/components/site/Slider";
import WhyList from "@/components/site/WhyList";
import { Lines, Sw, RImg, Up, Arrow } from "@/components/site/Lines";
import { FaqSection, EnquirySection } from "@/components/site/Blocks";
import { getPublicFaqs } from "@/lib/data";
import { IMG } from "@/lib/defaults";
import { PORTFOLIO, STATUS_LABEL, projectHref } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Best Interior Designers in Pune | Anveya Designs",
  description:
    "Anveya Designs creates beautiful, functional residential and commercial interiors tailored to your lifestyle, preferences and business needs.",
};

const WHY = [
  { t: "Personalised Design Approach", d: "Every project is different. We consider your preferences, requirements and vision before developing a design direction.", img: IMG.living2 },
  { t: "Functionality Meets Aesthetics", d: "We focus on making spaces look beautiful while ensuring they remain comfortable, practical and easy to maintain.", img: IMG.kitchen2 },
  { t: "Attention to Detail", d: "From layouts and materials to lighting and finishes, we consider the finer details that make a space feel complete.", img: IMG.detail1 },
  { t: "Thoughtful Space Utilisation", d: "We make considered design choices to maximise available space without compromising on comfort or visual appeal.", img: IMG.bedroom2 },
  { t: "Design with Purpose", d: "Every design decision should have a reason. We aim to create interiors that serve your needs and maintain their appeal over time.", img: IMG.office2 },
];

const STEPS = [
  { t: "Understanding Your Requirements", d: "We begin with a conversation about your space, design preferences, functional requirements, budget expectations and project goals." },
  { t: "Space Planning & Concept Development", d: "We study the available space and develop design concepts, layouts and ideas that align with your requirements." },
  { t: "Design Visualisation & Material Selection", d: "We work on design details, finishes, colours, furniture and materials to help establish the overall look and feel of your space." },
  { t: "Execution & Coordination", d: "Where execution is included in the agreed scope, we coordinate the required activities to bring the approved design to life." },
  { t: "Final Review & Handover", d: "We review the completed work against the agreed design and requirements, focusing on the details that bring the space together." },
];

// Home portfolio slider — built from the real projects in lib/portfolio.js
const SLIDES = PORTFOLIO.map((p) => {
  const sections = p.rooms || p.zones || [];
  const pics = sections.flatMap((r) => r.images).map((im) => im.src).filter((src) => src !== p.cover);
  const cat = p.category === "residential" ? "Residential" : "Commercial";
  return {
    tag: `${cat} · ${p.status ? STATUS_LABEL[p.status] : "Healthcare"}`,
    title: p.title,
    text: p.concept,
    img: p.cover,
    img2: pics[0] || p.hero,
    caption: p.location,
    href: projectHref(p),
    cta: "View Project",
  };
});

export default async function Home() {
  const faqs = await getPublicFaqs();
  return (
    <>
      <div className="hero-stack">
        <Hero
          image={IMG.hero}
          video={{ src: "/media/hero.mp4", mobile: "/media/hero-720.mp4", poster: "/media/hero-poster.jpg" }}
          alt="Walkthrough of a contemporary home interior: living room, kitchen, bedroom and bathroom"
          eyebrow="Residential & Commercial Interior Design"
          lines={["Thoughtfully", "*D*esigned Interiors", "for the Way You", "*L*ive and Work."]}
          lineClass={["", "indent-1", "indent-2", "indent-3"]}
          copy={[
            "Your space should be more than just visually appealing. It should reflect your personality, support your everyday needs and create an experience that feels uniquely yours.",
          ]}
        >
          <div className="btn-row">
            <a href="/contact-us#enquiry" className="btn light">Book a Consultation</a>
            <a href="/portfolio" className="link-arrow" style={{ alignSelf: "center", marginLeft: 8 }}>Explore Our Projects <span className="arr"><Arrow /></span></a>
          </div>
        </Hero>

        <div className="over">
          {/* ---------- About ---------- */}
          <section className="section bg-cream" id="about">
            <div className="wrap split">
              <div>
                <Up className="eyebrow">About Us</Up>
                <Lines className="display h2" lines={["*C*reating Spaces", "That Feel Personal,", "Purposeful and", "Timeless"]} />
                <Up as="p" className="lead" delay={150}><strong style={{ fontWeight: 500, color: "var(--ink)" }}>Every space has a story, and we believe good design brings that story to life.</strong></Up>
                <Up as="p" className="lead" delay={220}>Anveya Designs is an interior design studio focused on creating residential and commercial spaces that combine thoughtful planning with distinctive design. We believe that successful interiors go beyond colours, furniture and finishes. They are about understanding the people who use a space and translating their requirements into meaningful design solutions.</Up>
                <Up as="p" className="lead" delay={290}>From comfortable homes to inspiring workspaces, we approach every project with creativity, careful planning and an eye for detail.</Up>
                <Up delay={360}><a href="/about-us" className="link-arrow mt-1">Know More About Us <span className="arr"><Arrow /></span></a></Up>
              </div>
              <div className="imgs">
                <RImg src={IMG.bedroom1} alt="Elegant modern bedroom" className="tall" parallax="0.5" />
                <div>
                  <RImg src={IMG.living3} alt="Living room detail" className="small" dir="down" delay={250} />
                  <Up as="p" className="caption mt-1" delay={400}>At Anveya, we believe in interiors that are personal, practical and quietly beautiful.</Up>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ---------- What we do ---------- */}
      <section className="section bg-dark services" id="services">
        <div className="bgimg"><img src={IMG.living4} alt="" data-parallax="0.8" loading="lazy" /></div>
        <div className="wrap grid">
          <div>
            <Up className="eyebrow">What We Do</Up>
            <Lines className="display h2" lines={["Interior Design", "*S*olutions for", "Every Kind", "of Space"]} />
            <Up as="p" className="lead mt-2" delay={200}>Whether you are planning a new home or looking to transform your commercial environment, Anveya Designs brings together creative thinking and practical design to make the most of every space.</Up>
            <Up delay={300}><a href="/contact-us#enquiry" className="link-arrow mt-1">Book a Consultation <span className="arr"><Arrow /></span></a></Up>
            <Up as="p" className="note" delay={400}>Design services crafted for calm, intentional and meaningful living — and working.</Up>
          </div>
          <div className="cards">
            <Up className="svc card-hover" delay={100}>
              <div className="num">01</div>
              <RImg src={IMG.living1} alt="Residential interior design" delay={150} />
              <h3 className="display h4">Residential Interior Design</h3>
              <p>We design homes that reflect your lifestyle, personal preferences and everyday routines. From living rooms and bedrooms to kitchens and complete home interiors, every detail is planned to create a comfortable and harmonious environment.</p>
              <a href="/portfolio/residential" className="link-arrow" style={{ marginTop: "auto" }}>View Projects <span className="arr"><Arrow /></span></a>
            </Up>
            <Up className="svc card-hover" delay={260}>
              <div className="num">02</div>
              <RImg src={IMG.office1} alt="Commercial interior design" delay={320} />
              <h3 className="display h4">Commercial Interior Design</h3>
              <p>We create commercial interiors that bring together brand identity, functionality and visual appeal. From professional workspaces to customer-facing environments, our designs are developed around the needs of your business.</p>
              <a href="/portfolio/commercial" className="link-arrow" style={{ marginTop: "auto" }}>View Projects <span className="arr"><Arrow /></span></a>
            </Up>
          </div>
        </div>
      </section>

      {/* ---------- Portfolio slider ---------- */}
      <section className="section bg-cream" id="projects">
        <div className="wrap">
          <div className="slider-head">
            <Up className="eyebrow" style={{ justifyContent: "center" }}>Our Portfolio</Up>
            <Lines className="display h2" lines={["Spaces That Tell a *S*tory"]} />
          </div>
          <Slider items={SLIDES} />
          <Up className="center mt-3" delay={150}>
            <a href="/portfolio#all-projects" className="btn">View All Projects <Arrow /></a>
          </Up>
        </div>
      </section>

      {/* ---------- Why choose us ---------- */}
      <section className="section bg-cream" style={{ paddingTop: 0 }} id="why">
        <div className="wrap">
          <div className="center">
            <Up className="eyebrow" style={{ justifyContent: "center" }}>Why Choose Us?</Up>
            <Lines className="display h2" lines={["Good Design Begins with", "*U*nderstanding Your Space"]} />
            <Up as="p" className="lead mx-auto mt-2" delay={200}>We believe every successful interior project starts with listening. Understanding your requirements helps us create spaces that are not only visually appealing but also meaningful and practical.</Up>
          </div>
          <WhyList items={WHY} />
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section bg-cream2" id="process">
        <div className="wrap">
          <div className="two-col-head">
            <div>
              <Up className="eyebrow">Our Design Process</Up>
              <Lines className="display h2" lines={["From Your First Idea", "to a Beautifully", "*D*esigned Space"]} />
            </div>
            <Up as="p" className="lead" delay={200}>A well-designed space is the result of a thoughtful process. We approach every project through clear stages to understand your vision and translate it into a practical design.</Up>
          </div>
          <div className="process">
            <div className="track"><div className="rule" data-reveal="rule" style={{ "--d": "200ms" }} /></div>
            {STEPS.map((s, i) => (
              <Up className="step" key={s.t} delay={250 + i * 140}>
                <div className="n">{String(i + 1).padStart(2, "0")}</div>
                <div className="dot" />
                <h3 className="display h4" style={{ marginBottom: 12 }}>{s.t}</h3>
                <p>{s.d}</p>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA + enquiry ---------- */}
      <EnquirySection
        bg="bg-cream"
        eyebrow="Start Your Project"
        lines={["Have a Space in Mind?", "*L*et's Bring Your", "Vision to Life."]}
        text={[
          "Whether you are designing your dream home or planning a new commercial space, Anveya Designs is ready to help you explore the possibilities.",
          "Let's start with a conversation about your ideas, requirements and the space you want to create.",
        ]}
        source="home"
        submitLabel="Start Your Project"
        extra={<Up delay={350}><a href="/contact-us" className="link-arrow mt-2">Contact Our Team <span className="arr"><Arrow /></span></a></Up>}
      />

      {/* ---------- FAQs (dynamic) ---------- */}
      <FaqSection faqs={faqs} />
    </>
  );
}
