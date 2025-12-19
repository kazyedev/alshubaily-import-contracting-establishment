import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote, Plus } from "lucide-react";
import Link from "next/link";

export default async function FaqsPage() {
    const canView = await hasPermission("faqs.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.faqs");

    return (
        <>
            <PageHeader
                titleEn="FAQs"
                titleAr="الأسئلة الشائعة"
                descriptionEn="Manage frequently asked questions"
                descriptionAr="إدارة الأسئلة المتكررة"
                actionLabel={t("addFaq")}
                actionHref="/dashboard/faqs/new"
            />

            <EmptyState
                titleEn="No FAQs yet"
                titleAr="لا توجد أسئلة بعد"
                descriptionEn="Add your first FAQ to help visitors find answers"
                descriptionAr="أضف أول سؤال لمساعدة الزوار في إيجاد الإجابات"
                icon={<MessageSquareQuote className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/faqs/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addFaq")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
