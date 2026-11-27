"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import LeadForm from "./LeadForm";
import Logo from "./Logo";
import { IMG, POPUP_AUTO_OPEN_SECONDS } from "@/lib/defaults";

/**
 * Enquiry popup. Opens on window event "anveya:popup" (every #enquiry / data-popup link),
 * and automatically every POPUP_AUTO_OPEN_SECONDS while closed.
 */
export default function Popup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panel = useRef(null);

  useEffect(() => setMounted(true), []);

  const show = useCallback(() => {
    setClosing(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 520);
  }, []);

  useEffect(() => {
    window.addEventListener("anveya:popup", show);
    return () => window.removeEventListener("anveya:popup", show);
  }, [show]);

  // Auto-open every POPUP_AUTO_OPEN_SECONDS while closed (timer restarts after each close and on
  // every page change) — including after the visitor has already submitted an enquiry.
  useEffect(() => {
    if (!POPUP_AUTO_OPEN_SECONDS || open) return;
    let t;
    const attempt = () => {
      // a full-screen photo or the mobile menu is open — try again shortly instead of skipping
      if (document.querySelector(".lightbox") || document.documentElement.classList.contains("menu-open")) {
        t = setTimeout(attempt, 5000);
        return;
      }
      show();
    };
    t = setTimeout(attempt, POPUP_AUTO_OPEN_SECONDS * 1000);
    return () => clearTimeout(t);
  }, [open, pathname, show]);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    setTimeout(() => panel.current?.querySelector("input")?.focus({ preventScroll: true }), 650);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  if (!mounted || !open) return null;
  return createPortal(
    <div className={`pop ${closing ? "out" : ""}`} role="dialog" aria-modal="true" aria-labelledby="pop-title" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="pop-panel" ref={panel}>
        <button className="pop-close" onClick={close} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <div className="pop-media">
          <img className="pop-photo" src={IMG.living2} alt="Interior designed by Anveya Designs" />
          <div className="pop-media-cap">
            <Logo variant="light" height={86} />
            <div>Residential &amp; Commercial Interiors</div>
          </div>
        </div>
        <div className="pop-body">
          <div className="pop-eyebrow">Start a Project</div>
          <h2 id="pop-title" className="pop-title">Thinking about redesigning <em>your space?</em></h2>
          <p className="pop-text">Share a few details and the Anveya Designs team will call you back to talk it through.</p>
          <LeadForm source="popup" compact />
        </div>
      </div>
    </div>,
    document.body
  );
}
