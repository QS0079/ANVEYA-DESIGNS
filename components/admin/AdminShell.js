"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const I = {
  dash: <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" />,
  leads: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  faq: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4M12 17h.01" /></>,
  csv: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />,
  site: <path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" />,
  out: <path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3M10 16l-4-4 4-4M6 12h10" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};
const Icon = ({ n }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{I[n]}</svg>
);

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: "dash" },
  { href: "/admin/leads", label: "Leads", icon: "leads", badge: true },
  { href: "/admin/faqs", label: "FAQs", icon: "faq" },
];

export default function AdminShell({ user, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [fresh, setFresh] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const load = () => fetch("/api/admin/stats").then((r) => (r.ok ? r.json() : null)).then((d) => d && setFresh(d.fresh)).catch(() => {});
    load();
    window.addEventListener("anveya:leads-changed", load);
    return () => window.removeEventListener("anveya:leads-changed", load);
  }, []);

  const logout = async () => {
    setLeaving(true);
    await fetch("/api/auth/logout", { method: "POST" });
    location.href = "/login";
  };

  const on = (href) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const initial = (user?.email || "A")[0].toUpperCase();

  return (
    <div className={`adm ${open ? "nav-open" : ""}`}>
      <div className="adm-mobile-top">
        <img src="/brand/logo-light.png" alt="Anveya Designs" style={{ height: 44, width: "auto" }} />
        <button className="adm-icon-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu"><Icon n={open ? "close" : "menu"} /></button>
      </div>
      {open && <div className="adm-scrim" onClick={() => setOpen(false)} />}

      <aside className="adm-side">
        <div className="adm-brand">
          <img src="/brand/logo-light.png" alt="Anveya Designs" className="adm-logo" width="800" height="745" />
          <div className="sub">Admin Panel</div>
        </div>

        <div className="adm-group">Menu</div>
        <nav className="adm-nav">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={on(l.href) ? "on" : ""}>
              <Icon n={l.icon} />
              <span>{l.label}</span>
              {l.badge && fresh > 0 && <span className="badge" title={`${fresh} new`}>{fresh}</span>}
            </Link>
          ))}
        </nav>

        <div className="adm-group">Quick actions</div>
        <nav className="adm-nav">
          <a href="/api/admin/leads/export"><Icon n="csv" /><span>Export leads (CSV)</span></a>
          <a href="/" target="_blank" rel="noopener noreferrer"><Icon n="site" /><span>View website</span></a>
        </nav>

        <div className="adm-user">
          <div className="who">
            <span className="avatar">{initial}</span>
            <div>
              <div className="name">{user?.name || "Admin"}</div>
              <div className="mail">{user?.email}</div>
            </div>
          </div>
          <button className="adm-logout" onClick={logout} disabled={leaving}>
            <Icon n="out" /> {leaving ? "Logging out…" : "Log out"}
          </button>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
