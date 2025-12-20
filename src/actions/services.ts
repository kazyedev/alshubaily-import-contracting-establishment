"use server";

import { db } from "@/lib/db/drizzle";
import {
    mainServices,
    works,
    materials,
    techniques,
    qualitySafetyStandards,
    countries,
    usages,
    importMethods,
    deliveryMethods,
    qualityWarrantyStandards,
    shipments,
    beneficiaryCategories,
} from "@/lib/db/schema/services-schema";
import { suppliers } from "@/lib/db/schema/partners-schema";
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
export type Country = typeof countries.$inferSelect;
export type Supplier = typeof suppliers.$inferSelect;
export type Usage = typeof usages.$inferSelect;
export type BeneficiaryCategory = typeof beneficiaryCategories.$inferSelect;
export type ImportMethod = typeof importMethods.$inferSelect;
export type DeliveryMethod = typeof deliveryMethods.$inferSelect;
export type QualityWarrantyStandard = typeof qualityWarrantyStandards.$inferSelect;
export type Shipment = typeof shipments.$inferSelect;

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

// ==================== Countries ====================

export async function getAllCountries(): Promise<Country[]> {
    return db.select().from(countries).orderBy(countries.nameEn);
}

export async function createCountry(data: { nameEn: string; nameAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(countries).values({ id, ...data });
        return { success: true, message: "Country created", id };
    } catch (error) {
        console.error("Error creating country:", error);
        return { success: false, message: "Failed to create country" };
    }
}

export async function updateCountry(id: string, data: { nameEn: string; nameAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(countries).set(data).where(eq(countries.id, id));
        return { success: true, message: "Country updated" };
    } catch (error) {
        console.error("Error updating country:", error);
        return { success: false, message: "Failed to update country" };
    }
}

export async function deleteCountry(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(countries).where(eq(countries.id, id));
        return { success: true, message: "Country deleted" };
    } catch (error) {
        console.error("Error deleting country:", error);
        return { success: false, message: "Failed to delete country" };
    }
}

// ==================== Suppliers ====================

export async function getAllSuppliers(): Promise<Supplier[]> {
    return db.select().from(suppliers).orderBy(suppliers.nameEn);
}

export async function createSupplier(data: { nameEn: string; nameAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(suppliers).values({ id, ...data });
        return { success: true, message: "Supplier created", id };
    } catch (error) {
        console.error("Error creating supplier:", error);
        return { success: false, message: "Failed to create supplier" };
    }
}

export async function updateSupplier(id: string, data: { nameEn: string; nameAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(suppliers).set(data).where(eq(suppliers.id, id));
        return { success: true, message: "Supplier updated" };
    } catch (error) {
        console.error("Error updating supplier:", error);
        return { success: false, message: "Failed to update supplier" };
    }
}

export async function deleteSupplier(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(suppliers).where(eq(suppliers.id, id));
        return { success: true, message: "Supplier deleted" };
    } catch (error) {
        console.error("Error deleting supplier:", error);
        return { success: false, message: "Failed to delete supplier" };
    }
}

// ==================== Beneficiary Categories ====================

export async function getAllBeneficiaryCategories(): Promise<BeneficiaryCategory[]> {
    return db.select().from(beneficiaryCategories).orderBy(beneficiaryCategories.titleEn);
}

export async function createBeneficiaryCategory(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(beneficiaryCategories).values({ id, ...data });
        return { success: true, message: "Beneficiary category created", id };
    } catch (error) {
        console.error("Error creating beneficiary category:", error);
        return { success: false, message: "Failed to create beneficiary category" };
    }
}

export async function updateBeneficiaryCategory(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(beneficiaryCategories).set(data).where(eq(beneficiaryCategories.id, id));
        return { success: true, message: "Beneficiary category updated" };
    } catch (error) {
        console.error("Error updating beneficiary category:", error);
        return { success: false, message: "Failed to update beneficiary category" };
    }
}

export async function deleteBeneficiaryCategory(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(beneficiaryCategories).where(eq(beneficiaryCategories.id, id));
        return { success: true, message: "Beneficiary category deleted" };
    } catch (error) {
        console.error("Error deleting beneficiary category:", error);
        return { success: false, message: "Failed to delete beneficiary category" };
    }
}

// ==================== Usages ====================

export async function getAllUsages(): Promise<Usage[]> {
    return db.select().from(usages).orderBy(usages.titleEn);
}

export async function createUsage(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(usages).values({ id, ...data });
        return { success: true, message: "Usage created", id };
    } catch (error) {
        console.error("Error creating usage:", error);
        return { success: false, message: "Failed to create usage" };
    }
}

export async function updateUsage(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(usages).set(data).where(eq(usages.id, id));
        return { success: true, message: "Usage updated" };
    } catch (error) {
        console.error("Error updating usage:", error);
        return { success: false, message: "Failed to update usage" };
    }
}

