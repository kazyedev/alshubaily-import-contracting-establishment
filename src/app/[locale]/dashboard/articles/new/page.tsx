import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllArticleCategories, getAllAuthors } from "@/actions/articles";
import ArticleForm from "./form";

export default async function NewArticlePage() {
    const canCreate = await hasPermission("articles.create");
    if (!canCreate) {
        redirect("/dashboard/articles");
    }

    const [categories, authors] = await Promise.all([
        getAllArticleCategories(),
        getAllAuthors(),
    ]);

    return <ArticleForm mode="create" categories={categories} authors={authors} />;
}
