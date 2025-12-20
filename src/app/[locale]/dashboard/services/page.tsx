import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllMainServices } from "@/actions/services";
import { ServicesClient } from "./client";

export default async function ServicesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard");
    }

    const mainServices = await getAllMainServices();

    return <ServicesClient mainServices={mainServices} />;
}
