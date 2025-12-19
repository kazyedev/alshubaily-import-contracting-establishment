import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { images } from "./images-schema";

/**
 * Product Categories table
 */
export const productCategories = pgTable("product_categories", {
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
 * Property Categories table - e.g., physical properties, functional, dimensions
 */
export const propertyCategories = pgTable("property_categories", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Properties table - e.g., length, width, color, shape
 */
export const properties = pgTable("properties", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    categoryId: text("category_id").references(() => propertyCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Products table
 */
export const products = pgTable("products", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    mainImageId: text("main_image_id").references(() => images.id, { onDelete: "set null" }),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    categoryId: text("category_id").references(() => productCategories.id, { onDelete: "set null" }),
    slugEn: text("slug_en").notNull().unique(),
    slugAr: text("slug_ar").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Product Images junction table - for additional product images
 */
export const productImages = pgTable(
    "product_images",
    {
        productId: text("product_id")
            .notNull()
            .references(() => products.id, { onDelete: "cascade" }),
        imageId: text("image_id")
            .notNull()
            .references(() => images.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.productId, table.imageId] })]
);

/**
 * Product Details table - stores property values for products
 */
export const productDetails = pgTable("product_details", {
    id: text("id").primaryKey(),
    productId: text("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    propertyId: text("property_id")
        .notNull()
        .references(() => properties.id, { onDelete: "cascade" }),
    valueEn: text("value_en"),
    valueAr: text("value_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
