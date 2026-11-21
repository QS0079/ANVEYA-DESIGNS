/** Anveya Designs logo. variant: "dark" (gold + brown, for light backgrounds) | "light" (gold + cream, for dark backgrounds) | "mark" (arch only). */
export default function Logo({ variant = "dark", className = "", height, alt = "Anveya Designs" }) {
  const src = `/brand/logo-${variant}.png`;
  const ratio = variant === "mark" ? 500 / 495 : 800 / 745;
  return (
    <img
      src={src}
      alt={alt}
      className={`logo logo-${variant} ${className}`}
      width={height ? Math.round(height * ratio) : undefined}
      height={height}
      decoding="async"
    />
  );
}
