"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { Loader2, AlertTriangle } from "lucide-react";

type DeleteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemNameEn: string;
    itemNameAr: string;
    onConfirm: () => void;
    isDeleting?: boolean;
};

export function DeleteDialog({
    open,
    onOpenChange,
    itemNameEn,
    itemNameAr,
    onConfirm,
    isDeleting = false,
}: DeleteDialogProps) {
    const locale = useLocale();
    const itemName = locale === "ar" ? itemNameAr : itemNameEn;

    const titleEn = "Delete Item";
    const titleAr = "حذف العنصر";
    const descriptionEn = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
    const descriptionAr = `هل أنت متأكد من حذف "${itemName}"؟ لا يمكن التراجع عن هذا الإجراء.`;
    const deleteLabelEn = "Delete";
    const deleteLabelAr = "حذف";
    const cancelLabelEn = "Cancel";
    const cancelLabelAr = "إلغاء";

    const title = locale === "ar" ? titleAr : titleEn;
    const description = locale === "ar" ? descriptionAr : descriptionEn;
    const deleteLabel = locale === "ar" ? deleteLabelAr : deleteLabelEn;
    const cancelLabel = locale === "ar" ? cancelLabelAr : cancelLabelEn;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {deleteLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
