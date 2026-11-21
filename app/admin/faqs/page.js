"use client";
import { useEffect, useState } from "react";
import { api } from "@/components/admin/util";

export default function FaqsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null); // id being edited
  const [draft, setDraft] = useState({ question: "", answer: "" });
  const [adding, setAdding] = useState(false);
  const [nw, setNw] = useState({ question: "", answer: "" });
  const [toast, setToast] = useState("");
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const load = () => api("/api/admin/faqs").then((d) => { setRows(d.rows); setLoading(false); }).catch((e) => flash(e.message));
  useEffect(() => { load(); }, []);

  const add = async () => {
    try {
      await api("/api/admin/faqs", { method: "POST", body: JSON.stringify(nw) });
      setNw({ question: "", answer: "" }); setAdding(false); flash("FAQ added"); load();
    } catch (e) { flash(e.message); }
  };
  const save = async (id) => {
    try {
      await api(`/api/admin/faqs/${id}`, { method: "PATCH", body: JSON.stringify(draft) });
      setEdit(null); flash("FAQ updated"); load();
    } catch (e) { flash(e.message); }
  };
  const toggle = async (r) => {
    await api(`/api/admin/faqs/${r.id}`, { method: "PATCH", body: JSON.stringify({ is_active: !r.is_active }) });
    flash(r.is_active ? "Hidden from website" : "Visible on website"); load();
  };
  const del = async (r) => {
    if (!confirm("Delete this FAQ? This cannot be undone.")) return;
    await api(`/api/admin/faqs/${r.id}`, { method: "DELETE" });
    flash("FAQ deleted"); load();
  };
  const move = async (i, d) => {
    const ids = rows.map((r) => r.id);
    [ids[i], ids[i + d]] = [ids[i + d], ids[i]];
    setRows(ids.map((id) => rows.find((r) => r.id === id)));
    await api("/api/admin/faqs/reorder", { method: "POST", body: JSON.stringify({ ids }) });
  };

  return (
    <>
      <div className="adm-head">
        <div><h1>FAQs</h1><p>These appear in the FAQ section of the home page, in this order.</p></div>
        <button className="abtn" onClick={() => setAdding((a) => !a)}>{adding ? "Cancel" : "+ Add FAQ"}</button>
      </div>

      {adding && (
        <div className="panel" style={{ marginBottom: 16 }}>
          <h3>New FAQ</h3>
          <div className="edit-form">
            <input className="inp" placeholder="Question" value={nw.question} onChange={(e) => setNw({ ...nw, question: e.target.value })} />
            <textarea className="ta" placeholder="Answer" value={nw.answer} onChange={(e) => setNw({ ...nw, answer: e.target.value })} />
            <div><button className="abtn" onClick={add} disabled={!nw.question.trim() || !nw.answer.trim()}>Add FAQ</button></div>
          </div>
        </div>
      )}

      <div className="faq-admin">
        {!loading && rows.length === 0 && <div className="panel empty">No FAQs yet. Add your first one.</div>}
        {rows.map((r, i) => (
          <div className={`item ${r.is_active ? "" : "off"}`} key={r.id}>
            <div className="ord">
              <button aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
              <button aria-label="Move down" disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</button>
            </div>
            {edit === r.id ? (
              <div className="edit-form">
                <input className="inp" value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} />
                <textarea className="ta" value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="abtn sm" onClick={() => save(r.id)}>Save</button>
                  <button className="abtn ghost sm" onClick={() => setEdit(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="q">{r.question}</div>
                <div className="a">{r.answer}</div>
              </div>
            )}
            <div className="acts">
              <button className={`switch ${r.is_active ? "on" : ""}`} title={r.is_active ? "Visible — click to hide" : "Hidden — click to show"} onClick={() => toggle(r)} />
              {edit !== r.id && <button className="abtn ghost sm" onClick={() => { setEdit(r.id); setDraft({ question: r.question, answer: r.answer }); }}>Edit</button>}
              <button className="abtn danger sm" onClick={() => del(r)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
