import { query } from "./db";
import { FAQS, CONTACT, PLACEHOLDERS } from "./defaults";

/**
 * FAQs for the Home page — managed in Admin → FAQs (only active ones, in the admin's order).
 * If the database can't be reached, the default FAQs are shown so the section never breaks.
 */
export async function getPublicFaqs() {
  try {
    const rows = await query("SELECT id, question, answer FROM faqs WHERE is_active = 1 ORDER BY sort_order ASC, id ASC");
    return rows.map((r) => ({ id: r.id, q: r.question, a: r.answer }));
  } catch (e) {
    console.error("[faqs] DB unavailable, showing default FAQs:", e.message);
    return FAQS.map((f, i) => ({ id: i + 1, ...f }));
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
