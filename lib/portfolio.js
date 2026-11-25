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
// • Each room / zone shows at most 2 photos (MAX_PHOTOS below).
// • `sampleImages: true` shows a small note that the photos are placeholders.
//   Set it to false once real project photography is added.
// • status: "completed" | "ongoing" | null (null = not shown)
// • For ongoing projects, `stages` drives the progress tracker. Only mark a
//   stage "done" when it is confirmed. state: "done" | "current" | "next"
// ============================================================================
import { IMG } from "./defaults";

const img = (src, caption) => ({ src, caption });

// Room- and clinic-specific stock photos (Unsplash) — placeholders until real project photos are added.
const u = (id, w = 1800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const PH = {
  // residential
  dining1: u("1616486886892-ff366aa67ba4"),
  dining2: u("1773578978637-c9771e7a9913"),
  dining3: u("1604578762246-41134e37f9cc"),
  dining4: u("1617098709804-705581f844eb"),
  dining5: u("1505409628601-edc9af17fda6"),
  kitchen4: u("1600489000022-c2086d79f9d4"),
  kitchen5: u("1771888703722-ee7ad9143a67"),
  kitchen6: u("1622372738946-62e02505feb3"),
  kids1: u("1763478958800-3a2a6321f645"),
  kids2: u("1687946803051-51da173a9f55"),
  study1: u("1766330977451-de1b64b5e641"),
  study2: u("1641998148499-cb6b55a3c0d3"),
  study3: u("1600494603989-9650cf6ddd3d"),
  dining6: u("1604578762246-41134e37f9cc"),
  // office
  offReception1: u("1758448093806-88b2089068ab"),
  offReception2: u("1677272295529-e72d5f7dd97e"),
  offWork1: u("1577412647305-991150c7d163"),
  offWork2: u("1718220216044-006f43e3a9b1"),
  offMeet1: u("1517502884422-41eaead166d4"),
  offMeet2: u("1637665662134-db459c1bbb46"),
  offCabin1: u("1715593949273-09009558300a"),
  offCabin2: u("1725913137143-8f160e27852c"),
  offCafe1: u("1790156592690-1b46d8b77cb5"),
  offCafe2: u("1560264273-de4cfc40fd0d"),
  offHero: u("1686100511314-7d4a52987f2f", 2400),
  // clinic
  clinReception1: u("1764727291644-5dcb0b1a0375"),
  clinReception2: u("1648775507324-b48dd3791fa5"),
  clinWaiting1: u("1629909614456-6b1c5c94cecc"),
  clinWaiting2: u("1777125080264-152acad7697f"),
  clinConsult1: u("1778151270886-f227700b0eba"),
  clinConsult2: u("1758691462878-6edc3d3da1be"),
  clinExam1: u("1787651343620-8d5303006ecb"),
  clinExam2: u("1766299892549-b56b257d1ddd"),
  clinHero: u("1648775507324-b48dd3791fa5", 2400),
};

export const MAX_PHOTOS = 2;

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
        images: [img(IMG.living2, "Living room — seating layout"), img(IMG.living1, "TV unit and wall panelling")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "A kitchen built around a clear workflow",
        text: "Storage zones follow the cooking sequence — store, prepare, cook, serve — so everything sits close to where it is used. Durable, easy-clean finishes keep the space practical for daily cooking.",
        images: [img(IMG.kitchen1, "Kitchen — full view"), img(IMG.kitchen2, "Cabinetry and storage zones")],
      },
      {
        id: "dining", name: "Dining",
        headline: "Dining that connects to the living area",
        text: "The dining table sits on the axis of the living room, with a pendant light marking it as the focal point. Shared materials link the two spaces visually.",
        images: [img(PH.dining2, "Dining area — overall composition"), img(PH.dining1, "Dining table and pendant lighting")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm, restful master bedroom",
        text: "A full-height wardrobe keeps storage out of sight, while a panelled bed wall with soft bedside lighting gives the room a quiet, hotel-like feel.",
        images: [img(IMG.bedroom1, "Master bedroom — wide view"), img(IMG.bedroom2, "Bed wall and bedside lighting")],
      },
      {
        id: "bedrooms", name: "Other Bedrooms",
        headline: "Bedrooms designed for their purpose",
        text: "The second bedroom doubles as a study, with a compact desk and flexible storage that adapts as needs change.",
        images: [img(IMG.bedroom3, "Second bedroom"), img(PH.study1, "Study desk and storage")],
      },
    ],
    details: [
      img(IMG.detail1, "Layered lighting"),
      img(PH.kitchen4, "Cabinet finish"),
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
    cover: IMG.living3,
    hero: IMG.heroAbout,
    glance: [
      ["Project type", "Complete home interior"],
      ["Location", "Pimple Saudagar, Pune"],
      ["Status", "Completed"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "A young family wanted a modern home that stays organised, with a place to work from home and room for the children to grow.",
      challenge: "Making compact rooms feel open while fitting in the storage the family needed.",
      response: "Light, consistent materials throughout, built-in storage planned to the centimetre, and a compact study tucked into the plan.",
    },
    rooms: [
      {
        id: "living", name: "Living Room",
        headline: "An open, light-filled living room",
        text: "A light palette and slim-profile furniture keep the room feeling open, while a single feature wall anchors the TV and storage.",
        images: [img(IMG.living3, "Living room"), img(IMG.living4, "Feature wall")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "Compact kitchen, generous storage",
        text: "Tall units and corner solutions make the most of every wall, with a durable finish chosen for everyday use.",
        images: [img(PH.kitchen5, "Kitchen"), img(PH.kitchen6, "Tall storage units")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A master bedroom with a quiet palette",
        text: "Soft textures, a warm bed wall and concealed wardrobe storage create a restful room.",
        images: [img(IMG.bedroom2, "Master bedroom"), img(IMG.bedroom1, "Bed wall")],
      },
      {
        id: "bedrooms", name: "Kids' Bedroom",
        headline: "A kids' room that can grow with them",
        text: "Flexible storage and a study corner that can adapt as the children grow.",
        images: [img(PH.kids1, "Kids' bedroom"), img(PH.kids2, "Shelving and toy storage")],
      },
      {
        id: "study", name: "Study",
        headline: "A quiet corner for work and study",
        text: "A compact work area with built-in shelving, planned so the family has a dedicated space to work from home.",
        images: [img(PH.study2, "Study area"), img(PH.study1, "Desk and shelving")],
      },
    ],
    details: [
      img(PH.kitchen6, "Kitchen storage"),
      img(IMG.detail1, "Lighting"),
    ],
    delivery: {
      execution: "Work was sequenced room by room so the family could plan their move, with materials approved before each stage began.",
      handover: "Handed over after a detailed walk-through and finishing review.",
    },
  },
  {
    slug: "wadgaon-sheri",
    category: "residential",
    title: "Wadgaon Sheri Residence",
    swash: "W",
    location: "Wadgaon Sheri, Viman Nagar, Pune",
    status: null,
    type: "Residential · Home interior",
    concept: "A bright, contemporary home where open living, a practical kitchen and restful bedrooms flow together.",
    featured: false,
    sampleImages: true,
    cover: IMG.heroAbout,
    hero: IMG.heroAbout,
    glance: [
      ["Project type", "Home interior"],
      ["Location", "Wadgaon Sheri, Viman Nagar, Pune"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "The homeowners wanted a light, modern home that feels open, stays easy to maintain and gives everyone a quiet corner of their own.",
      challenge: "Keeping the living, dining and kitchen connected while giving each area a clear purpose and enough storage.",
      response: "A soft neutral palette with warm wood accents, built-in storage along the walls and lighting that defines each zone without closing it off.",
    },
    rooms: [
      {
        id: "living", name: "Living Room",
        headline: "An open, light-filled living room",
        text: "Low, comfortable seating and a long media wall keep the room open and uncluttered, with natural light kept free to reach deep into the space.",
        images: [img(IMG.heroAbout, "Living room — overall view"), img(IMG.heroContact, "Reading corner")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "A bright kitchen with a breakfast counter",
        text: "Light cabinetry and a breakfast counter make the kitchen sociable, with storage planned around the daily cooking routine.",
        images: [img(IMG.kitchen3, "Kitchen and breakfast counter"), img(IMG.kitchen2, "Cabinetry and storage")],
      },
      {
        id: "dining", name: "Dining",
        headline: "Dining that opens to the light",
        text: "The dining table is set by the windows and marked by a statement pendant, linking the kitchen and living areas.",
        images: [img(PH.dining6, "Dining area"), img(IMG.dining1, "Dining table and pendant")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm, layered master bedroom",
        text: "Soft textiles, warm lighting and concealed storage give the bedroom a relaxed, personal feel.",
        images: [img(IMG.bedroom4, "Master bedroom"), img(IMG.bedroom3, "Bed and side lighting")],
      },
      {
        id: "study", name: "Study",
        headline: "A quiet study for working from home",
        text: "A dedicated desk by the window with open shelving, planned so work can be put away at the end of the day.",
        images: [img(PH.study3, "Study"), img(PH.study2, "Desk and shelving")],
      },
    ],
    details: [
      img(IMG.detail1, "Layered lighting"),
      img(PH.kitchen4, "Cabinet finish"),
    ],
  },
  {
    slug: "wakad",
    category: "residential",
    title: "Wakad Residence",
    swash: "W",
    location: "Wakad, Pune",
    status: "ongoing",
    type: "Residential · Home interior (in progress)",
    concept: "A home interior currently in progress — shown through approved design visuals and site updates.",
    featured: false,
    sampleImages: true,
    cover: IMG.living4,
    hero: IMG.living4,
    glance: [
      ["Project type", "Home interior"],
      ["Location", "Wakad, Pune"],
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
        images: [img(IMG.living4, "Design visualisation — living room"), img(IMG.living1, "Design visualisation — feature wall")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "Kitchen — layout and materials",
        text: "Kitchen layout and finishes have been finalised; site work is in progress.",
        images: [img(IMG.kitchen1, "Design visualisation — kitchen"), img(PH.kitchen4, "Cabinet finish reference")],
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
        images: [img(PH.dining4, "Design reference — dining"), img(PH.dining5, "Design reference — dining setting")],
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
    slug: "office",
    category: "commercial",
    title: "Corporate Office",
    swash: "C",
    location: "Pune",
    status: null,
    type: "Commercial · Office",
    sector: "Workplace",
    subtitle: "Workplace interior",
    concept: "A focused, welcoming workplace that balances productive work areas with spaces to meet and recharge.",
    featured: true,
    sampleImages: true,
    cover: PH.offWork1,
    hero: PH.offHero,
    glance: [
      ["Project type", "Office interior"],
      ["Category", "Commercial / Workplace"],
      ["Location", "Pune"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    brief: [
      ["Team experience", "A comfortable, well-lit workplace where teams can focus and collaborate easily."],
      ["Operational needs", "Clear zones for open work, meetings, private calls and breaks."],
      ["Brand feeling", "Professional and confident, with warm materials that make visitors feel welcome."],
    ],
    flow: ["Entrance", "Reception", "Workstations", "Meeting room", "Cabins", "Breakout"],
    zones: [
      {
        id: "reception", name: "Reception",
        headline: "A confident first impression",
        text: "A warm wooden reception counter faces the entrance, with a small waiting area so visitors are greeted and oriented straight away.",
        images: [img(PH.offReception1, "Reception and waiting"), img(PH.offReception2, "Reception counter")],
      },
      {
        id: "workstations", name: "Workstations",
        headline: "Open workstations planned for focus",
        text: "Rows of workstations sit along the natural light, with glass partitions and acoustic finishes keeping the floor open but calm.",
        images: [img(PH.offWork1, "Open-plan workstations"), img(PH.offWork2, "Work floor")],
      },
      {
        id: "meeting", name: "Meeting Room",
        headline: "Meeting rooms built for good conversations",
        text: "Meeting rooms are planned around the table and screen, with comfortable seating, good daylight and controlled acoustics.",
        images: [img(PH.offMeet1, "Meeting room with city view"), img(PH.offMeet2, "Conference room and display")],
      },
      {
        id: "cabins", name: "Cabins",
        headline: "Private cabins for focused work",
        text: "Cabins give managers a quiet space for focused work and private calls, finished in warmer materials than the open floor.",
        images: [img(PH.offCabin1, "Manager's cabin"), img(PH.offCabin2, "Cabin desk and storage")],
      },
      {
        id: "breakout", name: "Breakout & Pantry",
        headline: "A breakout space to recharge",
        text: "A pantry counter and relaxed seating give the team somewhere to take a break, meet informally and host small gatherings.",
        images: [img(PH.offCafe1, "Pantry and café counter"), img(PH.offCafe2, "Breakout lounge")],
      },
    ],
    designDetails: ["Glare-free task lighting", "Acoustic comfort", "Clear zoning", "Cable-managed workstations", "Integrated storage", "Brand-led materials"],
    outcome: "An office interior designed around how the team works, meets and takes a break.",
  },
  {
    slug: "clinic",
    category: "commercial",
    title: "Clinic",
    swash: "C",
    location: "Pune",
    status: null,
    type: "Commercial · Healthcare",
    sector: "Healthcare",
    subtitle: "Consultation and treatment environment",
    concept: "A calm, reassuring clinic that makes every visit feel simple, private and welcoming.",
    featured: false,
    sampleImages: true,
    cover: PH.clinConsult1,
    hero: PH.clinHero,
    glance: [
      ["Project type", "Clinic interior"],
      ["Category", "Commercial / Healthcare"],
      ["Location", "Pune"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    brief: [
      ["Patient experience", "Patients should feel calm and at ease from the moment they walk in."],
      ["Operational needs", "Clear separation between waiting, consultation and examination areas."],
      ["Brand feeling", "Clean, modern and trustworthy, with warmth to soften the clinical setting."],
    ],
    flow: ["Entrance", "Reception", "Waiting", "Consultation", "Examination", "Exit"],
    zones: [
      {
        id: "reception", name: "Reception",
        headline: "A bright, welcoming arrival",
        text: "The reception desk faces the entrance so patients are greeted and checked in straight away, in a light, uncluttered setting.",
        images: [img(PH.clinReception1, "Reception desk"), img(PH.clinReception2, "Arrival and lobby")],
      },
      {
        id: "waiting", name: "Waiting",
        headline: "Comfortable, unhurried waiting",
        text: "Seating is arranged for comfort and easy movement, with soft colours and indirect lighting to keep the space calm.",
        images: [img(PH.clinWaiting1, "Waiting area"), img(PH.clinWaiting2, "Lounge seating")],
      },
      {
        id: "consultation", name: "Consultation",
        headline: "A comfortable consultation room",
        text: "A quiet room planned around the doctor's desk, with space for unhurried conversations and good natural light.",
        images: [img(PH.clinConsult1, "Consultation room"), img(PH.clinConsult2, "Doctor's desk")],
      },
      {
        id: "examination", name: "Examination",
        headline: "A practical examination room",
        text: "Examination rooms keep equipment within reach on the wall, with easy-clean surfaces and privacy for the patient.",
        images: [img(PH.clinExam1, "Examination room"), img(PH.clinExam2, "Wall-mounted instruments")],
      },
    ],
    designDetails: ["Soft, glare-free lighting", "Privacy-first layout", "Clear wayfinding", "Easy-clean surfaces", "Integrated storage", "Discreet branding"],
    outcome: "A clinic interior designed around patient comfort and a smooth daily workflow.",
  },
];

export const RESIDENTIAL = PORTFOLIO.filter((p) => p.category === "residential");
export const COMMERCIAL = PORTFOLIO.filter((p) => p.category === "commercial");

export const projectHref = (p) => `/portfolio/${p.category}/${p.slug}`;
export const getPortfolio = (category, slug) => PORTFOLIO.find((p) => p.category === category && p.slug === slug);

/** Project gallery: just 2 images — `gallery` if set, else the first photo of the first two rooms / zones. */
export function highlights(groups, gallery) {
  if (gallery?.length) return gallery.slice(0, MAX_PHOTOS);
  const picks = groups.map((g) => g.images[0]).filter(Boolean);
  return (picks.length >= MAX_PHOTOS ? picks : groups.flatMap((g) => g.images)).slice(0, MAX_PHOTOS);
}

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
