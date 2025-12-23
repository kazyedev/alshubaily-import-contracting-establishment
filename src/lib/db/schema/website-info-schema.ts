import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Contact Info - emails, phone numbers, WhatsApp numbers
 */
export const contactInfo = pgTable("contact_info", {
    id: text("id").primaryKey(),
    type: text("type").notNull(), // 'email', 'phone', 'whatsapp'
    value: text("value").notNull(),
    labelEn: text("label_en"),
    labelAr: text("label_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Social Media Accounts
 */
export const socialMediaAccounts = pgTable("social_media_accounts", {
    id: text("id").primaryKey(),
    platform: text("platform").notNull(), // 'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'snapchat'
    url: text("url").notNull(),
    username: text("username"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Organization Goals (اهداف المؤسسة)
 */
export const organizationGoals = pgTable("organization_goals", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Work Principles (مبادئ العمل)
 */
export const workPrinciples = pgTable("work_principles", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * General Policies (السياسات العامة)
 */
export const generalPolicies = pgTable("general_policies", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Vision (الرؤى)
 */
export const visions = pgTable("visions", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Mission/Messages (الرسائل)
 */
export const missions = pgTable("missions", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Values (القيم)
 */
export const companyValues = pgTable("company_values", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Strengths (القوة)
 */
export const strengths = pgTable("strengths", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Experience (الخبرة)
 */
export const experiences = pgTable("experiences", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Commitment (الالتزام)
 */
export const commitments = pgTable("commitments", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
