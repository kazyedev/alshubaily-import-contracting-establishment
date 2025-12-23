import {
    getAllStrengths,
    createStrength,
    updateStrength,
    deleteStrength,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function StrengthsPage() {
    const items = await getAllStrengths();

    return (
        <BilingualCrud
            titleEn="Strengths"
            titleAr="القوة"
            descriptionEn="Manage company strengths"
            descriptionAr="إدارة نقاط قوة الشركة"
            items={items}
            onCreate={createStrength}
            onUpdate={updateStrength}
            onDelete={deleteStrength}
            itemLabelEn="Strength"
            itemLabelAr="قوة"
        />
    );
}
