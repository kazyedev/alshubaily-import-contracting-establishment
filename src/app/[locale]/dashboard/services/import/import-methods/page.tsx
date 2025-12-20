import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllImportMethods, createImportMethod, updateImportMethod, deleteImportMethod } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function ImportMethodsPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllImportMethods();

    return (
        <LookupPageClient
            items={items}
            titleEn="Import Methods"
            titleAr="طرق الاستيراد"
            descriptionEn="Manage import methods for import services"
            descriptionAr="إدارة طرق الاستيراد لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createImportMethod({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateImportMethod(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteImportMethod(id);
            }}
        />
    );
}
