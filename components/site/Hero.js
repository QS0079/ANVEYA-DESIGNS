"use client";
import { useRef } from "react";
import { rich } from "./text";

/**
 * Full-bleed sticky hero. The next <section class="over"> slides over it while it dims.
 * lines: array of nodes (each line masks & rises on page load), lineClass: indent classes per line.
 */
export default function Hero({ image, alt = "", eyebrow, lines, lineClass = [], copy, children, variant = "full", center = false }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const cls = variant === "short" ? "short" : variant === "mini" ? "mini" : "";
  return (
    <section ref={ref} className={`hero ${cls}`} onMouseMove={onMove} id="top">
      <div className="bg"><img src={image} alt={alt} fetchPriority="high" /></div>
      <div className="shade" />
      <div className="glow" />
      <div className="glow dot" />
      <div className="dim" />
      <div className="inner">
        <div className={`wrap ${center ? "center-hero" : ""}`}>
          {eyebrow && <div className="eyebrow hf" style={{ "--i": -3 }}>{eyebrow}</div>}
          <h1 className={`display ${variant === "mini" ? "h2" : "h1"}`} data-fit="hero">
            {lines.map((l, i) => (
              <span className={`ln ${lineClass[i] || ""}`} key={i}>
                <span className="ln-i" style={{ "--i": i }}>{rich(l)}</span>
              </span>
            ))}
          </h1>
          {center && copy && <p className="lead hf" style={{ "--i": 0 }}>{copy}</p>}
          {!center && (copy || children) && (
            <div className="hero-foot">
              <div className="copy">
                {Array.isArray(copy) ? copy.map((p, i) => <p className="hf" style={{ "--i": i }} key={i}>{p}</p>) : copy && <p className="hf">{copy}</p>}
                {children && <div className="hf" style={{ "--i": 3 }}>{children}</div>}
              </div>
            </div>
          )}
          {center && children && <div className="hf mt-2" style={{ "--i": 2, display: "flex", justifyContent: "center" }}>{children}</div>}
        </div>
      </div>
      {variant === "full" && (
        <div className="scroll-cue hf" style={{ "--i": 5 }}><i />Scroll</div>
      )}
    </section>
  );
}
