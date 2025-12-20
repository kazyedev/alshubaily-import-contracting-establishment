import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from "@/actions/services";
import { LookupPageClient } from "@/components/dashboard/ui";

export default async function FaqsPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services/contracting");
    }

    const items = await getAllFaqs();

    return (
        <LookupPageClient
            items={items}
            titleEn="FAQs"
            titleAr="الأسئلة الشائعة"
            descriptionEn="Manage frequently asked questions for contracting services"
            descriptionAr="إدارة الأسئلة الشائعة لخدمات المقاولات"
            displayField="question"
            fields={[
                { key: "questionEn", labelEn: "Question (English)", labelAr: "السؤال (الإنجليزية)", type: "input", dir: "ltr" },
                { key: "questionAr", labelEn: "Question (Arabic)", labelAr: "السؤال (العربية)", type: "input", dir: "rtl" },
                { key: "answerEn", labelEn: "Answer (English)", labelAr: "الإجابة (الإنجليزية)", type: "textarea", dir: "ltr" },
                { key: "answerAr", labelEn: "Answer (Arabic)", labelAr: "الإجابة (العربية)", type: "textarea", dir: "rtl" },
            ]}
            onCreate={async (data) => {
                "use server";
                return createFaq({
                    questionEn: data.questionEn,
                    questionAr: data.questionAr,
                    answerEn: data.answerEn,
                    answerAr: data.answerAr,
                });
            }}
            onUpdate={async (id, data) => {
                "use server";
                return updateFaq(id, {
                    questionEn: data.questionEn,
                    questionAr: data.questionAr,
                    answerEn: data.answerEn,
                    answerAr: data.answerAr,
                });
            }}
            onDelete={async (id) => {
                "use server";
                return deleteFaq(id);
            }}
        />
    );
}
