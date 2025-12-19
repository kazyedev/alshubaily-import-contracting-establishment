"use client";

import { useLocale, useTranslations } from "next-intl";
import { PageHeader, DataTable, Column, DataTableAction, DeleteDialog } from "@/components/dashboard/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { deleteAccount } from "@/actions/accounts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { AccountWithRoles } from "@/actions/accounts";

type UsersClientProps = {
    accounts: AccountWithRoles[];
    translations: {
        title: string;
        description: string;
        noUsers: string;
        name: string;
        email: string;
        roles: string;
        createdAt: string;
    };
};

export function UsersClient({ accounts, translations }: UsersClientProps) {
    const locale = useLocale();
    const t = useTranslations("dashboard.common");
    const router = useRouter();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<AccountWithRoles | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const columns: Column<AccountWithRoles>[] = [
        {
            key: "displayNameEn",
            labelEn: translations.name,
            labelAr: translations.name,
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={item.avatarUrl || undefined} />
                        <AvatarFallback>
                            {(item.displayNameEn || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span>
                        {locale === "ar" ? item.displayNameAr : item.displayNameEn}
                    </span>
                </div>
            ),
        },
        {
            key: "roles",
            labelEn: translations.roles,
            labelAr: translations.roles,
            render: (item) => (
                <div className="flex flex-wrap gap-1">
                    {item.roles.length === 0 ? (
                        <span className="text-muted-foreground text-sm">-</span>
                    ) : (
                        item.roles.map((role) => (
                            <Badge key={role.id} variant="secondary">
                                {locale === "ar" ? role.nameAr : role.nameEn}
                            </Badge>
                        ))
                    )}
                </div>
            ),
        },
        {
            key: "createdAt",
            labelEn: translations.createdAt,
            labelAr: translations.createdAt,
            render: (item) => new Date(item.createdAt).toLocaleDateString(locale),
        },
    ];

    const actions: DataTableAction<AccountWithRoles>[] = [
        {
            type: "edit",
            labelEn: "Manage Roles",
            labelAr: "إدارة الأدوار",
            href: (item) => `/dashboard/users/${item.id}`,
        },
        {
            type: "delete",
            labelEn: t("delete"),
            labelAr: t("delete"),
            onClick: (item) => {
                setSelectedAccount(item);
                setDeleteDialogOpen(true);
            },
        },
    ];

    const handleDelete = async () => {
        if (!selectedAccount) return;

        setIsDeleting(true);
        const result = await deleteAccount(selectedAccount.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success("Account deleted successfully");
            setDeleteDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <>
            <PageHeader
                titleEn={translations.title}
                titleAr={translations.title}
                descriptionEn={translations.description}
                descriptionAr={translations.description}
            />

            <DataTable
                data={accounts}
                columns={columns}
                actions={actions}
                getRowId={(item) => item.id}
                searchable
                searchPlaceholder={t("search")}
                emptyMessageEn={translations.noUsers}
                emptyMessageAr={translations.noUsers}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                itemNameEn={selectedAccount?.displayNameEn || "User"}
                itemNameAr={selectedAccount?.displayNameAr || "المستخدم"}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </>
    );
}
