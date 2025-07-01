"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Users, Car, Phone, Mail, MapPin, Eye, Edit, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCustomers, Customer, deleteCustomer } from "@/lib/supabase-customers"

export function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])

  useEffect(() => {
    loadCustomers()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter(
        (customer) =>
          typeof customer.name === "string" && customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof customer.phone === "string" && customer.phone.includes(searchTerm)) ||
          (typeof customer.email === "string" && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (Array.isArray((customer as any).cars) && (customer as any).cars.some(
            (car: any) =>
              typeof car.brand === "string" && car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              typeof car.model === "string" && car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
              typeof car.license_plate === "string" && car.license_plate.toLowerCase().includes(searchTerm.toLowerCase()),
          ))
      )
      setFilteredCustomers(filtered)
    } else {
      setFilteredCustomers(customers)
    }
  }, [searchTerm, customers])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      const data = await getCustomers()
      setCustomers(data)
      setFilteredCustomers(data)
    } catch (error) {
      console.error("Erro ao carregar clientes:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800 border-green-200"
      case "inativo":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "devedor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo"
      case "inativo":
        return "Inativo"
      case "devedor":
        return "Devedor"
      default:
        return status
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleDeleteCustomer = async (customerId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return
    try {
      await deleteCustomer(customerId)
      setCustomers((prev) => prev.filter((c) => c.id !== customerId))
      setFilteredCustomers((prev) => prev.filter((c) => c.id !== customerId))
    } catch (error) {
      alert("Erro ao excluir cliente. Tente novamente.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-7 w-7 mr-3 text-yellow-500" />
            Clientes
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredCustomers.length} cliente{filteredCustomers.length !== 1 ? "s" : ""} encontrado
            {filteredCustomers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <Link href="/erp/clientes/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por nome, telefone, email ou carro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter((c) => c.status === "ativo").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Potenciais</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter((c) => c.status === "potencial").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Car className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total de Carros</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.reduce((total, customer) => {
                    const cars = Array.isArray((customer as any).cars) ? (customer as any).cars : []
                    return total + cars.length
                  }, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-yellow-100 text-yellow-800 font-semibold">
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{customer.name}</h3>
                      <Badge className={`${getStatusColor(customer.status)} text-xs`}>
                        {getStatusLabel(customer.status)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/clientes/${customer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/clientes/${customer.id}/editar`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
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
                      <span className="truncate">
                        {customer.city}
                        {customer.state && `, ${customer.state}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Cars */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <Car className="h-4 w-4 mr-1" />
                      Carros ({customer.cars?.length || 0})
                    </span>
                  </div>
                  {customer.cars && customer.cars.length > 0 ? (
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {customer.cars.slice(0, 2).map((car) => (
                        <div key={car.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                          <span className="font-medium">
                            {car.brand} {car.model}
                          </span>
                          <span className="text-gray-500">{car.license_plate}</span>
                        </div>
                      ))}
                      {customer.cars.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">+{customer.cars.length - 2} mais</div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">Nenhum carro cadastrado</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link href={`/erp/clientes/${customer.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
                    <Link href={`/erp/clientes/${customer.id}/editar`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado"}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Tente ajustar os termos de busca" : "Comece adicionando seu primeiro cliente"}
          </p>
          {!searchTerm && (
            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Link href="/erp/clientes/novo">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Cliente
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
