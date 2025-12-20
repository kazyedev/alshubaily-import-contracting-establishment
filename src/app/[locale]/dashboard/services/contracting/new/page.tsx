import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
import {
    getAllWorks,
    getAllMaterials,
    getAllTechniques,
    getAllQualitySafetyStandards,
    getAllWhyChooseUs,
    getAllFaqs
} from "@/actions/services";
import { getAllProjects } from "@/actions/contracting";
import { ContractingServiceForm } from "./form";

export default async function NewContractingServicePage() {
    const canCreate = await hasPermission("services.create");
    if (!canCreate) {
        redirect("/dashboard/services/contracting");
    }

    const [projects, works, materials, techniques, qualitySafety, whyChooseUs, faqs] = await Promise.all([
        getAllProjects(),
        getAllWorks(),
        getAllMaterials(),
        getAllTechniques(),
        getAllQualitySafetyStandards(),
        getAllWhyChooseUs(),
        getAllFaqs(),
    ]);

    return (
        <ContractingServiceForm
            mode="create"
            lookups={{
                projects,
                works,
                materials,
                techniques,
                qualitySafety,
                whyChooseUs,
                faqs,
            }}
        />
    );
}
