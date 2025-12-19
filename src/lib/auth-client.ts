"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Get the Supabase client for use in client components
 * This is a wrapper around createClient for easier imports
 */
export function getAuthClient() {
    return createClient();
}

/**
 * Sign in with Google OAuth
 * Redirects to Google for authentication
 */
export async function signInWithGoogle(redirectTo: string = "/dashboard") {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/api/auth/callback?next=${redirectTo}`,
        },
    });

    if (error) {
        throw error;
    }

    return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}