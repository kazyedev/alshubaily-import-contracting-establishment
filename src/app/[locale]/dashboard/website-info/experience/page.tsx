import {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
    const items = await getAllExperiences();

    return (
        <BilingualCrud
            titleEn="Experience"
            titleAr="الخبرة"
            descriptionEn="Manage company experience entries"
            descriptionAr="إدارة خبرات الشركة"
            items={items}
            onCreate={createExperience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
            itemLabelEn="Experience"
            itemLabelAr="خبرة"
        />
    );
}
