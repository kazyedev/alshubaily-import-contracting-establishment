import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { FolderKanban, Plus } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
    const canView = await hasPermission("projects.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.projects");

    return (
        <>
            <PageHeader
                titleEn="Projects"
                titleAr="المشاريع"
                descriptionEn="Manage projects and portfolios"
                descriptionAr="إدارة المشاريع والأعمال"
                actionLabel={t("addProject")}
                actionHref="/dashboard/projects/new"
            />

            <EmptyState
                titleEn="No projects yet"
                titleAr="لا توجد مشاريع بعد"
                descriptionEn="Create your first project to showcase your work"
                descriptionAr="أنشئ أول مشروع لعرض أعمالك"
                icon={<FolderKanban className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/projects/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addProject")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
