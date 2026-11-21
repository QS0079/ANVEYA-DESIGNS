"use client";
import { useState } from "react";

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
    <form className="box" onSubmit={submit}>
      <img src="/brand/logo-dark.png" alt="Anveya Designs" className="login-logo-sm" width="800" height="745" />
      <div className="eyebrow">Welcome back</div>
      <h1>Sign in</h1>
      <p className="muted small" style={{ marginBottom: 34 }}>Manage enquiries, FAQs and site details.</p>
      {err && <div className="err-box">{err}</div>}
      <div className="field">
        <label htmlFor="em">Email</label>
        <input id="em" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field pw">
        <label htmlFor="pw">Password</label>
        <input id="pw" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"}</button>
      </div>
      <button className="btn solid" style={{ width: "100%" }} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      <p className="small muted" style={{ marginTop: 24 }}><a href="/" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>← Back to website</a></p>
    </form>
  );
}
