import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db/drizzle";
import { accounts } from "@/lib/db/schema/auth-schema";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.user) {
            // Check if account already exists for this user
            const existingAccounts = await db
                .select()
                .from(accounts)
                .where(eq(accounts.authUserId, data.user.id))
                .limit(1);

            // Create account if it doesn't exist (new user or first time verification)
            if (existingAccounts.length === 0) {
                const userName = data.user.user_metadata?.full_name ||
                    data.user.user_metadata?.name ||
                    data.user.email?.split("@")[0] ||
                    "User";

                await db.insert(accounts).values({
                    id: nanoid(),
                    authUserId: data.user.id,
                    displayNameEn: userName,
                    displayNameAr: userName,
                    avatarUrl: data.user.user_metadata?.avatar_url || null,
                });
            }

            const forwardedHost = request.headers.get("x-forwarded-host");
            const isLocalEnv = process.env.NODE_ENV === "development";

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_error`);
}
