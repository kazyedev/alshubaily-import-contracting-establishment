"use server";

import { db } from "@/lib/db/drizzle";
import {
    importServices,
    countries,
    usages,
    importMethods,
    deliveryMethods,
    qualityWarrantyStandards,
    shipments,
    beneficiaryCategories,
    importServiceCountries,
    importServiceSuppliers,
    importServiceBeneficiaries,
    importServiceUsages,
    importServiceImportMethods,
    importServiceDeliveryMethods,
    importServiceQualityWarranty,
    importServiceShipments,
    importServiceWhyChooseUs,
    importServiceFaqs,
} from "@/lib/db/schema/services-schema";
import { suppliers } from "@/lib/db/schema/partners-schema";
import { whyChooseUs, faqs } from "@/lib/db/schema/common-schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// ==================== Types ====================

export type ImportService = typeof importServices.$inferSelect;

export type ImportServiceWithRelations = ImportService & {
    countries: { id: string; nameEn: string; nameAr: string }[];
    suppliers: { id: string; nameEn: string; nameAr: string }[];
    beneficiaries: { id: string; titleEn: string; titleAr: string }[];
    usages: { id: string; titleEn: string; titleAr: string }[];
    importMethods: { id: string; titleEn: string; titleAr: string }[];
    deliveryMethods: { id: string; titleEn: string; titleAr: string }[];
    qualityWarranty: { id: string; titleEn: string; titleAr: string }[];
    shipments: { id: string; titleEn: string; titleAr: string }[];
    whyChooseUs: { id: string; reasonEn: string; reasonAr: string }[];
    faqs: { id: string; questionEn: string; questionAr: string; answerEn: string; answerAr: string }[];
};

// ==================== Import Services ====================

export async function getAllImportServices(): Promise<ImportService[]> {
    return db.select().from(importServices).orderBy(importServices.createdAt);
}

export async function getImportServiceById(id: string): Promise<ImportServiceWithRelations | null> {
    const result = await db.select().from(importServices).where(eq(importServices.id, id)).limit(1);

    if (result.length === 0) return null;

    const service = result[0];

    const [
        serviceCountries,
        serviceSuppliers,
        serviceBeneficiaries,
        serviceUsages,
        serviceImportMethods,
        serviceDeliveryMethods,
        serviceQualityWarranty,
        serviceShipments,
        serviceWhyChooseUs,
        serviceFaqs,
    ] = await Promise.all([
        db.select({ id: countries.id, nameEn: countries.nameEn, nameAr: countries.nameAr })
            .from(importServiceCountries)
            .innerJoin(countries, eq(importServiceCountries.countryId, countries.id))
            .where(eq(importServiceCountries.importServiceId, id)),
        db.select({ id: suppliers.id, nameEn: suppliers.nameEn, nameAr: suppliers.nameAr })
            .from(importServiceSuppliers)
            .innerJoin(suppliers, eq(importServiceSuppliers.supplierId, suppliers.id))
            .where(eq(importServiceSuppliers.importServiceId, id)),
        db.select({ id: beneficiaryCategories.id, titleEn: beneficiaryCategories.titleEn, titleAr: beneficiaryCategories.titleAr })
            .from(importServiceBeneficiaries)
            .innerJoin(beneficiaryCategories, eq(importServiceBeneficiaries.beneficiaryCategoryId, beneficiaryCategories.id))
            .where(eq(importServiceBeneficiaries.importServiceId, id)),
        db.select({ id: usages.id, titleEn: usages.titleEn, titleAr: usages.titleAr })
            .from(importServiceUsages)
            .innerJoin(usages, eq(importServiceUsages.usageId, usages.id))
            .where(eq(importServiceUsages.importServiceId, id)),
        db.select({ id: importMethods.id, titleEn: importMethods.titleEn, titleAr: importMethods.titleAr })
            .from(importServiceImportMethods)
            .innerJoin(importMethods, eq(importServiceImportMethods.importMethodId, importMethods.id))
            .where(eq(importServiceImportMethods.importServiceId, id)),
        db.select({ id: deliveryMethods.id, titleEn: deliveryMethods.titleEn, titleAr: deliveryMethods.titleAr })
            .from(importServiceDeliveryMethods)
            .innerJoin(deliveryMethods, eq(importServiceDeliveryMethods.deliveryMethodId, deliveryMethods.id))
            .where(eq(importServiceDeliveryMethods.importServiceId, id)),
        db.select({ id: qualityWarrantyStandards.id, titleEn: qualityWarrantyStandards.titleEn, titleAr: qualityWarrantyStandards.titleAr })
            .from(importServiceQualityWarranty)
            .innerJoin(qualityWarrantyStandards, eq(importServiceQualityWarranty.qualityWarrantyStandardId, qualityWarrantyStandards.id))
            .where(eq(importServiceQualityWarranty.importServiceId, id)),
        db.select({ id: shipments.id, titleEn: shipments.titleEn, titleAr: shipments.titleAr })
            .from(importServiceShipments)
            .innerJoin(shipments, eq(importServiceShipments.shipmentId, shipments.id))
            .where(eq(importServiceShipments.importServiceId, id)),
        db.select({ id: whyChooseUs.id, reasonEn: whyChooseUs.reasonEn, reasonAr: whyChooseUs.reasonAr })
            .from(importServiceWhyChooseUs)
            .innerJoin(whyChooseUs, eq(importServiceWhyChooseUs.whyChooseUsId, whyChooseUs.id))
            .where(eq(importServiceWhyChooseUs.importServiceId, id)),
        db.select({
            id: faqs.id,
            questionEn: faqs.questionEn,
            questionAr: faqs.questionAr,
            answerEn: faqs.answerEn,
            answerAr: faqs.answerAr,
        })
            .from(importServiceFaqs)
            .innerJoin(faqs, eq(importServiceFaqs.faqId, faqs.id))
            .where(eq(importServiceFaqs.importServiceId, id)),
    ]);

    return {
        ...service,
        countries: serviceCountries,
        suppliers: serviceSuppliers,
        beneficiaries: serviceBeneficiaries,
        usages: serviceUsages,
        importMethods: serviceImportMethods,
        deliveryMethods: serviceDeliveryMethods,
        qualityWarranty: serviceQualityWarranty,
        shipments: serviceShipments,
        whyChooseUs: serviceWhyChooseUs,
        faqs: serviceFaqs,
    };
}

