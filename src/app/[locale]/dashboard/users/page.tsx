import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllAccounts } from "@/actions/accounts";
import { UsersClient } from "./client";

export default async function UsersPage() {
    // Check permission
    const canView = await hasPermission("accounts.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const accounts = await getAllAccounts();
    const t = await getTranslations("dashboard.users");

    return (
        <UsersClient
            accounts={accounts}
            translations={{
                title: t("title"),
                description: t("description"),
                noUsers: t("noUsers"),
                name: t("columns.name"),
                email: t("columns.email"),
                roles: t("columns.roles"),
                createdAt: t("columns.createdAt"),
            }}
        />
    );
}
