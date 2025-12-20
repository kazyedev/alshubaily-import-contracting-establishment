import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllDeliveryMethods, createDeliveryMethod, updateDeliveryMethod, deleteDeliveryMethod } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function DeliveryMethodsPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllDeliveryMethods();

    return (
        <LookupPageClient
            items={items}
            titleEn="Delivery Methods"
            titleAr="طرق التوصيل"
            descriptionEn="Manage delivery methods for import services"
            descriptionAr="إدارة طرق التوصيل لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createDeliveryMethod({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateDeliveryMethod(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteDeliveryMethod(id);
            }}
        />
    );
}
