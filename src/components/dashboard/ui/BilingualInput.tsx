"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BilingualInputProps = {
    labelEn: string;
    labelAr: string;
    valueEn: string;
    valueAr: string;
    onChangeEn: (value: string) => void;
    onChangeAr: (value: string) => void;
    placeholderEn?: string;
    placeholderAr?: string;
    type?: "input" | "textarea";
    required?: boolean;
    disabled?: boolean;
};

export function BilingualInput({
    labelEn,
    labelAr,
    valueEn,
    valueAr,
    onChangeEn,
    onChangeAr,
    placeholderEn = "English",
    placeholderAr = "العربية",
    type = "input",
    required = false,
    disabled = false,
}: BilingualInputProps) {
    const InputComponent = type === "textarea" ? Textarea : Input;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>
                    {labelEn} {required && <span className="text-destructive">*</span>}
                </Label>
                <InputComponent
                    value={valueEn}
                    onChange={(e) => onChangeEn(e.target.value)}
                    placeholder={placeholderEn}
                    disabled={disabled}
                    dir="ltr"
                />
            </div>
            <div className="space-y-2">
                <Label>
                    {labelAr} {required && <span className="text-destructive">*</span>}
                </Label>
                <InputComponent
                    value={valueAr}
                    onChange={(e) => onChangeAr(e.target.value)}
                    placeholder={placeholderAr}
                    disabled={disabled}
                    dir="rtl"
                />
            </div>
        </div>
    );
}
