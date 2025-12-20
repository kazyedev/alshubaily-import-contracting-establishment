"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type BaseItem = {
    id: string;
    titleEn?: string;
    titleAr?: string;
    reasonEn?: string;
    reasonAr?: string;
    questionEn?: string;
    questionAr?: string;
};

type FieldConfig = {
    key: string;
    labelEn: string;
    labelAr: string;
    dir: "ltr" | "rtl";
};

type MultiSelectCreatableProps<T extends BaseItem> = {
    items: T[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
    onCreate?: (data: Record<string, string>) => Promise<{ success: boolean; id?: string }>;
    labelEn: string;
    labelAr: string;
    displayField?: "title" | "reason" | "question";
    createFields?: FieldConfig[];
};

export function MultiSelectCreatable<T extends BaseItem>({
    items,
    selectedIds,
    onChange,
    onCreate,
    labelEn,
    labelAr,
    displayField = "title",
    createFields,
}: MultiSelectCreatableProps<T>) {
    const locale = useLocale();
    const [open, setOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createFormData, setCreateFormData] = useState<Record<string, string>>({});

    const getDisplayValue = (item: T) => {
        if (displayField === "reason") {
            return locale === "ar" ? item.reasonAr : item.reasonEn;
        }
        if (displayField === "question") {
            return locale === "ar" ? item.questionAr : item.questionEn;
        }
        return locale === "ar" ? item.titleAr : item.titleEn;
    };

    const selectedItems = items.filter((item) => selectedIds.includes(item.id));

    const handleSelect = (itemId: string) => {
        if (selectedIds.includes(itemId)) {
            onChange(selectedIds.filter((id) => id !== itemId));
        } else {
            onChange([...selectedIds, itemId]);
        }
    };

    const handleRemove = (itemId: string) => {
        onChange(selectedIds.filter((id) => id !== itemId));
    };

    const handleOpenCreate = () => {
        const initial: Record<string, string> = {};
        createFields?.forEach((field) => {
            initial[field.key] = "";
        });
        setCreateFormData(initial);
        setCreateDialogOpen(true);
    };

    const handleCreate = async () => {
        if (!onCreate || !createFields) return;

        const firstField = createFields[0];
        if (!createFormData[firstField.key]?.trim()) {
            toast.error(locale === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
            return;
        }

        setIsCreating(true);
        const result = await onCreate(createFormData);
        setIsCreating(false);

        if (result.success && result.id) {
            toast.success(locale === "ar" ? "تم الإنشاء بنجاح" : "Created successfully");
            onChange([...selectedIds, result.id]);
            setCreateDialogOpen(false);
        } else {
            toast.error(locale === "ar" ? "فشل الإنشاء" : "Failed to create");
        }
    };

    return (
        <div className="space-y-2">
            <Label>{locale === "ar" ? labelAr : labelEn}</Label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        <span className="truncate">
                            {selectedItems.length > 0
                                ? `${selectedItems.length} ${locale === "ar" ? "محدد" : "selected"}`
                                : locale === "ar" ? "اختر..." : "Select..."}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput placeholder={locale === "ar" ? "بحث..." : "Search..."} />
                        <CommandList>
                            <CommandEmpty>
                                {locale === "ar" ? "لا توجد نتائج" : "No results found"}
                            </CommandEmpty>
                            <CommandGroup>
                                {items.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        onSelect={() => handleSelect(item.id)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedIds.includes(item.id) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {getDisplayValue(item)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    {onCreate && createFields && (
                        <div className="border-t p-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={handleOpenCreate}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {locale === "ar" ? "إضافة جديد" : "Add New"}
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedItems.map((item) => (
                        <Badge key={item.id} variant="secondary" className="gap-1">
                            {getDisplayValue(item)}
                            <button
                                type="button"
                                onClick={() => handleRemove(item.id)}
                                className="ml-1 hover:bg-muted rounded-full"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Create Dialog */}
            {onCreate && createFields && (
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {locale === "ar" ? "إضافة جديد" : "Add New"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            {createFields.map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <Label>{locale === "ar" ? field.labelAr : field.labelEn}</Label>
                                    <Input
                                        value={createFormData[field.key] || ""}
                                        onChange={(e) => setCreateFormData({ ...createFormData, [field.key]: e.target.value })}
                                        dir={field.dir}
                                    />
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                                {locale === "ar" ? "إلغاء" : "Cancel"}
                            </Button>
                            <Button onClick={handleCreate} disabled={isCreating}>
                                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {locale === "ar" ? "إنشاء" : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
