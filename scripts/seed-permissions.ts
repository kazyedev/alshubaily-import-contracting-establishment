import { drizzle } from "drizzle-orm/postgres-js";
import { permissions, roles, rolePermissions } from "../src/lib/db/schema/auth-schema";
import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

// All permissions organized by entity
const permissionsData = [
    // Accounts
    { id: "perm_accounts_view", key: "accounts.view", nameEn: "View Accounts", nameAr: "عرض الحسابات" },
    { id: "perm_accounts_create", key: "accounts.create", nameEn: "Create Accounts", nameAr: "إنشاء حسابات" },
    { id: "perm_accounts_edit", key: "accounts.edit", nameEn: "Edit Accounts", nameAr: "تعديل الحسابات" },
    { id: "perm_accounts_delete", key: "accounts.delete", nameEn: "Delete Accounts", nameAr: "حذف الحسابات" },

    // Roles
    { id: "perm_roles_view", key: "roles.view", nameEn: "View Roles", nameAr: "عرض الأدوار" },
    { id: "perm_roles_manage", key: "roles.manage", nameEn: "Manage Roles", nameAr: "إدارة الأدوار" },

    // Images
    { id: "perm_images_view", key: "images.view", nameEn: "View Images", nameAr: "عرض الصور" },
    { id: "perm_images_create", key: "images.create", nameEn: "Upload Images", nameAr: "رفع الصور" },
    { id: "perm_images_edit", key: "images.edit", nameEn: "Edit Images", nameAr: "تعديل الصور" },
    { id: "perm_images_delete", key: "images.delete", nameEn: "Delete Images", nameAr: "حذف الصور" },

    // Projects
    { id: "perm_projects_view", key: "projects.view", nameEn: "View Projects", nameAr: "عرض المشاريع" },
    { id: "perm_projects_create", key: "projects.create", nameEn: "Create Projects", nameAr: "إنشاء مشاريع" },
    { id: "perm_projects_edit", key: "projects.edit", nameEn: "Edit Projects", nameAr: "تعديل المشاريع" },
    { id: "perm_projects_delete", key: "projects.delete", nameEn: "Delete Projects", nameAr: "حذف المشاريع" },

    // Partners
    { id: "perm_partners_view", key: "partners.view", nameEn: "View Partners", nameAr: "عرض الشركاء" },
    { id: "perm_partners_create", key: "partners.create", nameEn: "Create Partners", nameAr: "إضافة شركاء" },
    { id: "perm_partners_edit", key: "partners.edit", nameEn: "Edit Partners", nameAr: "تعديل الشركاء" },
    { id: "perm_partners_delete", key: "partners.delete", nameEn: "Delete Partners", nameAr: "حذف الشركاء" },

    // Suppliers
    { id: "perm_suppliers_view", key: "suppliers.view", nameEn: "View Suppliers", nameAr: "عرض الموردين" },
    { id: "perm_suppliers_create", key: "suppliers.create", nameEn: "Create Suppliers", nameAr: "إضافة موردين" },
    { id: "perm_suppliers_edit", key: "suppliers.edit", nameEn: "Edit Suppliers", nameAr: "تعديل الموردين" },
    { id: "perm_suppliers_delete", key: "suppliers.delete", nameEn: "Delete Suppliers", nameAr: "حذف الموردين" },

    // Articles
    { id: "perm_articles_view", key: "articles.view", nameEn: "View Articles", nameAr: "عرض المقالات" },
    { id: "perm_articles_create", key: "articles.create", nameEn: "Create Articles", nameAr: "إنشاء مقالات" },
    { id: "perm_articles_edit", key: "articles.edit", nameEn: "Edit Articles", nameAr: "تعديل المقالات" },
    { id: "perm_articles_delete", key: "articles.delete", nameEn: "Delete Articles", nameAr: "حذف المقالات" },

    // Products
    { id: "perm_products_view", key: "products.view", nameEn: "View Products", nameAr: "عرض المنتجات" },
    { id: "perm_products_create", key: "products.create", nameEn: "Create Products", nameAr: "إنشاء منتجات" },
    { id: "perm_products_edit", key: "products.edit", nameEn: "Edit Products", nameAr: "تعديل المنتجات" },
    { id: "perm_products_delete", key: "products.delete", nameEn: "Delete Products", nameAr: "حذف المنتجات" },

    // Services
    { id: "perm_services_view", key: "services.view", nameEn: "View Services", nameAr: "عرض الخدمات" },
    { id: "perm_services_create", key: "services.create", nameEn: "Create Services", nameAr: "إنشاء خدمات" },
    { id: "perm_services_edit", key: "services.edit", nameEn: "Edit Services", nameAr: "تعديل الخدمات" },
    { id: "perm_services_delete", key: "services.delete", nameEn: "Delete Services", nameAr: "حذف الخدمات" },

    // FAQs
    { id: "perm_faqs_view", key: "faqs.view", nameEn: "View FAQs", nameAr: "عرض الأسئلة الشائعة" },
    { id: "perm_faqs_create", key: "faqs.create", nameEn: "Create FAQs", nameAr: "إنشاء أسئلة شائعة" },
    { id: "perm_faqs_edit", key: "faqs.edit", nameEn: "Edit FAQs", nameAr: "تعديل الأسئلة الشائعة" },
    { id: "perm_faqs_delete", key: "faqs.delete", nameEn: "Delete FAQs", nameAr: "حذف الأسئلة الشائعة" },

    // Settings
    { id: "perm_settings_view", key: "settings.view", nameEn: "View Settings", nameAr: "عرض الإعدادات" },
    { id: "perm_settings_manage", key: "settings.manage", nameEn: "Manage Settings", nameAr: "إدارة الإعدادات" },
];

