import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const members = sqliteTable("members", {
  id: text("id").primaryKey(), legalName: text("legal_name").notNull(), preferredName: text("preferred_name"),
  email: text("email").notNull().unique(), mobile: text("mobile").notNull(), profession: text("profession").notNull(),
  organisation: text("organisation"), membershipNumber: text("membership_number").notNull().unique(), tier: text("tier").notNull(),
  status: text("status").notNull().default("invited"), effectiveDate: text("effective_date").notNull(), expiryDate: text("expiry_date"),
  assignmentBasis: text("assignment_basis").notNull(), inviteStatus: text("invite_status").notNull().default("queued"),
  createdBy: text("created_by").notNull(), createdAt: text("created_at").notNull(),
});
export const offerings = sqliteTable("offerings", {
  id: text("id").primaryKey(), title: text("title").notNull(), type: text("type").notNull(), startDate: text("start_date").notNull(),
  venue: text("venue").notNull(), capacity: integer("capacity").notNull(), priceCents: integer("price_cents").notNull().default(0),
  requiresApproval: integer("requires_approval", { mode: "boolean" }).notNull().default(false), status: text("status").notNull().default("published"), createdAt: text("created_at").notNull(),
});
export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(), memberId: text("member_id").notNull(), offeringId: text("offering_id").notNull(),
  status: text("status").notNull().default("under_review"), note: text("note"), decisionRationale: text("decision_rationale"),
  reviewedBy: text("reviewed_by"), reviewedAt: text("reviewed_at"), createdAt: text("created_at").notNull(),
});
export const auditEvents = sqliteTable("audit_events", {
  id: text("id").primaryKey(), actorId: text("actor_id").notNull(), action: text("action").notNull(),
  targetType: text("target_type").notNull(), targetId: text("target_id").notNull(), summary: text("summary").notNull(), createdAt: text("created_at").notNull(),
});
