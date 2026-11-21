import { Fragment } from "react";
import { rich } from "./text";
// Server-safe helpers for the line-mask text reveal and script swash capitals.

/** Script swash capital, e.g. <Sw>M</Sw>EANING */
export function Sw({ children }) {
  return <span className="sw">{children}</span>;
}

/**
 * Renders each item of `lines` inside its own overflow mask so it slides up on reveal.
 * Pass `hero` to let the hero load sequence (html.page-ready) trigger it instead of scroll.
 */
export function Lines({ as: Tag = "h2", lines, className = "", lineClass = [], delay = 0, hero = false, fit = true, ...rest }) {
  return (
    <Tag className={className} {...(hero ? {} : { "data-reveal": "lines" })} {...(fit ? { "data-fit": "" } : {})} {...rest}>
      {lines.map((l, i) => (
        <span className={`ln ${lineClass[i] || ""}`} key={i}>
          <span className="ln-i" style={{ "--i": i, "--d": `${delay}ms` }}>
            {rich(l)}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Image with a clip-path wipe + settle-zoom reveal. */
export function RImg({ src, alt = "", className = "", dir, delay = 0, style, parallax, eager }) {
  return (
    <div
      className={`rimg ${className}`}
      data-reveal="img"
      data-dir={dir}
      style={{ "--d": `${delay}ms`, ...style }}
    >
      <div className="rimg-c">
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} {...(parallax ? { "data-parallax": parallax } : {})} />
      </div>
    </div>
  );
}

/** Fade-up block */
export function Up({ as: Tag = "div", delay = 0, className = "", children, style, ...rest }) {
  return (
    <Tag data-reveal="up" className={className} style={{ "--d": `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/** Word-by-word fade statement */
export function Statement({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <p className={`statement ${className}`} data-reveal="words">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word" style={{ "--i": i }}>{w}</span>{" "}
        </Fragment>
      ))}
    </p>
  );
}

export function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}
