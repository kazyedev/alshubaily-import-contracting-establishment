import {
    getAllMissions,
    createMission,
    updateMission,
    deleteMission,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function MissionPage() {
    const items = await getAllMissions();

    return (
        <BilingualCrud
            titleEn="Mission"
            titleAr="الرسائل"
            descriptionEn="Manage mission statements"
            descriptionAr="إدارة رسائل الشركة"
            items={items}
            onCreate={createMission}
            onUpdate={updateMission}
            onDelete={deleteMission}
            itemLabelEn="Mission"
            itemLabelAr="رسالة"
        />
    );
}
