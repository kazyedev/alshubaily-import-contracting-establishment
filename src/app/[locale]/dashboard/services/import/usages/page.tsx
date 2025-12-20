import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllUsages, createUsage, updateUsage, deleteUsage } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function UsagesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllUsages();

    return (
        <LookupPageClient
            items={items}
            titleEn="Usages"
            titleAr="الاستخدامات"
            descriptionEn="Manage usage purposes for import services"
            descriptionAr="إدارة أغراض الاستخدام لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createUsage({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateUsage(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteUsage(id);
            }}
        />
    );
}
