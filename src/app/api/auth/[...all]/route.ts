import { NextResponse } from "next/server";

// This route is deprecated - OAuth callbacks now handled by /api/auth/callback
export async function GET() {
    return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}

export async function POST() {
    return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}