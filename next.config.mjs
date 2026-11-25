/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mysql2", "bcryptjs"],
  devIndicators: false, // hides the floating "N" badge in dev mode (it covered the admin Log out button)
  // old project links keep working after renames
  async redirects() {
    return [
      { source: "/portfolio/residential/akurdi", destination: "/portfolio/residential/wakad", permanent: true },
      { source: "/portfolio/commercial/dental-clinic", destination: "/portfolio/commercial/office", permanent: true },
      { source: "/portfolio/commercial/skin-clinic", destination: "/portfolio/commercial/clinic", permanent: true },
    ];
  },
};
export default nextConfig;
