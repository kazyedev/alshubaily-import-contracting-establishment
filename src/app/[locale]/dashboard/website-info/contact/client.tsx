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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2, Mail, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import {
    createContactInfo,
    updateContactInfo,
    deleteContactInfo,
    type ContactInfo,
} from "@/actions/website-info";

type ContactClientProps = {
    contacts: ContactInfo[];
};

const contactTypes = [
    { value: "email", labelEn: "Email", labelAr: "بريد إلكتروني", icon: Mail },
    { value: "phone", labelEn: "Phone", labelAr: "هاتف", icon: Phone },
    { value: "whatsapp", labelEn: "WhatsApp", labelAr: "واتساب", icon: MessageCircle },
];

export default function ContactClient({ contacts }: ContactClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ContactInfo | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        type: "email",
        value: "",
        labelEn: "",
        labelAr: "",
    });

    const openNewDialog = () => {
        setEditingItem(null);
        setFormData({ type: "email", value: "", labelEn: "", labelAr: "" });
        setDialogOpen(true);
    };

    const openEditDialog = (item: ContactInfo) => {
        setEditingItem(item);
        setFormData({
            type: item.type,
            value: item.value,
            labelEn: item.labelEn || "",
            labelAr: item.labelAr || "",
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.type || !formData.value) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsSaving(true);

        let result;
        if (editingItem) {
            result = await updateContactInfo(editingItem.id, formData);
        } else {
            result = await createContactInfo(formData);
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
        const result = await deleteContactInfo(id);
        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف" : "Deleted");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const getTypeInfo = (type: string) => {
        return contactTypes.find((t) => t.value === type) || contactTypes[0];
    };

    return (
        <>
            <PageHeader
                titleEn="Contact Info"
                titleAr="بيانات التواصل"
                descriptionEn="Manage emails, phone numbers, and WhatsApp"
                descriptionAr="إدارة الإيميلات وأرقام التواصل والواتساب"
            />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{locale === "ar" ? "جهات الاتصال" : "Contacts"}</CardTitle>
                    <Button onClick={openNewDialog} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {locale === "ar" ? "جديد" : "New"}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{locale === "ar" ? "النوع" : "Type"}</TableHead>
                                <TableHead>{locale === "ar" ? "القيمة" : "Value"}</TableHead>
                                <TableHead>{locale === "ar" ? "التسمية" : "Label"}</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        {locale === "ar" ? "لا توجد بيانات" : "No contacts"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contacts.map((contact) => {
                                    const typeInfo = getTypeInfo(contact.type);
                                    const TypeIcon = typeInfo.icon;
                                    return (
                                        <TableRow key={contact.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <TypeIcon className="h-4 w-4" />
                                                    {locale === "ar" ? typeInfo.labelAr : typeInfo.labelEn}
                                                </div>
                                            </TableCell>
                                            <TableCell dir="ltr">{contact.value}</TableCell>
                                            <TableCell>
                                                {locale === "ar" ? contact.labelAr : contact.labelEn || "-"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(contact)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(contact.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem
                                ? (locale === "ar" ? "تعديل جهة اتصال" : "Edit Contact")
                                : (locale === "ar" ? "جهة اتصال جديدة" : "New Contact")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "النوع *" : "Type *"}</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {contactTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {locale === "ar" ? type.labelAr : type.labelEn}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "القيمة *" : "Value *"}</Label>
                            <Input
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                dir="ltr"
                                placeholder={
                                    formData.type === "email"
                                        ? "email@example.com"
                                        : formData.type === "phone"
                                            ? "+966 5X XXX XXXX"
                                            : "+966 5X XXX XXXX"
                                }
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "التسمية (إنجليزي)" : "Label (English)"}</Label>
                                <Input
                                    value={formData.labelEn}
                                    onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
                                    dir="ltr"
                                    placeholder="e.g. Sales"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{locale === "ar" ? "التسمية (عربي)" : "Label (Arabic)"}</Label>
                                <Input
                                    value={formData.labelAr}
                                    onChange={(e) => setFormData({ ...formData, labelAr: e.target.value })}
                                    dir="rtl"
                                    placeholder="مثال: المبيعات"
                                />
                            </div>
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
