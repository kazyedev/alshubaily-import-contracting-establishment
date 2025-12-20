import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllQualityWarrantyStandards, createQualityWarrantyStandard, updateQualityWarrantyStandard, deleteQualityWarrantyStandard } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function QualityWarrantyPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllQualityWarrantyStandards();

    return (
        <LookupPageClient
            items={items}
            titleEn="Quality & Warranty Standards"
            titleAr="معايير الجودة والضمان"
            descriptionEn="Manage quality and warranty standards for import services"
            descriptionAr="إدارة معايير الجودة والضمان لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createQualityWarrantyStandard({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateQualityWarrantyStandard(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteQualityWarrantyStandard(id);
            }}
        />
    );
}
