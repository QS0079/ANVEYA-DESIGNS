"use client";
import { useEffect, useRef, useState } from "react";

/** Sticky jump links (Living | Kitchen | …) that highlight the section in view. */
export default function RoomNav({ items, label = "Rooms" }) {
  const [active, setActive] = useState(items[0]?.id);
  const lock = useRef(0);
  const linksRef = useRef(null);

  useEffect(() => {
    const els = items.map((r) => document.getElementById(r.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lock.current) return;
        entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // keep the active link visible in the (horizontally scrollable) bar on phones
  useEffect(() => {
    const box = linksRef.current;
    const a = box?.querySelector("a.on");
    if (box && a && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: a.offsetLeft - box.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector(".roomnav");
    const navH = nav?.offsetHeight || 56;
    const headerH = document.querySelector(".header.solid .bar, .header .bar")?.offsetHeight || 70;
    // measure the section itself (its title may still be mid-animation) and skip its top padding
    const top = el.getBoundingClientRect().top + window.scrollY + (parseFloat(getComputedStyle(el).paddingTop) || 0);
    // leave room for the header and this bar so the room title lands just below them
    const y = Math.max(0, top - navH - headerH - 22);
    lock.current = Date.now() + 1600;
    setActive(id);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.3 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav className="roomnav" id="tour" aria-label={`${label} in this project`}>
      <div className="wrap roomnav-in">
        <span className="roomnav-label">{label}</span>
        <div className="roomnav-links" ref={linksRef}>
          {items.map((r) => (
            <a key={r.id} href={`#${r.id}`} data-native className={active === r.id ? "on" : ""} onClick={(e) => go(e, r.id)}>{r.name}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
