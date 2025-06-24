import { Suspense } from "react"
import { CustomerDetails } from "./components/customer-details"
import { CustomerDetailsSkeleton } from "./components/customer-details-skeleton"

export const metadata = {
  title: "Detalhes do Cliente | Like Kar CRM",
  description: "Visualizar detalhes completos do cliente",
}

interface CustomerPageProps {
  params: {
    id: string
  }
}

export default function CustomerPage({ params }: CustomerPageProps) {
  return (
    <div className="h-full">
      <Suspense fallback={<CustomerDetailsSkeleton />}>
        <CustomerDetails customerId={params.id} />
      </Suspense>
    </div>
  )
}
