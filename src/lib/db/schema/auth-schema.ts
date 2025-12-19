import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

/**
 * Accounts table - links to Supabase auth.users
 * This stores additional user profile data beyond what Supabase auth provides
 */
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  authUserId: text("auth_user_id").notNull().unique(),
  displayNameEn: text("display_name_en"),
  displayNameAr: text("display_name_ar"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/**
 * Roles table - defines available roles (admin, author, etc.)
 */
export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/**
 * Permissions table - defines granular permissions
 */
export const permissions = pgTable("permissions", {
  id: text("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  key: text("key").notNull().unique(), // e.g., "posts.create", "users.delete"
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/**
 * Role-Permission junction table
 */
export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
);

/**
 * Account-Role junction table
 */
export const accountRoles = pgTable(
  "account_roles",
  {
    accountId: text("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.accountId, table.roleId] })]
);
