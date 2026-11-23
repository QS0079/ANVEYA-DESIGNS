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
  const bgSlot = useRef(null);
  const frameSlot = useRef(null);
  const blur = useRef(null);

  // Background video. Landscape screens: full-bleed behind the text.
  // Portrait screens (phones / tablets held upright): the same <video> node moves into a
  // 16:9 frame so the whole shot is visible, and a soft blurred copy fills the backdrop.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = true; // React doesn't always render the muted attribute; iOS needs it to autoplay
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = window.matchMedia("(max-aspect-ratio: 1/1) and (max-width: 1024px)");
    const play = () => {
      if (reduce.matches || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    const place = () => {
      const slot = portrait.matches ? frameSlot.current : bgSlot.current;
      if (slot && v.parentNode !== slot) slot.appendChild(v);
      ref.current?.classList.toggle("vid-portrait", portrait.matches);
      play();
    };
    // blurred live backdrop (portrait only): tiny canvas, scaled up + blurred by CSS
    let raf = 0;
    const c = blur.current;
    const ctx = c?.getContext("2d");
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!ctx || !portrait.matches || v.readyState < 2) return;
      ctx.drawImage(v, 0, 0, c.width, c.height);
    };
    place();
    raf = requestAnimationFrame(draw);
    portrait.addEventListener?.("change", place);
    reduce.addEventListener?.("change", play);
    document.addEventListener("visibilitychange", play);
    return () => {
      cancelAnimationFrame(raf);
      portrait.removeEventListener?.("change", place);
      reduce.removeEventListener?.("change", play);
      document.removeEventListener("visibilitychange", play);
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
      <div className="bg" ref={bgSlot}>
        {video ? (
          <>
            <canvas ref={blur} className="hero-blur" width="48" height="27" aria-hidden="true" />
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
              {video.mobile && <source src={video.mobile} type="video/mp4" media="(max-width: 600px)" />}
              <source src={video.src} type="video/mp4" />
            </video>
          </>
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
          {video && (
            <div className="hero-frame hf" style={{ "--i": -1, backgroundImage: `url(${video.poster})` }} ref={frameSlot} />
          )}
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
