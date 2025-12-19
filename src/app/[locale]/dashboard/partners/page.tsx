import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Handshake, Plus } from "lucide-react";
import Link from "next/link";

export default async function PartnersPage() {
    const canView = await hasPermission("partners.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.partners");

    return (
        <>
            <PageHeader
                titleEn="Partners"
                titleAr="الشركاء"
                descriptionEn="Manage partner companies"
                descriptionAr="إدارة الشركات الشريكة"
                actionLabel={t("addPartner")}
                actionHref="/dashboard/partners/new"
            />

            <EmptyState
                titleEn="No partners yet"
                titleAr="لا يوجد شركاء بعد"
                descriptionEn="Add your first partner to display on your website"
                descriptionAr="أضف أول شريك لعرضه على موقعك"
                icon={<Handshake className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/partners/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addPartner")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
