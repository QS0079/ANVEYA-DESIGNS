"use client";
import { useEffect, useState } from "react";

/**
 * Logo intro on a fresh load: a transparent frosted-glass layer (the website shows through, blurred)
 * with the logo sliding up into the centre; then the whole layer slides up and away like a curtain,
 * revealing the page. Not shown when moving between pages.
 */
export default function Intro() {
  const [phase, setPhase] = useState("in"); // in → out → done

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.__lenis?.stop();
    document.documentElement.classList.add("intro-on");
    const hold = reduce ? 250 : 1050;   // logo slides in + holds
    const leave = reduce ? 200 : 800;  // layer slides up
    const t1 = setTimeout(() => setPhase("out"), hold);
    const t2 = setTimeout(() => {
      window.__introDone = true;
      window.dispatchEvent(new Event("anveya:intro-done")); // hero starts as the layer clears
    }, hold + leave * 0.55);
    const t3 = setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.remove("intro-on");
      window.__lenis?.start();
    }, hold + leave);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;
  return (
    <div className={`intro ${phase === "out" ? "out" : ""}`} aria-hidden="true">
      <div className="intro-mask">
        <img src="/brand/logo-light-400.webp" alt="" width="430" height="400" className="intro-logo" fetchPriority="high" decoding="sync" />
      </div>
      <div className="intro-bar" />
    </div>
  );
}
