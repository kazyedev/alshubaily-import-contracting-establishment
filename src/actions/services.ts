"use server";

import { db } from "@/lib/db/drizzle";
import {
    mainServices,
    works,
    materials,
    techniques,
    qualitySafetyStandards,
} from "@/lib/db/schema/services-schema";
import { whyChooseUs, faqs } from "@/lib/db/schema/common-schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// ==================== Types ====================

export type MainService = typeof mainServices.$inferSelect;
export type Work = typeof works.$inferSelect;
export type Material = typeof materials.$inferSelect;
export type Technique = typeof techniques.$inferSelect;
export type QualitySafetyStandard = typeof qualitySafetyStandards.$inferSelect;
export type WhyChooseUsItem = typeof whyChooseUs.$inferSelect;
export type FaqItem = typeof faqs.$inferSelect;

// ==================== Main Services ====================

export async function getAllMainServices(): Promise<MainService[]> {
    return db.select().from(mainServices).orderBy(mainServices.createdAt);
}

// ==================== Works ====================

export async function getAllWorks(): Promise<Work[]> {
    return db.select().from(works).orderBy(works.titleEn);
}

export async function getWorkById(id: string): Promise<Work | null> {
    const result = await db.select().from(works).where(eq(works.id, id)).limit(1);
    return result[0] || null;
}

export async function createWork(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(works).values({ id, ...data });
        return { success: true, message: "Work created", id };
    } catch (error) {
        console.error("Error creating work:", error);
        return { success: false, message: "Failed to create work" };
    }
}

export async function updateWork(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(works).set(data).where(eq(works.id, id));
        return { success: true, message: "Work updated" };
    } catch (error) {
        console.error("Error updating work:", error);
        return { success: false, message: "Failed to update work" };
    }
}

export async function deleteWork(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(works).where(eq(works.id, id));
        return { success: true, message: "Work deleted" };
    } catch (error) {
        console.error("Error deleting work:", error);
        return { success: false, message: "Failed to delete work" };
    }
}

// ==================== Materials ====================

export async function getAllMaterials(): Promise<Material[]> {
    return db.select().from(materials).orderBy(materials.titleEn);
}

export async function getMaterialById(id: string): Promise<Material | null> {
    const result = await db.select().from(materials).where(eq(materials.id, id)).limit(1);
    return result[0] || null;
}

export async function createMaterial(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(materials).values({ id, ...data });
        return { success: true, message: "Material created", id };
    } catch (error) {
        console.error("Error creating material:", error);
        return { success: false, message: "Failed to create material" };
    }
}

export async function updateMaterial(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(materials).set(data).where(eq(materials.id, id));
        return { success: true, message: "Material updated" };
    } catch (error) {
        console.error("Error updating material:", error);
        return { success: false, message: "Failed to update material" };
    }
}

export async function deleteMaterial(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(materials).where(eq(materials.id, id));
        return { success: true, message: "Material deleted" };
    } catch (error) {
        console.error("Error deleting material:", error);
        return { success: false, message: "Failed to delete material" };
    }
}

// ==================== Techniques ====================

export async function getAllTechniques(): Promise<Technique[]> {
    return db.select().from(techniques).orderBy(techniques.titleEn);
}

export async function getTechniqueById(id: string): Promise<Technique | null> {
    const result = await db.select().from(techniques).where(eq(techniques.id, id)).limit(1);
    return result[0] || null;
}

export async function createTechnique(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(techniques).values({ id, ...data });
        return { success: true, message: "Technique created", id };
    } catch (error) {
        console.error("Error creating technique:", error);
        return { success: false, message: "Failed to create technique" };
    }
}

export async function updateTechnique(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(techniques).set(data).where(eq(techniques.id, id));
        return { success: true, message: "Technique updated" };
    } catch (error) {
        console.error("Error updating technique:", error);
        return { success: false, message: "Failed to update technique" };
    }
}

