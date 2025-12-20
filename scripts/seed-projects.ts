import { drizzle } from "drizzle-orm/postgres-js";
import {
    projects,
    projectTypes,
    projectStatuses,
} from "../src/lib/db/schema/projects-schema";
import { nanoid } from "nanoid";
import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

// Project Statuses
const statusesData = [
    { id: "status_planning", titleEn: "Planning", titleAr: "التخطيط" },
    { id: "status_in_progress", titleEn: "In Progress", titleAr: "قيد التنفيذ" },
    { id: "status_completed", titleEn: "Completed", titleAr: "مكتمل" },
    { id: "status_on_hold", titleEn: "On Hold", titleAr: "معلق" },
];

// Project Types
const typesData = [
    {
        id: "type_commercial",
        titleEn: "Commercial",
        titleAr: "تجاري",
        descriptionEn: "Commercial buildings and facilities",
        descriptionAr: "المباني والمرافق التجارية",
    },
    {
        id: "type_residential",
        titleEn: "Residential",
        titleAr: "سكني",
        descriptionEn: "Residential homes and apartments",
        descriptionAr: "المنازل والشقق السكنية",
    },
    {
        id: "type_industrial",
        titleEn: "Industrial",
        titleAr: "صناعي",
        descriptionEn: "Industrial facilities and warehouses",
        descriptionAr: "المنشآت الصناعية والمستودعات",
    },
    {
        id: "type_infrastructure",
        titleEn: "Infrastructure",
        titleAr: "البنية التحتية",
        descriptionEn: "Roads, bridges, and utilities",
        descriptionAr: "الطرق والجسور والمرافق",
    },
];

// Sample Projects
const projectsData = [
    {
        id: nanoid(),
        titleEn: "Al Faisaliah Tower Renovation",
        titleAr: "تجديد برج الفيصلية",
        slugEn: "al-faisaliah-tower-renovation",
        slugAr: "تجديد-برج-الفيصلية",
        descriptionEn: "Major renovation project for Al Faisaliah Tower including facade improvements and interior upgrades.",
        descriptionAr: "مشروع تجديد كبير لبرج الفيصلية يشمل تحسينات الواجهة والتحديثات الداخلية.",
        locationEn: "Riyadh, Saudi Arabia",
        locationAr: "الرياض، المملكة العربية السعودية",
        year: 2024,
        projectTypeId: "type_commercial",
        projectStatusId: "status_completed",
    },
    {
        id: nanoid(),
        titleEn: "King Abdullah Financial District",
        titleAr: "مركز الملك عبدالله المالي",
        slugEn: "king-abdullah-financial-district",
        slugAr: "مركز-الملك-عبدالله-المالي",
        descriptionEn: "Construction of commercial towers in the King Abdullah Financial District.",
        descriptionAr: "بناء أبراج تجارية في مركز الملك عبدالله المالي.",
        locationEn: "Riyadh, Saudi Arabia",
        locationAr: "الرياض، المملكة العربية السعودية",
        year: 2023,
        projectTypeId: "type_commercial",
        projectStatusId: "status_in_progress",
    },
    {
        id: nanoid(),
        titleEn: "Jeddah Corniche Residential Complex",
        titleAr: "مجمع كورنيش جدة السكني",
        slugEn: "jeddah-corniche-residential",
        slugAr: "مجمع-كورنيش-جدة-السكني",
        descriptionEn: "Luxury residential complex on Jeddah Corniche with sea views.",
        descriptionAr: "مجمع سكني فاخر على كورنيش جدة مع إطلالات بحرية.",
        locationEn: "Jeddah, Saudi Arabia",
        locationAr: "جدة، المملكة العربية السعودية",
        year: 2024,
        projectTypeId: "type_residential",
        projectStatusId: "status_in_progress",
    },
    {
        id: nanoid(),
        titleEn: "Dammam Industrial Zone",
        titleAr: "المنطقة الصناعية بالدمام",
        slugEn: "dammam-industrial-zone",
        slugAr: "المنطقة-الصناعية-بالدمام",
        descriptionEn: "Development of warehouses and manufacturing facilities in Dammam.",
        descriptionAr: "تطوير مستودعات ومرافق تصنيع في الدمام.",
        locationEn: "Dammam, Saudi Arabia",
        locationAr: "الدمام، المملكة العربية السعودية",
        year: 2022,
        projectTypeId: "type_industrial",
        projectStatusId: "status_completed",
    },
    {
        id: nanoid(),
        titleEn: "Riyadh Metro Station",
        titleAr: "محطة مترو الرياض",
        slugEn: "riyadh-metro-station",
        slugAr: "محطة-مترو-الرياض",
        descriptionEn: "Construction of metro station and surrounding infrastructure.",
        descriptionAr: "بناء محطة مترو والبنية التحتية المحيطة.",
        locationEn: "Riyadh, Saudi Arabia",
        locationAr: "الرياض، المملكة العربية السعودية",
        year: 2023,
        projectTypeId: "type_infrastructure",
        projectStatusId: "status_completed",
    },
];

async function main() {
    console.log("Seeding projects data...\n");

    // Seed Statuses
    console.log("1. Seeding project statuses...");
    for (const status of statusesData) {
        await db.insert(projectStatuses).values(status).onConflictDoNothing();
        console.log(`   ✓ ${status.titleEn}`);
    }

    // Seed Types
    console.log("\n2. Seeding project types...");
    for (const type of typesData) {
        await db.insert(projectTypes).values(type).onConflictDoNothing();
        console.log(`   ✓ ${type.titleEn}`);
    }

    // Seed Projects
    console.log("\n3. Seeding projects...");
    for (const project of projectsData) {
        await db.insert(projects).values(project).onConflictDoNothing();
        console.log(`   ✓ ${project.titleEn}`);
    }

    console.log("\n✅ All projects data seeded successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("Error seeding projects:", err);
    process.exit(1);
});
