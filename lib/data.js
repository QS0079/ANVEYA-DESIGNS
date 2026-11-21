import { query } from "./db";
import { DEFAULT_FAQS, CONTACT, PLACEHOLDERS } from "./defaults";

/** Active FAQs for the public site. Falls back to the doc FAQs if the DB is unreachable. */
export async function getPublicFaqs() {
  try {
    const rows = await query(
      "SELECT id, question, answer FROM faqs WHERE is_active = 1 ORDER BY sort_order ASC, id ASC"
    );
    return rows.map((r) => ({ id: r.id, q: r.question, a: r.answer }));
  } catch (e) {
    console.error("[faqs] DB unavailable, using defaults:", e.message);
    return DEFAULT_FAQS.map((f, i) => ({ id: i + 1, ...f }));
  }
}

/** Contact details (edit CONTACT in lib/defaults.js). */
export async function getSettings() {
  return { ...CONTACT };
}

/** Contact details with the doc placeholders filled in for empty values (used in legal pages). */
export async function getContactBlock() {
  const s = await getSettings();
  return {
    email: s.email || PLACEHOLDERS.email,
    phone: s.phone || PLACEHOLDERS.phone,
    address: s.address || PLACEHOLDERS.address,
    jurisdiction: s.jurisdiction || PLACEHOLDERS.jurisdiction,
  };
}
