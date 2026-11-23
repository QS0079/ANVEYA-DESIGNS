"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, fmtDate } from "@/components/admin/util";
import { LEAD_STATUSES } from "@/lib/defaults";

export default function Dashboard() {
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => { api("/api/admin/stats").then(setD).catch((e) => setErr(e.message)); }, []);
  const label = (v) => LEAD_STATUSES.find((s) => s.value === v)?.label || v;
  const max = d ? Math.max(1, ...d.byStatus.map((s) => Number(s.c))) : 1;
  const maxT = d ? Math.max(1, ...d.byType.map((s) => Number(s.c))) : 1;

  return (
    <>
      <div className="adm-head">
        <div><h1>Dashboard</h1><p>Overview of website enquiries and content.</p></div>
        <Link href="/admin/leads" className="abtn">View all leads</Link>
      </div>
      {err && <div className="panel">{err}</div>}
      {d && (
        <>
          <div className="stats">
            <div className="stat"><span>Total leads</span><b>{d.total}</b></div>
            <div className="stat" style={{ animationDelay: ".06s" }}><span>New / unread</span><b>{d.fresh}</b></div>
            <div className="stat" style={{ animationDelay: ".12s" }}><span>Last 7 days</span><b>{d.week}</b></div>
            <div className="stat" style={{ animationDelay: ".18s" }}><span>Last 30 days</span><b>{d.month}</b></div>
          </div>
          <div className="grid-2">
            <div className="panel">
              <h3>Recent enquiries</h3>
              {d.recent.length === 0 ? <div className="empty">No enquiries yet. They will appear here as soon as someone submits the website form.</div> : (
                <table className="tbl">
                  <tbody>
                    {d.recent.map((r) => (
                      <tr key={r.id}>
                        <td><div className="nm">{r.name}</div><div className="sub">{r.phone}</div></td>
                        <td className="sub" data-label="Property">{r.property_type || "—"}</td>
                        <td data-label="Status"><span className={`pill ${r.status}`}>{label(r.status)}</span></td>
                        <td className="sub" data-label="Received" style={{ whiteSpace: "nowrap" }}>{fmtDate(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <div className="panel bars">
                <h3>By status</h3>
                {d.byStatus.length === 0 && <div className="sub muted">No data yet.</div>}
                {d.byStatus.map((s) => (
                  <div key={s.status}>{label(s.status)} — {s.c}<div className="track"><i style={{ width: `${(s.c / max) * 100}%` }} /></div></div>
                ))}
              </div>
              <div className="panel bars">
                <h3>By property type</h3>
                {d.byType.length === 0 && <div className="sub muted">No data yet.</div>}
                {d.byType.map((s) => (
                  <div key={s.t}>{s.t} — {s.c}<div className="track"><i style={{ width: `${(s.c / maxT) * 100}%` }} /></div></div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
