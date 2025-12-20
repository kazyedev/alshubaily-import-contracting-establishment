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
import {
    createProjectType,
    updateProjectType,
    deleteProjectType,
    type ProjectType,
} from "@/actions/projects";

type TypesClientProps = {
    types: ProjectType[];
};

export default function TypesClient({ types }: TypesClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingType, setEditingType] = useState<ProjectType | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
    });

    const openNewDialog = () => {
        setEditingType(null);
        setFormData({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "" });
        setDialogOpen(true);
    };

    const openEditDialog = (type: ProjectType) => {
        setEditingType(type);
        setFormData({
            titleEn: type.titleEn,
            titleAr: type.titleAr,
            descriptionEn: type.descriptionEn || "",
            descriptionAr: type.descriptionAr || "",
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
        if (editingType) {
            result = await updateProjectType(editingType.id, formData);
        } else {
            result = await createProjectType(formData);
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
        const result = await deleteProjectType(id);
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
                titleEn="Project Types"
                titleAr="أنواع المشاريع"
                descriptionEn="Manage project type categories"
                descriptionAr="إدارة فئات أنواع المشاريع"
            />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{locale === "ar" ? "الأنواع" : "Types"}</CardTitle>
                    <Button onClick={openNewDialog} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {locale === "ar" ? "جديد" : "New"}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{locale === "ar" ? "الاسم (إنجليزي)" : "Name (EN)"}</TableHead>
                                <TableHead>{locale === "ar" ? "الاسم (عربي)" : "Name (AR)"}</TableHead>
                                <TableHead>{locale === "ar" ? "الوصف" : "Description"}</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {types.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        {locale === "ar" ? "لا توجد أنواع" : "No types"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                types.map((type) => (
                                    <TableRow key={type.id}>
                                        <TableCell>{type.titleEn}</TableCell>
                                        <TableCell dir="rtl">{type.titleAr}</TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {locale === "ar" ? type.descriptionAr : type.descriptionEn || "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(type)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(type.id)}
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
                            {editingType
                                ? (locale === "ar" ? "تعديل النوع" : "Edit Type")
                                : (locale === "ar" ? "نوع جديد" : "New Type")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الاسم (إنجليزي) *" : "Name (English) *"}</Label>
                                <Input
                                    value={formData.titleEn}
                                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                    dir="ltr"
                                    placeholder="e.g. Commercial"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الاسم (عربي) *" : "Name (Arabic) *"}</Label>
                                <Input
                                    value={formData.titleAr}
                                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                    dir="rtl"
                                    placeholder="مثال: تجاري"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}</Label>
                            <Textarea
                                value={formData.descriptionEn}
                                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                dir="ltr"
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}</Label>
                            <Textarea
                                value={formData.descriptionAr}
                                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                dir="rtl"
                                rows={2}
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
