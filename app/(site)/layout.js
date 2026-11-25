export const dynamic = "force-dynamic";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Motion from "@/components/site/Motion";
import CookieBanner from "@/components/site/CookieBanner";
import Popup from "@/components/site/Popup";
import { CONTACT, socialLinks } from "@/lib/defaults";

// Business details for search engines (links the website to the studio's social profiles)
const ORG = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: "Anveya Designs",
  url: "https://anveyadesigns.com",
  logo: "https://anveyadesigns.com/brand/logo-dark.png",
  telephone: CONTACT.phone || undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: "S. No. 74/1/4, Shivneri Niwas, Jyotiba Nagar, Kalewadi",
    addressLocality: "Pimpri, Pune",
    postalCode: "411017",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: socialLinks().map(([, url]) => url),
};

export default function SiteLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
      <Motion />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <Popup />
    </>
  );
}
