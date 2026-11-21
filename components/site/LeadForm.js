"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BUDGETS, LOCATIONS, PROPERTY_TYPE_GROUPS, TIMELINES } from "@/lib/defaults";
import { Arrow } from "./Lines";

const empty = { name: "", phone: "", budget: "", location: "", property_type: "", timeline: "", website: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = "Enter a valid 10-digit mobile number.";
  if (!v.budget) e.budget = "Please select a budget.";
  if (!v.location) e.location = "Please select a location.";
  if (!v.property_type) e.property_type = "Please select a property type.";
  if (!v.timeline) e.timeline = "Please select a timeline.";
  return e;
}

/**
 * Enquiry form — Full Name, Mobile (+91), Interior Budget, Property Location, Property Type, Project Timeline.
 * Used inline (home + contact page) and inside the popup.
 */
export default function LeadForm({ source = "website", submitLabel = "Book Your Free Consultation", compact = false, onDone }) {
  const pathname = usePathname();
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done
  const id = (k) => `${source}-${k}`;

  const set = (k) => (e) => {
    let val = e.target.value;
    if (k === "phone") val = val.replace(/\D/g, "").slice(0, 10);
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, source_page: `${source} · ${pathname}` }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors || {});
        setMsg(data.error || "Something went wrong. Please try again.");
        setState("idle");
        return;
      }
      setState("done");
      try { localStorage.setItem("anveya_enquiry_sent", String(Date.now())); } catch {}
      onDone && onDone();
    } catch {
      setMsg("Network error. Please try again.");
      setState("idle");
    }
  };

  if (state === "done") {
    return (
      <div className={`form-done ${compact ? "compact" : ""}`}>
        <span className="sw">T</span>
        <h3 className="display h3">Thank you, {v.name.trim().split(" ")[0]}.</h3>
        <p className="lead mx-auto">We&apos;ve received your details. Our team will call you on +91 {v.phone} to talk through your space.</p>
        <button className="link-arrow mt-1" onClick={() => { setV(empty); setState("idle"); }}>Send another enquiry <span className="arr"><Arrow /></span></button>
      </div>
    );
  }

  const Err = ({ k }) => (errors[k] ? <div className="err">{errors[k]}</div> : null);
  const Select = ({ k, label, children }) => (
    <div className={`lf-field ${errors[k] ? "has-err" : ""}`}>
      <label htmlFor={id(k)}>{label} <i>*</i></label>
      <div className="lf-select">
        <select id={id(k)} value={v[k]} onChange={set(k)} className={v[k] ? "" : "ph"} aria-invalid={!!errors[k]}>
          {children}
        </select>
      </div>
      <Err k={k} />
    </div>
  );

  return (
    <form className={`lf ${compact ? "compact" : ""}`} onSubmit={submit} noValidate {...(compact ? {} : { "data-reveal": "up" })}>
      <div className={`lf-field ${errors.name ? "has-err" : ""}`}>
        <label htmlFor={id("name")}>Full Name <i>*</i></label>
        <input id={id("name")} className="lf-line" placeholder="Your name" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} />
        <Err k="name" />
      </div>
      <div className={`lf-field ${errors.phone ? "has-err" : ""}`}>
        <label htmlFor={id("phone")}>Mobile Number <i>*</i></label>
        <div className="lf-phone">
          <span>+91</span>
          <input id={id("phone")} className="lf-line" type="tel" inputMode="numeric" placeholder="10-digit mobile number" autoComplete="tel-national" value={v.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
        </div>
        <Err k="phone" />
      </div>

      {Select({ k: "budget", label: "Interior Budget", children: <><option value="">Select budget</option>{BUDGETS.map((o) => <option key={o}>{o}</option>)}</> })}
      {Select({ k: "location", label: "Property Location", children: <><option value="">Select location</option>{LOCATIONS.map((o) => <option key={o}>{o}</option>)}</> })}
      {Select({ k: "property_type", label: "Property Type", children: <><option value="">Select type</option>{PROPERTY_TYPE_GROUPS.map((g) => <optgroup key={g.label} label={g.label}>{g.options.map((o) => <option key={o}>{o}</option>)}</optgroup>)}</> })}
      {Select({ k: "timeline", label: "Project Timeline", children: <><option value="">Select timeline</option>{TIMELINES.map((o) => <option key={o}>{o}</option>)}</> })}

      <div className="hp" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
      </div>
      {msg && <div className="form-msg">{msg}</div>}
      <div className="lf-full">
        <button type="submit" className="btn solid lf-submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : submitLabel} <Arrow />
        </button>
        <p className="lf-note">By submitting, you agree to our <a href="/privacy-policy">Privacy Policy</a>. We&apos;ll only use your details to respond to your enquiry.</p>
      </div>
    </form>
  );
}
