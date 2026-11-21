"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("anveya_cookie_consent")) setShow(true); } catch {}
  }, []);
  const choose = (v) => {
    try { localStorage.setItem("anveya_cookie_consent", JSON.stringify({ v, at: Date.now() })); } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie preferences">
      <div className="eyebrow" style={{ marginBottom: 12 }}>Cookies</div>
      <p>We use essential cookies to run this website and, with your consent, analytics cookies to improve it. Read our <a href="/cookies-policy">Cookies Policy</a>.</p>
      <div className="btn-row">
        <button className="btn solid" onClick={() => choose("all")}>Accept all</button>
        <button className="btn" onClick={() => choose("essential")}>Essential only</button>
      </div>
    </div>
  );
}
