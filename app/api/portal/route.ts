import { NextRequest, NextResponse } from "next/server";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getD1 } from "@/db/raw";

const tiers = new Set(["Associate", "Ordinary", "Full", "Overseas", "Honorary"]);
async function signedIn() { return getChatGPTUser(); }

export async function GET() {
  const user = await signedIn();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const db = getD1();
  const [members, offerings, applications, audits] = await Promise.all([
    db.prepare("SELECT * FROM members ORDER BY created_at DESC LIMIT 100").all(),
    db.prepare("SELECT * FROM offerings ORDER BY start_date ASC LIMIT 100").all(),
    db.prepare(`SELECT a.*, m.legal_name AS member_name, o.title AS offering_title FROM applications a JOIN members m ON m.id = a.member_id JOIN offerings o ON o.id = a.offering_id ORDER BY a.created_at DESC LIMIT 100`).all(),
    db.prepare("SELECT * FROM audit_events ORDER BY created_at DESC LIMIT 12").all(),
  ]);
  return NextResponse.json({ members: members.results, offerings: offerings.results, applications: applications.results, audits: audits.results });
}

export async function POST(request: NextRequest) {
  const user = await signedIn();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const action = String(body.action ?? ""); const db = getD1(); const now = new Date().toISOString();
  if (action === "create_member") {
    const required = ["legalName", "email", "mobile", "profession", "membershipNumber", "tier", "effectiveDate", "assignmentBasis"];
    for (const field of required) if (!String(body[field] ?? "").trim()) return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    if (!tiers.has(String(body.tier))) return NextResponse.json({ error: "Invalid membership tier" }, { status: 400 });
    const id = crypto.randomUUID();
    try {
      await db.batch([
        db.prepare(`INSERT INTO members (id, legal_name, preferred_name, email, mobile, profession, organisation, membership_number, tier, status, effective_date, expiry_date, assignment_basis, invite_status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'invited', ?, ?, ?, 'queued', ?, ?)`).bind(id, String(body.legalName).trim(), String(body.preferredName ?? "").trim() || null, String(body.email).trim().toLowerCase(), String(body.mobile).trim(), String(body.profession).trim(), String(body.organisation ?? "").trim() || null, String(body.membershipNumber).trim(), String(body.tier), String(body.effectiveDate), String(body.expiryDate ?? "").trim() || null, String(body.assignmentBasis).trim(), user.userId, now),
        db.prepare("INSERT INTO audit_events (id, actor_id, action, target_type, target_id, summary, created_at) VALUES (?, ?, 'member.created', 'member', ?, ?, ?)").bind(crypto.randomUUID(), user.userId, id, `Created ${String(body.membershipNumber).trim()} and queued password invitation`, now),
      ]);
      return NextResponse.json({ id, inviteStatus: "queued" }, { status: 201 });
    } catch (error) {
      const message = error instanceof Error && error.message.includes("UNIQUE") ? "Email or membership number already exists" : "Member could not be created";
      return NextResponse.json({ error: message }, { status: 409 });
    }
  }
  if (action === "create_offering") {
    if (!String(body.title ?? "").trim() || !String(body.startDate ?? "").trim()) return NextResponse.json({ error: "Title and date are required" }, { status: 400 });
    const id = crypto.randomUUID();
    await db.batch([
      db.prepare(`INSERT INTO offerings (id, title, type, start_date, venue, capacity, price_cents, requires_approval, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`).bind(id, String(body.title).trim(), String(body.type ?? "Course"), String(body.startDate), String(body.venue ?? "To be confirmed"), Number(body.capacity ?? 20), Math.round(Number(body.price ?? 0) * 100), body.requiresApproval ? 1 : 0, now),
      db.prepare("INSERT INTO audit_events (id, actor_id, action, target_type, target_id, summary, created_at) VALUES (?, ?, 'offering.created', 'offering', ?, ?, ?)").bind(crypto.randomUUID(), user.userId, id, `Published ${String(body.title).trim()}`, now),
    ]);
    return NextResponse.json({ id }, { status: 201 });
  }
  if (action === "create_application") {
    const memberId = String(body.memberId ?? ""), offeringId = String(body.offeringId ?? "");
    if (!memberId || !offeringId) return NextResponse.json({ error: "Member and offering are required" }, { status: 400 });
    const offering = await db.prepare("SELECT requires_approval, price_cents FROM offerings WHERE id = ?").bind(offeringId).first<{requires_approval:number;price_cents:number}>();
    if (!offering) return NextResponse.json({ error: "Offering not found" }, { status: 404 });
    const status = offering.requires_approval ? "under_review" : offering.price_cents > 0 ? "payment_pending_configuration" : "approved";
    const id = crypto.randomUUID();
    await db.prepare("INSERT INTO applications (id, member_id, offering_id, status, note, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(id, memberId, offeringId, status, String(body.note ?? "").trim() || null, now).run();
    return NextResponse.json({ id, status }, { status: 201 });
  }
  if (action === "review_application") {
    const id = String(body.id ?? ""), decision = String(body.decision ?? ""), rationale = String(body.rationale ?? "").trim();
    if (!id || !["approved", "rejected", "information_requested"].includes(decision) || !rationale) return NextResponse.json({ error: "Decision and rationale are required" }, { status: 400 });
    const app = await db.prepare("SELECT a.id, o.price_cents FROM applications a JOIN offerings o ON o.id = a.offering_id WHERE a.id = ?").bind(id).first<{id:string;price_cents:number}>();
    if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    const status = decision === "approved" && app.price_cents > 0 ? "payment_pending_configuration" : decision;
    await db.batch([
      db.prepare("UPDATE applications SET status = ?, decision_rationale = ?, reviewed_by = ?, reviewed_at = ? WHERE id = ?").bind(status, rationale, user.userId, now, id),
      db.prepare("INSERT INTO audit_events (id, actor_id, action, target_type, target_id, summary, created_at) VALUES (?, ?, 'application.reviewed', 'application', ?, ?, ?)").bind(crypto.randomUUID(), user.userId, id, `${decision}: ${rationale}`, now),
    ]);
    return NextResponse.json({ id, status });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
