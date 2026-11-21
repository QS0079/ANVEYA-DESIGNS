"use client";
import { useCallback, useEffect, useState } from "react";
import { api, fmtDate } from "@/components/admin/util";
import { LEAD_STATUSES, PROPERTY_TYPES } from "@/lib/defaults";

export default function LeadsPage() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState(null);
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState("");
  const per = 20;

  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const load = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams({ page, per, q, status, type });
    try {
      const d = await api(`/api/admin/leads?${p}`);
      setRows(d.rows); setTotal(d.total);
    } catch (e) { flash(e.message); }
    setLoading(false);
  }, [page, q, status, type]);

  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const open = (r) => { setSel(r); setNotes(r.notes || ""); };

  const update = async (body) => {
    const d = await api(`/api/admin/leads/${sel.id}`, { method: "PATCH", body: JSON.stringify(body) });
    setSel(d.row);
    setRows((rs) => rs.map((r) => (r.id === d.row.id ? d.row : r)));
    window.dispatchEvent(new Event("anveya:leads-changed"));
    flash("Saved");
  };

  const remove = async () => {
    if (!confirm(`Delete the enquiry from ${sel.name}? This cannot be undone.`)) return;
    await api(`/api/admin/leads/${sel.id}`, { method: "DELETE" });
    setSel(null);
    window.dispatchEvent(new Event("anveya:leads-changed"));
    flash("Lead deleted");
    load();
  };

  const label = (v) => LEAD_STATUSES.find((s) => s.value === v)?.label || v;
  const pages = Math.max(1, Math.ceil(total / per));
  const wa = (p) => `https://wa.me/${p.replace(/\D/g, "").replace(/^0/, "").replace(/^(\d{10})$/, "91$1")}`;

  return (
    <>
      <div className="adm-head">
        <div><h1>Leads</h1><p>{total} enquir{total === 1 ? "y" : "ies"} from the website forms.</p></div>
        <a className="abtn ghost" href="/api/admin/leads/export">Export CSV</a>
      </div>

      <div className="toolbar">
        <input className="inp" style={{ flex: "1 1 240px" }} placeholder="Search name, mobile, location…" value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} />
        <select className="sel" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select className="sel" value={type} onChange={(e) => { setPage(1); setType(e.target.value); }}>
          <option value="">All property types</option>
          {PROPERTY_TYPES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="tbl-wrap">
        {!loading && rows.length === 0 ? <div className="empty">No leads found.</div> : (
          <table className="tbl">
            <thead><tr><th>Name</th><th>Mobile</th><th>Property</th><th>Budget</th><th>Timeline</th><th>Status</th><th>Received</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="click" onClick={() => open(r)}>
                  <td><div className="nm">{r.name}</div><div className="sub">{r.location || "—"}</div></td>
                  <td><div style={{ whiteSpace: "nowrap" }}>{r.phone}</div>{r.email && <div className="sub">{r.email}</div>}</td>
                  <td><div>{r.property_type || "—"}</div>{r.service && <div className="sub">{r.service}</div>}</td>
                  <td className="sub" style={{ whiteSpace: "nowrap" }}>{r.budget || "—"}</td>
                  <td className="sub" style={{ whiteSpace: "nowrap" }}>{r.timeline || "—"}</td>
                  <td><span className={`pill ${r.status}`}>{label(r.status)}</span></td>
                  <td className="sub" style={{ whiteSpace: "nowrap" }}>{fmtDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="pager">
        <span>Page {page} of {pages}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="abtn ghost sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
          <button className="abtn ghost sm" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>

      {sel && (
        <>
          <div className="drawer-bg" onClick={() => setSel(null)} />
          <aside className="drawer">
            <button className="abtn ghost sm" onClick={() => setSel(null)} style={{ float: "right" }}>Close</button>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Lead #{sel.id}</div>
            <h2>{sel.name}</h2>
            <div className="sub muted small">Received {fmtDate(sel.created_at)} · via {sel.source_page || "website"}</div>
            <div className="quick">
              <a className="abtn sm" href={`tel:${sel.phone}`}>Call</a>
              <a className="abtn sm ghost" href={wa(sel.phone)} target="_blank" rel="noopener">WhatsApp</a>
              {sel.email && <a className="abtn sm ghost" href={`mailto:${sel.email}`}>Email</a>}
            </div>
            <div className="kv"><span>Status</span><div>
              <select className="sel" value={sel.status} onChange={(e) => update({ status: e.target.value })}>
                {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div></div>
            <div className="kv"><span>Mobile</span><div>{sel.phone}</div></div>
            {sel.email && <div className="kv"><span>Email</span><div>{sel.email}</div></div>}
            <div className="kv"><span>Location</span><div>{sel.location || "—"}</div></div>
            <div className="kv"><span>Property type</span><div>{sel.property_type || "—"}</div></div>
            <div className="kv"><span>Budget</span><div>{sel.budget || "—"}</div></div>
            <div className="kv"><span>Timeline</span><div>{sel.timeline || "—"}</div></div>
            {sel.service && <div className="kv"><span>Requirement</span><div>{sel.service}</div></div>}
            {sel.message && <div className="kv"><span>Message</span><div>{sel.message}</div></div>}
            <div style={{ marginTop: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Internal notes</div>
              <textarea className="ta" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Call notes, follow-up date, site visit details…" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                <button className="abtn" onClick={() => update({ notes })}>Save notes</button>
                <button className="abtn danger" onClick={remove}>Delete lead</button>
              </div>
            </div>
          </aside>
        </>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
