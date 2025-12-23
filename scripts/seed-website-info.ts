import { drizzle } from "drizzle-orm/postgres-js";
import {
    contactInfo,
    socialMediaAccounts,
    organizationGoals,
    workPrinciples,
    generalPolicies,
    visions,
    missions,
    companyValues,
    strengths,
    experiences,
    commitments,
} from "../src/lib/db/schema/website-info-schema";
import { nanoid } from "nanoid";
import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

// Contact Info
const contactData = [
    { id: nanoid(), type: "email", value: "info@alshubaily.com", labelEn: "General Inquiries", labelAr: "الاستفسارات العامة" },
    { id: nanoid(), type: "email", value: "sales@alshubaily.com", labelEn: "Sales", labelAr: "المبيعات" },
    { id: nanoid(), type: "phone", value: "+966 11 XXX XXXX", labelEn: "Main Office", labelAr: "المكتب الرئيسي" },
    { id: nanoid(), type: "phone", value: "+966 5X XXX XXXX", labelEn: "Mobile", labelAr: "الجوال" },
    { id: nanoid(), type: "whatsapp", value: "+966 5X XXX XXXX", labelEn: "WhatsApp Support", labelAr: "دعم الواتساب" },
];

// Social Media
const socialMediaData = [
    { id: nanoid(), platform: "facebook", url: "https://facebook.com/alshubaily", username: "@alshubaily" },
    { id: nanoid(), platform: "twitter", url: "https://twitter.com/alshubaily", username: "@alshubaily" },
    { id: nanoid(), platform: "instagram", url: "https://instagram.com/alshubaily", username: "@alshubaily" },
    { id: nanoid(), platform: "linkedin", url: "https://linkedin.com/company/alshubaily", username: "alshubaily" },
    { id: nanoid(), platform: "youtube", url: "https://youtube.com/@alshubaily", username: "@alshubaily" },
];

// Organization Goals
const goalsData = [
    { id: nanoid(), titleEn: "Industry Leadership", titleAr: "الريادة في القطاع", descriptionEn: "To become the leading contracting company in Saudi Arabia", descriptionAr: "أن نصبح شركة المقاولات الرائدة في المملكة العربية السعودية" },
    { id: nanoid(), titleEn: "Customer Satisfaction", titleAr: "رضا العملاء", descriptionEn: "Achieve highest levels of customer satisfaction", descriptionAr: "تحقيق أعلى مستويات رضا العملاء" },
    { id: nanoid(), titleEn: "Sustainable Growth", titleAr: "النمو المستدام", descriptionEn: "Ensure sustainable business growth while maintaining quality", descriptionAr: "ضمان نمو الأعمال المستدام مع الحفاظ على الجودة" },
];

// Work Principles
const principlesData = [
    { id: nanoid(), titleEn: "Quality First", titleAr: "الجودة أولاً", descriptionEn: "We prioritize quality in every project we undertake", descriptionAr: "نعطي الأولوية للجودة في كل مشروع نقوم به" },
    { id: nanoid(), titleEn: "Integrity", titleAr: "النزاهة", descriptionEn: "We conduct business with honesty and transparency", descriptionAr: "نمارس الأعمال بصدق وشفافية" },
    { id: nanoid(), titleEn: "Safety Standards", titleAr: "معايير السلامة", descriptionEn: "We maintain the highest safety standards on all sites", descriptionAr: "نحافظ على أعلى معايير السلامة في جميع المواقع" },
];

// General Policies
const policiesData = [
    { id: nanoid(), titleEn: "Environmental Policy", titleAr: "السياسة البيئية", descriptionEn: "Committed to minimizing environmental impact", descriptionAr: "ملتزمون بتقليل التأثير البيئي" },
    { id: nanoid(), titleEn: "Health & Safety Policy", titleAr: "سياسة الصحة والسلامة", descriptionEn: "Zero tolerance for safety violations", descriptionAr: "عدم التسامح مع انتهاكات السلامة" },
    { id: nanoid(), titleEn: "Quality Policy", titleAr: "سياسة الجودة", descriptionEn: "Continuous improvement in all processes", descriptionAr: "التحسين المستمر في جميع العمليات" },
];

// Visions
const visionsData = [
    { id: nanoid(), titleEn: "Our Vision", titleAr: "رؤيتنا", descriptionEn: "To be the most trusted name in construction and contracting across the Middle East", descriptionAr: "أن نكون الاسم الأكثر ثقة في البناء والمقاولات في الشرق الأوسط" },
];

// Missions
const missionsData = [
    { id: nanoid(), titleEn: "Our Mission", titleAr: "رسالتنا", descriptionEn: "To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of safety and quality", descriptionAr: "تقديم خدمات بناء استثنائية تتجاوز توقعات العملاء مع الحفاظ على أعلى معايير السلامة والجودة" },
];

