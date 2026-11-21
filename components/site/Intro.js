"use client";
import { useEffect, useState } from "react";

/**
 * Logo intro on first load of the site: the logo (transparent PNG) fades in at the centre of the
 * plain cream page, holds, fades out, then the page is revealed and the hero animation starts.
 * Shows on a fresh load only — not when moving between pages.
 */
export default function Intro() {
  const [phase, setPhase] = useState("in"); // in → out → done

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.__lenis?.stop();
    document.documentElement.classList.add("intro-on");
    const hold = reduce ? 300 : 1500;
    const t1 = setTimeout(() => setPhase("out"), hold);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.remove("intro-on");
      window.__lenis?.start();
      window.__introDone = true;
      window.dispatchEvent(new Event("anveya:intro-done"));
    }, hold + (reduce ? 200 : 800));
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;
  return (
    <div className={`intro ${phase === "out" ? "out" : ""}`} aria-hidden="true">
      <img src="/brand/logo-dark.png" alt="" width="800" height="745" className="intro-logo" fetchPriority="high" />
    </div>
  );
}
