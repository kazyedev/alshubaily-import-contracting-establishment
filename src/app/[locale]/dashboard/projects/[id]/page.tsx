import { notFound } from "next/navigation";
import { getProjectById, getAllProjectTypes, getAllProjectStatuses } from "@/actions/projects";
import ProjectForm from "../new/form";

type EditProjectPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;

    const [project, types, statuses] = await Promise.all([
        getProjectById(id),
        getAllProjectTypes(),
        getAllProjectStatuses(),
    ]);

    if (!project) {
        notFound();
    }

    return <ProjectForm mode="edit" existingProject={project} types={types} statuses={statuses} />;
}
