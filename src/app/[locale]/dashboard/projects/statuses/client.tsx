"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/dashboard/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    createProjectStatus,
    updateProjectStatus,
    deleteProjectStatus,
    type ProjectStatus,
} from "@/actions/projects";

type StatusesClientProps = {
    statuses: ProjectStatus[];
};

export default function StatusesClient({ statuses }: StatusesClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingStatus, setEditingStatus] = useState<ProjectStatus | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({ titleEn: "", titleAr: "" });

    const openNewDialog = () => {
        setEditingStatus(null);
        setFormData({ titleEn: "", titleAr: "" });
        setDialogOpen(true);
    };

    const openEditDialog = (status: ProjectStatus) => {
        setEditingStatus(status);
        setFormData({ titleEn: status.titleEn, titleAr: status.titleAr });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.titleEn || !formData.titleAr) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsSaving(true);

        let result;
        if (editingStatus) {
            result = await updateProjectStatus(editingStatus.id, formData);
        } else {
            result = await createProjectStatus(formData);
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
        const result = await deleteProjectStatus(id);
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
                titleEn="Project Statuses"
                titleAr="حالات المشاريع"
                descriptionEn="Manage project status options"
                descriptionAr="إدارة خيارات حالة المشروع"
            />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{locale === "ar" ? "الحالات" : "Statuses"}</CardTitle>
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
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {statuses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                                        {locale === "ar" ? "لا توجد حالات" : "No statuses"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                statuses.map((status) => (
                                    <TableRow key={status.id}>
                                        <TableCell>{status.titleEn}</TableCell>
                                        <TableCell dir="rtl">{status.titleAr}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(status)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(status.id)}
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingStatus
                                ? (locale === "ar" ? "تعديل الحالة" : "Edit Status")
                                : (locale === "ar" ? "حالة جديدة" : "New Status")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الاسم (إنجليزي) *" : "Name (English) *"}</Label>
                            <Input
                                value={formData.titleEn}
                                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                dir="ltr"
                                placeholder="e.g. Completed"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الاسم (عربي) *" : "Name (Arabic) *"}</Label>
                            <Input
                                value={formData.titleAr}
                                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                dir="rtl"
                                placeholder="مثال: مكتمل"
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
