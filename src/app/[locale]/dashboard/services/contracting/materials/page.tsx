import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllMaterials, createMaterial, updateMaterial, deleteMaterial } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function MaterialsPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/contracting");
    }

    const items = await getAllMaterials();

    return (
        <LookupPageClient
            items={items}
            titleEn="Materials"
            titleAr="المواد"
            descriptionEn="Manage materials for contracting services"
            descriptionAr="إدارة المواد لخدمات المقاولات"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createMaterial({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateMaterial(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteMaterial(id);
            }}
        />
    );
}
