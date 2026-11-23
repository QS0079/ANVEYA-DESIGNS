// ============================================================
// PORTFOLIO PROJECTS
// One entry per project → page at /portfolio/<slug>
// Replace the text and images with your real project details.
// Fields left empty ("") are hidden on the page automatically.
// Each project needs: a cover image + exactly 4 gallery images.
// ============================================================
import { IMG } from "./defaults";

export const PROJECTS = [
  {
    slug: "residential-interior-design",
    title: "Residential Interior Design",
    swash: "R", // decorative script capital used in the title
    category: "Residential",
    summary:
      "Homes designed around comfort, personal expression and everyday functionality — from living rooms and bedrooms to kitchens, dining areas and complete home interiors.",
    location: "",
    area: "",
    year: "",
    spaces: "Living, Dining, Bedrooms, Kitchen",
    scope: "Concept, Space Planning, Material Selection, Execution Coordination",
    cover: IMG.living1,
    brief:
      "A complete home that reflects the lifestyle, preferences and everyday routines of the family living in it — comfortable, harmonious and easy to maintain.",
    approach:
      "We began by understanding how each room would be used through the day, then developed layouts, finishes and furniture that bring the spaces together as one calm, cohesive home. Every detail was planned to support comfort and functionality.",
    highlights: [
      "Layouts planned around daily routines",
      "A warm, cohesive palette of materials and textures",
      "Considered storage that keeps spaces uncluttered",
      "Lighting layered for day and evening",
    ],
    gallery: [IMG.living1, IMG.bedroom1, IMG.kitchen2, IMG.living3],
  },
  {
    slug: "commercial-interior-design",
    title: "Commercial Interior Design",
    swash: "C",
    category: "Commercial",
    summary:
      "Commercial spaces designed to support business requirements, improve functionality and create a memorable experience for visitors and employees.",
    location: "",
    area: "",
    year: "",
    spaces: "Reception, Work Areas, Meeting Rooms",
    scope: "Concept, Space Planning, Material Selection, Execution Coordination",
    cover: IMG.office3,
    brief:
      "A commercial environment that brings together brand identity, functionality and visual appeal, developed around the way the business works.",
    approach:
      "We studied workflow, space utilisation, employee experience and customer interaction, then shaped a layout and material palette that reflects the brand while keeping everyday operations efficient.",
    highlights: [
      "Planning built around workflow and movement",
      "Brand identity expressed through materials and colour",
      "Comfortable, functional spaces for teams and visitors",
      "Durable finishes suited to everyday commercial use",
    ],
    gallery: [IMG.office3, IMG.office1, IMG.office2, IMG.office4],
  },
  {
    slug: "living-room-interiors",
    title: "Living Room Interiors",
    swash: "L",
    category: "Living Room",
    summary:
      "Living spaces that bring together thoughtful furniture placement, lighting, textures and comfortable layouts.",
    location: "",
    area: "",
    year: "",
    spaces: "Living Room, Lounge",
    scope: "Concept, Furniture Layout, Lighting, Styling",
    cover: IMG.living3,
    brief:
      "A welcoming living room for both everyday relaxing and hosting — comfortable, light-filled and full of character.",
    approach:
      "Furniture placement was planned around conversation and natural light, with layered textures and soft lighting to give the room warmth at every time of day.",
    highlights: [
      "Furniture arranged for comfort and easy movement",
      "Layered textures for warmth and depth",
      "Ambient, task and accent lighting",
      "A calm, cohesive colour palette",
    ],
    gallery: [IMG.living3, IMG.living2, IMG.living4, IMG.detail1],
  },
  {
    slug: "bedroom-interiors",
    title: "Bedroom Interiors",
    swash: "B",
    category: "Bedroom",
    summary:
      "Bedrooms designed as personal retreats with calming colour palettes, functional storage and considered details.",
    location: "",
    area: "",
    year: "",
    spaces: "Master Bedroom, Wardrobe, Reading Corner",
    scope: "Concept, Space Planning, Storage Design, Material Selection",
    cover: IMG.bedroom4,
    brief:
      "A restful personal retreat that feels calm and uncluttered, with storage planned into every corner.",
    approach:
      "A soft, calming palette sets the tone, supported by built-in storage, gentle lighting and natural textures that make the room feel quiet and complete.",
    highlights: [
      "Calming colour palette and soft textures",
      "Built-in, functional storage",
      "Gentle, layered lighting",
      "Considered details for everyday comfort",
    ],
    gallery: [IMG.bedroom4, IMG.bedroom2, IMG.bedroom3, IMG.bedroom1],
  },
  {
    slug: "kitchen-interiors",
    title: "Kitchen Interiors",
    swash: "K",
    category: "Kitchen",
    summary:
      "Kitchens that combine practical layouts, efficient storage and visually appealing finishes.",
    location: "",
    area: "",
    year: "",
    spaces: "Kitchen, Breakfast Counter, Utility",
    scope: "Layout Planning, Storage Design, Material & Finish Selection",
    cover: IMG.kitchen3,
    brief:
      "A kitchen that works hard every day and still looks beautiful — easy to cook in, easy to clean and easy to live with.",
    approach:
      "The layout was planned around the cooking workflow, with efficient storage, durable surfaces and finishes chosen to stay beautiful with daily use.",
    highlights: [
      "Efficient, workflow-led layout",
      "Smart, accessible storage",
      "Durable, easy-to-maintain finishes",
      "Task lighting where it is needed",
    ],
    gallery: [IMG.kitchen3, IMG.kitchen1, IMG.kitchen2, IMG.kitchen4],
  },
  {
    slug: "office-interiors",
    title: "Office Interiors",
    swash: "O",
    category: "Office",
    summary:
      "Professional environments designed around productivity, collaboration and brand identity.",
    location: "",
    area: "",
    year: "",
    spaces: "Workstations, Cabins, Collaboration Zones",
    scope: "Concept, Space Planning, Material Selection, Execution Coordination",
    cover: IMG.office1,
    brief:
      "A workplace that helps teams focus and collaborate, while reflecting the identity of the brand.",
    approach:
      "Zones for focused work, meetings and collaboration were planned around the team's day, with a material palette and lighting that keep the space comfortable and productive.",
    highlights: [
      "Clear zones for focus and collaboration",
      "Brand identity carried through the space",
      "Comfortable lighting and acoustics",
      "Efficient use of every square foot",
    ],
    gallery: [IMG.office1, IMG.office2, IMG.office3, IMG.office4],
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

export function getAdjacent(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}

/** "Kitchen Interiors" + swash "K" → "*K*itchen Interiors" (script capital) */
export function titleLines(p) {
  const words = p.title.split(" ");
  const half = Math.ceil(words.length / 2);
  const lines = [words.slice(0, half).join(" "), words.slice(half).join(" ")].filter(Boolean);
  const idx = p.swash ? lines[0].indexOf(p.swash) : -1;
  if (idx >= 0) lines[0] = `${lines[0].slice(0, idx)}*${p.swash}*${lines[0].slice(idx + 1)}`;
  return lines;
}
