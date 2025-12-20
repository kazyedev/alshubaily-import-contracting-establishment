import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllShipments, createShipment, updateShipment, deleteShipment } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function ShipmentsPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllShipments();

    return (
        <LookupPageClient
            items={items}
            titleEn="Shipments"
            titleAr="الشحنات"
            descriptionEn="Manage shipments for import services"
            descriptionAr="إدارة الشحنات لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createShipment({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateShipment(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteShipment(id);
            }}
        />
    );
}
