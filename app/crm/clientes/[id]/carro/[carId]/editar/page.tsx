import { Suspense } from "react"
import { EditCarForm } from "./components/edit-car-form"

export const metadata = {
  title: "Editar Carro | Like Kar CRM",
  description: "Editar informações do carro",
}

interface EditCarPageProps {
  params: {
    id: string
    carId: string
  }
}

export default function EditCarPage({ params }: EditCarPageProps) {
  return (
    <div className="container mx-auto py-6 px-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <EditCarForm customerId={params.id} carId={params.carId} />
      </Suspense>
    </div>
  )
}
