// ============================================================================
// PORTFOLIO — real Anveya projects (Residential + Commercial)
// ----------------------------------------------------------------------------
// Structure follows the "Portfolio website: page structure & room-wise project
// layout" plan:
//   /portfolio                        hub (categories, featured, all projects)
//   /portfolio/residential            residential listing
//   /portfolio/commercial             commercial listing
//   /portfolio/residential/<slug>     residential project (room-wise)
//   /portfolio/commercial/<slug>      commercial project (zone-wise)
//
// HOW TO EDIT
// • Text and images below are PLACEHOLDERS so the layout can be reviewed.
//   Replace them with verified project details and real photographs.
// • Only add facts that are verified — no invented dates, areas or budgets.
// • Leave a room/zone out entirely if the project does not include it; the
//   page only shows the sections listed here.
// • `sampleImages: true` shows a small note that the photos are placeholders.
//   Set it to false once real project photography is added.
// • status: "completed" | "ongoing" | null (null = not shown)
// • For ongoing projects, `stages` drives the progress tracker. Only mark a
//   stage "done" when it is confirmed. state: "done" | "current" | "next"
// ============================================================================
import { IMG } from "./defaults";

const img = (src, caption) => ({ src, caption });

export const STATUS_LABEL = { completed: "Completed", ongoing: "Ongoing" };

export const STAGES = ["Concept approved", "Drawings", "Material selection", "Execution", "Finishing", "Handover"];

