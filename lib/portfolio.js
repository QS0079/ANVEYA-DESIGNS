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
const KAS = (f) => `/portfolio/kaspate-wasti/${f}`;
const WAD = (f) => `/portfolio/wadgaon-sheri/${f}`;

const PH = {
  // residential — every photo is used once only, and nowhere else on the site
  // Wakad
  wakLiving1: u("1704040686413-2c607dbd2f06", 2400), wakLiving2: u("1745301558339-44eb3217d5da"),
  wakKitchen1: u("1759147960461-b74a7e9a75d4"), wakKitchen2: u("1639751787355-bbc3ed1fd639"),
  wakMaster1: u("1648634158203-199accfd7afc"), wakMaster2: u("1765862835193-3c37388a409e"),
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
        headline: "A bright living room with a gold-inlay TV wall",
        text: "A long L-shaped sofa on a natural wood base and picture-frame mouldings, facing a greige TV panel with slim gold inlays and an arched, backlit display shelf.",
        images: [img(RAH("04-living-room-tv.jpg"), "Seating and TV wall", "2303 / 2000"), img(RAH("05-living-tv-wall.jpg"), "TV wall and arched display shelf", "2400 / 1382")],
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
        images: [img(RAH("08-master-bedroom.jpg"), "Master bedroom", "1973 / 1350"), img(RAH("09-master-wardrobe.jpg"), "Sliding wardrobe and dressing unit", "2400 / 1556")],
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
    hero: PIM("05-master-bedroom.jpg"),
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
        images: [img(PIM("06-master-bedroom-wardrobe.jpg"), "Bed wall, wardrobe and display shelves", "2400 / 1403"), img(PIM("12-master-bedroom-section.jpg"), "Cut-away view of the master bedroom", "2400 / 1350")],
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
    concept: "A calm, modern home in warm whites and blush taupe, with classic wall mouldings, brass accents and walnut-finish wood.",
    featured: false,
    sampleImages: false,
    cover: WAD("00-living-sofa.jpg"),
    hero: WAD("00-living-sofa.jpg"),
    glance: [
      ["Project type", "Complete home interior"],
      ["Location", "Wadgaon Sheri, Viman Nagar, Pune"],
      ["Status", "Completed"],
      ["Visuals", "3D design renders"],
      ["Scope", "Concept, space planning, material selection, execution coordination"],
    ],
    story: {
      needs: "The homeowners wanted a light, elegant home that stays easy to maintain, with a proper pooja corner, generous storage and bedrooms that feel calm and personal.",
      challenge: "Keeping the living, kitchen and entrance connected and airy, while giving each zone a clear purpose and plenty of concealed storage.",
      response: "A warm white and blush-taupe palette on marble-look floors, with picture-frame mouldings and brass sconces in the living room, a slatted wood partition to the kitchen and full-height storage throughout.",
    },
    rooms: [
      {
        id: "entrance", name: "Entrance & Pooja",
        headline: "A warm entrance with a pooja unit",
        text: "A walnut double door and main door with a black grille window, a tall shoe and display unit, and a compact pooja unit with a jaali arch and a brass Ganesh motif.",
        images: [img(WAD("01-entrance-pooja.jpg"), "Entrance with pooja unit and storage", "2400 / 1350"), img(WAD("02-main-door.jpg"), "Main door with grille window", "979 / 2000")],
      },
      {
        id: "living", name: "Living Room",
        headline: "A TV wall with open display shelves",
        text: "A soft blush TV wall with fine black grooves, backlit wooden shelves and a floating walnut-top unit, beside the moulded wall with its brass sconces.",
        images: [img(WAD("03-tv-wall.jpg"), "TV wall with open display shelves", "2400 / 1350")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "An L-shaped kitchen open to the living room",
        text: "Glossy taupe cabinets with glass shutters, a black granite counter and a marble-look backsplash, separated from the living room by a slatted wood partition.",
        images: [img(WAD("04-kitchen.jpg"), "L-shaped kitchen", "2400 / 1350"), img(WAD("05-kitchen-partition.jpg"), "Kitchen with slatted wood partition", "2400 / 1468")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "A calm master bedroom with a floral wardrobe",
        text: "A textured backlit bed wall with fluted panels and globe pendants under a cove-lit ceiling, and a sliding wardrobe with arched floral panels.",
        images: [img(WAD("06-master-bedroom.jpg"), "Master bedroom", "2400 / 1430"), img(WAD("07-master-wardrobe.jpg"), "Sliding wardrobe with floral panels", "2183 / 2000")],
      },
      {
        id: "second-bedroom", name: "Second Bedroom",
        headline: "A simple, restful second bedroom",
        text: "A sage upholstered bed, minimal art and a full-height wardrobe with cane-finish panels.",
        images: [img(WAD("08-second-bedroom.jpg"), "Second bedroom", "1720 / 2000"), img(WAD("09-second-bedroom-wardrobe.jpg"), "Wardrobe with cane panels", "2400 / 1836")],
      },
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
    concept: "A contemporary home in soft whites and cool greys, with sculpted wall panelling, a tropical-print living room and black marble in the kitchen.",
    featured: false,
    sampleImages: false,
    cover: KAS("00-living-hero.jpg"),
    hero: KAS("00-living-hero.jpg"),
    glance: [
      ["Project type", "Home interior"],
      ["Location", "Kaspate Wasti, Pune"],
      ["Status", "Ongoing"],
      ["Visuals", "3D design renders"],
      ["Scope", "Concept, space planning, material selection"],
    ],
    story: {
      needs: "The family wanted a modern, easy-to-maintain home with a welcoming living room, a practical kitchen, a dedicated pooja corner and calm bedrooms with plenty of storage.",
      challenge: "Giving each room its own character while keeping one consistent, clean palette through the home.",
      response: "Marble-look floors and white walls throughout, with feature walls doing the talking: geometric fluted panels for the TV, tropical arched panels in the living room and hexagon panelling in the master bedroom.",
    },
    rooms: [
      {
        id: "entrance", name: "Entrance",
        headline: "A backlit marble welcome",
        text: "A backlit marble nameplate panel with a small Ganesh shelf beside a grey-panelled main door with a gold grille, and moulded panels with a wood-finish door inside.",
        images: [img(KAS("01-entrance-nameplate.jpg"), "Design visual — marble nameplate panel", "2400 / 1350"), img(KAS("02-entrance-door.jpg"), "Design visual — entrance with wall mouldings", "2400 / 1679")],
      },
      {
        id: "living", name: "Living Room",
        headline: "A geometric TV wall with a floating unit",
        text: "A grey fluted TV wall in a geometric pattern with rose-gold strips and a floating walnut-and-white unit, opposite an L-shaped sofa set against tropical arched panels.",
        images: [img(KAS("03-living-tv-wall.jpg"), "Design visual — geometric TV wall", "2400 / 1350")],
      },
      {
        id: "kitchen", name: "Kitchen",
        headline: "A white kitchen with black marble",
        text: "Handle-less white cabinets, a black marble counter and breakfast peninsula, a gold-veined backsplash, a rolling-shutter tall unit and lit walnut niches.",
        images: [img(KAS("04-kitchen.jpg"), "Design visual — kitchen with breakfast counter", "2400 / 1350"), img(KAS("05-kitchen-sink-wall.jpg"), "Design visual — sink wall and backsplash", "2386 / 1760")],
      },
      {
        id: "pooja-study", name: "Pooja & Study",
        headline: "A white pooja unit and a quiet study",
        text: "A white temple-style pooja unit with a Radha Krishna backdrop on a walnut base, and a study desk with grey overhead storage and a lit display niche.",
        images: [img(KAS("06-pooja-unit.jpg"), "Design visual — pooja unit", "2400 / 1350"), img(KAS("07-study.jpg"), "Design visual — study desk", "2400 / 1350")],
      },
      {
        id: "master-bedroom", name: "Master Bedroom",
        headline: "Hexagon panelling and a round mirror",
        text: "A bed wall framed by grey hexagon fluted panels with gold inlays, and a backlit round mirror with a floating dresser and glass display column.",
        images: [img(KAS("08-master-bedroom.jpg"), "Design visual — master bedroom", "1973 / 1350"), img(KAS("09-master-dresser.jpg"), "Design visual — round mirror and dresser", "2400 / 1350")],
      },
      {
        id: "second-bedroom", name: "Second Bedroom",
        headline: "A soft bedroom with a leaf mural",
        text: "A subtle leaf-print wall, an upholstered bed under a roman blind and white wardrobes with curved wood inlays.",
        images: [img(KAS("10-second-bedroom.jpg"), "Design visual — second bedroom", "2400 / 1350"), img(KAS("11-second-bedroom-wardrobe.jpg"), "Design visual — wardrobe with wood inlay", "2400 / 1350")],
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
        images: [img(OFF("03-discussion-tables.jpg"), "Round discussion tables")],
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

/** Project gallery: only photos set aside for it (never a repeat of a room photo). Empty = section hidden. */
export function highlights(_groups, gallery) {
  return (gallery || []).slice(0, MAX_PHOTOS);
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
