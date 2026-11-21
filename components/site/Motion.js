"use client";
import { useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
function scrollToHash(hash, immediate = false) {
  if (!hash || hash === "#") return;
  let el = null;
  try { el = document.querySelector(hash); } catch { return; }
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -60, immediate, duration: 1.8 });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}

/**
 * One client component that powers every motion effect of the public site:
 * smooth scrolling (Lenis), the hero entrance animation, scroll reveals,
 * parallax and the sticky-hero dimming. (No loading screen.)
 */
export default function Motion() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef(null);

  /* ---------- smooth scroll ---------- */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, []);

  /* ---------- hero entrance: plays on first load and after every page change ---------- */
  const playHero = useCallback(() => {
    const html = document.documentElement;
    html.classList.add("hero-reset");
    html.classList.remove("page-ready");
    void html.offsetHeight;
    html.classList.remove("hero-reset");
    requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add("page-ready", "site-ready")));
  }, []);

  // First load: wait briefly for fonts so the headline animates in its real typeface
  useEffect(() => {
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    const introDone = new Promise((r) => {
      if (window.__introDone) return r();
      window.addEventListener("anveya:intro-done", r, { once: true });
      setTimeout(r, 4000); // safety net
    });
    Promise.all([Promise.race([fonts, new Promise((r) => setTimeout(r, 700))]), introDone]).then(() => {
      playHero();
      if (location.hash) setTimeout(() => scrollToHash(location.hash, true), 50);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- intercept internal links → client-side navigation (keeps smooth scroll + header) ---------- */
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.native !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // "Book a Consultation" / "Start Your Project" buttons open the enquiry popup
      if (a.dataset.popup !== undefined || (url.hash === "#enquiry" && !a.closest(".pop"))) {
        e.preventDefault();
        window.dispatchEvent(new Event("anveya:navstart"));
        window.dispatchEvent(new Event("anveya:popup"));
        return;
      }
      if (/^\/(admin|login|api)(\/|$)/.test(url.pathname)) return;
      e.preventDefault();
      window.dispatchEvent(new Event("anveya:navstart"));

      if (url.pathname === location.pathname) {
        if (url.hash) { scrollToHash(url.hash); history.replaceState(null, "", url.hash); }
        else window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      pending.current = url.hash || "";
      router.push(url.pathname + url.search, { scroll: false });
    };
    const onOver = (e) => {
      const a = e.target.closest && e.target.closest("a[href^='/']");
      if (a) { try { router.prefetch(new URL(a.href).pathname); } catch {} }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => { document.removeEventListener("click", onClick, true); document.removeEventListener("mouseover", onOver); };
  }, [router]);

  /* ---------- after the route changes: reset scroll, replay the hero entrance ---------- */
  useEffect(() => {
    if (pending.current === null) return;
    const hash = pending.current;
    pending.current = null;
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (hash) scrollToHash(hash, true);
      playHero();
    }));
  }, [pathname, playHero]);

  /* ---------- fit headings: every line stays on one line and fits its column (and the hero fits the screen) ---------- */
  useEffect(() => {
    const fitAll = () => {
      const desktop = window.innerWidth >= 700;
      document.querySelectorAll("[data-fit]").forEach((h) => {
        h.style.fontSize = "";
        const heroEl = h.closest(".hero");
        if (heroEl) heroEl.classList.remove("grow");
        h.classList.toggle("fitted", desktop);
        if (!desktop) return;
        const base = parseFloat(getComputedStyle(h).fontSize);
        const avail = h.clientWidth;
        let need = 0;
        h.querySelectorAll(":scope > .ln").forEach((ln) => {
          const range = document.createRange();
          range.selectNodeContents(ln.firstElementChild);
          const w = range.getBoundingClientRect().width;
          need = Math.max(need, parseFloat(getComputedStyle(ln).paddingLeft) + w);
        });
        let r = need > avail ? avail / need : 1;
        const hero = h.dataset.fit === "hero" && h.closest(".hero");
        if (hero) {
          const content = h.closest(".wrap");
          const header = document.querySelector(".header .bar");
          const room = hero.clientHeight - (header ? header.offsetHeight : 76) - 56;
          const extra = content.scrollHeight - h.offsetHeight; // eyebrow, copy, buttons
          const hRatio = (room - extra) / h.offsetHeight;
          // never shrink the hero headline below ~56px for height: let the hero grow instead
          const floor = Math.min(base * r, 56);
          if (base * hRatio < floor) { hero.classList.add("grow"); r = Math.min(r, floor / base); }
          else if (hRatio < r) r = hRatio;
        }
        if (r < 1) h.style.fontSize = `${Math.max(26, base * r * 0.97)}px`;
      });
    };
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(fitAll, 120); };
    fitAll();
    if (document.fonts) document.fonts.ready.then(fitAll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [pathname]);

  /* ---------- scroll reveals ---------- */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((n) => io.observe(n));
    scan();
    let t;
    const mo = new MutationObserver(() => { clearTimeout(t); t = setTimeout(scan, 60); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(t); };
  }, [pathname]);

  /* ---------- parallax + sticky-hero dimming ---------- */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const hero = document.querySelector(".hero");
      if (hero && getComputedStyle(hero).position === "sticky") {
        const h = hero.offsetHeight;
        const p = Math.min(1, Math.max(0, y / h));
        const dim = hero.querySelector(".dim");
        const bg = hero.querySelector(".bg");
        const inner = hero.querySelector(".inner");
        if (dim) dim.style.opacity = (p * 0.75).toFixed(3);
        if (bg) bg.style.transform = `translate3d(0, ${(p * 12).toFixed(2)}%, 0)`;
        if (inner) inner.style.transform = `translate3d(0, ${(p * -8).toFixed(2)}vh, 0) scale(${(1 - p * 0.05).toFixed(4)})`;
      }
      document.querySelectorAll("[data-parallax]").forEach((n) => {
        const r = n.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const s = parseFloat(n.dataset.parallax) || 0.1;
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        n.style.translate = `0 ${(-c * s * 100).toFixed(2)}px`;
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  return null;
}