// Role to permission mappings
const rolePermissionMappings: Record<string, string[]> = {
    // Admin gets all permissions
    role_admin: permissionsData.map(p => p.id),

    // Editor gets all view + create + edit (no delete, no roles/accounts manage)
    role_editor: permissionsData
        .filter(p => {
            const key = p.key;
            // No delete permissions
            if (key.endsWith(".delete")) return false;
            // No accounts/roles management
            if (key.startsWith("accounts.") && key !== "accounts.view") return false;
            if (key.startsWith("roles.")) return false;
            if (key === "settings.manage") return false;
            return true;
        })
        .map(p => p.id),

    // Author gets view + create + edit for content only (no users, roles, settings)
    role_author: permissionsData
        .filter(p => {
            const key = p.key;
            // No delete permissions
            if (key.endsWith(".delete")) return false;
            // No accounts/roles/settings
            if (key.startsWith("accounts.")) return false;
            if (key.startsWith("roles.")) return false;
            if (key.startsWith("settings.")) return false;
            return true;
        })
        .map(p => p.id),

    // Viewer gets only view permissions
    role_viewer: permissionsData
        .filter(p => p.key.endsWith(".view"))
        .map(p => p.id),
};

async function main() {
    console.log("Seeding permissions...\n");

    // Seed roles first (in case they don't exist)
    const rolesData = [
        { id: "role_admin", nameEn: "Administrator", nameAr: "مدير النظام", descriptionEn: "Full access to all system features", descriptionAr: "وصول كامل لجميع ميزات النظام" },
        { id: "role_editor", nameEn: "Editor", nameAr: "محرر", descriptionEn: "Can create, edit, and publish content", descriptionAr: "يمكنه إنشاء وتحرير ونشر المحتوى" },
        { id: "role_author", nameEn: "Author", nameAr: "كاتب", descriptionEn: "Can create and edit own content", descriptionAr: "يمكنه إنشاء وتحرير المحتوى الخاص به" },
        { id: "role_viewer", nameEn: "Viewer", nameAr: "مشاهد", descriptionEn: "Can view content in the dashboard", descriptionAr: "يمكنه عرض المحتوى في لوحة التحكم" },
    ];

    console.log("1. Seeding roles...");
    for (const role of rolesData) {
        await db.insert(roles).values(role).onConflictDoNothing({ target: roles.id });
    }
    console.log(`   ✓ ${rolesData.length} roles seeded\n`);

    // Seed permissions
    console.log("2. Seeding permissions...");
    for (const perm of permissionsData) {
        await db.insert(permissions).values(perm).onConflictDoNothing({ target: permissions.id });
    }
    console.log(`   ✓ ${permissionsData.length} permissions seeded\n`);

    // Seed role-permission mappings
    console.log("3. Assigning permissions to roles...");
    for (const [roleId, permIds] of Object.entries(rolePermissionMappings)) {
        for (const permissionId of permIds) {
            await db.insert(rolePermissions).values({ roleId, permissionId }).onConflictDoNothing();
        }
        console.log(`   ✓ ${roleId}: ${permIds.length} permissions`);
    }

    console.log("\n✅ All permissions seeded successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("Error seeding permissions:", err);
    process.exit(1);
});
