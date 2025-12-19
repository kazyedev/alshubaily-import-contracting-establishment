import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";

export default async function MediaPage() {
    const canView = await hasPermission("images.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const t = await getTranslations("dashboard.media");

    return (
        <>
            <PageHeader
                titleEn="Media Library"
                titleAr="مكتبة الوسائط"
                descriptionEn="Manage images and media files"
                descriptionAr="إدارة الصور وملفات الوسائط"
                actionLabel={t("uploadImage")}
                actionHref="/dashboard/media/upload"
            />

            <EmptyState
                titleEn="No images yet"
                titleAr="لا توجد صور بعد"
                descriptionEn="Upload your first image to get started"
                descriptionAr="ارفع أول صورة للبدء"
                icon={<ImageIcon className="h-8 w-8 text-muted-foreground" />}
                action={
                    <Button asChild>
                        <Link href="/dashboard/media/upload">
                            <Upload className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t("uploadImage")}
                        </Link>
                    </Button>
                }
            />
        </>
    );
}
