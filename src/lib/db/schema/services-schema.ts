import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { images } from "./images-schema";
import { suppliers } from "./partners-schema";
import { projects } from "./projects-schema";
import { whyChooseUs, faqs } from "./common-schema";

// ==================== Base Tables ====================

/**
 * Main Services table - e.g., contracting, import
 */
export const mainServices = pgTable("main_services", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    mainImageId: text("main_image_id").references(() => images.id, { onDelete: "set null" }),
    slugEn: text("slug_en").notNull().unique(),
    slugAr: text("slug_ar").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Countries table
 */
export const countries = pgTable("countries", {
    id: text("id").primaryKey(),
    nameEn: text("name_en").notNull(),
    nameAr: text("name_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Usages table - usage purposes
 */
export const usages = pgTable("usages", {
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
 * Import Methods table
 */
export const importMethods = pgTable("import_methods", {
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
 * Delivery Methods table
 */
export const deliveryMethods = pgTable("delivery_methods", {
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
 * Quality & Warranty Standards table
 */
export const qualityWarrantyStandards = pgTable("quality_warranty_standards", {
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
 * Quality & Safety Standards table
 */
export const qualitySafetyStandards = pgTable("quality_safety_standards", {
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
 * Shipments table
 */
export const shipments = pgTable("shipments", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    mainImageId: text("main_image_id").references(() => images.id, { onDelete: "set null" }),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    arrivalDate: timestamp("arrival_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/**
 * Shipment Images junction table
 */
export const shipmentImages = pgTable(
    "shipment_images",
    {
        shipmentId: text("shipment_id")
            .notNull()
            .references(() => shipments.id, { onDelete: "cascade" }),
        imageId: text("image_id")
            .notNull()
            .references(() => images.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.shipmentId, table.imageId] })]
);

/**
 * Works table - for included/excluded works in contracting
 */
export const works = pgTable("works", {
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
 * Materials table
 */
export const materials = pgTable("materials", {
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
 * Techniques table
 */
export const techniques = pgTable("techniques", {
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
 * Beneficiary Categories table
 */
export const beneficiaryCategories = pgTable("beneficiary_categories", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// ==================== Import Services ====================

/**
 * Import Services table
 */
export const importServices = pgTable("import_services", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    mainServiceId: text("main_service_id").references(() => mainServices.id, { onDelete: "set null" }),
    mainImageId: text("main_image_id").references(() => images.id, { onDelete: "set null" }),
    slugEn: text("slug_en").notNull().unique(),
    slugAr: text("slug_ar").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Import Service Junction Tables
export const importServiceCountries = pgTable(
    "import_service_countries",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        countryId: text("country_id")
            .notNull()
            .references(() => countries.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.countryId] })]
);

export const importServiceSuppliers = pgTable(
    "import_service_suppliers",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        supplierId: text("supplier_id")
            .notNull()
            .references(() => suppliers.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.supplierId] })]
);

export const importServiceBeneficiaries = pgTable(
    "import_service_beneficiaries",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        beneficiaryCategoryId: text("beneficiary_category_id")
            .notNull()
            .references(() => beneficiaryCategories.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.beneficiaryCategoryId] })]
);

export const importServiceUsages = pgTable(
    "import_service_usages",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        usageId: text("usage_id")
            .notNull()
            .references(() => usages.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.usageId] })]
);

export const importServiceImportMethods = pgTable(
    "import_service_import_methods",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        importMethodId: text("import_method_id")
            .notNull()
            .references(() => importMethods.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.importMethodId] })]
);

export const importServiceDeliveryMethods = pgTable(
    "import_service_delivery_methods",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        deliveryMethodId: text("delivery_method_id")
            .notNull()
            .references(() => deliveryMethods.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.deliveryMethodId] })]
);

export const importServiceQualityWarranty = pgTable(
    "import_service_quality_warranty",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        qualityWarrantyStandardId: text("quality_warranty_standard_id")
            .notNull()
            .references(() => qualityWarrantyStandards.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.qualityWarrantyStandardId] })]
);

export const importServiceShipments = pgTable(
    "import_service_shipments",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        shipmentId: text("shipment_id")
            .notNull()
            .references(() => shipments.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.shipmentId] })]
);

export const importServiceWhyChooseUs = pgTable(
    "import_service_why_choose_us",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        whyChooseUsId: text("why_choose_us_id")
            .notNull()
            .references(() => whyChooseUs.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.whyChooseUsId] })]
);

export const importServiceFaqs = pgTable(
    "import_service_faqs",
    {
        importServiceId: text("import_service_id")
            .notNull()
            .references(() => importServices.id, { onDelete: "cascade" }),
        faqId: text("faq_id")
            .notNull()
            .references(() => faqs.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.importServiceId, table.faqId] })]
);

// ==================== Contracting Services ====================

/**
 * Contracting Services table
 */
export const contractingServices = pgTable("contracting_services", {
    id: text("id").primaryKey(),
    titleEn: text("title_en").notNull(),
    titleAr: text("title_ar").notNull(),
    descriptionEn: text("description_en"),
    descriptionAr: text("description_ar"),
    mainServiceId: text("main_service_id").references(() => mainServices.id, { onDelete: "set null" }),
    mainImageId: text("main_image_id").references(() => images.id, { onDelete: "set null" }),
    targetAudienceEn: text("target_audience_en"),
    targetAudienceAr: text("target_audience_ar"),
    whenNeededEn: text("when_needed_en"),
    whenNeededAr: text("when_needed_ar"),
    slugEn: text("slug_en").notNull().unique(),
    slugAr: text("slug_ar").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Contracting Service Junction Tables
export const contractingServiceProjects = pgTable(
    "contracting_service_projects",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        projectId: text("project_id")
            .notNull()
            .references(() => projects.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.projectId] })]
);

export const contractingServiceIncludedWorks = pgTable(
    "contracting_service_included_works",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        workId: text("work_id")
            .notNull()
            .references(() => works.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.workId] })]
);

export const contractingServiceExcludedWorks = pgTable(
    "contracting_service_excluded_works",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        workId: text("work_id")
            .notNull()
            .references(() => works.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.workId] })]
);

export const contractingServiceMaterials = pgTable(
    "contracting_service_materials",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        materialId: text("material_id")
            .notNull()
            .references(() => materials.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.materialId] })]
);

export const contractingServiceTechniques = pgTable(
    "contracting_service_techniques",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        techniqueId: text("technique_id")
            .notNull()
            .references(() => techniques.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.techniqueId] })]
);

export const contractingServiceQualitySafety = pgTable(
    "contracting_service_quality_safety",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        qualitySafetyStandardId: text("quality_safety_standard_id")
            .notNull()
            .references(() => qualitySafetyStandards.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.qualitySafetyStandardId] })]
);

export const contractingServiceWhyChooseUs = pgTable(
    "contracting_service_why_choose_us",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        whyChooseUsId: text("why_choose_us_id")
            .notNull()
            .references(() => whyChooseUs.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.whyChooseUsId] })]
);

export const contractingServiceFaqs = pgTable(
    "contracting_service_faqs",
    {
        contractingServiceId: text("contracting_service_id")
            .notNull()
            .references(() => contractingServices.id, { onDelete: "cascade" }),
        faqId: text("faq_id")
            .notNull()
            .references(() => faqs.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [primaryKey({ columns: [table.contractingServiceId, table.faqId] })]
);
