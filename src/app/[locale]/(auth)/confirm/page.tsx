import { Mail, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfirmPage() {
    const t = useTranslations("Auth.Confirm");
    const locale = useLocale();

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6 items-center">
                <Image
                    alt="logo"
                    src={locale === "ar" ? "/logo.png" : "/logo_english.png"}
                    height={56.1}
                    width={134.5}
                />

                <Card className="w-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{t("title")}</CardTitle>
                        <CardDescription className="mt-2">
                            {t("description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3 rounded-lg border p-4">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div className="text-sm text-muted-foreground">
                                {t("instructions")}
                            </div>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {t("noEmail")}{" "}
                            <Link href="/sign-up" className="text-primary hover:underline">
                                {t("tryAgain")}
                            </Link>
                        </div>

                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/sign-in">{t("backToSignIn")}</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}