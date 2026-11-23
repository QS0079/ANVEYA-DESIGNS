import Hero from "@/components/site/Hero";
import { Lines, Sw, Up, Arrow } from "@/components/site/Lines";
import { CtaBand, EnquirySection } from "@/components/site/Blocks";
import { getSettings } from "@/lib/data";
import { IMG, socialLinks } from "@/lib/defaults";
import Social from "@/components/site/Social";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Anveya Designs | Book an Interior Design Consultation",
  description:
    "Contact Anveya Designs for residential and commercial interior design enquiries. Let's discuss your space and design requirements.",
  alternates: { canonical: "/contact-us" },
};

export default async function ContactPage() {
  const s = await getSettings();
  const items = [
    ["Email", s.email && <a href={`mailto:${s.email}`} data-native>{s.email}</a>],
    ["Phone", s.phone && <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} data-native>{s.phone}</a>],
    ["Studio", s.address && <span style={{ whiteSpace: "pre-line" }}>{s.address}</span>],
    ["Follow", socialLinks(s).length > 0 && <Social contact={s} labels className="social-contact" />],
  ].filter(([, v]) => v);

  return (
    <>
      <div className="hero-stack">
        <Hero
          image={IMG.heroContact}
          alt="Anveya Designs studio interior"
          eyebrow="Contact Us"
          lines={["Let's Talk About", "Your *S*pace"]}
          lineClass={["", "indent-2"]}
          variant="short"
          copy={[
            "Have a home to design or a commercial space to transform? We'd love to hear about your ideas.",
            "At Anveya Designs, every successful project begins with a conversation. Tell us about your requirements, preferences and expectations, and let's explore how we can bring your vision to life.",
          ]}
        />
        <div className="over">
          <EnquirySection
            bg="bg-cream"
            eyebrow="Contact Information"
            lines={["We'd Love to", "*H*ear From You"]}
            text={["Whether you have a specific design concept in mind or need guidance to get started, our team is here to understand your requirements."]}
            source="contact-us"
            submitLabel="Book a Consultation"
          >
            {items.length > 0 && (
              <Up className="contact-list" delay={250}>
                {items.map(([k, v]) => <div key={k}><span>{k}</span>{v}</div>)}
              </Up>
            )}
          </EnquirySection>
        </div>
      </div>

      <CtaBand
        lines={["Every Beautiful Space", "Starts With an *I*dea."]}
        text="Let's turn your ideas into thoughtfully designed interiors. Connect with Anveya Designs and take the first step towards your dream space."
        primary={{ href: "/contact-us#enquiry", label: "Book a Consultation" }}
        image={IMG.living2}
      />
    </>
  );
}
