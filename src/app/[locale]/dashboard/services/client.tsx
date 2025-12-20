"use client";

import { useLocale } from "next-intl";
import { PageHeader } from "@/components/dashboard/ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, PackageOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { MainService } from "@/actions/services";

type ServicesClientProps = {
    mainServices: MainService[];
};

export function ServicesClient({ mainServices }: ServicesClientProps) {
    const locale = useLocale();

    const getIcon = (id: string) => {
        if (id === "service_contracting") return <Building2 className="h-10 w-10 text-orange-500" />;
        if (id === "service_import") return <PackageOpen className="h-10 w-10 text-blue-500" />;
        return <Building2 className="h-10 w-10 text-gray-500" />;
    };

    const getHref = (id: string) => {
        if (id === "service_contracting") return "/dashboard/services/contracting";
        if (id === "service_import") return "/dashboard/services/import";
        return "#";
    };

    return (
        <>
            <PageHeader
                titleEn="Services"
                titleAr="الخدمات"
                descriptionEn="Manage your service offerings"
                descriptionAr="إدارة عروض الخدمات الخاصة بك"
            />

            <div className="grid gap-6 md:grid-cols-2">
                {mainServices.map((service) => (
                    <Card key={service.id} className="hover:border-primary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {getIcon(service.id)}
                            <div className="flex-1">
                                <CardTitle>
                                    {locale === "ar" ? service.titleAr : service.titleEn}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {locale === "ar" ? service.descriptionAr : service.descriptionEn}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href={getHref(service.id)}>
                                    {locale === "ar" ? "إدارة" : "Manage"}
                                    <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
