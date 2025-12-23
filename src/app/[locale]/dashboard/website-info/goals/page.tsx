import {
    getAllOrganizationGoals,
    createOrganizationGoal,
    updateOrganizationGoal,
    deleteOrganizationGoal,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function GoalsPage() {
    const items = await getAllOrganizationGoals();

    return (
        <BilingualCrud
            titleEn="Organization Goals"
            titleAr="أهداف المؤسسة"
            descriptionEn="Manage company goals and objectives"
            descriptionAr="إدارة أهداف وغايات الشركة"
            items={items}
            onCreate={createOrganizationGoal}
            onUpdate={updateOrganizationGoal}
            onDelete={deleteOrganizationGoal}
            itemLabelEn="Goal"
            itemLabelAr="هدف"
        />
    );
}
