import { getAllProjectTypes } from "@/actions/projects";
import TypesClient from "./client";

export const dynamic = "force-dynamic";

export default async function ProjectTypesPage() {
    const types = await getAllProjectTypes();

    return <TypesClient types={types} />;
}
