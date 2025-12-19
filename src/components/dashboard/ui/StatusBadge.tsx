"use client";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "next-intl";

type StatusBadgeProps = {
    status: "active" | "inactive" | "pending" | "published" | "draft" | "archived";
};

const statusConfig = {
    active: {
        en: "Active",
        ar: "نشط",
        variant: "default" as const
    },
    inactive: {
        en: "Inactive",
        ar: "غير نشط",
        variant: "secondary" as const
    },
    pending: {
        en: "Pending",
        ar: "قيد الانتظار",
        variant: "outline" as const
    },
    published: {
        en: "Published",
        ar: "منشور",
        variant: "default" as const
    },
    draft: {
        en: "Draft",
        ar: "مسودة",
        variant: "secondary" as const
    },
    archived: {
        en: "Archived",
        ar: "مؤرشف",
        variant: "outline" as const
    },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const locale = useLocale();
    const config = statusConfig[status];
    const label = locale === "ar" ? config.ar : config.en;

    return <Badge variant={config.variant}>{label}</Badge>;
}
