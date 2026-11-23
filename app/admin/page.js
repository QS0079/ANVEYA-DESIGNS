"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, fmtDate, monthName } from "@/components/admin/util";
import { LEAD_STATUSES } from "@/lib/defaults";

export default function Dashboard() {
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  const [month, setMonth] = useState(""); // "" = all time
  useEffect(() => {
    let live = true;
    const load = () => api(`/api/admin/stats${month ? `?month=${month}` : ""}`).then((x) => live && setD(x)).catch((e) => live && setErr(e.message));
    load();
    window.addEventListener("anveya:leads-changed", load);
    return () => { live = false; window.removeEventListener("anveya:leads-changed", load); };
  }, [month]);
  const diff = d && d.prev ? d.total - d.prev.total : 0;
  const label = (v) => LEAD_STATUSES.find((s) => s.value === v)?.label || v;
  const max = d ? Math.max(1, ...d.byStatus.map((s) => Number(s.c))) : 1;
  const maxT = d ? Math.max(1, ...d.byType.map((s) => Number(s.c))) : 1;

  return (
    <>
      <div className="adm-head">
        <div><h1>Dashboard</h1><p>{month ? `Website enquiries in ${monthName(month)}.` : "Overview of website enquiries and content."}</p></div>
        <div className="month-pick">
          <select className="sel" aria-label="Show dashboard for month" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">All time</option>
            {(d?.months || []).map((m) => <option key={m.ym} value={m.ym}>{monthName(m.ym)} · {m.c}</option>)}
          </select>
          <Link href="/admin/leads" className="abtn">View all leads</Link>
        </div>
      </div>
      {err && <div className="panel">{err}</div>}
      {d && (
        <>
          {d.month ? (
            <div className="stats" key={d.month}>
              <div className="stat"><span>Leads in {monthName(d.month, true)}</span><b>{d.total}</b>
                <small className={diff > 0 ? "up" : diff < 0 ? "down" : ""}>
                  {diff === 0 ? `Same as ${monthName(d.prev.month, true)}` : `${diff > 0 ? "▲" : "▼"} ${Math.abs(diff)} vs ${monthName(d.prev.month, true)} (${d.prev.total})`}
                </small>
              </div>
              <div className="stat" style={{ animationDelay: ".06s" }}><span>New / unread</span><b>{d.fresh}</b></div>
              <div className="stat" style={{ animationDelay: ".12s" }}><span>Won</span><b>{d.won}</b></div>
              <div className="stat" style={{ animationDelay: ".18s" }}><span>In {monthName(d.prev.month, true)}</span><b>{d.prev.total}</b></div>
            </div>
          ) : (
            <div className="stats" key="all">
              <div className="stat"><span>Total leads</span><b>{d.total}</b></div>
              <div className="stat" style={{ animationDelay: ".06s" }}><span>New / unread</span><b>{d.fresh}</b></div>
              <div className="stat" style={{ animationDelay: ".12s" }}><span>Last 7 days</span><b>{d.week}</b></div>
              <div className="stat" style={{ animationDelay: ".18s" }}><span>Last 30 days</span><b>{d.month30}</b></div>
            </div>
          )}
          <div className="grid-2">
            <div className="panel">
              <h3>{d.month ? `Latest in ${monthName(d.month, true)}` : "Recent enquiries"}</h3>
              {d.recent.length === 0 ? <div className="empty">{d.month ? `No enquiries in ${monthName(d.month)}.` : "No enquiries yet. They will appear here as soon as someone submits the website form."}</div> : (
                <table className="tbl">
                  <tbody>
                    {d.recent.map((r) => (
                      <tr key={r.id}>
                        <td><div className="nm">{r.name}</div><div className="sub">{r.phone}</div></td>
                        <td className="sub" data-label="Property">{r.property_type || "—"}</td>
                        <td data-label="Status"><span className={`pill ${r.status}`}>{label(r.status)}</span></td>
                        <td className="sub" data-label="Timestamp" style={{ whiteSpace: "nowrap" }}>{fmtDate(r.created_at)}</td>
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
