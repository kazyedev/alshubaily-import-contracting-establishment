"use client";

import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/dashboard/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateAccountRoles } from "@/actions/accounts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { AccountWithRoles } from "@/actions/accounts";
import type { UserRole } from "@/server/roles";

type UserDetailClientProps = {
    account: AccountWithRoles;
    allRoles: UserRole[];
    translations: {
        title: string;
    };
};

export function UserDetailClient({ account, allRoles, translations }: UserDetailClientProps) {
    const locale = useLocale();
    const t = useTranslations("dashboard.common");
    const router = useRouter();
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
        account.roles.map(r => r.id)
    );
    const [isSaving, setIsSaving] = useState(false);

    const displayName = locale === "ar" ? account.displayNameAr : account.displayNameEn;

    const handleRoleToggle = (roleId: string) => {
        setSelectedRoles(prev =>
            prev.includes(roleId)
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updateAccountRoles(account.id, selectedRoles);
        setIsSaving(false);

        if (result.success) {
            toast.success(locale === "ar" ? "تم تحديث الأدوار بنجاح" : "Roles updated successfully");
            router.push("/dashboard/users");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <>
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/users">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <PageHeader
                    titleEn={`Manage Roles: ${translations.title}`}
                    titleAr={`إدارة الأدوار: ${displayName || "المستخدم"}`}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>{locale === "ar" ? "معلومات المستخدم" : "User Information"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={account.avatarUrl || undefined} />
                                <AvatarFallback className="text-lg">
                                    {(account.displayNameEn || "U").charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">{displayName || "-"}</p>
                                <p className="text-sm text-muted-foreground">
                                    {locale === "ar" ? "تاريخ الانضمام:" : "Joined:"} {new Date(account.createdAt).toLocaleDateString(locale)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Roles Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>{locale === "ar" ? "الأدوار" : "Roles"}</CardTitle>
                        <CardDescription>
                            {locale === "ar"
                                ? "اختر الأدوار لهذا المستخدم"
                                : "Select roles for this user"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {allRoles.map((role) => (
                                <div key={role.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Checkbox
                                        id={role.id}
                                        checked={selectedRoles.includes(role.id)}
                                        onCheckedChange={() => handleRoleToggle(role.id)}
                                    />
                                    <label
                                        htmlFor={role.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                        {locale === "ar" ? role.nameAr : role.nameEn}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-6">
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t("save")}
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/dashboard/users">{t("cancel")}</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
