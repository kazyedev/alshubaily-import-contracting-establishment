import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllArticleCategories } from "@/actions/articles";
import CategoriesClient from "./client";

export default async function ArticleCategoriesPage() {
    const canView = await hasPermission("articles.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const categories = await getAllArticleCategories();

    return <CategoriesClient categories={categories} />;
}
