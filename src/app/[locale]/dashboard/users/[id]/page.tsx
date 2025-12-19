import { getTranslations } from "next-intl/server";
import { redirect, notFound } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAccountById } from "@/actions/accounts";
import { getAllRoles } from "@/server/roles";
import { UserDetailClient } from "./client";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function UserDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Check permission
    const canEdit = await hasPermission("accounts.edit");
    if (!canEdit) {
        redirect("/dashboard/users");
    }

    const account = await getAccountById(id);
    if (!account) {
        notFound();
    }

    const allRoles = await getAllRoles();
    const t = await getTranslations("dashboard.users");

    return (
        <UserDetailClient
            account={account}
            allRoles={allRoles}
            translations={{
                title: account.displayNameEn || "User",
            }}
        />
    );
}
