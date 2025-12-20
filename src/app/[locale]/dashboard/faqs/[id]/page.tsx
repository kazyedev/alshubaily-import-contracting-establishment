import { notFound } from "next/navigation";
import { getFaqById } from "@/actions/faqs";
import FaqForm from "../new/form";

type EditFaqPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditFaqPage({ params }: EditFaqPageProps) {
    const { id } = await params;
    const faq = await getFaqById(id);

    if (!faq) {
        notFound();
    }

    return <FaqForm mode="edit" existingFaq={faq} />;
}
