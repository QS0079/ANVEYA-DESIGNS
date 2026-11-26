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

const img = (src, caption, ar) => ({ src, caption, ...(ar ? { ar } : {}) });

// Room- and clinic-specific stock photos (Unsplash) — placeholders until real project photos are added.
const u = (id, w = 1800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
// Real project visuals (3D renders supplied by the studio)
const OFF = (f) => `/portfolio/office/${f}`;
const PIM = (f) => `/portfolio/pimple-saudagar/${f}`;
const RAH = (f) => `/portfolio/rahatani/${f}`;

const PH = {
  // residential — every photo is used once only, and nowhere else on the site
  // Wadgaon Sheri
  wadLiving1: u("1720247520862-7e4b14176fa8", 2400), wadLiving2: u("1704040686510-b747ff423ebb"),
  wadKitchen1: u("1512916194211-3f2b7f5f7de3"), wadKitchen2: u("1643034738686-d69e7bc047e1"),
  wadDining1: u("1773754624815-17c169b8bb6b"), wadDining2: u("1613545325268-314979eeef03"),
  wadMaster1: u("1750420556288-d0e32a6f517b"), wadMaster2: u("1699869653495-fe26f4c70b3e"),
  wadStudy1: u("1614250836482-b596f7494f2f"), wadStudy2: u("1650346910578-9ec99018b771"),
  wadDetail1: u("1758098491466-3f85c9afdf60"), wadDetail2: u("1639592834236-8a490116636b"),
  // Wakad
  wakLiving1: u("1704040686413-2c607dbd2f06", 2400), wakLiving2: u("1745301558339-44eb3217d5da"),
  wakKitchen1: u("1759147960461-b74a7e9a75d4"), wakKitchen2: u("1639751787355-bbc3ed1fd639"),
  wakMaster1: u("1648634158203-199accfd7afc"), wakMaster2: u("1765862835193-3c37388a409e"),
  // Kaspate Wasti
  kasLiving1: u("1745429523617-0d837856ca35", 2400), kasLiving2: u("1682662046426-f7589013d25e"),
  kasDining1: u("1635108197695-05184e426907"), kasDining2: u("1684928365257-13121f2742ef"),
  kasBedroom1: u("1765862835319-18fb6f8caff6"), kasBedroom2: u("1766733041960-0de62f403e7b"),
  // clinic
  clinReception1: u("1764727291644-5dcb0b1a0375"),
  clinReception2: u("1648775507324-b48dd3791fa5", 2400),
  clinWaiting1: u("1629909614456-6b1c5c94cecc"),
  clinWaiting2: u("1777125080264-152acad7697f"),
  clinConsult1: u("1778151270886-f227700b0eba"),
  clinConsult2: u("1758691462878-6edc3d3da1be"),
  clinExam1: u("1787651343620-8d5303006ecb"),
  clinExam2: u("1766299892549-b56b257d1ddd"),
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
    concept: "A bright, modern home in soft whites and warm greige, with clean wall mouldings, wood accents and fine gold details.",
    featured: true,
    sampleImages: false,
    cover: RAH("04-living-room-tv.jpg"),
    hero: RAH("03-living-room.jpg"),
    glance: [
      ["Project type", "Complete home interior"],
      ["Location", "Rahatani, Pune"],
      ["Status", "Completed"],
      ["Visuals", "3D design renders"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "The family wanted a light, uncluttered home that feels open, with practical storage, a proper place for prayer and comfortable bedrooms.",
      challenge: "Keeping every room bright and calm while fitting in TV units, full-height wardrobes and a pooja unit without crowding the spaces.",
      response: "A white and warm-greige palette on marble-look flooring, with picture-frame wall mouldings, floating units, wood-finish doors and slim gold inlays as the common thread through the home.",
    },
    rooms: [
      {
        id: "foyer", name: "Entrance Foyer",
        headline: "A warm, personal entrance",
        text: "A backlit arched nameplate wall with a stone finish and fluted panels, a grey chest of drawers for shoes and a wooden bench by the door.",
        images: [img(RAH("01-entrance-foyer.jpg"), "Foyer with shoe storage and entrance door", "2039 / 2000"), img(RAH("02-entrance-nameplate.jpg"), "Backlit arched nameplate wall", "1179 / 2000")],
      },
      {
        id: "living", name: "Living Room",
        headline: "A bright living room with an L-shaped sofa",
        text: "A long L-shaped sofa on a natural wood base, picture-frame mouldings on the walls, a statement artwork and linear cove lighting in the ceiling.",
        images: [img(RAH("03-living-room.jpg"), "Living room with L-shaped sofa", "2400 / 1192"), img(RAH("04-living-room-tv.jpg"), "Seating and TV wall", "2303 / 2000")],
      },
      {
        id: "tv-wall", name: "Living TV Wall",
        headline: "A TV wall with gold inlays and a display niche",
        text: "A greige TV panel with slim gold inlay strips and a floating unit, beside an arched black-framed display shelf with backlit niches.",
        images: [img(RAH("05-living-tv-wall.jpg"), "TV wall and arched display shelf", "2400 / 1382")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "A clean, practical kitchen with a pooja unit",
        text: "Soft taupe base units, white overheads with a fluted glass shutter, a terrazzo end panel and a dedicated pooja unit with the Gayatri mantra in carved lettering.",
        images: [img(RAH("06-kitchen.jpg"), "L-shaped kitchen by the window", "1945 / 2000"), img(RAH("07-kitchen-pooja.jpg"), "Kitchen with pooja unit", "1521 / 2000")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm master bedroom with wood and white",
        text: "A moulded bed wall with a wood-finish sliding panel, a pendant light, framed art and a full wall of glossy white sliding wardrobes with gold inlays.",
        images: [img(RAH("08-master-bedroom.jpg"), "Master bedroom", "2400 / 1544"), img(RAH("09-master-wardrobe.jpg"), "Sliding wardrobe and dressing unit", "2400 / 1556")],
      },
      {
        id: "bedroom-tv", name: "Bedroom TV Units",
        headline: "Floating TV units in the bedrooms",
        text: "Wall-mounted TV units with fluted fronts and moulded wall panels, keeping the floor clear and the rooms easy to clean.",
        images: [img(RAH("10-bedroom-tv-wall.jpg"), "Bedroom TV wall with fluted panel", "2400 / 1761"), img(RAH("11-tv-unit.jpg"), "Floating TV unit with wall mouldings", "2196 / 2000")],
      },
      {
        id: "second-bedroom", name: "Second Bedroom",
        headline: "A soft second bedroom with a leaf mural",
        text: "A blush leaf-print feature wall, an upholstered bed, a slim mirror with a floating dresser and a full-height sliding wardrobe.",
        images: [img(RAH("12-second-bedroom.jpg"), "Second bedroom with leaf mural", "2400 / 1682")],
      },
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
    concept: "A warm family home where Indian heritage art meets calm, soft-neutral bedrooms.",
    featured: true,
    sampleImages: false,
    cover: PIM("02-living-room.jpg"),
    hero: PIM("02-living-room.jpg"),
    glance: [
      ["Project type", "Complete home interior"],
      ["Location", "Pimple Saudagar, Pune"],
      ["Status", "Completed"],
      ["Visuals", "3D design renders"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "The family wanted a home that honours their traditions, with a proper pooja unit and Indian art, while keeping the bedrooms calm, modern and easy to live in.",
      challenge: "Bringing rich heritage elements into the public spaces without making the home feel heavy, and fitting generous storage into the bedrooms.",
      response: "Pichwai art, brass and carved wood are used as focal points in the foyer, living, pooja and dining areas, against a soft ivory backdrop. The bedrooms follow a quiet taupe palette with backlit feature walls and full-height wardrobes.",
    },
    rooms: [
      {
        id: "foyer", name: "Entrance Foyer",
        headline: "A welcoming foyer with pichwai art",
        text: "Pichwai art panels in arched frames, a cane-finish shoe cabinet and a cushioned bench give the entrance a warm, festive welcome.",
        images: [img(PIM("01-entrance-foyer.jpg"), "Entrance foyer with pichwai art panels", "2400 / 1623")],
      },
      {
        id: "living", name: "Living Room",
        headline: "A graceful living room with heritage details",
        text: "Carved-wood tufted sofas, wall moulding with brass sconces, a wooden jaali border and a portrait of Chhatrapati Shivaji Maharaj as the centrepiece of the room.",
        images: [img(PIM("02-living-room.jpg"), "Living room with carved sofas and feature wall", "2400 / 1633")],
      },
      {
        id: "pooja-dining", name: "Pooja & Dining",
        headline: "A backlit pooja unit and a dining wall in brass",
        text: "A lotus-and-cow backlit pooja niche framed by turned wooden pillars, and a dining area set against a wall of brass plaques with elephants, peacocks and the kalash.",
        images: [img(PIM("03-pooja-unit.jpg"), "Pooja unit with backlit lotus art", "1514 / 2000"), img(PIM("04-dining.jpg"), "Dining with brass plaque wall", "1292 / 2000")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm master bedroom with a tropical feature wall",
        text: "A backlit tropical wallpaper panel framed by soft arched mouldings, an upholstered bed and a window seat under a roman blind.",
        images: [img(PIM("05-master-bedroom.jpg"), "Master bedroom", "2400 / 1565"), img(PIM("06-master-bedroom-wardrobe.jpg"), "Bed wall, wardrobe and display shelves", "2400 / 1403")],
      },
      {
        id: "wardrobe-dressing", name: "Wardrobe & Dressing",
        headline: "Full-height wardrobes and a dressing passage",
        text: "Sliding wardrobes with lofts in a matching taupe finish, and a dressing passage with a backlit oval mirror.",
        images: [img(PIM("07-wardrobe.jpg"), "Sliding wardrobe with lofts", "2400 / 1675"), img(PIM("08-dressing-mirror.jpg"), "Dressing passage with backlit mirror", "2400 / 1350")],
      },
      {
        id: "second-bedroom", name: "Second Bedroom",
        headline: "A soft, textured second bedroom",
        text: "A textured backlit bed wall with brass-and-wood mirror accents, and a floating desk with lit open shelves beside the window.",
        images: [img(PIM("09-second-bedroom.jpg"), "Second bedroom", "2110 / 2000"), img(PIM("10-second-bedroom-desk.jpg"), "Bed wall and floating study desk", "2400 / 1910")],
      },
      {
        id: "study", name: "Study & Window Seat",
        headline: "A window seat and study nook",
        text: "A cushioned window seat and a compact study desk with overhead storage make the most of the window wall.",
        images: [img(PIM("11-study-window-seat.jpg"), "Window seat and study desk", "2163 / 2000")],
      },
    ],
    gallery: [img(PIM("12-master-bedroom-section.jpg"), "Master bedroom, cut-away view", "2400 / 1350")],
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
    status: "completed",
    type: "Residential · Complete home interior",
    concept: "A bright, contemporary home where open living, a practical kitchen and restful bedrooms flow together.",
    featured: false,
    sampleImages: true,
    cover: PH.wadLiving2,
    hero: PH.wadLiving1,
    glance: [
      ["Project type", "Home interior"],
      ["Location", "Wadgaon Sheri, Viman Nagar, Pune"],
      ["Status", "Completed"],
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
        images: [img(PH.wadLiving1, "Living room — overall view"), img(PH.wadLiving2, "Seating by the windows")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "A bright kitchen with a breakfast counter",
        text: "Light cabinetry and a breakfast counter make the kitchen sociable, with storage planned around the daily cooking routine.",
        images: [img(PH.wadKitchen1, "Kitchen cabinetry"), img(PH.wadKitchen2, "Sink and window counter")],
      },
      {
        id: "dining", name: "Dining",
        headline: "Dining that opens to the light",
        text: "The dining table is set by the windows and marked by a statement pendant, linking the kitchen and living areas.",
        images: [img(PH.wadDining1, "Dining area"), img(PH.wadDining2, "Dining table and lighting")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm, layered master bedroom",
        text: "Soft textiles, warm lighting and concealed storage give the bedroom a relaxed, personal feel.",
        images: [img(PH.wadMaster1, "Master bedroom"), img(PH.wadMaster2, "Bed and round mirror")],
      },
      {
        id: "study", name: "Study",
        headline: "A quiet study for working from home",
        text: "A dedicated desk by the window with open shelving, planned so work can be put away at the end of the day.",
        images: [img(PH.wadStudy1, "Study desk"), img(PH.wadStudy2, "Work table and storage bench")],
      },
    ],
    details: [
      img(PH.wadDetail1, "Table and decor detail"),
      img(PH.wadDetail2, "Desk lamp detail"),
    ],
    delivery: {
      execution: "Execution was planned in stages, with civil and electrical work first, followed by carpentry, finishes and lighting, and regular site reviews against the approved design.",
      handover: "The home was handed over after a final walk-through, checking every room against the agreed design and finishing details.",
    },
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
    cover: PH.wakLiving2,
    hero: PH.wakLiving1,
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
        images: [img(PH.wakLiving1, "Design visualisation — living room"), img(PH.wakLiving2, "Design visualisation — lounge")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "Kitchen — layout and materials",
        text: "Kitchen layout and finishes have been finalised; site work is in progress.",
        images: [img(PH.wakKitchen1, "Design visualisation — kitchen island"), img(PH.wakKitchen2, "Design visualisation — cooking zone")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "Master bedroom — design intent",
        text: "A calm palette with a panelled bed wall and full-height wardrobe.",
        images: [img(PH.wakMaster1, "Design visualisation — master bedroom"), img(PH.wakMaster2, "Design visualisation — bed wall")],
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
    cover: PH.kasLiving2,
    hero: PH.kasLiving1,
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
        images: [img(PH.kasLiving1, "Design reference — living room"), img(PH.kasLiving2, "Design reference — seating")],
      },
      {
        id: "dining", name: "Dining",
        headline: "Dining — open to the living area",
        text: "The dining zone is defined by a pendant light and a change in flooring.",
        images: [img(PH.kasDining1, "Design reference — dining"), img(PH.kasDining2, "Design reference — dining setting")],
      },
      {
        id: "bedrooms", name: "Bedrooms",
        headline: "Bedrooms — planned for rest and storage",
        text: "Bedrooms are planned with full-height storage and soft, layered lighting.",
        images: [img(PH.kasBedroom1, "Design reference — bedroom"), img(PH.kasBedroom2, "Design reference — headboard and storage")],
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
    concept: "A calm, welcoming office where clients are received, projects are presented and decisions are made in comfort.",
    featured: true,
    sampleImages: false,
    landscapeImages: true,
    cover: OFF("01-reception.jpg"),
    hero: OFF("02-display-discussion.jpg"),
    glance: [
      ["Project type", "Office interior"],
      ["Category", "Commercial / Workplace"],
      ["Location", "Pune"],
      ["Visuals", "3D design renders"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    brief: [
      ["Visitor experience", "Clients should feel welcome from the reception onwards, with comfortable places to sit, talk and review projects."],
      ["Operational needs", "A clear reception, an open display and discussion area, and private cabins for focused work and meetings."],
      ["Brand feeling", "Elegant and confident, with soft sage and warm neutral tones, wood accents and refined lighting."],
    ],
    flow: ["Entrance", "Reception", "Lounge", "Display & Discussion", "Cabins"],
    zones: [
      {
        id: "reception", name: "Reception",
        headline: "A refined first impression",
        text: "A marble-finish reception desk set against fluted panels and a backlit wall, with a soft lounge seating area beside it so visitors are welcomed and comfortable straight away.",
        images: [img(OFF("01-reception.jpg"), "Reception desk and waiting lounge")],
      },
      {
        id: "display-discussion", name: "Display & Discussion",
        headline: "An open space to present and discuss",
        text: "A wooden display partition, a central presentation table and round discussion tables sit under track and pendant lighting, with a devotional feature wall as the focal point of the room.",
        images: [img(OFF("02-display-discussion.jpg"), "Reception, display table and discussion area"), img(OFF("03-discussion-tables.jpg"), "Round discussion tables")],
      },
      {
        id: "director-cabin", name: "Director's Cabin",
        headline: "A director's cabin built for work and meetings",
        text: "A sculpted desk with full-height storage, open display shelving and a cove-lit ceiling, with space for visitor seating and a screen for presentations.",
        images: [img(OFF("04-director-cabin.jpg"), "Director's cabin"), img(OFF("05-director-cabin-desk.jpg"), "Desk with visitor seating and screen")],
      },
      {
        id: "cabin-lounge", name: "Cabin Lounge",
        headline: "A soft seating corner inside the cabin",
        text: "A blush two-seater, textured wall finish and statement artwork create a relaxed corner for informal conversations.",
        images: [img(OFF("06-cabin-lounge.jpg"), "Lounge seating by the glass façade"), img(OFF("07-cabin-seating-corner.jpg"), "Seating corner")],
      },
      {
        id: "executive-cabin", name: "Executive Cabin",
        headline: "An executive cabin with display shelving",
        text: "A dark-top desk in front of backlit wooden shelving for books and décor, beside a full glass façade that brings in the view.",
        images: [img(OFF("08-executive-cabin.jpg"), "Executive cabin with display shelving")],
      },
    ],
    designDetails: ["Fluted wall panelling", "Track and pendant lighting", "Marble-finish reception desk", "Backlit display shelving", "Cove-lit false ceilings", "Sage and warm-neutral palette"],
    outcome: "An office interior designed around receiving clients, presenting projects and working comfortably.",
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
    hero: PH.clinReception2,
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

/** true for real renders taller than they are wide ("w / h") */
export const isPortrait = (ar) => {
  if (!ar) return false;
  const [w, h] = String(ar).split("/").map(Number);
  return h > w * 0.85; // portrait or near-square: keep it from filling the whole column

};

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
