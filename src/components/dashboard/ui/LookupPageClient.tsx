"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PageHeader, DataTable, Column, DataTableAction, DeleteDialog } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

type LookupItem = {
    id: string;
    titleEn?: string;
    titleAr?: string;
    // For WhyChooseUs
    reasonEn?: string;
    reasonAr?: string;
    // For FAQs
    questionEn?: string;
    questionAr?: string;
    answerEn?: string;
    answerAr?: string;
    createdAt: Date;
};

type FieldConfig = {
    key: string;
    labelEn: string;
    labelAr: string;
    type: "input" | "textarea";
    dir: "ltr" | "rtl";
};

type LookupPageClientProps<T extends LookupItem> = {
    items: T[];
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    fields: FieldConfig[];
    onCreate: (data: Record<string, string>) => Promise<{ success: boolean; message: string; id?: string }>;
    onUpdate: (id: string, data: Record<string, string>) => Promise<{ success: boolean; message: string }>;
    onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
    displayField?: "title" | "reason" | "question";
};

export function LookupPageClient<T extends LookupItem>({
    items,
    titleEn,
    titleAr,
    descriptionEn,
    descriptionAr,
    fields,
    onCreate,
    onUpdate,
    onDelete,
    displayField = "title",
}: LookupPageClientProps<T>) {
    const locale = useLocale();
    const t = useTranslations("dashboard.common");
    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const getDisplayValue = (item: T | null) => {
        if (!item) return "";
        if (displayField === "reason") {
            return locale === "ar" ? item.reasonAr : item.reasonEn;
        }
        if (displayField === "question") {
            return locale === "ar" ? item.questionAr : item.questionEn;
        }
        return locale === "ar" ? item.titleAr : item.titleEn;
    };

    const columns: Column<T>[] = [
        {
            key: displayField === "title" ? "titleEn" : displayField === "reason" ? "reasonEn" : "questionEn",
            labelEn: displayField === "question" ? "Question" : "Title",
            labelAr: displayField === "question" ? "السؤال" : "العنوان",
            render: (item) => (
                <span className="font-medium">{getDisplayValue(item)}</span>
            ),
        },
        {
            key: "createdAt",
            labelEn: "Created",
            labelAr: "تاريخ الإنشاء",
            render: (item) => new Date(item.createdAt).toLocaleDateString(locale),
        },
    ];

    const actions: DataTableAction<T>[] = [
        {
            type: "edit",
            labelEn: t("edit"),
            labelAr: t("edit"),
            onClick: (item) => {
                setSelectedItem(item);
                const initialData: Record<string, string> = {};
                fields.forEach((field) => {
                    const value = (item as unknown as Record<string, unknown>)[field.key];
                    initialData[field.key] = typeof value === "string" ? value : "";
                });
                setFormData(initialData);
                setDialogOpen(true);
            },
        },
        {
            type: "delete",
            labelEn: t("delete"),
            labelAr: t("delete"),
            onClick: (item) => {
                setSelectedItem(item);
                setDeleteDialogOpen(true);
            },
        },
    ];

    const handleOpenCreate = () => {
        setSelectedItem(null);
        const initialData: Record<string, string> = {};
        fields.forEach((field) => {
            initialData[field.key] = "";
        });
        setFormData(initialData);
        setDialogOpen(true);
    };

    const handleSave = async () => {
        const requiredFields = fields.slice(0, 2);
        for (const field of requiredFields) {
            if (!formData[field.key]?.trim()) {
                toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
                return;
            }
        }

        setIsLoading(true);

        let result;
        if (selectedItem) {
            result = await onUpdate(selectedItem.id, formData);
        } else {
            result = await onCreate(formData);
        }

        setIsLoading(false);

        if (result.success) {
            toast.success(locale === "ar" ? "تم الحفظ بنجاح" : "Saved successfully");
            setDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        setIsLoading(true);
        const result = await onDelete(selectedItem.id);
        setIsLoading(false);

        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف بنجاح" : "Deleted successfully");
            setDeleteDialogOpen(false);
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <>
            <PageHeader
                titleEn={titleEn}
                titleAr={titleAr}
                descriptionEn={descriptionEn}
                descriptionAr={descriptionAr}
            />

            <div className="mb-4">
                <Button onClick={handleOpenCreate}>
                    <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {locale === "ar" ? "إضافة جديد" : "Add New"}
                </Button>
            </div>

            <DataTable
                data={items}
                columns={columns}
                actions={actions}
                getRowId={(item) => item.id}
                searchable
                searchPlaceholder={t("search")}
                emptyMessageEn={`No ${titleEn.toLowerCase()} found`}
                emptyMessageAr={`لا توجد ${titleAr}`}
            />

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedItem
                                ? (locale === "ar" ? "تعديل" : "Edit")
                                : (locale === "ar" ? "إضافة جديد" : "Add New")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {fields.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <Label>{locale === "ar" ? field.labelAr : field.labelEn}</Label>
                                {field.type === "textarea" ? (
                                    <Textarea
                                        value={formData[field.key] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        dir={field.dir}
                                        rows={3}
                                    />
                                ) : (
                                    <Input
                                        value={formData[field.key] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        dir={field.dir}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            {locale === "ar" ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {locale === "ar" ? "حفظ" : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DeleteDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                itemNameEn={getDisplayValue(selectedItem as T) || "Item"}
                itemNameAr={getDisplayValue(selectedItem as T) || "العنصر"}
                onConfirm={handleDelete}
                isDeleting={isLoading}
            />
        </>
    );
}
