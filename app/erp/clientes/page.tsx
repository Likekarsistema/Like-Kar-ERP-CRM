"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CustomerTable } from "./components/customer-table"
import { AdvancedCustomerFilters, type CustomerFilters } from "./components/advanced-customer-filters"
import { useToast } from "@/hooks/use-toast"
import { getMockCustomers, deleteCustomer } from "@/lib/mock-data"
import Link from "next/link"

export default function CustomersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Estado para filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState<CustomerFilters>({
    status: "all",
    city: "",
    state: "",
    hasVehicle: "all",
  })

  // Carregar clientes
  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      // Simular carregamento
      await new Promise((resolve) => setTimeout(resolve, 500))
      const data = getMockCustomers()
      setCustomers(data)
    } catch (error) {
      console.error("Erro ao buscar clientes:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId],
    )
  }

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
    }
  }

  const confirmDelete = (customerId: string) => {
    setCustomerToDelete(customerId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!customerToDelete) return

    setIsDeleting(true)
    try {
      deleteCustomer(customerToDelete)

      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerToDelete))
      setSelectedCustomers((prev) => prev.filter((id) => id !== customerToDelete))

      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir cliente:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o cliente",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setCustomerToDelete(null)
    }
  }

  const confirmBulkDelete = () => {
    if (selectedCustomers.length === 0) return
    setBulkDeleteDialogOpen(true)
  }

  const handleBulkDelete = async () => {
    if (selectedCustomers.length === 0) return

    setIsDeleting(true)
    try {
      // Excluir cada cliente selecionado
      selectedCustomers.forEach((id) => deleteCustomer(id))

      setCustomers((prevCustomers) => prevCustomers.filter((customer) => !selectedCustomers.includes(customer.id)))
      setSelectedCustomers([])

      toast({
        title: "Clientes excluídos",
        description: `${selectedCustomers.length} clientes foram excluídos com sucesso.`,
      })
    } catch (error) {
      console.error("Erro ao excluir clientes:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir os clientes selecionados",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setBulkDeleteDialogOpen(false)
    }
  }

  // Aplicar filtros avançados
  const applyAdvancedFilters = (customer: any) => {
    // Filtro de status
    if (advancedFilters.status !== "all" && customer.status !== advancedFilters.status) return false

    // Filtro de cidade
    if (
      advancedFilters.city &&
      (!customer.city || !customer.city.toLowerCase().includes(advancedFilters.city.toLowerCase()))
    )
      return false

    // Filtro de estado
    if (
      advancedFilters.state &&
      (!customer.state || !customer.state.toLowerCase().includes(advancedFilters.state.toLowerCase()))
    )
      return false

    // Filtro de veículos
    if (advancedFilters.hasVehicle !== "all") {
      const hasVehicles = customer.cars && customer.cars.length > 0
      if (advancedFilters.hasVehicle === "yes" && !hasVehicles) return false
      if (advancedFilters.hasVehicle === "no" && hasVehicles) return false
    }

    return true
  }

  // Filtrar clientes
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchTerm === "" ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm)) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAdvanced = applyAdvancedFilters(customer)

    return matchesSearch && matchesAdvanced
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-gray-500">Gerencie todos os seus clientes em um só lugar</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* Filters and New Customer Button */}
            <div className="flex gap-3 flex-shrink-0">
              {/* Advanced Filters */}
              <AdvancedCustomerFilters currentFilters={advancedFilters} onFiltersChange={setAdvancedFilters} />

              {/* New Customer Button */}
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 h-10">
                <Link href="/erp/clientes/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Customers Actions */}
      {selectedCustomers.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-medium">
              {selectedCustomers.length}{" "}
              {selectedCustomers.length === 1 ? "cliente selecionado" : "clientes selecionados"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedCustomers([])}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      )}

      {/* Customers Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando clientes...</p>
          </div>
        </div>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCustomers={selectedCustomers}
          onSelectCustomer={handleSelectCustomer}
          onSelectAll={handleSelectAll}
          onDeleteCustomer={confirmDelete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão em massa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {selectedCustomers.length} clientes? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir Clientes"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
