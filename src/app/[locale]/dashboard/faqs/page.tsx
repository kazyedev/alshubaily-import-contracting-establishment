import { getAllFaqs } from "@/actions/faqs";
import FaqsClient from "./client";

export const dynamic = "force-dynamic";

export default async function FaqsPage() {
    const faqs = await getAllFaqs();

    return <FaqsClient faqs={faqs} />;
}
