import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllWorks, createWork, updateWork, deleteWork } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function WorksPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/contracting");
    }

    const items = await getAllWorks();

    return (
        <LookupPageClient
            items={items}
            titleEn="Works"
            titleAr="الأعمال"
            descriptionEn="Manage works for contracting services"
            descriptionAr="إدارة الأعمال لخدمات المقاولات"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createWork({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateWork(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteWork(id);
            }}
        />
    );
}
