import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Truck, Plus } from "lucide-react";
import Link from "next/link";

export default async function SuppliersPage() {
    const canView = await hasPermission("suppliers.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.suppliers");

    return (
        <>
            <PageHeader
                titleEn="Suppliers"
                titleAr="الموردين"
                descriptionEn="Manage supplier companies"
                descriptionAr="إدارة شركات التوريد"
                actionLabel={t("addSupplier")}
                actionHref="/dashboard/suppliers/new"
            />

            <EmptyState
                titleEn="No suppliers yet"
                titleAr="لا يوجد موردين بعد"
                descriptionEn="Add your first supplier to display on your website"
                descriptionAr="أضف أول مورد لعرضه على موقعك"
                icon={<Truck className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/suppliers/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addSupplier")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
