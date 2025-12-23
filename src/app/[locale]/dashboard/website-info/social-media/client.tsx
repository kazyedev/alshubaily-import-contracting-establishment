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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
    createSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    type SocialMediaAccount,
} from "@/actions/website-info";

type SocialMediaClientProps = {
    accounts: SocialMediaAccount[];
};

const platforms = [
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter / X" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "snapchat", label: "Snapchat" },
];

export default function SocialMediaClient({ accounts }: SocialMediaClientProps) {
    const locale = useLocale();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SocialMediaAccount | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        platform: "facebook",
        url: "",
        username: "",
    });

    const openNewDialog = () => {
        setEditingItem(null);
        setFormData({ platform: "facebook", url: "", username: "" });
        setDialogOpen(true);
    };

    const openEditDialog = (item: SocialMediaAccount) => {
        setEditingItem(item);
        setFormData({
            platform: item.platform,
            url: item.url,
            username: item.username || "",
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.platform || !formData.url) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsSaving(true);

        let result;
        if (editingItem) {
            result = await updateSocialMedia(editingItem.id, formData);
        } else {
            result = await createSocialMedia(formData);
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
        const result = await deleteSocialMedia(id);
        if (result.success) {
            toast.success(locale === "ar" ? "تم الحذف" : "Deleted");
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    const getPlatformLabel = (platform: string) => {
        return platforms.find((p) => p.value === platform)?.label || platform;
    };

    return (
        <>
            <PageHeader
                titleEn="Social Media"
                titleAr="حسابات التواصل الاجتماعي"
                descriptionEn="Manage social media accounts"
                descriptionAr="إدارة حسابات مواقع التواصل الاجتماعي"
            />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{locale === "ar" ? "الحسابات" : "Accounts"}</CardTitle>
                    <Button onClick={openNewDialog} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {locale === "ar" ? "جديد" : "New"}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{locale === "ar" ? "المنصة" : "Platform"}</TableHead>
                                <TableHead>{locale === "ar" ? "الرابط" : "URL"}</TableHead>
                                <TableHead>{locale === "ar" ? "اسم المستخدم" : "Username"}</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        {locale === "ar" ? "لا توجد حسابات" : "No accounts"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                accounts.map((account) => (
                                    <TableRow key={account.id}>
                                        <TableCell className="font-medium">
                                            {getPlatformLabel(account.platform)}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate" dir="ltr">
                                            <a
                                                href={account.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                {account.url}
                                            </a>
                                        </TableCell>
                                        <TableCell dir="ltr">{account.username || "-"}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(account)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(account.id)}
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
                            {editingItem
                                ? (locale === "ar" ? "تعديل الحساب" : "Edit Account")
                                : (locale === "ar" ? "حساب جديد" : "New Account")}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "المنصة *" : "Platform *"}</Label>
                            <Select
                                value={formData.platform}
                                onValueChange={(value) => setFormData({ ...formData, platform: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {platforms.map((platform) => (
                                        <SelectItem key={platform.value} value={platform.value}>
                                            {platform.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "الرابط *" : "URL *"}</Label>
                            <Input
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                dir="ltr"
                                placeholder="https://facebook.com/your-page"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{locale === "ar" ? "اسم المستخدم" : "Username"}</Label>
                            <Input
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                dir="ltr"
                                placeholder="@username"
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
