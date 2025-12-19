import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Rich Content table - stores rich text content
 */
export const richContents = pgTable("rich_contents", {
    id: text("id").primaryKey(),
    contentEn: text("content_en"),
    contentAr: text("content_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