export async function deleteTechnique(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(techniques).where(eq(techniques.id, id));
        return { success: true, message: "Technique deleted" };
    } catch (error) {
        console.error("Error deleting technique:", error);
        return { success: false, message: "Failed to delete technique" };
    }
}

// ==================== Quality Safety Standards ====================

export async function getAllQualitySafetyStandards(): Promise<QualitySafetyStandard[]> {
    return db.select().from(qualitySafetyStandards).orderBy(qualitySafetyStandards.titleEn);
}

export async function getQualitySafetyStandardById(id: string): Promise<QualitySafetyStandard | null> {
    const result = await db.select().from(qualitySafetyStandards).where(eq(qualitySafetyStandards.id, id)).limit(1);
    return result[0] || null;
}

export async function createQualitySafetyStandard(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(qualitySafetyStandards).values({ id, ...data });
        return { success: true, message: "Quality safety standard created", id };
    } catch (error) {
        console.error("Error creating quality safety standard:", error);
        return { success: false, message: "Failed to create quality safety standard" };
    }
}

export async function updateQualitySafetyStandard(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(qualitySafetyStandards).set(data).where(eq(qualitySafetyStandards.id, id));
        return { success: true, message: "Quality safety standard updated" };
    } catch (error) {
        console.error("Error updating quality safety standard:", error);
        return { success: false, message: "Failed to update quality safety standard" };
    }
}

export async function deleteQualitySafetyStandard(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(qualitySafetyStandards).where(eq(qualitySafetyStandards.id, id));
        return { success: true, message: "Quality safety standard deleted" };
    } catch (error) {
        console.error("Error deleting quality safety standard:", error);
        return { success: false, message: "Failed to delete quality safety standard" };
    }
}

// ==================== Why Choose Us ====================

export async function getAllWhyChooseUs(): Promise<WhyChooseUsItem[]> {
    return db.select().from(whyChooseUs).orderBy(whyChooseUs.reasonEn);
}

export async function getWhyChooseUsById(id: string): Promise<WhyChooseUsItem | null> {
    const result = await db.select().from(whyChooseUs).where(eq(whyChooseUs.id, id)).limit(1);
    return result[0] || null;
}

export async function createWhyChooseUs(data: { reasonEn: string; reasonAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(whyChooseUs).values({ id, ...data });
        return { success: true, message: "Why choose us created", id };
    } catch (error) {
        console.error("Error creating why choose us:", error);
        return { success: false, message: "Failed to create why choose us" };
    }
}

export async function updateWhyChooseUs(id: string, data: { reasonEn: string; reasonAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(whyChooseUs).set(data).where(eq(whyChooseUs.id, id));
        return { success: true, message: "Why choose us updated" };
    } catch (error) {
        console.error("Error updating why choose us:", error);
        return { success: false, message: "Failed to update why choose us" };
    }
}

export async function deleteWhyChooseUs(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(whyChooseUs).where(eq(whyChooseUs.id, id));
        return { success: true, message: "Why choose us deleted" };
    } catch (error) {
        console.error("Error deleting why choose us:", error);
        return { success: false, message: "Failed to delete why choose us" };
    }
}

// ==================== FAQs ====================

export async function getAllFaqs(): Promise<FaqItem[]> {
    return db.select().from(faqs).orderBy(faqs.questionEn);
}

export async function getFaqById(id: string): Promise<FaqItem | null> {
    const result = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
    return result[0] || null;
}

export async function createFaq(data: { questionEn: string; questionAr: string; answerEn: string; answerAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(faqs).values({ id, ...data });
        return { success: true, message: "FAQ created", id };
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return { success: false, message: "Failed to create FAQ" };
    }
}

export async function updateFaq(id: string, data: { questionEn: string; questionAr: string; answerEn: string; answerAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(faqs).set(data).where(eq(faqs.id, id));
        return { success: true, message: "FAQ updated" };
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return { success: false, message: "Failed to update FAQ" };
    }
}

export async function deleteFaq(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(faqs).where(eq(faqs.id, id));
        return { success: true, message: "FAQ deleted" };
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return { success: false, message: "Failed to delete FAQ" };
    }
}
