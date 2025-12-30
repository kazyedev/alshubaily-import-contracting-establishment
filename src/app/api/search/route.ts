import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema/projects-schema";
import { partners } from "@/lib/db/schema/partners-schema";
import { mainServices, importServices, contractingServices } from "@/lib/db/schema/services-schema";
import { articles } from "@/lib/db/schema/blog-schema";
import { products } from "@/lib/db/schema/products-schema";
import { or, ilike } from "drizzle-orm";

interface SearchResult {
    id: string;
    type: string;
    title: string;
    href: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const locale = searchParams.get("locale") || "en";

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const isArabic = locale === "ar";
    const searchPattern = `%${query}%`;
    const results: SearchResult[] = [];

    try {
        // Search Projects
        const projectResults = await db
            .select({
                id: projects.id,
                titleEn: projects.titleEn,
                titleAr: projects.titleAr,
                slugEn: projects.slugEn,
                slugAr: projects.slugAr,
            })
            .from(projects)
            .where(
                or(
                    ilike(projects.titleEn, searchPattern),
                    ilike(projects.titleAr, searchPattern)
                )
            )
            .limit(5);

        projectResults.forEach((p) => {
            results.push({
                id: p.id,
                type: "project",
                title: isArabic ? p.titleAr : p.titleEn,
                href: `/${locale}/projects/${isArabic ? p.slugAr : p.slugEn}`,
            });
        });

        // Search Main Services
        const mainServiceResults = await db
            .select({
                id: mainServices.id,
                titleEn: mainServices.titleEn,
                titleAr: mainServices.titleAr,
                slugEn: mainServices.slugEn,
                slugAr: mainServices.slugAr,
            })
            .from(mainServices)
            .where(
                or(
                    ilike(mainServices.titleEn, searchPattern),
                    ilike(mainServices.titleAr, searchPattern)
                )
            )
            .limit(3);

        mainServiceResults.forEach((s) => {
            results.push({
                id: s.id,
                type: "service",
                title: isArabic ? s.titleAr : s.titleEn,
                href: `/${locale}/services/${isArabic ? s.slugAr : s.slugEn}`,
            });
        });

        // Search Import Services
        const importServiceResults = await db
            .select({
                id: importServices.id,
                titleEn: importServices.titleEn,
                titleAr: importServices.titleAr,
                slugEn: importServices.slugEn,
                slugAr: importServices.slugAr,
            })
            .from(importServices)
            .where(
                or(
                    ilike(importServices.titleEn, searchPattern),
                    ilike(importServices.titleAr, searchPattern)
                )
            )
            .limit(5);

        importServiceResults.forEach((s) => {
            results.push({
                id: s.id,
                type: "import service",
                title: isArabic ? s.titleAr : s.titleEn,
                href: `/${locale}/services/import/${isArabic ? s.slugAr : s.slugEn}`,
            });
        });

        // Search Contracting Services
        const contractingServiceResults = await db
            .select({
                id: contractingServices.id,
                titleEn: contractingServices.titleEn,
                titleAr: contractingServices.titleAr,
                slugEn: contractingServices.slugEn,
                slugAr: contractingServices.slugAr,
            })
            .from(contractingServices)
            .where(
                or(
                    ilike(contractingServices.titleEn, searchPattern),
                    ilike(contractingServices.titleAr, searchPattern)
                )
            )
            .limit(5);

        contractingServiceResults.forEach((s) => {
            results.push({
                id: s.id,
                type: "contracting service",
                title: isArabic ? s.titleAr : s.titleEn,
                href: `/${locale}/services/contracting/${isArabic ? s.slugAr : s.slugEn}`,
            });
        });

        // Search Partners
        const partnerResults = await db
            .select({
                id: partners.id,
                nameEn: partners.nameEn,
                nameAr: partners.nameAr,
            })
            .from(partners)
            .where(
                or(
                    ilike(partners.nameEn, searchPattern),
                    ilike(partners.nameAr, searchPattern)
                )
            )
            .limit(3);

        partnerResults.forEach((p) => {
            results.push({
                id: p.id,
                type: "partner",
                title: isArabic ? p.nameAr : p.nameEn,
                href: `/${locale}/partners`,
            });
        });

        // Search Articles
        const articleResults = await db
            .select({
                id: articles.id,
                titleEn: articles.titleEn,
                titleAr: articles.titleAr,
                slugEn: articles.slugEn,
                slugAr: articles.slugAr,
            })
            .from(articles)
            .where(
                or(
                    ilike(articles.titleEn, searchPattern),
                    ilike(articles.titleAr, searchPattern)
                )
            )
            .limit(5);

        articleResults.forEach((a) => {
            results.push({
                id: a.id,
                type: "article",
                title: isArabic ? a.titleAr : a.titleEn,
                href: `/${locale}/blog/${isArabic ? a.slugAr : a.slugEn}`,
            });
        });

        // Search Products
        const productResults = await db
            .select({
                id: products.id,
                titleEn: products.titleEn,
                titleAr: products.titleAr,
                slugEn: products.slugEn,
                slugAr: products.slugAr,
            })
            .from(products)
            .where(
                or(
                    ilike(products.titleEn, searchPattern),
                    ilike(products.titleAr, searchPattern)
                )
            )
            .limit(5);

        productResults.forEach((p) => {
            results.push({
                id: p.id,
                type: "product",
                title: isArabic ? p.titleAr : p.titleEn,
                href: `/${locale}/products/${isArabic ? p.slugAr : p.slugEn}`,
            });
        });

        return NextResponse.json({ results: results.slice(0, 15) });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
    }
}
