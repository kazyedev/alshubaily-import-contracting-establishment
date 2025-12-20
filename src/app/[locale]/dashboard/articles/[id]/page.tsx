import { redirect, notFound } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getArticleById, getAllArticleCategories, getAllAuthors } from "@/actions/articles";
import ArticleForm from "../new/form";

type EditArticlePageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const canEdit = await hasPermission("articles.edit");
    if (!canEdit) {
        redirect("/dashboard/articles");
    }

    const { id } = await params;

    const [article, categories, authors] = await Promise.all([
        getArticleById(id),
        getAllArticleCategories(),
        getAllAuthors(),
    ]);

    if (!article) {
        notFound();
    }

    return (
        <ArticleForm
            mode="edit"
            existingArticle={article}
            categories={categories}
            authors={authors}
        />
    );
}
