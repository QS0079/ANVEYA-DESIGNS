import { CONTACT } from "./defaults";

/** Public website address used in WhatsApp messages (WhatsApp shows the logo preview card for it). */
export const SITE_URL = "https://anveyadesigns.com";

/** Indian mobile → wa.me number (adds 91 to 10-digit numbers, drops a leading 0). */
export const waNumber = (phone) => {
  const d = String(phone || "").replace(/\D/g, "").replace(/^0+/, "");
  return d.length === 10 ? `91${d}` : d;
};

/** wa.me link with a pre-filled message. */
export const waLink = (phone, text) => `https://wa.me/${waNumber(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const first = (name) => String(name || "").trim().split(/\s+/)[0] || "";
const studioPhone = () => CONTACT.phone || "";

/**
 * Admin → lead: the first reply sent from the Leads panel to the number the visitor gave.
 * Professional, personalised with the lead's details, signed by the studio.
 */
export function leadReplyMessage(lead = {}) {
  const name = first(lead.name);
  const space = lead.property_type && lead.property_type !== "Other" ? lead.property_type.toLowerCase().replace(/\bbhk\b/g, "BHK") : "space";
  const where = lead.location ? ` in ${lead.location}` : "";
  const lines = [
    `Hello${name ? ` ${name}` : ""},`,
    "",
    "Greetings from *Anveya Designs* – Residential & Commercial Interior Design Studio, Pune.",
    "",
    `Thank you for your enquiry about the interiors of your ${space}${where}. We have received your details and would be glad to understand your space, requirements and style preferences.`,
    "",
    "To take this forward, we can:",
    "• Schedule a quick call to discuss your requirements",
    "• Plan a site visit or a meeting at our studio",
    "• Share design ideas suited to your space and budget",
    "",
    "Please let us know a convenient day and time to connect.",
    "",
    "You can explore our recent projects here:",
    `${SITE_URL}/portfolio`,
    "",
    "Warm regards,",
    "*Team Anveya Designs*",
    "Interior Design Studio, Pune",
    ...(studioPhone() ? [`📞 ${studioPhone()}`] : []),
    `🌐 ${SITE_URL}`,
  ];
  return lines.join("\n");
}

/** Visitor → studio: from the "Chat on WhatsApp" link on a project page. */
export function visitorMessage({ project, path } = {}) {
  const lines = [
    "Hello Anveya Designs,",
    "",
    project
      ? `I came across the *${project}* project on your website and would like to discuss an interior project with your team.`
      : "I came across your website and would like to discuss an interior project with your team.",
    ...(path ? ["", `${SITE_URL}${path}`] : []),
    "",
    "A few details about my space:",
    "• Name: ",
    "• Location: ",
    "• Type of space (flat / villa / office / clinic): ",
    "• Approximate budget: ",
    "• Preferred timeline: ",
    "",
    "Please let me know a convenient time to connect.",
    "",
    "Thank you & regards",
  ];
  return lines.join("\n");
}
