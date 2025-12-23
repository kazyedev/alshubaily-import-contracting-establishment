import {
    getAllWorkPrinciples,
    createWorkPrinciple,
    updateWorkPrinciple,
    deleteWorkPrinciple,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function PrinciplesPage() {
    const items = await getAllWorkPrinciples();

    return (
        <BilingualCrud
            titleEn="Work Principles"
            titleAr="مبادئ العمل"
            descriptionEn="Manage core work principles"
            descriptionAr="إدارة مبادئ العمل الأساسية"
            items={items}
            onCreate={createWorkPrinciple}
            onUpdate={updateWorkPrinciple}
            onDelete={deleteWorkPrinciple}
            itemLabelEn="Principle"
            itemLabelAr="مبدأ"
        />
    );
}
