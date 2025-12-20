import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllWhyChooseUs, createWhyChooseUs, updateWhyChooseUs, deleteWhyChooseUs } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function WhyChooseUsPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllWhyChooseUs();

    return (
        <LookupPageClient
            items={items}
            titleEn="Why Choose Us"
            titleAr="لماذا تختارنا"
            descriptionEn="Manage reasons why clients should choose your import services"
            descriptionAr="إدارة أسباب اختيار العملاء لخدمات الاستيراد الخاصة بك"
            displayField="reason"
            fields={[
                { key: "reasonEn", labelEn: "Reason (English)", labelAr: "السبب (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "reasonAr", labelEn: "Reason (Arabic)", labelAr: "السبب (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createWhyChooseUs({ reasonEn: data.reasonEn, reasonAr: data.reasonAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateWhyChooseUs(id, { reasonEn: data.reasonEn, reasonAr: data.reasonAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteWhyChooseUs(id);
            }}
        />
    );
}
