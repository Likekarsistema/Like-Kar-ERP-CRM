"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, Edit, Trash2, Car, Phone, MapPin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { getMockCustomers, deleteCustomer } from "@/lib/mock-data"
import type { Customer } from "@/lib/mock-data"

export function CustomerTableMobile() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      // Simular carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const data = getMockCustomers()
      setCustomers(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.")) return

    try {
      deleteCustomer(id)
      await loadCustomers() // Recarregar dados
      toast({
        title: "Sucesso",
        description: "Cliente excluído com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o cliente",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "potential":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "lost":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "inactive":
        return "Inativo"
      case "potential":
        return "Potencial"
      case "lost":
        return "Perdido"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-2 text-gray-500">Carregando clientes...</p>
        </div>
      </div>
    )
  }

  if (customers.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Nenhum cliente encontrado.</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {customers.map((customer) => (
        <div key={customer.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <Link href={`/erp/clientes/${customer.id}`} className="font-medium text-gray-900 hover:text-yellow-600">
                  {customer.name}
                </Link>
                <Badge className={getStatusColor(customer.status)}>{getStatusLabel(customer.status)}</Badge>
              </div>

              <div className="space-y-2 mt-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                    {customer.phone}
                  </a>
                </div>

                {customer.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`mailto:${customer.email}`} className="hover:text-blue-600 truncate">
                      {customer.email}
                    </a>
                  </div>
                )}

                {customer.city && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      {customer.city}
                      {customer.state && `, ${customer.state}`}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Carros:</div>
                {customer.cars && customer.cars.length > 0 ? (
                  <div className="space-y-1">
                    {customer.cars.map((car) => (
                      <div key={car.id} className="flex items-center text-sm">
                        <Car className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-700">
                          {car.brand} {car.model}
                        </span>
                        <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                          {car.license_plate}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 italic">Nenhum carro</span>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link href={`/erp/clientes/${customer.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link href={`/erp/clientes/${customer.id}/editar`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
