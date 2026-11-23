"use client";
import Social from "./Social";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/defaults";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [tint, setTint] = useState(false);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.querySelector(".hero");
      const limit = hero ? hero.offsetHeight - 90 : 40;
      setSolid(y > limit);
      // while still over the dark hero, give the bar its own dark glass so content never shows through it
      setTint(y > 8 && y <= limit);
      setHide(y > limit + 200 && y > last + 2);
      if (y < last - 2) setHide(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("anveya:navstart", close);
    return () => window.removeEventListener("anveya:navstart", close);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  }, [open]);

  const isActive = (href) => href !== "/" && !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header className={`header ${solid && !open ? "solid" : ""} ${tint && !open ? "tint" : ""} ${hide && !open ? "hide" : ""}`}>
        <div className="wrap">
          <div className="bar">
            <a href="/" className="brand fade-item" style={{ "--i": 0 }} aria-label="Anveya Designs — Home">
              <Logo variant="light" className="on-dark" height={72} />
              <Logo variant="dark" className="on-light" height={72} alt="" />
            </a>
            <nav className="nav" aria-label="Main">
              {NAV.map((n, i) => (
                <a key={n.href} href={n.href} className={`fade-item ${isActive(n.href) ? "active" : ""}`} style={{ "--i": i + 1 }}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a href="/contact-us" className="cta-link fade-item" style={{ "--i": 6 }}><span>Contact</span></a>
            <button className="burger fade-item" style={{ "--i": 1 }} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <span /><span />
            </button>
          </div>
        </div>
        <div className="wrap"><div className="line" /></div>
      </header>

      <div className="mobile-menu" aria-hidden={!open}>
        {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact-us", label: "Contact" }].map((n, i) => (
          <span className="ln" key={n.href}>
            <span className="ln-i" style={{ "--i": i }}>
              <a className="big" href={n.href}>{n.label}</a>
            </span>
          </span>
        ))}
        <div className="meta">Residential &amp; Commercial Interior Design</div>
        <Social className="mm-social" />
      </div>
    </>
  );
}