export const PORTFOLIO = [
  /* ---------------------------------------------------------------- RESIDENTIAL */
  {
    slug: "rahatani",
    category: "residential",
    title: "Rahatani Residence",
    swash: "R",
    location: "Rahatani, Pune",
    status: "completed",
    type: "Residential · Complete home interior",
    concept: "A warm, practical family home where every room is planned around how the family actually lives.",
    featured: true,
    sampleImages: true,
    cover: IMG.living2,
    hero: IMG.hero,
    glance: [
      ["Project type", "Complete home interior"],
      ["Location", "Rahatani, Pune"],
      ["Status", "Completed"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "The family wanted a home that felt calm and uncluttered, with enough storage for everyday life and spaces that work for both quiet evenings and hosting relatives.",
      challenge: "Bringing generous storage into every room without making the home feel heavy, and connecting the living and dining areas so they read as one open space.",
      response: "A restrained palette of warm woods and soft neutrals, storage built into walls rather than standing furniture, and layered lighting that shifts the mood from day to evening.",
    },
    rooms: [
      {
        id: "living", name: "Living Room",
        headline: "A living room planned around conversation",
        text: "The seating layout faces inward to encourage conversation, with the TV unit kept low and integrated into a full-height panel. Layered lighting — ambient, task and accent — lets the room shift from bright family time to a softer evening setting.",
        images: [img(IMG.living2, "Living room — seating layout"), img(IMG.living1, "TV unit and wall panelling"), img(IMG.detail1, "Accent lighting detail")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "A kitchen built around a clear workflow",
        text: "Storage zones follow the cooking sequence — store, prepare, cook, serve — so everything sits close to where it is used. Durable, easy-clean finishes keep the space practical for daily cooking.",
        images: [img(IMG.kitchen1, "Kitchen — full view"), img(IMG.kitchen2, "Cabinetry and storage zones"), img(IMG.kitchen3, "Counter and hardware detail")],
      },
      {
        id: "dining", name: "Dining",
        headline: "Dining that connects to the living area",
        text: "The dining table sits on the axis of the living room, with a pendant light marking it as the focal point. Shared materials link the two spaces visually.",
        images: [img(IMG.home1, "Dining area — overall composition"), img(IMG.living3, "Visual link to the living area"), img(IMG.detail1, "Pendant lighting")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm, restful master bedroom",
        text: "A full-height wardrobe keeps storage out of sight, while a panelled bed wall with soft bedside lighting gives the room a quiet, hotel-like feel.",
        images: [img(IMG.bedroom1, "Master bedroom — wide view"), img(IMG.bedroom2, "Bed wall and bedside lighting"), img(IMG.bedroom4, "Wardrobe detail")],
      },
      {
        id: "bedrooms", name: "Other Bedrooms",
        headline: "Bedrooms designed for their purpose",
        text: "The second bedroom doubles as a study, with a compact desk and flexible storage that adapts as needs change.",
        images: [img(IMG.bedroom3, "Second bedroom"), img(IMG.bedroom4, "Study and storage")],
      },
    ],
    details: [
      img(IMG.detail1, "Layered lighting"),
      img(IMG.kitchen3, "Cabinet hardware"),
      img(IMG.bedroom4, "Wardrobe finish"),
      img(IMG.living1, "Wall panelling"),
    ],
    delivery: {
      execution: "Execution was coordinated in stages — civil and electrical work first, followed by carpentry, finishes and lighting — with regular site reviews against the approved design.",
      handover: "The home was handed over after a final walk-through, checking each room against the agreed design and finishing details.",
    },
  },
  {
    slug: "pimple-saudagar",
    category: "residential",
    title: "Pimple Saudagar Residence",
    swash: "P",
    location: "Pimple Saudagar, Pune",
    status: "completed",
    type: "Residential · Complete home interior",
    concept: "A cohesive apartment interior focused on layout, smart storage and a consistent material palette.",
    featured: true,
    sampleImages: true,
    cover: IMG.home2,
    hero: IMG.heroAbout,
    glance: [
      ["Project type", "Complete home interior"],
      ["Location", "Pimple Saudagar, Pune"],
      ["Status", "Completed"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "A young family wanted a modern home that stays organised, with a dedicated pooja space and room for the children to grow.",
      challenge: "Making compact rooms feel open while fitting in the storage the family needed.",
      response: "Light, consistent materials throughout, built-in storage planned to the centimetre, and a pooja unit designed as a calm focal point.",
    },
    rooms: [
      {
        id: "living", name: "Living Room",
        headline: "An open, light-filled living room",
        text: "A light palette and slim-profile furniture keep the room feeling open, while a single feature wall anchors the TV and storage.",
        images: [img(IMG.living3, "Living room"), img(IMG.living4, "Feature wall"), img(IMG.detail1, "Lighting detail")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "Compact kitchen, generous storage",
        text: "Tall units and corner solutions make the most of every wall, with a durable finish chosen for everyday use.",
        images: [img(IMG.kitchen2, "Kitchen"), img(IMG.kitchen1, "Tall storage units"), img(IMG.kitchen3, "Hardware close-up")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A master bedroom with a quiet palette",
        text: "Soft textures, a warm bed wall and concealed wardrobe storage create a restful room.",
        images: [img(IMG.bedroom2, "Master bedroom"), img(IMG.bedroom1, "Bed wall"), img(IMG.bedroom4, "Wardrobe")],
      },
      {
        id: "bedrooms", name: "Kids' Bedroom",
        headline: "A kids' room that can grow with them",
        text: "Flexible storage and a study corner that can adapt as the children grow.",
        images: [img(IMG.bedroom3, "Kids' bedroom"), img(IMG.bedroom4, "Study corner")],
      },
      {
        id: "pooja", name: "Pooja",
        headline: "A pooja space as a calm focal point",
        text: "A compact pooja unit with soft lighting, designed to fit naturally into the home.",
        images: [img(IMG.detail1, "Pooja unit lighting"), img(IMG.home1, "Pooja unit in context")],
      },
    ],
    details: [
      img(IMG.kitchen3, "Hardware"),
      img(IMG.detail1, "Lighting"),
      img(IMG.bedroom4, "Storage"),
      img(IMG.living4, "Feature wall"),
    ],
    delivery: {
      execution: "Work was sequenced room by room so the family could plan their move, with materials approved before each stage began.",
      handover: "Handed over after a detailed walk-through and finishing review.",
    },
  },
  {
    slug: "akurdi",
    category: "residential",
    title: "Akurdi Residence",
    swash: "A",
    location: "Akurdi, Pune",
    status: "ongoing",
    type: "Residential · Home interior (in progress)",
    concept: "A home interior currently in progress — shown through approved design visuals and site updates.",
    featured: false,
    sampleImages: true,
    cover: IMG.living4,
    hero: IMG.living4,
    glance: [
      ["Project type", "Home interior"],
      ["Location", "Akurdi, Pune"],
      ["Status", "Ongoing"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "The homeowners want a warm, easy-to-maintain home with a functional kitchen and well-planned bedrooms.",
      challenge: "Balancing a warm material palette with low-maintenance finishes suited to daily family life.",
      response: "A design built around durable surfaces, concealed storage and warm accent materials — currently moving from approved concept into execution.",
    },
    rooms: [
      {
        id: "living", name: "Living Room",
        headline: "Living room — approved design direction",
        text: "The approved concept centres on a warm feature wall and integrated storage. Visuals below are design visualisations, not completed photographs.",
        images: [img(IMG.living4, "Design visualisation — living room"), img(IMG.living1, "Design visualisation — feature wall"), img(IMG.detail1, "Material reference")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "Kitchen — layout and materials",
        text: "Kitchen layout and finishes have been finalised; site work is in progress.",
        images: [img(IMG.kitchen1, "Design visualisation — kitchen"), img(IMG.kitchen3, "Material reference")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "Master bedroom — design intent",
        text: "A calm palette with a panelled bed wall and full-height wardrobe.",
        images: [img(IMG.bedroom1, "Design visualisation — master bedroom"), img(IMG.bedroom2, "Design visualisation — bed wall")],
      },
    ],
    stages: [
      ["Concept approved", "done"],
      ["Drawings", "done"],
      ["Material selection", "done"],
      ["Execution", "current"],
      ["Finishing", "next"],
      ["Handover", "next"],
    ],
    progressNote: "Progress is updated as stages are confirmed on site.",
  },
  {
    slug: "kaspate-wasti",
    category: "residential",
    title: "Kaspate Wasti Residence",
    swash: "K",
    location: "Kaspate Wasti, Pune",
    status: "ongoing",
    type: "Residential · Home interior (in progress)",
    concept: "A home in the planning and development stage — shown through design intent and confirmed stages.",
    featured: false,
    sampleImages: true,
    cover: IMG.bedroom2,
    hero: IMG.living3,
    glance: [
      ["Project type", "Home interior"],
      ["Location", "Kaspate Wasti, Pune"],
      ["Status", "Ongoing"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    story: {
      needs: "The client wants a contemporary home with an open living–dining area and restful bedrooms.",
      challenge: "Creating a sense of openness between the living and dining spaces while keeping clear zones for each.",
      response: "An open plan defined by lighting and material changes rather than walls — currently in the drawings stage.",
    },
    rooms: [
      {
        id: "living", name: "Living Room",
        headline: "Living room — design intent",
        text: "An open, light-filled living space defined by a feature wall. Visuals are design references, not completed photographs.",
        images: [img(IMG.living3, "Design reference — living room"), img(IMG.living2, "Design reference — seating")],
      },
      {
        id: "dining", name: "Dining",
        headline: "Dining — open to the living area",
        text: "The dining zone is defined by a pendant light and a change in flooring.",
        images: [img(IMG.home1, "Design reference — dining"), img(IMG.detail1, "Lighting reference")],
      },
      {
        id: "bedrooms", name: "Bedrooms",
        headline: "Bedrooms — planned for rest and storage",
        text: "Bedrooms are planned with full-height storage and soft, layered lighting.",
        images: [img(IMG.bedroom2, "Design reference — bedroom"), img(IMG.bedroom3, "Design reference — storage")],
      },
    ],
    stages: [
      ["Concept approved", "done"],
      ["Drawings", "current"],
      ["Material selection", "next"],
      ["Execution", "next"],
      ["Finishing", "next"],
      ["Handover", "next"],
    ],
    progressNote: "Stages are marked complete only once confirmed.",
  },

  /* ---------------------------------------------------------------- COMMERCIAL */
  {
    slug: "dental-clinic",
    category: "commercial",
    title: "Dental Clinic",
    swash: "D",
    location: "Pune",
    status: null,
    type: "Commercial · Healthcare",
    subtitle: "Patient-facing healthcare interior",
    concept: "A calm, reassuring clinic interior that makes the patient journey feel simple and welcoming.",
    featured: true,
    sampleImages: true,
    cover: IMG.office2,
    hero: IMG.office1,
    glance: [
      ["Project type", "Dental clinic"],
      ["Category", "Commercial / Healthcare"],
      ["Location", "Pune"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    brief: [
      ["Patient experience", "Patients should feel calm and at ease from the moment they enter."],
      ["Operational needs", "Clear separation between patient areas and clinical support spaces."],
      ["Brand feeling", "Clean, modern and trustworthy, with warmth to soften the clinical setting."],
    ],
    flow: ["Entrance", "Reception & check-in", "Waiting", "Consultation", "Treatment", "Exit"],
    zones: [
      {
        id: "reception", name: "Reception",
        headline: "A welcoming first impression",
        text: "The welcome desk faces the entrance with clear signage, so check-in is simple and patients are oriented immediately.",
        images: [img(IMG.office2, "Reception — welcome desk"), img(IMG.detail1, "Signage and lighting")],
      },
      {
        id: "waiting", name: "Waiting",
        headline: "Comfortable, well-lit waiting",
        text: "Seating is arranged for comfort and easy circulation, with soft, indirect lighting to keep the space calm.",
        images: [img(IMG.office3, "Waiting area"), img(IMG.living1, "Seating detail")],
      },
      {
        id: "treatment", name: "Treatment",
        headline: "An efficient operatory layout",
        text: "The operatory is planned around the clinician's workflow, with easy-clean surfaces throughout.",
        images: [img(IMG.office1, "Treatment area"), img(IMG.kitchen3, "Storage detail")],
      },
      {
        id: "support", name: "Support Spaces",
        headline: "Organised support spaces",
        text: "Sterilisation and storage are kept separate from patient areas.",
        images: [img(IMG.kitchen2, "Support and storage")],
      },
    ],
    designDetails: ["Soft, glare-free lighting", "Privacy between patient areas", "Clear wayfinding", "Maintenance-minded surfaces", "Integrated storage", "Discreet branding"],
    outcome: "A clinic interior designed around patient comfort and an efficient clinical workflow.",
  },
  {
    slug: "skin-clinic",
    category: "commercial",
    title: "Skin Clinic",
    swash: "S",
    location: "Pune",
    status: null,
    type: "Commercial · Healthcare",
    subtitle: "Consultation and treatment environment",
    concept: "A refined, private clinic environment that reflects care, calm and attention to detail.",
    featured: false,
    sampleImages: true,
    cover: IMG.office3,
    hero: IMG.office2,
    glance: [
      ["Project type", "Skin clinic"],
      ["Category", "Commercial / Healthcare"],
      ["Location", "Pune"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    brief: [
      ["Patient experience", "A private, premium experience that puts clients at ease."],
      ["Operational needs", "Separate consultation and treatment spaces with discreet storage."],
      ["Brand feeling", "Soft, elegant and calm — reflecting the clinic's identity."],
    ],
    flow: ["Entrance", "Reception", "Waiting", "Consultation", "Treatment", "Exit"],
    zones: [
      {
        id: "reception", name: "Reception",
        headline: "Identity from the first impression",
        text: "The reception counter introduces the clinic's identity through materials and lighting.",
        images: [img(IMG.office3, "Reception counter"), img(IMG.detail1, "Lighting detail")],
      },
      {
        id: "waiting", name: "Waiting",
        headline: "A calm, private waiting area",
        text: "Seating is arranged for privacy, with soft lighting and warm finishes.",
        images: [img(IMG.living4, "Waiting area"), img(IMG.living1, "Seating detail")],
      },
      {
        id: "consultation", name: "Consultation",
        headline: "A comfortable consultation room",
        text: "A quiet room designed for unhurried conversations.",
        images: [img(IMG.office1, "Consultation room")],
      },
      {
        id: "treatment", name: "Treatment",
        headline: "A considered treatment space",
        text: "Treatment rooms balance clinical function with a calm, comfortable atmosphere.",
        images: [img(IMG.bedroom3, "Treatment room"), img(IMG.kitchen3, "Storage detail")],
      },
    ],
    designDetails: ["Soft, flattering lighting", "Privacy-first layout", "Clear wayfinding", "Easy-clean surfaces", "Discreet product storage", "Brand-led materials"],
    outcome: "A clinic interior that supports a calm, private client experience.",
  },
];

export const RESIDENTIAL = PORTFOLIO.filter((p) => p.category === "residential");
export const COMMERCIAL = PORTFOLIO.filter((p) => p.category === "commercial");

export const projectHref = (p) => `/portfolio/${p.category}/${p.slug}`;
export const getPortfolio = (category, slug) => PORTFOLIO.find((p) => p.category === category && p.slug === slug);

/** Two related projects: same category first, then the others. */
export function getRelated(p, n = 2) {
  const same = PORTFOLIO.filter((x) => x.category === p.category && x.slug !== p.slug);
  const other = PORTFOLIO.filter((x) => x.category !== p.category);
  return [...same, ...other].slice(0, n);
}

/** Title split into two display lines with a script swash on the first letter. */
export function projectTitleLines(p) {
  const [first, ...rest] = p.title.split(" ");
  const sw = `*${first[0]}*${first.slice(1)}`;
  return rest.length ? [sw, rest.join(" ")] : [sw];
}
