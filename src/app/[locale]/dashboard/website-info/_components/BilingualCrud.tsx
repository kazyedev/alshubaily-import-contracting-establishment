"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type BilingualItem = {
    id: string;
    titleEn: string;
    titleAr: string;
    descriptionEn?: string | null;
    descriptionAr?: string | null;
};

type BilingualCrudProps<T extends BilingualItem> = {
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    items: T[];
    onCreate: (data: {
        titleEn: string;
        titleAr: string;
        descriptionEn?: string;
        descriptionAr?: string;
    }) => Promise<{ success: boolean; message: string }>;
    onUpdate: (
        id: string,
        data: {
            titleEn: string;
            titleAr: string;
            descriptionEn?: string;
            descriptionAr?: string;
        }
    ) => Promise<{ success: boolean; message: string }>;
    onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
    itemLabelEn?: string;
    itemLabelAr?: string;
};

export default function BilingualCrud<T extends BilingualItem>({
    titleEn,
    titleAr,
    descriptionEn,
    descriptionAr,
    items,
    onCreate,
    onUpdate,
    onDelete,
    itemLabelEn = "Item",
    itemLabelAr = "عنصر",
}: BilingualCrudProps<T>) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<T | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
    });

    const openNewDialog = () => {
        setEditingItem(null);
        setFormData({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "" });
        setDialogOpen(true);
    };

    const openEditDialog = (item: T) => {
        setEditingItem(item);
        setFormData({
            titleEn: item.titleEn,
            titleAr: item.titleAr,
            descriptionEn: item.descriptionEn || "",
            descriptionAr: item.descriptionAr || "",
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.titleEn || !formData.titleAr) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsSaving(true);

        let result;
        if (editingItem) {
            result = await onUpdate(editingItem.id, formData);
        } else {
            result = await onCreate(formData);
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
        const result = await onDelete(id);
        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف" : "Deleted");
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

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{locale === "ar" ? itemLabelAr : itemLabelEn}</CardTitle>
                    <Button onClick={openNewDialog} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {locale === "ar" ? "جديد" : "New"}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{locale === "ar" ? "العنوان (إنجليزي)" : "Title (EN)"}</TableHead>
                                <TableHead>{locale === "ar" ? "العنوان (عربي)" : "Title (AR)"}</TableHead>
                                <TableHead>{locale === "ar" ? "الوصف" : "Description"}</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        {locale === "ar" ? "لا توجد عناصر" : "No items"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.titleEn}</TableCell>
                                        <TableCell dir="rtl">{item.titleAr}</TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {locale === "ar"
                                                ? item.descriptionAr || "-"
                                                : item.descriptionEn || "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(item)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem
                                ? (locale === "ar" ? `تعديل ${itemLabelAr}` : `Edit ${itemLabelEn}`)
                                : (locale === "ar" ? `${itemLabelAr} جديد` : `New ${itemLabelEn}`)}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "العنوان (إنجليزي) *" : "Title (English) *"}</Label>
                                <Input
                                    value={formData.titleEn}
                                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "العنوان (عربي) *" : "Title (Arabic) *"}</Label>
                                <Input
                                    value={formData.titleAr}
                                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                    dir="rtl"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}</Label>
                            <Textarea
                                value={formData.descriptionEn}
                                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                dir="ltr"
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}</Label>
                            <Textarea
                                value={formData.descriptionAr}
                                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                dir="rtl"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            {locale === "ar" ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {locale === "ar" ? "حفظ" : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
