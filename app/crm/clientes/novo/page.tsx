import { CustomerForm } from "../components/customer-form"

export const metadata = {
  title: "Novo Cliente | Like Kar CRM",
  description: "Adicionar novo cliente ao sistema",
}

export default function NewCustomerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Novo Cliente</h1>
        <p className="text-gray-500 mt-1">Adicione um novo cliente ao sistema</p>
      </div>

      <CustomerForm />
    </div>
  )
}
