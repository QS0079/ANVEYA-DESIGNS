import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { BUDGETS, LOCATIONS, PROPERTY_TYPES, TIMELINES } from "@/lib/defaults";

export const dynamic = "force-dynamic";

const clean = (v, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Simple in-memory rate limit: 5 submissions / 10 min per IP
const hits = globalThis.__anveyaHits || (globalThis.__anveyaHits = new Map());

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field — bots fill it, humans never see it
  if (clean(body.website)) return NextResponse.json({ ok: true });

  // Behind Hostinger's CDN the visitor IP comes in a forwarded header. If none is present we skip the
  // limit rather than lumping every visitor into one shared bucket (which would block real enquiries).
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "")
    .split(",")[0]
    .trim();
  const now = Date.now();
  const list = ip ? (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000) : [];
  if (ip && list.length >= 10) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const mobile = clean(body.phone, 20).replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  const lead = {
    name: clean(body.name, 150),
    phone: mobile,
    budget: clean(body.budget, 80),
    location: clean(body.location, 190),
    property_type: clean(body.property_type, 60),
    timeline: clean(body.timeline, 80),
    email: clean(body.email, 190) || null,
    message: clean(body.message, 4000) || null,
    source_page: clean(body.source_page, 120),
  };

  const errors = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(lead.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (!BUDGETS.includes(lead.budget)) errors.budget = "Please select a budget.";
  if (!LOCATIONS.includes(lead.location)) errors.location = "Please select a location.";
  if (!PROPERTY_TYPES.includes(lead.property_type)) errors.property_type = "Please select a property type.";
  if (!TIMELINES.includes(lead.timeline)) errors.timeline = "Please select a timeline.";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });

  try {
    await query(
      `INSERT INTO leads (name, phone, email, location, property_type, budget, timeline, message, source_page)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [lead.name, `+91 ${lead.phone}`, lead.email, lead.location, lead.property_type, lead.budget, lead.timeline, lead.message, lead.source_page]
    );
  } catch (e) {
    console.error("[lead] insert failed:", e.message);
    return NextResponse.json({ error: "We couldn't send your enquiry right now. Please try again shortly." }, { status: 500 });
  }

  if (ip) {
    list.push(now);
    hits.set(ip, list);
  }
  return NextResponse.json({ ok: true });
}
