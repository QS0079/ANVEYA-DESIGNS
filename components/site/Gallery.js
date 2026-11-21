"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** 4-image editorial gallery with clip-path reveals + full-screen viewer (click, ← → keys, Esc). */
export default function Gallery({ images, title }) {
  const [open, setOpen] = useState(-1);
  const close = useCallback(() => setOpen(-1), []);
  const go = useCallback((d) => setOpen((i) => (i + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (open < 0) return;
    window.__lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); window.__lenis?.start(); };
  }, [open, close, go]);

  const dirs = [undefined, "down", "left", "right"];
  return (
    <>
      <div className="pgal">
        {images.slice(0, 4).map((src, i) => (
          <button key={i} className={`pgal-item g${i + 1}`} onClick={() => setOpen(i)} aria-label={`Open image ${i + 1} of ${title}`}>
            <div className="rimg" data-reveal="img" data-dir={dirs[i]} style={{ "--d": `${(i % 2) * 150}ms` }}>
              <div className="rimg-c"><img src={src} alt={`${title} — image ${i + 1}`} loading="lazy" /></div>
            </div>
            <span className="pgal-n">{String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <span className="pgal-zoom" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            </span>
          </button>
        ))}
      </div>

      {open >= 0 && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} gallery`} onClick={close}>
          <div className="lb-top" onClick={(e) => e.stopPropagation()}>
            <span>{title}</span>
            <span>{String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <button onClick={close} aria-label="Close">Close ✕</button>
          </div>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            <img key={open} src={images[open]} alt={`${title} — image ${open + 1}`} />
          </div>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image">←</button>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image">→</button>
          <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => (
              <button key={i} className={i === open ? "on" : ""} onClick={() => setOpen(i)} aria-label={`Image ${i + 1}`}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
