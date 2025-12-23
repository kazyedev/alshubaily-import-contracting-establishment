import {
    getAllCompanyValues,
    createCompanyValue,
    updateCompanyValue,
    deleteCompanyValue,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function ValuesPage() {
    const items = await getAllCompanyValues();

    return (
        <BilingualCrud
            titleEn="Values"
            titleAr="القيم"
            descriptionEn="Manage core company values"
            descriptionAr="إدارة قيم الشركة الأساسية"
            items={items}
            onCreate={createCompanyValue}
            onUpdate={updateCompanyValue}
            onDelete={deleteCompanyValue}
            itemLabelEn="Value"
            itemLabelAr="قيمة"
        />
    );
}
