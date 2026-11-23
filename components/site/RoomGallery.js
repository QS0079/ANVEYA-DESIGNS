"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

/** Full-width gallery organised by room / zone, with captions and a full-screen viewer. */
export default function RoomGallery({ groups, title }) {
  const flat = useMemo(() => groups.flatMap((g) => g.images.map((im) => ({ ...im, group: g.name }))), [groups]);
  const [open, setOpen] = useState(-1);
  const close = useCallback(() => setOpen(-1), []);
  const go = useCallback((d) => setOpen((i) => (i + d + flat.length) % flat.length), [flat.length]);

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

  let n = -1;
  return (
    <>
      <div className="rgal">
        {groups.map((g) => (
          <div className="rgal-group" key={g.name}>
            <div className="rgal-head"><span>{g.name}</span><i /><em>{g.images.length} image{g.images.length === 1 ? "" : "s"}</em></div>
            <div className={`rgal-grid c${Math.min(g.images.length, 4)}`}>
              {g.images.map((im) => {
                n += 1;
                const idx = n;
                return (
                  <button key={idx} className="rgal-item" onClick={() => setOpen(idx)} aria-label={`Open: ${im.caption}`}>
                    <div className="rimg" data-reveal="img" style={{ "--d": `${(idx % 3) * 100}ms` }}>
                      <div className="rimg-c"><img src={im.src} alt={`${title} — ${im.caption}`} loading="lazy" /></div>
                    </div>
                    <span className="rgal-cap">{im.caption}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {open >= 0 && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} gallery`} onClick={close}>
          <div className="lb-top" onClick={(e) => e.stopPropagation()}>
            <span>{flat[open].group} — {flat[open].caption}</span>
            <span>{String(open + 1).padStart(2, "0")} / {String(flat.length).padStart(2, "0")}</span>
            <button onClick={close} aria-label="Close">Close ✕</button>
          </div>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            <img key={open} src={flat[open].src} alt={`${title} — ${flat[open].caption}`} />
          </div>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image">←</button>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image">→</button>
          <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {flat.map((im, i) => (
              <button key={i} className={i === open ? "on" : ""} onClick={() => setOpen(i)} aria-label={im.caption}>
                <img src={im.src} alt="" />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
