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
  const [picked, setPicked] = useState(() => new Set());
  const [busy, setBusy] = useState(false);
  const per = 20;

  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const load = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams({ page, per, q, status, type });
    try {
      const d = await api(`/api/admin/leads?${p}`);
      setRows(d.rows); setTotal(d.total);
      setPicked(new Set());
    } catch (e) { flash(e.message); }
    setLoading(false);
  }, [page, q, status, type]);

  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const open = (r) => { setSel(r); setNotes(r.notes || ""); };

  const patch = async (id, body, msg = "Saved") => {
    try {
      const d = await api(`/api/admin/leads/${id}`, { method: "PATCH", body: JSON.stringify(body) });
      setRows((rs) => rs.map((r) => (r.id === d.row.id ? d.row : r)));
      setSel((s) => (s && s.id === d.row.id ? d.row : s));
      window.dispatchEvent(new Event("anveya:leads-changed"));
      flash(msg);
    } catch (e) { flash(e.message); }
  };
  const update = (body) => patch(sel.id, body);

  const remove = async () => {
    if (!confirm(`Permanently delete the enquiry from ${sel.name}?\n\nIt will be removed from the database and cannot be recovered.`)) return;
    try {
      await api(`/api/admin/leads/${sel.id}`, { method: "DELETE" });
      setSel(null);
      window.dispatchEvent(new Event("anveya:leads-changed"));
      flash("Lead deleted");
      load();
    } catch (e) { flash(e.message); }
  };

  const toggle = (id) => setPicked((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOnPage = rows.length > 0 && rows.every((r) => picked.has(r.id));
  const toggleAll = () => setPicked(allOnPage ? new Set() : new Set(rows.map((r) => r.id)));

  const bulkDelete = async () => {
    const ids = [...picked];
    if (!ids.length) return;
    if (!confirm(`Permanently delete ${ids.length} selected lead${ids.length === 1 ? "" : "s"}?\n\nThey will be removed from the database and cannot be recovered.`)) return;
    setBusy(true);
    try {
      const d = await api("/api/admin/leads", { method: "DELETE", body: JSON.stringify({ ids }) });
      window.dispatchEvent(new Event("anveya:leads-changed"));
      flash(`${d.deleted} lead${d.deleted === 1 ? "" : "s"} deleted`);
      if (ids.length >= rows.length && page > 1) setPage(page - 1); else load();
    } catch (e) { flash(e.message); }
    setBusy(false);
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

      {picked.size > 0 && (
        <div className="bulkbar">
          <span><b>{picked.size}</b> selected</span>
          <button className="abtn ghost sm" onClick={() => setPicked(new Set())}>Clear</button>
          <button className="abtn danger sm" onClick={bulkDelete} disabled={busy}>{busy ? "Deleting…" : `Delete selected (${picked.size})`}</button>
        </div>
      )}

      <div className="tbl-wrap">
        {!loading && rows.length === 0 ? <div className="empty">No leads found.</div> : (
          <table className="tbl">
            <thead><tr><th className="chk"><input type="checkbox" aria-label="Select all leads on this page" checked={allOnPage} onChange={toggleAll} /></th><th>Name</th><th>Mobile</th><th>Property</th><th>Budget</th><th>Timeline</th><th>Status</th><th>Received</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={`click ${picked.has(r.id) ? "picked" : ""}`} onClick={() => open(r)}>
                  <td className="chk" onClick={(e) => e.stopPropagation()}><input type="checkbox" aria-label={`Select ${r.name}`} checked={picked.has(r.id)} onChange={() => toggle(r.id)} /></td>
                  <td><div className="nm">{r.name}</div><div className="sub">{r.location || "—"}</div></td>
                  <td data-label="Mobile"><div style={{ whiteSpace: "nowrap" }}>{r.phone}</div>{r.email && <div className="sub">{r.email}</div>}</td>
                  <td data-label="Property"><div>{r.property_type || "—"}</div>{r.service && <div className="sub">{r.service}</div>}</td>
                  <td className="sub" data-label="Budget" style={{ whiteSpace: "nowrap" }}>{r.budget || "—"}</td>
                  <td className="sub" data-label="Timeline" style={{ whiteSpace: "nowrap" }}>{r.timeline || "—"}</td>
                  <td data-label="Status" onClick={(e) => e.stopPropagation()}>
                    <select className={`stsel ${r.status}`} value={r.status} aria-label={`Status for ${r.name}`} onChange={(e) => patch(r.id, { status: e.target.value }, "Status updated")}>
                      {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="sub" data-label="Received" style={{ whiteSpace: "nowrap" }}>{fmtDate(r.created_at)}</td>
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
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
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
