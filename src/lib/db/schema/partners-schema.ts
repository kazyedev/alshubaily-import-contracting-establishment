import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { images } from "./images-schema";

/**
 * Partners table
 */
export const partners = pgTable("partners", {
    id: text("id").primaryKey(),
    nameEn: text("name_en").notNull(),
    nameAr: text("name_ar").notNull(),
    logoImageId: text("logo_image_id").references(() => images.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Suppliers table
 */
export const suppliers = pgTable("suppliers", {
    id: text("id").primaryKey(),
    nameEn: text("name_en").notNull(),
    nameAr: text("name_ar").notNull(),
    logoImageId: text("logo_image_id").references(() => images.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