// Company Values
const valuesData = [
    { id: nanoid(), titleEn: "Excellence", titleAr: "التميز", descriptionEn: "Striving for excellence in everything we do", descriptionAr: "السعي للتميز في كل ما نقوم به" },
    { id: nanoid(), titleEn: "Innovation", titleAr: "الابتكار", descriptionEn: "Embracing new technologies and methods", descriptionAr: "تبني التقنيات والأساليب الجديدة" },
    { id: nanoid(), titleEn: "Teamwork", titleAr: "العمل الجماعي", descriptionEn: "Collaborating for success", descriptionAr: "التعاون من أجل النجاح" },
    { id: nanoid(), titleEn: "Respect", titleAr: "الاحترام", descriptionEn: "Treating everyone with dignity and respect", descriptionAr: "معاملة الجميع بكرامة واحترام" },
];

// Strengths
const strengthsData = [
    { id: nanoid(), titleEn: "Skilled Workforce", titleAr: "القوى العاملة الماهرة", descriptionEn: "Highly trained and experienced team members", descriptionAr: "أعضاء فريق مدربين وذوي خبرة عالية" },
    { id: nanoid(), titleEn: "Modern Equipment", titleAr: "المعدات الحديثة", descriptionEn: "State-of-the-art construction equipment", descriptionAr: "أحدث معدات البناء" },
    { id: nanoid(), titleEn: "Strong Partnerships", titleAr: "الشراكات القوية", descriptionEn: "Established relationships with leading suppliers", descriptionAr: "علاقات راسخة مع الموردين الرائدين" },
];

// Experiences
const experiencesData = [
    { id: nanoid(), titleEn: "25+ Years Experience", titleAr: "خبرة 25+ سنة", descriptionEn: "Over two decades of successful project delivery", descriptionAr: "أكثر من عقدين من تسليم المشاريع الناجحة" },
    { id: nanoid(), titleEn: "500+ Projects", titleAr: "500+ مشروع", descriptionEn: "Successfully completed over 500 projects", descriptionAr: "أكملنا بنجاح أكثر من 500 مشروع" },
    { id: nanoid(), titleEn: "Major Clients", titleAr: "العملاء الرئيسيين", descriptionEn: "Trusted by government and private sector", descriptionAr: "موثوق من القطاعين الحكومي والخاص" },
];

// Commitments
const commitmentsData = [
    { id: nanoid(), titleEn: "On-Time Delivery", titleAr: "التسليم في الوقت المحدد", descriptionEn: "We commit to meeting project deadlines", descriptionAr: "نلتزم بالوفاء بالمواعيد النهائية للمشاريع" },
    { id: nanoid(), titleEn: "Budget Compliance", titleAr: "الالتزام بالميزانية", descriptionEn: "Projects delivered within agreed budgets", descriptionAr: "تسليم المشاريع ضمن الميزانيات المتفق عليها" },
    { id: nanoid(), titleEn: "After-Sales Support", titleAr: "دعم ما بعد البيع", descriptionEn: "Continued support after project completion", descriptionAr: "الدعم المستمر بعد اكتمال المشروع" },
];

async function main() {
    console.log("Seeding website info data...\n");

    console.log("1. Seeding contact info...");
    for (const item of contactData) {
        await db.insert(contactInfo).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.type}: ${item.value}`);
    }

    console.log("\n2. Seeding social media accounts...");
    for (const item of socialMediaData) {
        await db.insert(socialMediaAccounts).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.platform}`);
    }

    console.log("\n3. Seeding organization goals...");
    for (const item of goalsData) {
        await db.insert(organizationGoals).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n4. Seeding work principles...");
    for (const item of principlesData) {
        await db.insert(workPrinciples).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n5. Seeding general policies...");
    for (const item of policiesData) {
        await db.insert(generalPolicies).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n6. Seeding visions...");
    for (const item of visionsData) {
        await db.insert(visions).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n7. Seeding missions...");
    for (const item of missionsData) {
        await db.insert(missions).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n8. Seeding company values...");
    for (const item of valuesData) {
        await db.insert(companyValues).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n9. Seeding strengths...");
    for (const item of strengthsData) {
        await db.insert(strengths).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n10. Seeding experiences...");
    for (const item of experiencesData) {
        await db.insert(experiences).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n11. Seeding commitments...");
    for (const item of commitmentsData) {
        await db.insert(commitments).values(item).onConflictDoNothing();
        console.log(`   ✓ ${item.titleEn}`);
    }

    console.log("\n✅ All website info data seeded successfully!");
    await client.end();
}

main().catch((err) => {
    console.error("Error seeding website info:", err);
    process.exit(1);
});
