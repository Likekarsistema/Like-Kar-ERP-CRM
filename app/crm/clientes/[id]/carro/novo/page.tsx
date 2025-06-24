import { Suspense } from "react"
import { AddCarForm } from "./components/add-car-form"

export const metadata = {
  title: "Adicionar Carro | Like Kar CRM",
  description: "Adicionar novo carro ao cliente",
}

interface AddCarPageProps {
  params: {
    id: string
  }
}

export default function AddCarPage({ params }: AddCarPageProps) {
  return (
    <div className="container mx-auto py-6 px-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <AddCarForm customerId={params.id} />
      </Suspense>
    </div>
  )
}
