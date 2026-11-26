import { Lines, Up, Arrow } from "./Lines";
import ProjectCard from "./ProjectCard";
import { CONTACT, IMG } from "@/lib/defaults";
import { STAGES } from "@/lib/portfolio";
import { waLink, visitorMessage } from "@/lib/whatsapp";


/** "Understand the space → Plan the details → Deliver thoughtfully" strip */
export function ApproachStrip() {
  const steps = [
    ["Understand the Space", "We start by listening — how you live or work, what the space needs to do, and what it should feel like."],
    ["Plan the Details", "Layouts, storage, lighting and materials are planned together so every decision supports the whole."],
    ["Deliver Thoughtfully", "We coordinate the agreed scope carefully, checking the details that bring the design to life."],
  ];
  return (
    <section className="section bg-cream2">
      <div className="wrap">
        <div className="center" style={{ marginBottom: "clamp(36px, 5vw, 70px)" }}>
          <Up className="eyebrow" style={{ justifyContent: "center" }}>Our Approach</Up>
          <Lines className="display h2" lines={["From First Idea", "to *F*inished Space"]} />
        </div>
        <ol className="astrip">
          {steps.map(([t, d], i) => (
            <Up as="li" key={t} delay={i * 120}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h3 className="display h4">{t}</h3>
              <p>{d}</p>
              {i < steps.length - 1 && <span className="astrip-arr" aria-hidden="true"><Arrow size={18} /></span>}
            </Up>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Progress tracker for ongoing projects — only confirmed stages are marked done. */
export function ProgressTracker({ stages, note }) {
  const list = stages?.length ? stages : STAGES.map((s) => [s, "next"]);
  return (
    <div className="ptrack">
      <ol>
        {list.map(([label, state], i) => (
          <Up as="li" key={label} delay={i * 80} className={state}>
            <span className="dot">{state === "done" ? "✓" : String(i + 1).padStart(2, "0")}</span>
            <b>{label}</b>
            <em>{state === "done" ? "Confirmed" : state === "current" ? "In progress" : "Upcoming"}</em>
          </Up>
        ))}
      </ol>
      {note && <p className="ptrack-note">{note}</p>}
    </div>
  );
}

/** Two related projects */
export function RelatedProjects({ projects, title = ["More *P*rojects"] }) {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="two-col-head" style={{ marginBottom: "clamp(30px, 4vw, 60px)" }}>
          <div>
            <Up className="eyebrow">Related Work</Up>
            <Lines className="display h2" lines={title} />
          </div>
          <Up delay={150}><a href="/portfolio#all-projects" className="link-arrow">View All Projects <span className="arr"><Arrow /></span></a></Up>
        </div>
        <div className="pgrid two">
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} dir={i % 2 ? "down" : undefined} />)}
        </div>
      </div>
    </section>
  );
}

/** Enquiry CTA with consultation popup + WhatsApp */
export function EnquiryCta({ lines, text, project, path, image = IMG.living4, label = "Book a Consultation" }) {
  return (
    <section className="cta-band section">
      {image && <div className="bgimg"><img src={image} alt="" data-parallax="0.6" loading="lazy" /></div>}
      <div className="shade" />
      <div className="wrap">
        <Up className="eyebrow" style={{ justifyContent: "center", color: "rgba(249,243,232,.7)" }}>Start a Conversation</Up>
        <Lines as="h2" className="display h2" lines={lines} />
        <Up as="p" className="lead" delay={200}>{text}</Up>
        <Up className="btn-row" delay={320}>
          <a href="/contact-us#enquiry" className="btn light" data-popup>{label} <Arrow /></a>
          {CONTACT.phone && (
            <a href={waLink(CONTACT.phone, visitorMessage({ project, path }))} className="link-arrow" target="_blank" rel="noopener noreferrer" style={{ alignSelf: "center", marginLeft: 16 }}>
              Chat on WhatsApp <span className="arr"><Arrow /></span>
            </a>
          )}
        </Up>
      </div>
    </section>
  );
}

/** Small honest note shown while placeholder images are in use */
export function SampleNote({ show }) {
  if (!show) return null;
  return <p className="sample-note">Images shown are representative placeholders until project photography is added.</p>;
}
