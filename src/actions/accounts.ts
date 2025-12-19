"use server";

import { db } from "@/lib/db/drizzle";
import { accounts, accountRoles, roles } from "@/lib/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export type AccountWithRoles = {
    id: string;
    authUserId: string;
    displayNameEn: string | null;
    displayNameAr: string | null;
    avatarUrl: string | null;
    createdAt: Date;
    roles: { id: string; nameEn: string; nameAr: string }[];
};

/**
 * Get all accounts with their roles
 */
export async function getAllAccounts(): Promise<AccountWithRoles[]> {
    const accountsList = await db.select().from(accounts);

    const accountsWithRoles: AccountWithRoles[] = [];

    for (const account of accountsList) {
        const userRoles = await db
            .select({
                id: roles.id,
                nameEn: roles.nameEn,
                nameAr: roles.nameAr,
            })
            .from(accountRoles)
            .innerJoin(roles, eq(accountRoles.roleId, roles.id))
            .where(eq(accountRoles.accountId, account.id));

        accountsWithRoles.push({
            ...account,
            roles: userRoles,
        });
    }

    return accountsWithRoles;
}

/**
 * Get a single account by ID with roles
 */
export async function getAccountById(id: string): Promise<AccountWithRoles | null> {
    const accountResult = await db
        .select()
        .from(accounts)
        .where(eq(accounts.id, id))
        .limit(1);

    if (accountResult.length === 0) {
        return null;
    }

    const account = accountResult[0];

    const userRoles = await db
        .select({
            id: roles.id,
            nameEn: roles.nameEn,
            nameAr: roles.nameAr,
        })
        .from(accountRoles)
        .innerJoin(roles, eq(accountRoles.roleId, roles.id))
        .where(eq(accountRoles.accountId, account.id));

    return {
        ...account,
        roles: userRoles,
    };
}

/**
 * Update account roles
 */
export async function updateAccountRoles(
    accountId: string,
    newRoleIds: string[]
): Promise<{ success: boolean; message: string }> {
    try {
        // Delete existing roles
        await db.delete(accountRoles).where(eq(accountRoles.accountId, accountId));

        // Add new roles
        for (const roleId of newRoleIds) {
            await db.insert(accountRoles).values({ accountId, roleId });
        }

        return { success: true, message: "Roles updated successfully" };
    } catch (error) {
        console.error("Error updating roles:", error);
        return { success: false, message: "Failed to update roles" };
    }
}

/**
 * Delete an account
 */
export async function deleteAccount(
    id: string
): Promise<{ success: boolean; message: string }> {
    try {
        await db.delete(accounts).where(eq(accounts.id, id));
        return { success: true, message: "Account deleted successfully" };
    } catch (error) {
        console.error("Error deleting account:", error);
        return { success: false, message: "Failed to delete account" };
    }
}
