/**
 * Date filters for leads, always in Indian time (IST, UTC+5:30), whatever time zone
 * the server or MySQL session uses. created_at is compared as a UNIX epoch so the
 * filter never drifts by 5.5 hours between local and Hostinger.
 */
const IST = 19800; // seconds

/** SQL expression: the lead's month in IST, e.g. "2026-11" */
export const IST_MONTH_SQL =
  "DATE_FORMAT(TIMESTAMPADD(SECOND, UNIX_TIMESTAMP(created_at) + 19800, '1970-01-01 00:00:00'), '%Y-%m')";

const dayStart = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) / 1000 - IST : null;
};
const monthBounds = (s) => {
  const m = /^(\d{4})-(\d{2})$/.exec(s || "");
  if (!m) return null;
  return [Date.UTC(+m[1], +m[2] - 1, 1) / 1000 - IST, Date.UTC(+m[1], +m[2], 1) / 1000 - IST];
};

/** Reads ?month=YYYY-MM or ?from=YYYY-MM-DD&to=YYYY-MM-DD and returns SQL conditions. */
export function dateRange(sp) {
  const where = [];
  const params = [];
  let from = null;
  let toEx = null;
  const mb = monthBounds(sp.get("month"));
  if (mb) [from, toEx] = mb;
  else {
    from = dayStart(sp.get("from"));
    const t = dayStart(sp.get("to"));
    toEx = t === null ? null : t + 86400; // "to" day is inclusive
  }
  if (from !== null) { where.push("UNIX_TIMESTAMP(created_at) >= ?"); params.push(from); }
  if (toEx !== null) { where.push("UNIX_TIMESTAMP(created_at) < ?"); params.push(toEx); }
  return { where, params, active: from !== null || toEx !== null };
}

/** The current month in IST, "YYYY-MM" */
export const thisMonthIST = () => new Date(Date.now() + IST * 1000).toISOString().slice(0, 7);

/** Every month from the first lead's month up to this month (newest first), with lead counts. */
export function fillMonths(rows) {
  const counts = Object.fromEntries(rows.map((r) => [r.ym, Number(r.c)]));
  const now = thisMonthIST();
  const first = rows.map((r) => r.ym).filter(Boolean).sort()[0] || now;
  const out = [];
  let [y, m] = now.split("-").map(Number);
  for (let i = 0; i < 240; i++) {
    const ym = `${y}-${String(m).padStart(2, "0")}`;
    out.push({ ym, c: counts[ym] || 0 });
    if (ym <= first) break;
    m -= 1; if (m === 0) { m = 12; y -= 1; }
  }
  return out;
}
