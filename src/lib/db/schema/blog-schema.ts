import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { images } from "./images-schema";
import { richContents } from "./rich-content-schema";
import { accounts } from "./auth-schema";

/**
 * Article Categories table
 */
export const articleCategories = pgTable("article_categories", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    imageId: text("image_id").references(() => images.id, { onDelete: "set null" }),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    slugEn: text("slug_en").notNull().unique(),
    slugAr: text("slug_ar").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Authors table - linked to accounts
 */
export const authors = pgTable("authors", {
    id: text("id").primaryKey(),
    publicNameEn: text("public_name_en").notNull(),
    publicNameAr: text("public_name_ar").notNull(),
    accountId: text("account_id").references(() => accounts.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Articles table
 */
export const articles = pgTable("articles", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    mainImageId: text("main_image_id").references(() => images.id, { onDelete: "set null" }),
    richContentId: text("rich_content_id").references(() => richContents.id, { onDelete: "set null" }),
    authorId: text("author_id").references(() => authors.id, { onDelete: "set null" }),
    publishedAt: timestamp("published_at"),
    slugEn: text("slug_en").notNull().unique(),
    slugAr: text("slug_ar").notNull().unique(),
    categoryId: text("category_id").references(() => articleCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Article Images junction table - for additional article images
 */
export const articleImages = pgTable(
    "article_images",
    {
        articleId: text("article_id")
            .notNull()
            .references(() => articles.id, { onDelete: "cascade" }),
        imageId: text("image_id")
            .notNull()
            .references(() => images.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.articleId, table.imageId] })]
);
