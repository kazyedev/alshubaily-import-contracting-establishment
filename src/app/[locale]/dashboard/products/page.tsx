import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
    const canView = await hasPermission("products.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.products");

    return (
        <>
            <PageHeader
                titleEn="Products"
                titleAr="المنتجات"
                descriptionEn="Manage products catalog"
                descriptionAr="إدارة كتالوج المنتجات"
                actionLabel={t("addProduct")}
                actionHref="/dashboard/products/new"
            />

            <EmptyState
                titleEn="No products yet"
                titleAr="لا توجد منتجات بعد"
                descriptionEn="Add your first product to build your catalog"
                descriptionAr="أضف أول منتج لبناء كتالوجك"
                icon={<Package className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/products/new">
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("addProduct")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
