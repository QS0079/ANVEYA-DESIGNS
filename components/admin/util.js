// All admin dates are shown in Indian time, matching the month / date filters.
const TZ = "Asia/Kolkata";
export const fmtDate = (d) => {
  if (!d) return "";
  const x = new Date(d);
  return x.toLocaleString("en-IN", { timeZone: TZ, day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};
/** { date: "23 Nov 2026", time: "6:49:12 pm" } */
export const fmtStamp = (d) => {
  if (!d) return { date: "", time: "" };
  const x = new Date(d);
  return {
    date: x.toLocaleDateString("en-IN", { timeZone: TZ, day: "2-digit", month: "short", year: "numeric" }),
    time: x.toLocaleTimeString("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }),
  };
};
/** "2026-11" -> "November 2026" (short: "Nov 2026") */
export const monthName = (ym, short = false) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString("en-IN", { timeZone: "UTC", month: short ? "short" : "long", year: "numeric" });
};
/** last day of "YYYY-MM" as "YYYY-MM-DD" */
export const monthEnd = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return `${ym}-${String(new Date(Date.UTC(y, m, 0)).getUTCDate()).padStart(2, "0")}`;
};
export async function api(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { "Content-Type": "application/json", ...(opts.headers || {}) } });
  if (res.status === 401) { location.href = "/login?next=" + encodeURIComponent(location.pathname); throw new Error("Unauthorized"); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
