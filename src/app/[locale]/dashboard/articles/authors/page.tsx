import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllAuthors, getAdminAccounts } from "@/actions/articles";
import AuthorsClient from "./client";

export default async function AuthorsPage() {
    const canView = await hasPermission("articles.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const [authors, adminAccounts] = await Promise.all([
        getAllAuthors(),
        getAdminAccounts(),
    ]);

    return <AuthorsClient authors={authors} adminAccounts={adminAccounts} />;
}