export async function createImportService(data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    slugEn: string;
    slugAr: string;
    mainImageId?: string | null;
    countryIds: string[];
    supplierIds: string[];
    beneficiaryIds: string[];
    usageIds: string[];
    importMethodIds: string[];
    deliveryMethodIds: string[];
    qualityWarrantyIds: string[];
    shipmentIds: string[];
    whyChooseUsIds: string[];
    faqIds: string[];
}): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();

        await db.insert(importServices).values({
            id,
            titleEn: data.titleEn,
            titleAr: data.titleAr,
            descriptionEn: data.descriptionEn || null,
            descriptionAr: data.descriptionAr || null,
            slugEn: data.slugEn,
            slugAr: data.slugAr,
            mainImageId: data.mainImageId || null,
            mainServiceId: "service_import",
        });

        // Insert junction records
        await Promise.all([
            ...data.countryIds.map(countryId =>
                db.insert(importServiceCountries).values({ importServiceId: id, countryId }).onConflictDoNothing()
            ),
            ...data.supplierIds.map(supplierId =>
                db.insert(importServiceSuppliers).values({ importServiceId: id, supplierId }).onConflictDoNothing()
            ),
            ...data.beneficiaryIds.map(beneficiaryCategoryId =>
                db.insert(importServiceBeneficiaries).values({ importServiceId: id, beneficiaryCategoryId }).onConflictDoNothing()
            ),
            ...data.usageIds.map(usageId =>
                db.insert(importServiceUsages).values({ importServiceId: id, usageId }).onConflictDoNothing()
            ),
            ...data.importMethodIds.map(importMethodId =>
                db.insert(importServiceImportMethods).values({ importServiceId: id, importMethodId }).onConflictDoNothing()
            ),
            ...data.deliveryMethodIds.map(deliveryMethodId =>
                db.insert(importServiceDeliveryMethods).values({ importServiceId: id, deliveryMethodId }).onConflictDoNothing()
            ),
            ...data.qualityWarrantyIds.map(qualityWarrantyStandardId =>
                db.insert(importServiceQualityWarranty).values({ importServiceId: id, qualityWarrantyStandardId }).onConflictDoNothing()
            ),
            ...data.shipmentIds.map(shipmentId =>
                db.insert(importServiceShipments).values({ importServiceId: id, shipmentId }).onConflictDoNothing()
            ),
            ...data.whyChooseUsIds.map(whyChooseUsId =>
                db.insert(importServiceWhyChooseUs).values({ importServiceId: id, whyChooseUsId }).onConflictDoNothing()
            ),
            ...data.faqIds.map(faqId =>
                db.insert(importServiceFaqs).values({ importServiceId: id, faqId }).onConflictDoNothing()
            ),
        ]);

        return { success: true, message: "Import service created", id };
    } catch (error) {
        console.error("Error creating import service:", error);
        return { success: false, message: "Failed to create import service" };
    }
}

