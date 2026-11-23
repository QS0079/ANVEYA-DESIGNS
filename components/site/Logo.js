/** Anveya Designs logo. variant: "dark" (gold + brown, for light backgrounds) | "light" (gold + cream, for dark backgrounds) | "mark" (arch only). */
export default function Logo({ variant = "dark", className = "", height, alt = "Anveya Designs" }) {
  // small WebP copies load ~5x faster than the 800px PNG originals (kept for SEO / admin)
  const src = variant === "mark" ? "/brand/logo-mark.png" : `/brand/logo-${variant}-${height && height > 90 ? 400 : 200}.webp`;
  const ratio = variant === "mark" ? 500 / 495 : 800 / 745;
  return (
    <img
      src={src}
      alt={alt}
      className={`logo logo-${variant} ${className}`}
      width={height ? Math.round(height * ratio) : undefined}
      height={height}
      decoding="async"
      fetchPriority={className.includes("on-dark") ? "high" : undefined}
    />
  );
}
