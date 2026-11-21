export const dynamic = "force-dynamic";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Motion from "@/components/site/Motion";
import CookieBanner from "@/components/site/CookieBanner";
import Popup from "@/components/site/Popup";

export default function SiteLayout({ children }) {
  return (
    <>
      <Motion />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <Popup />
    </>
  );
}
