import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/pinyon-script/400.css";
import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://anveyadesigns.com"),
  title: {
    default: "Best Interior Designers in Pune | Anveya Designs",
    template: "%s",
  },
  description:
    "Anveya Designs creates beautiful, functional residential and commercial interiors tailored to your lifestyle, preferences and business needs.",
  // link preview (WhatsApp, Facebook, LinkedIn…): Anveya logo card
  openGraph: {
    type: "website",
    siteName: "Anveya Designs",
    url: "/",
    title: "Anveya Designs | Interior Designers in Pune",
    description: "Residential & commercial interior design studio in Pune. Explore our projects and book a consultation.",
    images: [{ url: "/brand/og-image.jpg", width: 1200, height: 630, alt: "Anveya Designs – Interior Design Studio, Pune" }],
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", images: ["/brand/og-image.jpg"] },
};

export const viewport = { themeColor: "#f3e9d7" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
