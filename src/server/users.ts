"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AuthResult = {
    success: boolean;
    message: string;
};

/**
 * Sign in with email and password
 */
export async function signIn(
    email: string,
    password: string
): Promise<AuthResult> {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, message: "Signed in successfully" };
}

/**
 * Sign up with email and password
 * Requires email verification - user will receive a confirmation email
 */
export async function signup(
    name: string,
    email: string,
    password: string
): Promise<AuthResult & { requiresEmailVerification?: boolean }> {
    const supabase = await createClient();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                name: name,
            },
            emailRedirectTo: `${siteUrl}/api/auth/callback?next=/dashboard`,
        },
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return {
        success: true,
        message: "Please check your email to confirm your account",
        requiresEmailVerification: true
    };
}

/**
 * Sign out the current user (server action)
 */
export async function signOutUser(): Promise<AuthResult> {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, message: "Signed out successfully" };
}

/**
 * Sign in with Google OAuth (server-side redirect)
 */
export async function signInWithGoogleServer(
    redirectTo: string = "/dashboard"
) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback?next=${redirectTo}`,
        },
    });

    if (error) {
        return { success: false, message: error.message };
    }

    if (data.url) {
        redirect(data.url);
    }

    return { success: true, message: "Redirecting to Google" };
}
