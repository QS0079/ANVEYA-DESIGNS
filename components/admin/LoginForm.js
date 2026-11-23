"use client";
import { useState } from "react";

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></svg>
);

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setErr(data.error || "Login failed."); setBusy(false); return; }
      const next = new URLSearchParams(location.search).get("next");
      location.href = next && next.startsWith("/admin") ? next : "/admin";
    } catch {
      setErr("Network error. Please try again.");
      setBusy(false);
    }
  };

  return (
    <form className="l2-card" onSubmit={submit}>
      <img src="/brand/logo-dark.png" alt="Anveya Designs" className="l2-card-logo" width="800" height="745" />
      <div className="l2-kicker"><span />Welcome back</div>
      <h1>Sign in to your dashboard</h1>
      <p className="l2-lead">Use your admin email and password to manage enquiries and FAQs.</p>

      {err && <div className="l2-err" role="alert">{err}</div>}

      <label className="l2-label" htmlFor="em">Email address</label>
      <div className="l2-input">
        <MailIcon />
        <input id="em" type="email" placeholder="admin@anveya.com" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <label className="l2-label" htmlFor="pw">Password</label>
      <div className="l2-input">
        <LockIcon />
        <input id="pw" type={show ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" className="l2-show" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>{show ? "Hide" : "Show"}</button>
      </div>

      <button className="l2-btn" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
        {!busy && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>}
      </button>

      <a className="l2-back" href="/">← Back to website</a>
    </form>
  );
}
