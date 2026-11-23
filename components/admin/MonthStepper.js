"use client";
import { monthName } from "./util";

/** The current month in Indian time, "YYYY-MM". */
export const thisMonth = () => new Date(Date.now() + 19800000).toISOString().slice(0, 7);

/**
 * ‹ November 2026 ›  — pick a month from the list or step with the arrows.
 * months: [{ ym, c }] newest first. value "" = all months.
 */
export default function MonthStepper({ value, onChange, months, allLabel = "All months", label = "Month" }) {
  const list = months.length ? months : [{ ym: thisMonth(), c: 0 }];
  const i = list.findIndex((m) => m.ym === value);
  const older = value ? list[i + 1] : list.find((m) => m.ym === thisMonth()) || list[0];
  const newer = value && i > 0 ? list[i - 1] : null;
  const byYear = list.reduce((acc, m) => { (acc[m.ym.slice(0, 4)] ||= []).push(m); return acc; }, {});

  return (
    <div className="mstep" role="group" aria-label={label}>
      <button type="button" className="mstep-arr" aria-label="Previous month" disabled={!older} onClick={() => older && onChange(older.ym)}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <select className="sel mstep-sel" aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allLabel}</option>
        {Object.keys(byYear).sort().reverse().map((y) => (
          <optgroup key={y} label={y}>
            {byYear[y].map((m) => (
              <option key={m.ym} value={m.ym}>
                {monthName(m.ym)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <button type="button" className="mstep-arr" aria-label="Next month" disabled={!newer} onClick={() => newer && onChange(newer.ym)}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}
