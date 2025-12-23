import {
    getAllCommitments,
    createCommitment,
    updateCommitment,
    deleteCommitment,
} from "@/actions/website-info";
import BilingualCrud from "../_components/BilingualCrud";

export const dynamic = "force-dynamic";

export default async function CommitmentPage() {
    const items = await getAllCommitments();

    return (
        <BilingualCrud
            titleEn="Commitment"
            titleAr="الالتزام"
            descriptionEn="Manage company commitments"
            descriptionAr="إدارة التزامات الشركة"
            items={items}
            onCreate={createCommitment}
            onUpdate={updateCommitment}
            onDelete={deleteCommitment}
            itemLabelEn="Commitment"
            itemLabelAr="التزام"
        />
    );
}
