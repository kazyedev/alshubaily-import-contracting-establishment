import { getAllContactInfo } from "@/actions/website-info";
import ContactClient from "./client";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
    const contacts = await getAllContactInfo();

    return <ContactClient contacts={contacts} />;
}
