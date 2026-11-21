import { Lines, Sw, RImg, Up, Arrow } from "./Lines";
import LeadForm from "./LeadForm";
import FaqList from "./FaqList";
import { IMG } from "@/lib/defaults";

/** Closing CTA band over an image */
export function CtaBand({ lines, text, primary, secondary, image = IMG.living4 }) {
  return (
    <section className="cta-band section">
      <div className="bgimg"><img src={image} alt="" data-parallax="0.6" loading="lazy" /></div>
      <div className="shade" />
      <div className="wrap">
        <Up className="eyebrow" style={{ justifyContent: "center", color: "rgba(249,243,232,.7)" }}>Anveya Designs</Up>
        <Lines as="h2" className="display h2" lines={lines} />
        <Up as="p" className="lead" delay={200}>{text}</Up>
        <Up className="btn-row" delay={320}>
          {primary && <a href={primary.href} className="btn light">{primary.label} <Arrow /></a>}
          {secondary && <a href={secondary.href} className="link-arrow" style={{ alignSelf: "center", marginLeft: 16 }}>{secondary.label} <span className="arr"><Arrow /></span></a>}
        </Up>
      </div>
    </section>
  );
}

/** FAQ section (data from DB) */
export function FaqSection({ faqs }) {
  return (
    <section className="section bg-cream" id="faqs">
      <div className="wrap faq-grid">
        <div className="sticky">
          <Up className="eyebrow">FAQs</Up>
          <Lines className="display h2" lines={["*F*requently", "Asked", "Questions"]} />
          <Up as="p" className="lead mt-2" delay={200}>Answers to the questions we hear most often. Can&apos;t find yours? Ask us directly.</Up>
          <Up delay={300}><a href="/contact-us" className="link-arrow mt-1">Ask a question <span className="arr"><Arrow /></span></a></Up>
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}

/** "Let's begin a conversation" — text + lead form */
export function EnquirySection({ id = "enquiry", eyebrow, lines, text, extra, source, submitLabel, bg = "bg-cream2", children }) {
  return (
    <section className={`section ${bg}`} id={id}>
      <div className="wrap contact-grid">
        <div>
          <Up className="eyebrow">{eyebrow}</Up>
          <Lines className="display h2" lines={lines} />
          {text.map((t, i) => <Up as="p" className="lead mt-2" key={i} delay={150 + i * 80}>{t}</Up>)}
          {extra}
          {children}
        </div>
        <div className="lf-card">
          <div className="lf-card-head"><span>Start a Project</span>Share a few details and we&apos;ll call you back.</div>
          <LeadForm source={source} submitLabel={submitLabel} />
        </div>
      </div>
    </section>
  );
}

export { RImg };
