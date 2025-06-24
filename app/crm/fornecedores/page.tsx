"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { toast } from "@/hooks/use-toast"
import { AdvancedSupplierFilters } from "./components/advanced-supplier-filters"
import { SupplierTable } from "./components/supplier-table"
import { getMockSuppliers, deleteMockSupplier, deleteMultipleSuppliers } from "@/lib/mock-data"
import Link from "next/link"

export default function FornecedoresPage() {
  const [loading, setLoading] = useState(true)
  const [suppliers, setSuppliers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Estado para filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState({
    status: "all",
    city: "",
    state: "",
  })

  // Carregar fornecedores
  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadSuppliers = async () => {
    setLoading(true)
    try {
      const data = getMockSuppliers()
      setSuppliers(data)
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os fornecedores",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(supplierId) ? prev.filter((id) => id !== supplierId) : [...prev, supplierId],
    )
  }

  const handleSelectAll = () => {
    if (selectedSuppliers.length === filteredSuppliers.length) {
      setSelectedSuppliers([])
    } else {
      setSelectedSuppliers(filteredSuppliers.map((supplier) => supplier.id))
    }
  }

  const confirmDelete = (supplierId: string) => {
    setSupplierToDelete(supplierId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!supplierToDelete) return

    setIsDeleting(true)
    try {
      await deleteMockSupplier(supplierToDelete)

      setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== supplierToDelete))
      setSelectedSuppliers((prev) => prev.filter((id) => id !== supplierToDelete))

      toast({
        title: "Fornecedor excluído",
        description: "O fornecedor foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o fornecedor",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSupplierToDelete(null)
    }
  }

  const confirmBulkDelete = () => {
    if (selectedSuppliers.length === 0) return
    setBulkDeleteDialogOpen(true)
  }

  const handleBulkDelete = async () => {
    if (selectedSuppliers.length === 0) return

    setIsDeleting(true)
    try {
      await deleteMultipleSuppliers(selectedSuppliers)

      setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => !selectedSuppliers.includes(supplier.id)))
      setSelectedSuppliers([])

      toast({
        title: "Fornecedores excluídos",
        description: `${selectedSuppliers.length} fornecedores foram excluídos com sucesso.`,
      })
    } catch (error) {
      console.error("Erro ao excluir fornecedores:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir os fornecedores selecionados",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setBulkDeleteDialogOpen(false)
    }
  }

  // Aplicar filtros avançados
  const applyAdvancedFilters = (supplier: any) => {
    // Filtro de status
    if (advancedFilters.status !== "all") {
      if (advancedFilters.status === "active" && !supplier.is_active) return false
      if (advancedFilters.status === "inactive" && supplier.is_active) return false
    }

    // Filtro de cidade
    if (
      advancedFilters.city &&
      (!supplier.city || !supplier.city.toLowerCase().includes(advancedFilters.city.toLowerCase()))
    )
      return false

    // Filtro de estado
    if (
      advancedFilters.state &&
      (!supplier.state || !supplier.state.toLowerCase().includes(advancedFilters.state.toLowerCase()))
    )
      return false

    return true
  }

  // Filtrar fornecedores
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      searchTerm === "" ||
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.document && supplier.document.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (supplier.email && supplier.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (supplier.city && supplier.city.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAdvanced = applyAdvancedFilters(supplier)

    return matchesSearch && matchesAdvanced
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-600">Gerencie seus fornecedores e parceiros</p>
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
                placeholder="Buscar fornecedores por nome, CNPJ, email ou cidade..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* Filters and New Supplier Button */}
            <div className="flex gap-3 flex-shrink-0">
              {/* Advanced Filters */}
              <AdvancedSupplierFilters currentFilters={advancedFilters} onFiltersChange={setAdvancedFilters} />

              {/* New Supplier Button */}
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                <Link href="/crm/fornecedores/novo">
                  <Plus size={16} className="mr-2" />
                  Novo Fornecedor
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Suppliers Actions */}
      {selectedSuppliers.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-medium">
              {selectedSuppliers.length}{" "}
              {selectedSuppliers.length === 1 ? "fornecedor selecionado" : "fornecedores selecionados"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedSuppliers([])}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      )}

      {/* Suppliers Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando fornecedores...</p>
          </div>
        </div>
      ) : (
        <SupplierTable
          suppliers={filteredSuppliers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSuppliers={selectedSuppliers}
          onSelectSupplier={handleSelectSupplier}
          onSelectAll={handleSelectAll}
          onDeleteSupplier={confirmDelete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita.
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
              Tem certeza que deseja excluir {selectedSuppliers.length} fornecedores? Esta ação não pode ser desfeita.
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
                "Excluir Fornecedores"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
