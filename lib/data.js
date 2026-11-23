import { FAQS, CONTACT, PLACEHOLDERS } from "./defaults";

/** FAQs for the Home page — edit them in FAQS in lib/defaults.js. */
export async function getPublicFaqs() {
  return FAQS.map((f, i) => ({ id: i + 1, ...f }));
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
