import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllTechniques, createTechnique, updateTechnique, deleteTechnique } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function TechniquesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/contracting");
    }

    const items = await getAllTechniques();

    return (
        <LookupPageClient
            items={items}
            titleEn="Techniques"
            titleAr="التقنيات"
            descriptionEn="Manage techniques for contracting services"
            descriptionAr="إدارة التقنيات لخدمات المقاولات"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createTechnique({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateTechnique(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteTechnique(id);
            }}
        />
    );
}
