import { getAllProjects, getAllProjectTypes, getAllProjectStatuses } from "@/actions/projects";
import ProjectsClient from "./client";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    const [projects, types, statuses] = await Promise.all([
        getAllProjects(),
        getAllProjectTypes(),
        getAllProjectStatuses(),
    ]);

    return (
        <ProjectsClient
            projects={projects}
            types={types}
            statuses={statuses}
        />
    );
}
