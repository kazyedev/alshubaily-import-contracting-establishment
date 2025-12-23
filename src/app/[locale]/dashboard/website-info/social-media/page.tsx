import { getAllSocialMedia } from "@/actions/website-info";
import SocialMediaClient from "./client";

export const dynamic = "force-dynamic";

export default async function SocialMediaPage() {
    const accounts = await getAllSocialMedia();

    return <SocialMediaClient accounts={accounts} />;
}