export async function updateImportService(
    id: string,
    data: {
        titleEn: string;
        titleAr: string;
        descriptionEn?: string;
        descriptionAr?: string;
        slugEn: string;
        slugAr: string;
        mainImageId?: string | null;
        countryIds: string[];
        supplierIds: string[];
        beneficiaryIds: string[];
        usageIds: string[];
        importMethodIds: string[];
        deliveryMethodIds: string[];
        qualityWarrantyIds: string[];
        shipmentIds: string[];
        whyChooseUsIds: string[];
        faqIds: string[];
    }
): Promise<{ success: boolean; message: string }> {
    try {
        await db.update(importServices).set({
            titleEn: data.titleEn,
            titleAr: data.titleAr,
            descriptionEn: data.descriptionEn || null,
            descriptionAr: data.descriptionAr || null,
            slugEn: data.slugEn,
            slugAr: data.slugAr,
            mainImageId: data.mainImageId || null,
        }).where(eq(importServices.id, id));

        // Delete existing junctions
        await Promise.all([
            db.delete(importServiceCountries).where(eq(importServiceCountries.importServiceId, id)),
            db.delete(importServiceSuppliers).where(eq(importServiceSuppliers.importServiceId, id)),
            db.delete(importServiceBeneficiaries).where(eq(importServiceBeneficiaries.importServiceId, id)),
            db.delete(importServiceUsages).where(eq(importServiceUsages.importServiceId, id)),
            db.delete(importServiceImportMethods).where(eq(importServiceImportMethods.importServiceId, id)),
            db.delete(importServiceDeliveryMethods).where(eq(importServiceDeliveryMethods.importServiceId, id)),
            db.delete(importServiceQualityWarranty).where(eq(importServiceQualityWarranty.importServiceId, id)),
            db.delete(importServiceShipments).where(eq(importServiceShipments.importServiceId, id)),
            db.delete(importServiceWhyChooseUs).where(eq(importServiceWhyChooseUs.importServiceId, id)),
            db.delete(importServiceFaqs).where(eq(importServiceFaqs.importServiceId, id)),
        ]);

        // Re-insert junctions
        await Promise.all([
            ...data.countryIds.map(countryId =>
                db.insert(importServiceCountries).values({ importServiceId: id, countryId }).onConflictDoNothing()
            ),
            ...data.supplierIds.map(supplierId =>
                db.insert(importServiceSuppliers).values({ importServiceId: id, supplierId }).onConflictDoNothing()
            ),
            ...data.beneficiaryIds.map(beneficiaryCategoryId =>
                db.insert(importServiceBeneficiaries).values({ importServiceId: id, beneficiaryCategoryId }).onConflictDoNothing()
            ),
            ...data.usageIds.map(usageId =>
                db.insert(importServiceUsages).values({ importServiceId: id, usageId }).onConflictDoNothing()
            ),
            ...data.importMethodIds.map(importMethodId =>
                db.insert(importServiceImportMethods).values({ importServiceId: id, importMethodId }).onConflictDoNothing()
            ),
            ...data.deliveryMethodIds.map(deliveryMethodId =>
                db.insert(importServiceDeliveryMethods).values({ importServiceId: id, deliveryMethodId }).onConflictDoNothing()
            ),
            ...data.qualityWarrantyIds.map(qualityWarrantyStandardId =>
                db.insert(importServiceQualityWarranty).values({ importServiceId: id, qualityWarrantyStandardId }).onConflictDoNothing()
            ),
            ...data.shipmentIds.map(shipmentId =>
                db.insert(importServiceShipments).values({ importServiceId: id, shipmentId }).onConflictDoNothing()
            ),
            ...data.whyChooseUsIds.map(whyChooseUsId =>
                db.insert(importServiceWhyChooseUs).values({ importServiceId: id, whyChooseUsId }).onConflictDoNothing()
            ),
            ...data.faqIds.map(faqId =>
                db.insert(importServiceFaqs).values({ importServiceId: id, faqId }).onConflictDoNothing()
            ),
        ]);

        return { success: true, message: "Import service updated" };
    } catch (error) {
        console.error("Error updating import service:", error);
        return { success: false, message: "Failed to update import service" };
    }
}

export async function deleteImportService(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(importServices).where(eq(importServices.id, id));
        return { success: true, message: "Import service deleted" };
    } catch (error) {
        console.error("Error deleting import service:", error);
        return { success: false, message: "Failed to delete import service" };
    }
}
