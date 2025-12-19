import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default async function ArticlesPage() {
    const canView = await hasPermission("articles.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.articles");

    return (
        <>
            <PageHeader
                titleEn="Articles"
                titleAr="المقالات"
                descriptionEn="Manage blog articles and content"
                descriptionAr="إدارة المقالات والمحتوى"
                actionLabel={t("addArticle")}
                actionHref="/dashboard/articles/new"
            />

            <EmptyState
                titleEn="No articles yet"
                titleAr="لا توجد مقالات بعد"
                descriptionEn="Write your first article to share your knowledge"
                descriptionAr="اكتب أول مقال لمشاركة معرفتك"
                icon={<FileText className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/articles/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addArticle")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
