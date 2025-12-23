import {
    getAllGeneralPolicies,
    createGeneralPolicy,
    updateGeneralPolicy,
    deleteGeneralPolicy,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function PoliciesPage() {
    const items = await getAllGeneralPolicies();

    return (
        <BilingualCrud
            titleEn="General Policies"
            titleAr="السياسات العامة"
            descriptionEn="Manage company policies"
            descriptionAr="إدارة سياسات الشركة"
            items={items}
            onCreate={createGeneralPolicy}
            onUpdate={updateGeneralPolicy}
            onDelete={deleteGeneralPolicy}
            itemLabelEn="Policy"
            itemLabelAr="سياسة"
        />
    );
}