export async function deleteUsage(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(usages).where(eq(usages.id, id));
        return { success: true, message: "Usage deleted" };
    } catch (error) {
        console.error("Error deleting usage:", error);
        return { success: false, message: "Failed to delete usage" };
    }
}

// ==================== Import Methods ====================

export async function getAllImportMethods(): Promise<ImportMethod[]> {
    return db.select().from(importMethods).orderBy(importMethods.titleEn);
}

export async function createImportMethod(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(importMethods).values({ id, ...data });
        return { success: true, message: "Import method created", id };
    } catch (error) {
        console.error("Error creating import method:", error);
        return { success: false, message: "Failed to create import method" };
    }
}

export async function updateImportMethod(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(importMethods).set(data).where(eq(importMethods.id, id));
        return { success: true, message: "Import method updated" };
    } catch (error) {
        console.error("Error updating import method:", error);
        return { success: false, message: "Failed to update import method" };
    }
}

export async function deleteImportMethod(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(importMethods).where(eq(importMethods.id, id));
        return { success: true, message: "Import method deleted" };
    } catch (error) {
        console.error("Error deleting import method:", error);
        return { success: false, message: "Failed to delete import method" };
    }
}

// ==================== Delivery Methods ====================

export async function getAllDeliveryMethods(): Promise<DeliveryMethod[]> {
    return db.select().from(deliveryMethods).orderBy(deliveryMethods.titleEn);
}

export async function createDeliveryMethod(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(deliveryMethods).values({ id, ...data });
        return { success: true, message: "Delivery method created", id };
    } catch (error) {
        console.error("Error creating delivery method:", error);
        return { success: false, message: "Failed to create delivery method" };
    }
}

export async function updateDeliveryMethod(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(deliveryMethods).set(data).where(eq(deliveryMethods.id, id));
        return { success: true, message: "Delivery method updated" };
    } catch (error) {
        console.error("Error updating delivery method:", error);
        return { success: false, message: "Failed to update delivery method" };
    }
}

export async function deleteDeliveryMethod(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(deliveryMethods).where(eq(deliveryMethods.id, id));
        return { success: true, message: "Delivery method deleted" };
    } catch (error) {
        console.error("Error deleting delivery method:", error);
        return { success: false, message: "Failed to delete delivery method" };
    }
}

// ==================== Quality Warranty Standards ====================

export async function getAllQualityWarrantyStandards(): Promise<QualityWarrantyStandard[]> {
    return db.select().from(qualityWarrantyStandards).orderBy(qualityWarrantyStandards.titleEn);
}

export async function createQualityWarrantyStandard(data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(qualityWarrantyStandards).values({ id, ...data });
        return { success: true, message: "Quality warranty standard created", id };
    } catch (error) {
        console.error("Error creating quality warranty standard:", error);
        return { success: false, message: "Failed to create quality warranty standard" };
    }
}

export async function updateQualityWarrantyStandard(id: string, data: { titleEn: string; titleAr: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(qualityWarrantyStandards).set(data).where(eq(qualityWarrantyStandards.id, id));
        return { success: true, message: "Quality warranty standard updated" };
    } catch (error) {
        console.error("Error updating quality warranty standard:", error);
        return { success: false, message: "Failed to update quality warranty standard" };
    }
}

export async function deleteQualityWarrantyStandard(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(qualityWarrantyStandards).where(eq(qualityWarrantyStandards.id, id));
        return { success: true, message: "Quality warranty standard deleted" };
    } catch (error) {
        console.error("Error deleting quality warranty standard:", error);
        return { success: false, message: "Failed to delete quality warranty standard" };
    }
}

// ==================== Shipments ====================

export async function getAllShipments(): Promise<Shipment[]> {
    return db.select().from(shipments).orderBy(shipments.titleEn);
}

export async function createShipment(data: { titleEn: string; titleAr: string; descriptionEn?: string; descriptionAr?: string }): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(shipments).values({ id, ...data });
        return { success: true, message: "Shipment created", id };
    } catch (error) {
        console.error("Error creating shipment:", error);
        return { success: false, message: "Failed to create shipment" };
    }
}

export async function updateShipment(id: string, data: { titleEn: string; titleAr: string; descriptionEn?: string; descriptionAr?: string }): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(shipments).set(data).where(eq(shipments.id, id));
        return { success: true, message: "Shipment updated" };
    } catch (error) {
        console.error("Error updating shipment:", error);
        return { success: false, message: "Failed to update shipment" };
    }
}

export async function deleteShipment(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(shipments).where(eq(shipments.id, id));
        return { success: true, message: "Shipment deleted" };
    } catch (error) {
        console.error("Error deleting shipment:", error);
        return { success: false, message: "Failed to delete shipment" };
    }
}
