import { redirect, notFound } from "next/navigation";
import { hasPermission } from "@/server/roles";
import { getImportServiceById } from "@/actions/import";
import {
    getAllCountries,
    getAllSuppliers,
    getAllBeneficiaryCategories,
    getAllUsages,
    getAllImportMethods,
    getAllDeliveryMethods,
    getAllQualityWarrantyStandards,
    getAllShipments,
    getAllWhyChooseUs,
    getAllFaqs
} from "@/actions/services";
import { ImportServiceForm } from "../new/form";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditImportServicePage({ params }: PageProps) {
    const { id } = await params;

    const canEdit = await hasPermission("services.edit");
    if (!canEdit) {
        redirect("/dashboard/services/import");
    }

    const service = await getImportServiceById(id);
    if (!service) {
        notFound();
    }

    const [countries, suppliers, beneficiaries, usages, importMethods, deliveryMethods, qualityWarranty, shipments, whyChooseUs, faqs] = await Promise.all([
        getAllCountries(),
        getAllSuppliers(),
        getAllBeneficiaryCategories(),
        getAllUsages(),
        getAllImportMethods(),
        getAllDeliveryMethods(),
        getAllQualityWarrantyStandards(),
        getAllShipments(),
        getAllWhyChooseUs(),
        getAllFaqs(),
    ]);

    return (
        <ImportServiceForm
            mode="edit"
            existingService={service}
            lookups={{
                countries,
                suppliers,
                beneficiaries,
                usages,
                importMethods,
                deliveryMethods,
                qualityWarranty,
                shipments,
                whyChooseUs,
                faqs,
            }}
        />
    );
}
