import { Suspense } from "react"
import { EditCustomerForm } from "./components/edit-customer-form"
import { CustomerDetailsSkeleton } from "../components/customer-details-skeleton"

export const metadata = {
  title: "Editar Cliente | Like Kar CRM",
  description: "Editar informações do cliente",
}

interface EditCustomerPageProps {
  params: {
    id: string
  }
}

export default function EditCustomerPage({ params }: EditCustomerPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Suspense fallback={<CustomerDetailsSkeleton />}>
        <EditCustomerForm customerId={params.id} />
      </Suspense>
    </div>
  )
}
