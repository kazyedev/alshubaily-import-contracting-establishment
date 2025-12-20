import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllSuppliers, createSupplier, updateSupplier, deleteSupplier } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function SuppliersPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllSuppliers();

    return (
        <LookupPageClient
            items={items.map(i => ({ ...i, titleEn: i.nameEn, titleAr: i.nameAr }))}
            titleEn="Suppliers"
            titleAr="الموردين"
            descriptionEn="Manage suppliers for import services"
            descriptionAr="إدارة الموردين لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "nameEn", labelEn: "Name (English)", labelAr: "الاسم (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "nameAr", labelEn: "Name (Arabic)", labelAr: "الاسم (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createSupplier({ nameEn: data.nameEn, nameAr: data.nameAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateSupplier(id, { nameEn: data.nameEn, nameAr: data.nameAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteSupplier(id);
            }}
        />
    );
}
