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
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { createFaq, updateFaq, type Faq } from "@/actions/faqs";

type FaqFormProps = {
    mode: "create" | "edit";
    existingFaq?: Faq;
};

export default function FaqForm({ mode, existingFaq }: FaqFormProps) {
    const locale = useLocale();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        questionEn: existingFaq?.questionEn || "",
        questionAr: existingFaq?.questionAr || "",
        answerEn: existingFaq?.answerEn || "",
        answerAr: existingFaq?.answerAr || "",
    });

    const handleSave = async () => {
        if (!formData.questionEn || !formData.questionAr || !formData.answerEn || !formData.answerAr) {
            toast.error(
                locale === "ar"
                    ? "يرجى ملء جميع الحقول"
                    : "Please fill all fields"
            );
            return;
        }

        setIsSaving(true);

        let result;
        if (mode === "create") {
            result = await createFaq(formData);
        } else if (existingFaq) {
            result = await updateFaq(existingFaq.id, formData);
        }

        setIsSaving(false);

        if (result?.success) {
            toast.success(locale === "ar" ? "تم الحفظ بنجاح" : "Saved successfully");
            router.push("/dashboard/faqs");
            router.refresh();
        } else {
            toast.error(result?.message || "Failed to save");
        }
    };

    return (
        <>
            <PageHeader
                titleEn={mode === "create" ? "New FAQ" : "Edit FAQ"}
                titleAr={mode === "create" ? "سؤال جديد" : "تعديل السؤال"}
            />

            <div className="space-y-6">
                {/* Question */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {locale === "ar" ? "السؤال" : "Question"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>
                                {locale === "ar" ? "السؤال (الإنجليزية) *" : "Question (English) *"}
                            </Label>
                            <Input
                                value={formData.questionEn}
                                onChange={(e) =>
                                    setFormData({ ...formData, questionEn: e.target.value })
                                }
                                dir="ltr"
                                placeholder="Enter question in English"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>
                                {locale === "ar" ? "السؤال (العربية) *" : "Question (Arabic) *"}
                            </Label>
                            <Input
                                value={formData.questionAr}
                                onChange={(e) =>
                                    setFormData({ ...formData, questionAr: e.target.value })
                                }
                                dir="rtl"
                                placeholder="أدخل السؤال بالعربية"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Answer */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {locale === "ar" ? "الإجابة" : "Answer"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>
                                {locale === "ar" ? "الإجابة (الإنجليزية) *" : "Answer (English) *"}
                            </Label>
                            <Textarea
                                value={formData.answerEn}
                                onChange={(e) =>
                                    setFormData({ ...formData, answerEn: e.target.value })
                                }
                                dir="ltr"
                                placeholder="Enter answer in English"
                                rows={4}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>
                                {locale === "ar" ? "الإجابة (العربية) *" : "Answer (Arabic) *"}
                            </Label>
                            <Textarea
                                value={formData.answerAr}
                                onChange={(e) =>
                                    setFormData({ ...formData, answerAr: e.target.value })
                                }
                                dir="rtl"
                                placeholder="أدخل الإجابة بالعربية"
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        {locale === "ar" ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {locale === "ar" ? "حفظ" : "Save"}
                    </Button>
                </div>
            </div>
        </>
    );
}
