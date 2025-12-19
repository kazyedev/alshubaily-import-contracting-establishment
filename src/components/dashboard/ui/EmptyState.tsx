"use client";

import { useLocale } from "next-intl";
import { FileQuestion } from "lucide-react";

type EmptyStateProps = {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
};

export function EmptyState({
    titleEn,
    titleAr,
    descriptionEn,
    descriptionAr,
    icon,
    action,
}: EmptyStateProps) {
    const locale = useLocale();
    const title = locale === "ar" ? titleAr : titleEn;
    const description = locale === "ar" ? descriptionAr : descriptionEn;

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                {icon || <FileQuestion className="h-8 w-8 text-muted-foreground" />}
            </div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                    {description}
                </p>
            )}
            {action}
        </div>
    );
}
