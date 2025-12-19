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
import { Loader2 } from "lucide-react";

type FormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    children: React.ReactNode;
    onSubmit: () => void;
    submitLabelEn?: string;
    submitLabelAr?: string;
    cancelLabelEn?: string;
    cancelLabelAr?: string;
    isSubmitting?: boolean;
};

export function FormDialog({
    open,
    onOpenChange,
    titleEn,
    titleAr,
    descriptionEn,
    descriptionAr,
    children,
    onSubmit,
    submitLabelEn = "Save",
    submitLabelAr = "حفظ",
    cancelLabelEn = "Cancel",
    cancelLabelAr = "إلغاء",
    isSubmitting = false,
}: FormDialogProps) {
    const locale = useLocale();
    const title = locale === "ar" ? titleAr : titleEn;
    const description = locale === "ar" ? descriptionAr : descriptionEn;
    const submitLabel = locale === "ar" ? submitLabelAr : submitLabelEn;
    const cancelLabel = locale === "ar" ? cancelLabelAr : cancelLabelEn;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="py-4">{children}</div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        {cancelLabel}
                    </Button>
                    <Button onClick={onSubmit} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {submitLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
