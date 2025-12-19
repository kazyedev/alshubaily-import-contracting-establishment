import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Images table - stores image metadata
 */
export const images = pgTable("images", {
    id: text("id").primaryKey(),
    url: text("url").notNull(),
    titleEn: text("title_en"),
    titleAr: text("title_ar"),
    altEn: text("alt_en"),
    altAr: text("alt_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
