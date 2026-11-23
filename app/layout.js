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
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Best Interior Designers in Pune | Anveya Designs",
    template: "%s",
  },
  description:
    "Anveya Designs creates beautiful, functional residential and commercial interiors tailored to your lifestyle, preferences and business needs.",
};

export const viewport = { themeColor: "#f3e9d7" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
