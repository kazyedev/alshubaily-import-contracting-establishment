"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { Plus } from "lucide-react";
import Link from "next/link";

type PageHeaderProps = {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
};

export function PageHeader({
    titleEn,
    titleAr,
    descriptionEn,
    descriptionAr,
    actionLabel,
    actionHref,
    onAction,
}: PageHeaderProps) {
    const locale = useLocale();
    const title = locale === "ar" ? titleAr : titleEn;
    const description = locale === "ar" ? descriptionAr : descriptionEn;

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
            </div>
            {actionLabel && (actionHref || onAction) && (
                actionHref ? (
                    <Button asChild>
                        <Link href={actionHref}>
                            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {actionLabel}
                        </Link>
                    </Button>
                ) : (
                    <Button onClick={onAction}>
                        <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {actionLabel}
                    </Button>
                )
            )}
        </div>
    );
}
