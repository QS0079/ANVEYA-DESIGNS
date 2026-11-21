"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Lines";

/** Portfolio slider in the "Impressions that endure" style: wipe-in images, swapping copy, counter. */
export default function Slider({ items }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(null);
  const [k, setK] = useState(0);
  const lock = useRef(false);
  const timer = useRef(null);

  const go = (d) => {
    if (lock.current) return;
    lock.current = true;
    setPrev(i);
    setI((x) => (x + d + items.length) % items.length);
    setK((x) => x + 1);
    setTimeout(() => { lock.current = false; }, 1100);
  };

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => go(1), 6500);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  const cur = items[i];
  const p = prev !== null ? items[prev] : null;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="slider" data-reveal="up">
      <div className="main">
        {p && <div className="layer"><img src={p.img} alt="" /></div>}
        <div className={`layer ${k ? "enter" : ""}`} key={`m${k}`}><img src={cur.img} alt={cur.title} /></div>
      </div>
      <div className="info">
        <div className="meta-row"><span>{cur.tag}</span><span>{pad(i + 1)} / {pad(items.length)}</span></div>
        <h3 className="display h3 title swap" key={`t${k}`}>{cur.title}</h3>
        <p className="txt swap" key={`p${k}`} style={{ animationDelay: ".12s" }}>{cur.text}</p>
        <div className="bottom">
          <a href={cur.href} className="link-arrow">{cur.cta} <span className="arr"><Arrow /></span></a>
          <div className="arrows">
            <button aria-label="Previous" onClick={() => go(-1)}><span style={{ transform: "scaleX(-1)", display: "inline-flex" }}><Arrow /></span></button>
            <button aria-label="Next" onClick={() => go(1)}><Arrow /></button>
          </div>
        </div>
        <div className="progress"><i style={{ transform: `scaleX(${(i + 1) / items.length})` }} /></div>
      </div>
      <div className="side">
        <div className="pic">
          {p && <div className="layer"><img src={p.img2} alt="" /></div>}
          <div className={`layer ${k ? "enter" : ""}`} key={`s${k}`} style={{ animationDelay: ".2s" }}><img src={cur.img2} alt="" style={{ animationDelay: ".2s" }} /></div>
        </div>
        <div className="cap swap" key={`c${k}`}>{cur.caption}</div>
      </div>
    </div>
  );
}
