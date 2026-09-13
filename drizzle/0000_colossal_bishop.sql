CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`offering_id` text NOT NULL,
	`status` text DEFAULT 'under_review' NOT NULL,
	`note` text,
	`decision_rationale` text,
	`reviewed_by` text,
	`reviewed_at` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`action` text NOT NULL,
	`target_type` text NOT NULL,
	`target_id` text NOT NULL,
	`summary` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`legal_name` text NOT NULL,
	`preferred_name` text,
	`email` text NOT NULL,
	`mobile` text NOT NULL,
	`profession` text NOT NULL,
	`organisation` text,
	`membership_number` text NOT NULL,
	`tier` text NOT NULL,
	`status` text DEFAULT 'invited' NOT NULL,
	`effective_date` text NOT NULL,
	`expiry_date` text,
	`assignment_basis` text NOT NULL,
	`invite_status` text DEFAULT 'queued' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `members_email_unique` ON `members` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `members_membership_number_unique` ON `members` (`membership_number`);--> statement-breakpoint
CREATE TABLE `offerings` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`start_date` text NOT NULL,
	`venue` text NOT NULL,
	`capacity` integer NOT NULL,
	`price_cents` integer DEFAULT 0 NOT NULL,
	`requires_approval` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`created_at` text NOT NULL
);
