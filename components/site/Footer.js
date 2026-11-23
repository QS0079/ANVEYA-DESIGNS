import { getSettings } from "@/lib/data";
import { PORTFOLIO, projectHref } from "@/lib/portfolio";
import { Lines, Up, Arrow } from "./Lines";
import Logo from "./Logo";

const Icon = ({ d }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

export default async function Footer() {
  const s = await getSettings();
  const tel = s.phone ? s.phone.replace(/[^\d+]/g, "") : "";
  const mapUrl = s.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address.replace(/\n/g, " "))}` : "";
  const socials = [
    ["Instagram", s.instagram], ["Facebook", s.facebook], ["LinkedIn", s.linkedin], ["Pinterest", s.pinterest],
  ].filter(([, u]) => u);

  return (
    <footer className="ft">
      {/* ---- closing CTA ---- */}
      <div className="wrap ft-cta">
        <div>
          <Up className="eyebrow">Let&apos;s Work Together</Up>
          <Lines className="display ft-h" lines={["Let's Create a Space", "That Feels *R*ight."]} lineClass={["", "ft-in1"]} />
        </div>
        <Up className="ft-cta-side" delay={200}>
          <p>Planning a new home or reimagining a commercial space? Share a few details and we&apos;ll call you back.</p>
          <div className="btn-row">
            <a href="/contact-us#enquiry" className="btn solid" data-popup>Book a Consultation <Arrow /></a>
            {tel && <a href={`tel:${tel}`} className="btn" data-native>Call {s.phone}</a>}
          </div>
        </Up>
      </div>

      {/* ---- columns ---- */}
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-col ft-studio">
            <a href="/" aria-label="Anveya Designs — Home"><Logo variant="dark" className="ft-logo" height={120} /></a>
            <p>Thoughtfully designed residential and commercial interiors that bring together aesthetics, functionality and attention to detail.</p>
            {socials.length > 0 && (
              <div className="ft-social">{socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}</div>
            )}
          </div>
          <div className="ft-col">
            <h5>Explore</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h5>Services</h5>
            <ul>
              <li><a href="/portfolio/residential">Residential Interiors</a></li>
              <li><a href="/portfolio/commercial">Commercial Interiors</a></li>
              <li><a href="/#process">Our Design Process</a></li>
              <li><a href="/#faqs">FAQs</a></li>
            </ul>
          </div>
          <div className="ft-col ft-portfolio">
            <h5>Portfolio</h5>
            <ul>
              {PORTFOLIO.map((p) => <li key={p.slug}><a href={projectHref(p)}>{p.title}</a></li>)}
            </ul>
          </div>
          <div className="ft-col ft-reach">
            <h5>Get in Touch</h5>
            {s.address && (
              <a className="ft-reach-item" href={mapUrl} target="_blank" rel="noopener noreferrer">
                <span className="ic"><Icon d={<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>} /></span>
                <span><b>Office Address</b><span style={{ whiteSpace: "pre-line" }}>{s.address}</span></span>
              </a>
            )}
            {tel && (
              <a className="ft-reach-item" href={`tel:${tel}`} data-native>
                <span className="ic"><Icon d={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />} /></span>
                <span><b>Call Us</b><span>{s.phone}</span></span>
              </a>
            )}
            {s.email && (
              <a className="ft-reach-item" href={`mailto:${s.email}`} data-native>
                <span className="ic"><Icon d={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>} /></span>
                <span><b>Email</b><span>{s.email}</span></span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ---- bottom bar ---- */}
      <div className="wrap">
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Anveya Designs. All rights reserved.</span>
          <nav>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/cookies-policy">Cookies Policy</a>
          </nav>
          <a href="#top" className="ft-top">Back to top <span>↑</span></a>
        </div>
      </div>
    </footer>
  );
}
