"use client";
import { useState } from "react";

export default function FaqList({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq" data-reveal="up">
      {faqs.map((f, i) => (
        <div className={`faq-item ${open === i ? "open" : ""}`} key={f.id}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="q">{f.q}</span>
            <span className="pm" />
          </button>
          <div className="faq-a"><div><p>{f.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}
