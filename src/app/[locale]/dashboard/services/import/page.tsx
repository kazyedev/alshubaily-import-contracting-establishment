import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllImportServices } from "@/actions/import";
import { ImportClient } from "./client";

export default async function ImportServicesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services");
    }

    const services = await getAllImportServices();

    return <ImportClient services={services} />;
}
