"use client";
import { useEffect, useRef } from "react";
import { rich } from "./text";

/**
 * Full-bleed sticky hero. The next <section class="over"> slides over it while it dims.
 * lines: array of nodes (each line masks & rises on page load), lineClass: indent classes per line.
 */
export default function Hero({ image, video, alt = "", eyebrow, lines, lineClass = [], copy, children, variant = "full", center = false }) {
  const ref = useRef(null);
  const vid = useRef(null);
  // Background video: muted autoplay loop. Respects reduced-motion (shows the poster instead).
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = true; // React doesn't always render the muted attribute; iOS needs it to autoplay
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    sync();
    mq.addEventListener?.("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      mq.removeEventListener?.("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const cls = variant === "short" ? "short" : variant === "mini" ? "mini" : "";
  return (
    <section ref={ref} className={`hero ${cls} ${video ? "has-video" : ""}`} onMouseMove={onMove} id="top">
      <div className="bg">
        {video ? (
          <video
            ref={vid}
            className="hero-video"
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label={alt}
          >
            {video.mobile && <source src={video.mobile} type="video/mp4" media="(max-width: 820px)" />}
            <source src={video.src} type="video/mp4" />
          </video>
        ) : (
          <img src={image} alt={alt} fetchPriority="high" />
        )}
      </div>
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
