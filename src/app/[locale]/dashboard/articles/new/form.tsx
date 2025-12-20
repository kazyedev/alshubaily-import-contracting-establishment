"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
    PageHeader,
    ImageSelectOrUpload,
    MultiImageSelectOrUpload,
    RichTextEditor,
} from "@/components/dashboard/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
    createArticle,
    updateArticle,
    type ArticleWithRelations,
    type ArticleCategory,
    type Author,
} from "@/actions/articles";

type ArticleFormProps = {
    mode: "create" | "edit";
    existingArticle?: ArticleWithRelations;
    categories: ArticleCategory[];
    authors: Author[];
};

export default function ArticleForm({
    mode,
    existingArticle,
    categories,
    authors,
}: ArticleFormProps) {
    const locale = useLocale();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        titleEn: existingArticle?.titleEn || "",
        titleAr: existingArticle?.titleAr || "",
        slugEn: existingArticle?.slugEn || "",
        slugAr: existingArticle?.slugAr || "",
        categoryId: existingArticle?.categoryId || "",
        authorId: existingArticle?.authorId || "",
        mainImageId: existingArticle?.mainImageId || null as string | null,
        imageIds: existingArticle?.images.map((img) => img.id) || ([] as string[]),
        contentEn: existingArticle?.richContent?.contentEn || "",
        contentAr: existingArticle?.richContent?.contentAr || "",
    });

    const generateSlug = (title: string, isArabic: boolean) => {
        if (isArabic) {
            return title.trim().replace(/\s+/g, "-");
        }
        return title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
    };

    const handleSave = async () => {
        if (
            !formData.titleEn ||
            !formData.titleAr ||
            !formData.slugEn ||
            !formData.slugAr
        ) {
            toast.error(
                locale === "ar"
                    ? "يرجى ملء الحقول المطلوبة"
                    : "Please fill required fields"
            );
            return;
        }

        setIsSaving(true);

        let result;
        if (mode === "create") {
            result = await createArticle({
                ...formData,
                categoryId: formData.categoryId || null,
                authorId: formData.authorId || null,
            });
        } else if (existingArticle) {
            result = await updateArticle(existingArticle.id, {
                ...formData,
                categoryId: formData.categoryId || null,
                authorId: formData.authorId || null,
            });
        }

        setIsSaving(false);

        if (result?.success) {
            toast.success(locale === "ar" ? "تم الحفظ بنجاح" : "Saved successfully");
            router.push("/dashboard/articles");
            router.refresh();
        } else {
            toast.error(result?.message || "Failed to save");
        }
    };

    return (
        <>
            <PageHeader
                titleEn={mode === "create" ? "New Article" : "Edit Article"}
                titleAr={mode === "create" ? "مقال جديد" : "تعديل المقال"}
            />

            <div className="space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {locale === "ar" ? "المعلومات الأساسية" : "Basic Information"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>
                                    {locale === "ar"
                                        ? "العنوان (الإنجليزية) *"
                                        : "Title (English) *"}
                                </Label>
                                <Input
                                    value={formData.titleEn}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({
                                            ...prev,
                                            titleEn: value,
                                            ...(mode === "create"
                                                ? { slugEn: generateSlug(value, false) }
                                                : {}),
                                        }));
                                    }}
                                    dir="ltr"
                                    placeholder="Article title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>
                                    {locale === "ar"
                                        ? "العنوان (العربية) *"
                                        : "Title (Arabic) *"}
                                </Label>
                                <Input
                                    value={formData.titleAr}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({
                                            ...prev,
                                            titleAr: value,
                                            ...(mode === "create"
                                                ? { slugAr: generateSlug(value, true) }
                                                : {}),
                                        }));
                                    }}
                                    dir="rtl"
                                    placeholder="عنوان المقال"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>
                                    {locale === "ar"
                                        ? "المعرف (الإنجليزية) *"
                                        : "Slug (English) *"}
                                </Label>
                                <Input
                                    value={formData.slugEn}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slugEn: e.target.value })
                                    }
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>
                                    {locale === "ar"
                                        ? "المعرف (العربية) *"
                                        : "Slug (Arabic) *"}
                                </Label>
                                <Input
                                    value={formData.slugAr}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slugAr: e.target.value })
                                    }
                                    dir="rtl"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "التصنيف" : "Category"}</Label>
                                <Select
                                    value={formData.categoryId}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, categoryId: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                locale === "ar" ? "اختر تصنيف" : "Select category"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {locale === "ar" ? cat.titleAr : cat.titleEn}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الكاتب" : "Author"}</Label>
                                <Select
                                    value={formData.authorId}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, authorId: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                locale === "ar" ? "اختر الكاتب" : "Select author"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {authors.map((author) => (
                                            <SelectItem key={author.id} value={author.id}>
                                                {locale === "ar"
                                                    ? author.publicNameAr
                                                    : author.publicNameEn}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Image */}
                <ImageSelectOrUpload
                    selectedImageId={formData.mainImageId}
                    onSelect={(imageId) => setFormData({ ...formData, mainImageId: imageId })}
                    labelEn="Main Image"
                    labelAr="الصورة الرئيسية"
                />

                {/* Rich Content Editor */}
                <RichTextEditor
                    labelEn="Article Content"
                    labelAr="محتوى المقال"
                    contentEn={formData.contentEn}
                    contentAr={formData.contentAr}
                    onChangeEn={(html) => setFormData({ ...formData, contentEn: html })}
                    onChangeAr={(html) => setFormData({ ...formData, contentAr: html })}
                />

                {/* Gallery Images */}
                <MultiImageSelectOrUpload
                    selectedImageIds={formData.imageIds}
                    onSelect={(imageIds) => setFormData({ ...formData, imageIds })}
                    labelEn="Additional Images"
                    labelAr="صور إضافية"
                />

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        {locale === "ar" ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {locale === "ar" ? "حفظ" : "Save"}
                    </Button>
                </div>
            </div>
        </>
    );
}
