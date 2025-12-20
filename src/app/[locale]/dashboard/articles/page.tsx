import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllArticles, getAllArticleCategories, getAllAuthors } from "@/actions/articles";
import ArticlesClient from "./client";

export default async function ArticlesPage() {
    const canView = await hasPermission("articles.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const [articles, categories, authors] = await Promise.all([
        getAllArticles(),
        getAllArticleCategories(),
        getAllAuthors(),
    ]);

    return <ArticlesClient articles={articles} categories={categories} authors={authors} />;
}
