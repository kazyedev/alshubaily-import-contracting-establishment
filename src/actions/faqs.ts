"use server";

import { db } from "@/lib/db/drizzle";
import { faqs } from "@/lib/db/schema/common-schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// ==================== Types ====================

export type Faq = typeof faqs.$inferSelect;

// ==================== CRUD Operations ====================

export async function getAllFaqs(): Promise<Faq[]> {
    return db.select().from(faqs).orderBy(faqs.createdAt);
}

export async function getFaqById(id: string): Promise<Faq | null> {
    const result = await db
        .select()
        .from(faqs)
        .where(eq(faqs.id, id))
        .limit(1);

    return result.length > 0 ? result[0] : null;
}

export async function createFaq(data: {
    questionEn: string;
    questionAr: string;
    answerEn: string;
    answerAr: string;
}): Promise<{ success: boolean; message: string; id?: string }> {
    try {
        const id = nanoid();
        await db.insert(faqs).values({
            id,
            questionEn: data.questionEn,
            questionAr: data.questionAr,
            answerEn: data.answerEn,
            answerAr: data.answerAr,
        });
        return { success: true, message: "FAQ created", id };
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return { success: false, message: "Failed to create FAQ" };
    }
}

export async function updateFaq(
    id: string,
    data: {
        questionEn: string;
        questionAr: string;
        answerEn: string;
        answerAr: string;
    }
): Promise<{ success: boolean; message: string }> {
    try {
        await db
            .update(faqs)
            .set({
                questionEn: data.questionEn,
                questionAr: data.questionAr,
                answerEn: data.answerEn,
                answerAr: data.answerAr,
            })
            .where(eq(faqs.id, id));
        return { success: true, message: "FAQ updated" };
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return { success: false, message: "Failed to update FAQ" };
    }
}

export async function deleteFaq(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(faqs).where(eq(faqs.id, id));
        return { success: true, message: "FAQ deleted" };
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return { success: false, message: "Failed to delete FAQ" };
    }
}
