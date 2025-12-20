import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllQualitySafetyStandards, createQualitySafetyStandard, updateQualitySafetyStandard, deleteQualitySafetyStandard } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function QualitySafetyPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/contracting");
    }

    const items = await getAllQualitySafetyStandards();

    return (
        <LookupPageClient
            items={items}
            titleEn="Quality & Safety Standards"
            titleAr="معايير الجودة والسلامة"
            descriptionEn="Manage quality and safety standards for contracting services"
            descriptionAr="إدارة معايير الجودة والسلامة لخدمات المقاولات"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createQualitySafetyStandard({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateQualitySafetyStandard(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteQualitySafetyStandard(id);
            }}
        />
    );
}
