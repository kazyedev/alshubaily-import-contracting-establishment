import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Why Choose Us table - reasons to choose the company
 */
export const whyChooseUs = pgTable("why_choose_us", {
    id: text("id").primaryKey(),
    reasonEn: text("reason_en").notNull(),
    reasonAr: text("reason_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * FAQs table - frequently asked questions
 */
export const faqs = pgTable("faqs", {
    id: text("id").primaryKey(),
    questionEn: text("question_en").notNull(),
    questionAr: text("question_ar").notNull(),
    answerEn: text("answer_en").notNull(),
    answerAr: text("answer_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
