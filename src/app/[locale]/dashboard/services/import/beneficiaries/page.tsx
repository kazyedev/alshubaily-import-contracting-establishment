import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllBeneficiaryCategories, createBeneficiaryCategory, updateBeneficiaryCategory, deleteBeneficiaryCategory } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function BeneficiariesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/import");
    }

    const items = await getAllBeneficiaryCategories();

    return (
        <LookupPageClient
            items={items}
            titleEn="Beneficiary Categories"
            titleAr="فئات المستفيدين"
            descriptionEn="Manage beneficiary categories for import services"
            descriptionAr="إدارة فئات المستفيدين لخدمات الاستيراد"
            displayField="title"
            fields={[
                { key: "titleEn", labelEn: "Title (English)", labelAr: "العنوان (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "titleAr", labelEn: "Title (Arabic)", labelAr: "العنوان (العربية)", type: "input", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createBeneficiaryCategory({ titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateBeneficiaryCategory(id, { titleEn: data.titleEn, titleAr: data.titleAr });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteBeneficiaryCategory(id);
            }}
        />
    );
}
