import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Wrench, Plus } from "lucide-react";
import Link from "next/link";

export default async function ServicesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.services");

    return (
        <>
            <PageHeader
                titleEn="Services"
                titleAr="الخدمات"
                descriptionEn="Manage services offerings"
                descriptionAr="إدارة عروض الخدمات"
                actionLabel={t("addService")}
                actionHref="/dashboard/services/new"
            />

            <EmptyState
                titleEn="No services yet"
                titleAr="لا توجد خدمات بعد"
                descriptionEn="Add your first service to showcase what you offer"
                descriptionAr="أضف أول خدمة لعرض ما تقدمه"
                icon={<Wrench className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/services/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addService")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
