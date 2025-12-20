"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader, DataTable, type Column, type DataTableAction, ImageSelectOrUpload } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ArrowLeft, Image } from "lucide-react";
import { toast } from "sonner";
import {
    createArticleCategory,
    updateArticleCategory,
    deleteArticleCategory,
    type ArticleCategory,
} from "@/actions/articles";

type CategoriesClientProps = {
    categories: ArticleCategory[];
};

export default function CategoriesClient({ categories }: CategoriesClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ArticleCategory | null>(null);
    const [formData, setFormData] = useState({
        titleEn: "",
        titleAr: "",
        slugEn: "",
        slugAr: "",
        descriptionEn: "",
        descriptionAr: "",
        imageId: null as string | null,
    });
    const [isSaving, setIsSaving] = useState(false);

    const generateSlug = (title: string, isArabic: boolean) => {
        if (isArabic) {
            return title.trim().replace(/\s+/g, "-");
        }
        return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({
            titleEn: "",
            titleAr: "",
            slugEn: "",
            slugAr: "",
            descriptionEn: "",
            descriptionAr: "",
            imageId: null,
        });
        setDialogOpen(true);
    };

    const openEdit = (item: ArticleCategory) => {
        setEditingItem(item);
        setFormData({
            titleEn: item.titleEn,
            titleAr: item.titleAr,
            slugEn: item.slugEn,
            slugAr: item.slugAr,
            descriptionEn: item.descriptionEn || "",
            descriptionAr: item.descriptionAr || "",
            imageId: item.imageId,
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.titleEn || !formData.titleAr || !formData.slugEn || !formData.slugAr) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsSaving(true);

        let result;
        if (editingItem) {
            result = await updateArticleCategory(editingItem.id, formData);
        } else {
            result = await createArticleCategory(formData);
        }

        setIsSaving(false);

        if (result.success) {
            toast.success(locale === "ar" ? "تم الحفظ" : "Saved successfully");
            setDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const handleDelete = async (id: string) => {
        const result = await deleteArticleCategory(id);
        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف" : "Deleted successfully");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const columns: Column<ArticleCategory>[] = [
        {
            key: "title",
            labelEn: "Title",
            labelAr: "العنوان",
            render: (item) => (
                <div className="flex items-center gap-3">
                    {item.imageId ? (
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                            <Image className="h-4 w-4 text-muted-foreground" />
                        </div>
                    ) : null}
                    <span>{locale === "ar" ? item.titleAr : item.titleEn}</span>
                </div>
            ),
        },
        {
            key: "slug",
            labelEn: "Slug",
            labelAr: "المعرف",
            render: (item) => item.slugEn,
        },
    ];

    const actions: DataTableAction<ArticleCategory>[] = [
        {
            type: "edit",
            labelEn: "Edit",
            labelAr: "تعديل",
            onClick: (item) => openEdit(item),
            icon: <Pencil className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />,
        },
        {
            type: "delete",
            labelEn: "Delete",
            labelAr: "حذف",
            onClick: (item) => handleDelete(item.id),
            icon: <Trash2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />,
        },
    ];

    return (
        <>
            <PageHeader
                titleEn="Article Categories"
                titleAr="تصنيفات المقالات"
                descriptionEn="Manage article categories"
                descriptionAr="إدارة تصنيفات المقالات"
            />

            <div className="mb-4 flex items-center justify-between">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/articles">
                        <ArrowLeft className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {locale === "ar" ? "رجوع" : "Back"}
                    </Link>
                </Button>
                <Button onClick={openCreate}>
                    <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {locale === "ar" ? "إضافة" : "Add"}
                </Button>
            </div>

            <DataTable
                data={categories}
                columns={columns}
                actions={actions}
                getRowId={(item) => item.id}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem
                                ? (locale === "ar" ? "تعديل التصنيف" : "Edit Category")
                                : (locale === "ar" ? "إضافة تصنيف" : "Add Category")}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "العنوان (الإنجليزية) *" : "Title (English) *"}</Label>
                                <Input
                                    value={formData.titleEn}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            titleEn: value,
                                            ...(!editingItem ? { slugEn: generateSlug(value, false) } : {}),
                                        }));
                                    }}
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "العنوان (العربية) *" : "Title (Arabic) *"}</Label>
                                <Input
                                    value={formData.titleAr}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            titleAr: value,
                                            ...(!editingItem ? { slugAr: generateSlug(value, true) } : {}),
                                        }));
                                    }}
                                    dir="rtl"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "المعرف (الإنجليزية) *" : "Slug (English) *"}</Label>
                                <Input
                                    value={formData.slugEn}
                                    onChange={(e) => setFormData({ ...formData, slugEn: e.target.value })}
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "المعرف (العربية) *" : "Slug (Arabic) *"}</Label>
                                <Input
                                    value={formData.slugAr}
                                    onChange={(e) => setFormData({ ...formData, slugAr: e.target.value })}
                                    dir="rtl"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الوصف (الإنجليزية)" : "Description (English)"}</Label>
                                <Textarea
                                    value={formData.descriptionEn}
                                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                    dir="ltr"
                                    rows={2}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الوصف (العربية)" : "Description (Arabic)"}</Label>
                                <Textarea
                                    value={formData.descriptionAr}
                                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                    dir="rtl"
                                    rows={2}
                                />
                            </div>
                        </div>
                        <ImageSelectOrUpload
                            selectedImageId={formData.imageId}
                            onSelect={(imageId) => setFormData({ ...formData, imageId })}
                            labelEn="Category Image"
                            labelAr="صورة التصنيف"
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            {locale === "ar" ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {locale === "ar" ? "حفظ" : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
