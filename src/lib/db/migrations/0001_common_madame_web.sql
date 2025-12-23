CREATE TABLE "commitments" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_values" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_info" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"value" text NOT NULL,
	"label_en" text,
	"label_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "general_policies" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "missions" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_goals" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_media_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" text NOT NULL,
	"url" text NOT NULL,
	"username" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "strengths" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visions" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_principles" (
	"id" text PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_ar" text NOT NULL,
	"description_en" text,
	"description_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
