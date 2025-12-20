import { getAllProjectStatuses } from "@/actions/projects";
import StatusesClient from "./client";

export const dynamic = "force-dynamic";

export default async function ProjectStatusesPage() {
    const statuses = await getAllProjectStatuses();

    return <StatusesClient statuses={statuses} />;
}
