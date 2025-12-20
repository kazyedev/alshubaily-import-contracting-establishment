"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { PageHeader, DataTable, type Column, type DataTableAction } from "@/components/dashboard/ui";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteFaq, type Faq } from "@/actions/faqs";

type FaqsClientProps = {
    faqs: Faq[];
};

export default function FaqsClient({ faqs }: FaqsClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setIsDeleting(id);
        const result = await deleteFaq(id);
        setIsDeleting(null);

        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف" : "Deleted successfully");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const columns: Column<Faq>[] = [
        {
            key: "questionEn",
            labelEn: "Question (EN)",
            labelAr: "السؤال (إنجليزي)",
            render: (item) => (
                <span className="line-clamp-2 max-w-xs">{item.questionEn}</span>
            ),
        },
        {
            key: "questionAr",
            labelEn: "Question (AR)",
            labelAr: "السؤال (عربي)",
            render: (item) => (
                <span className="line-clamp-2 max-w-xs" dir="rtl">{item.questionAr}</span>
            ),
        },
        {
            key: "answerEn",
            labelEn: "Answer (EN)",
            labelAr: "الإجابة (إنجليزي)",
            render: (item) => (
                <span className="line-clamp-2 max-w-xs text-muted-foreground">{item.answerEn}</span>
            ),
        },
    ];

    const actions: DataTableAction<Faq>[] = [
        {
            type: "edit",
            labelEn: "Edit",
            labelAr: "تعديل",
            href: (item) => `/dashboard/faqs/${item.id}`,
            icon: <Pencil className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />,
        },
        {
            type: "delete",
            labelEn: "Delete",
            labelAr: "حذف",
            onClick: (item) => handleDelete(item.id),
            icon: <Trash2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />,
        },
    ];

    return (
        <>
            <PageHeader
                titleEn="FAQs"
                titleAr="الأسئلة الشائعة"
                descriptionEn="Manage frequently asked questions"
                descriptionAr="إدارة الأسئلة الشائعة"
                actionLabel={locale === "ar" ? "سؤال جديد" : "New FAQ"}
                actionHref="/dashboard/faqs/new"
            />

            <DataTable
                data={faqs}
                columns={columns}
                actions={actions}
                getRowId={(item) => item.id}
                searchable
                searchPlaceholder={locale === "ar" ? "بحث..." : "Search..."}
                emptyMessageEn="No FAQs found"
                emptyMessageAr="لا توجد أسئلة شائعة"
            />
        </>
    );
}
