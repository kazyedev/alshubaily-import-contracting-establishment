"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader, DataTable, type Column, type DataTableAction } from "@/components/dashboard/ui";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    type Author,
    type AdminAccount,
} from "@/actions/articles";

type AuthorsClientProps = {
    authors: Author[];
    adminAccounts: AdminAccount[];
};

export default function AuthorsClient({ authors, adminAccounts }: AuthorsClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Author | null>(null);
    const [formData, setFormData] = useState({
        publicNameEn: "",
        publicNameAr: "",
        accountId: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ publicNameEn: "", publicNameAr: "", accountId: "" });
        setDialogOpen(true);
    };

    const openEdit = (item: Author) => {
        setEditingItem(item);
        setFormData({
            publicNameEn: item.publicNameEn,
            publicNameAr: item.publicNameAr,
            accountId: item.accountId || "",
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.publicNameEn || !formData.publicNameAr || !formData.accountId) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsSaving(true);

        let result;
        if (editingItem) {
            result = await updateAuthor(editingItem.id, {
                publicNameEn: formData.publicNameEn,
                publicNameAr: formData.publicNameAr,
                accountId: formData.accountId,
            });
        } else {
            result = await createAuthor({
                publicNameEn: formData.publicNameEn,
                publicNameAr: formData.publicNameAr,
                accountId: formData.accountId,
            });
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
        const result = await deleteAuthor(id);
        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف" : "Deleted successfully");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const columns: Column<Author>[] = [
        {
            key: "publicName",
            labelEn: "Public Name",
            labelAr: "الاسم العلني",
            render: (item) => locale === "ar" ? item.publicNameAr : item.publicNameEn,
        },
        {
            key: "account",
            labelEn: "Linked Account",
            labelAr: "الحساب المرتبط",
            render: (item) => {
                if (!item.account) return <span className="text-muted-foreground">-</span>;
                return locale === "ar"
                    ? (item.account.displayNameAr || item.account.displayNameEn || "Admin")
                    : (item.account.displayNameEn || item.account.displayNameAr || "Admin");
            },
        },
    ];

    const actions: DataTableAction<Author>[] = [
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
                titleEn="Authors"
                titleAr="الكتّاب"
                descriptionEn="Manage article authors (users with author role)"
                descriptionAr="إدارة كتاب المقالات (المستخدمون بدور كاتب)"
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
                data={authors}
                columns={columns}
                actions={actions}
                getRowId={(item) => item.id}
            />

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem
                                ? (locale === "ar" ? "تعديل الكاتب" : "Edit Author")
                                : (locale === "ar" ? "إضافة كاتب" : "Add Author")}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الاسم العلني (الإنجليزية) *" : "Public Name (English) *"}</Label>
                                <Input
                                    value={formData.publicNameEn}
                                    onChange={(e) => setFormData({ ...formData, publicNameEn: e.target.value })}
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "الاسم العلني (العربية) *" : "Public Name (Arabic) *"}</Label>
                                <Input
                                    value={formData.publicNameAr}
                                    onChange={(e) => setFormData({ ...formData, publicNameAr: e.target.value })}
                                    dir="rtl"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "ربط بحساب *" : "Link to Account *"}</Label>
                            <Select
                                value={formData.accountId}
                                onValueChange={(value) => setFormData({ ...formData, accountId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={locale === "ar" ? "اختر حساب" : "Select account"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {adminAccounts.length === 0 ? (
                                        <div className="p-2 text-sm text-muted-foreground text-center">
                                            {locale === "ar" ? "لا يوجد مستخدمون بدور كاتب" : "No users with author role"}
                                        </div>
                                    ) : (
                                        adminAccounts.map((acc) => (
                                            <SelectItem key={acc.id} value={acc.id}>
                                                {locale === "ar"
                                                    ? (acc.displayNameAr || acc.displayNameEn || acc.id)
                                                    : (acc.displayNameEn || acc.displayNameAr || acc.id)}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                {locale === "ar"
                                    ? "يظهر فقط المستخدمون بدور كاتب"
                                    : "Only users with author role are shown"}
                            </p>
                        </div>
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
