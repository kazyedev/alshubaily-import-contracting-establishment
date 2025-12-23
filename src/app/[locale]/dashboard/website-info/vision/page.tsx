import {
    getAllVisions,
    createVision,
    updateVision,
    deleteVision,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function VisionPage() {
    const items = await getAllVisions();

    return (
        <BilingualCrud
            titleEn="Vision"
            titleAr="الرؤى"
            descriptionEn="Manage company vision statements"
            descriptionAr="إدارة رؤى الشركة"
            items={items}
            onCreate={createVision}
            onUpdate={updateVision}
            onDelete={deleteVision}
            itemLabelEn="Vision"
            itemLabelAr="رؤية"
        />
    );
}
