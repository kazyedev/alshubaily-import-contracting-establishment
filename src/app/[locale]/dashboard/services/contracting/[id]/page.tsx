import { redirect, notFound } from "next/navigation";
import { hasPermission } from "@/server/roles";
import {
    getContractingServiceById,
    getAllProjects
} from "@/actions/contracting";
import {
    getAllWorks,
    getAllMaterials,
    getAllTechniques,
    getAllQualitySafetyStandards,
    getAllWhyChooseUs,
    getAllFaqs
} from "@/actions/services";
import { ContractingServiceForm } from "../new/form";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditContractingServicePage({ params }: PageProps) {
    const { id } = await params;

    const canEdit = await hasPermission("services.edit");
    if (!canEdit) {
        redirect("/dashboard/services/contracting");
    }

    const service = await getContractingServiceById(id);
    if (!service) {
        notFound();
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
            mode="edit"
            existingService={service}
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
