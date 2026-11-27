// Content defaults taken from "Anveya Design Website Content" doc.

// Default FAQs from the content doc — added to the database on first install.
// After that, manage FAQs in Admin → FAQs.
export const FAQS = [
  {
    q: "What types of interior design projects does Anveya Designs undertake?",
    a: "Anveya Designs specialises in residential and commercial interior design. This includes home interiors, living rooms, bedrooms, kitchens, offices and other commercial environments, depending on project requirements.",
  },
  {
    q: "Do you provide complete home interior design solutions?",
    a: "Yes, we can discuss complete home interior design requirements, from initial space planning and concept development to material selection and execution, depending on the agreed scope of work.",
  },
  {
    q: "Can I customise the interior design according to my preferences?",
    a: "Absolutely. Every project begins with understanding your preferences, lifestyle, functional needs and design expectations. The proposed design is developed around these requirements.",
  },
  {
    q: "Do you undertake commercial interior design projects?",
    a: "Yes. We work on commercial interior design requirements, creating functional and visually cohesive environments suited to different business needs.",
  },
  {
    q: "How much does an interior design project cost?",
    a: "The cost depends on the size of the space, design requirements, materials, finishes and scope of work. Contact us to discuss your project and receive a customised estimate.",
  },
  {
    q: "How can I get started with Anveya Designs?",
    a: "You can contact us through our website enquiry form, phone or email. Share a few details about your space and requirements, and our team can guide you through the next steps.",
  },
];

// Business contact details — fill these in. Empty values are hidden in the footer / contact page
// and shown as the doc placeholders ([Business Email] etc.) in the policy pages.
export const CONTACT = {
  email: "",
  phone: "+91 86008 90909",
  address: "S. No. 74/1/4, Shivneri Niwas,\nJyotiba Nagar, Kalewadi,\nPimpri, Pune – 411017",
  jurisdiction: "",
  instagram: "https://www.instagram.com/anveyadesigns/",
  facebook: "https://www.facebook.com/profile.php?id=61596560500622",
  youtube: "https://www.youtube.com/@AnveyaDesigns",
  linkedin: "",
  pinterest: "",
};

/** Social profiles that have a URL, in display order. */
export const socialLinks = (c = CONTACT) =>
  [["Instagram", c.instagram], ["Facebook", c.facebook], ["YouTube", c.youtube], ["LinkedIn", c.linkedin], ["Pinterest", c.pinterest]]
    .filter(([, url]) => url);

export const PLACEHOLDERS = {
  email: "[Business Email]",
  phone: "[Contact Number]",
  address: "[Business Address]",
  jurisdiction: "[City, State]",
};

export const NAV = [
  { href: "/about-us", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
];

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal Sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

// ---- Enquiry form options (edit freely) ----
export const BUDGETS = [
  "₹10 – 20 Lakh",
  "₹20 – 35 Lakh",
  "₹35 – 50 Lakh",
  "₹50 – 75 Lakh",
  "₹75 Lakh – 1 Crore",
  "₹1 Crore +",
];
export const LOCATIONS = ["Pune", "PCMC"];
export const PROPERTY_TYPE_GROUPS = [
  { label: "Residential", options: ["Apartment / Flat", "Villa / Bungalow", "Row House", "Penthouse"] },
  { label: "Commercial", options: ["Office", "Retail / Showroom", "Restaurant / Café", "Clinic / Salon", "Other Commercial"] },
];
export const PROPERTY_TYPES = PROPERTY_TYPE_GROUPS.flatMap((g) => g.options);
export const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Just exploring",
];

// Enquiry popup: opens automatically this many seconds after the page loads, and again the same
// number of seconds after each time it is closed (0 = never auto-open). It keeps opening
// even after the visitor has submitted the form.
// It always opens when someone clicks a "Book a Consultation" button.
export const POPUP_AUTO_OPEN_SECONDS = 60; // popup opens on its own after 60 seconds

// Stock photography (Unsplash) — replace with your own project photos.
const u = (id, w = 1800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const IMG = {
  hero: u("1618221195710-dd6b41faaea6", 2400),
  heroAbout: u("1600607687939-ce8a6c25118c", 2400),
  heroPortfolio: u("1600210492486-724fe5c67fb0", 2400),
  heroContact: u("1586023492125-27b2c045efd7", 2400),
  living1: u("1600210492486-724fe5c67fb0"),
  living2: u("1618219908412-a29a1bb7b86e"),
  living3: u("1493809842364-78817add7ffb"),
  living4: u("1556228453-efd6c1ff04f6"),
  bedroom1: u("1616594039964-ae9021a400a0"),
  bedroom2: u("1505693416388-ac5ce068fe85"),
  bedroom3: u("1505692795793-20f543407193"),
  bedroom4: u("1615874959474-d609969a20ed"),
  kitchen1: u("1600489000022-c2086d79f9d4"),
  kitchen2: u("1771888703722-ee7ad9143a67"),
  kitchen4: u("1622372738946-62e02505feb3"),
  kitchen3: u("1484154218962-a197022b5858"),
  office1: u("1497366216548-37526070297c"),
  office2: u("1524758631624-e2822e304c36"),
  office3: u("1497215728101-856f4ea42174"),
  office4: u("1631193816258-28b44b21e78b"),
  detail1: u("1616486338812-3dadae4b4ace"),
};
