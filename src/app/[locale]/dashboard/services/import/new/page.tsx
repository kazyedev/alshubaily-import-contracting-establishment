import { redirect } from "next/navigation";
import { hasPermission } from "@/server/roles";
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
import { ImportServiceForm } from "./form";

export default async function NewImportServicePage() {
    const canCreate = await hasPermission("services.create");
    if (!canCreate) {
        redirect("/dashboard/services/import");
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
            mode="create"
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
