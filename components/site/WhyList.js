"use client";
import { useEffect, useRef, useState } from "react";

/**
 * "Why Choose Us" — sticky image on the left that wipes to the active point,
 * numbered list on the right. Active point follows scroll position and hover.
 */
export default function WhyList({ items }) {
  const [active, setActive] = useState(0);
  const rows = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="why">
      <div className="why-media" data-reveal="up">
        <div className="why-frame">
          {items.map((it, i) => (
            <div key={it.t} className={`why-img ${i === active ? "on" : ""} ${i < active ? "past" : ""}`}>
              <img src={it.img} alt={it.t} loading="lazy" />
            </div>
          ))}
          <div className="why-count">
            <b>{pad(active + 1)}</b><span>/ {pad(items.length)}</span>
          </div>
        </div>
        <div className="why-bar">
          {items.map((it, i) => <i key={it.t} className={i <= active ? "on" : ""} />)}
        </div>
      </div>

      <ol className="why-list">
        {items.map((it, i) => (
          <li
            key={it.t}
            ref={(el) => (rows.current[i] = el)}
            data-i={i}
            className={`why-row ${i === active ? "on" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
          >
            <span className="why-n" data-reveal="up" style={{ "--d": `${i * 90}ms` }}>{pad(i + 1)}</span>
            <div data-reveal="up" style={{ "--d": `${i * 90 + 60}ms` }}>
              <h3 className="why-t">{it.t}</h3>
              <p className="why-d">{it.d}</p>
              <div className="why-mobile-img"><img src={it.img} alt="" loading="lazy" /></div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
