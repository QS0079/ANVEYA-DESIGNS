/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mysql2", "bcryptjs"],
  devIndicators: false, // hides the floating "N" badge in dev mode (it covered the admin Log out button)
};
export default nextConfig;
