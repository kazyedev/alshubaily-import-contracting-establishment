import { getAllProjectTypes, getAllProjectStatuses } from "@/actions/projects";
import ProjectForm from "./form";

export default async function NewProjectPage() {
    const [types, statuses] = await Promise.all([
        getAllProjectTypes(),
        getAllProjectStatuses(),
    ]);

    return <ProjectForm mode="create" types={types} statuses={statuses} />;
}
