import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getAllContractingServices } from "@/actions/contracting";
import { ContractingClient } from "./client";

export default async function ContractingServicesPage() {
    const canView = await hasPermission("services.view");
    if (!canView) {
        redirect("/dashboard/services");
    }

    const services = await getAllContractingServices();

    return <ContractingClient services={services} />;
}
