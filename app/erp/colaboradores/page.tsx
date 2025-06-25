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
import { CollaboratorTable } from "./components/collaborator-table"
import { AdvancedCollaboratorFilters, type CollaboratorFilters } from "./components/advanced-collaborator-filters"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data para colaboradores
const mockCollaborators = [
  {
    id: "1",
    name: "Nathann Isaac",
    email: "Nathann@gmail.com",
    role: "Gerente",
    status: "Ativo",
    active: true,
    createdAt: "2024-01-15",
    lastAccess: "2024-01-20",
  },
  {
    id: "2",
    name: "Heitor",
    email: "Heitor@gmail.com",
    role: "Funcionário",
    status: "Ativo",
    active: true,
    createdAt: "2024-01-10",
    lastAccess: "2024-01-19",
  },
  {
    id: "3",
    name: "Maria Silva",
    email: "maria@gmail.com",
    role: "Atendente",
    status: "Ativo",
    active: true,
    createdAt: "2024-01-08",
    lastAccess: "2024-01-18",
  },
  {
    id: "4",
    name: "João Santos",
    email: "joao@gmail.com",
    role: "Técnico",
    status: "Inativo",
    active: false,
    createdAt: "2024-01-05",
    lastAccess: "2024-01-10",
  },
]

export default function CollaboratorsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [collaborators, setCollaborators] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [collaboratorToDelete, setCollaboratorToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Estado para filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState<CollaboratorFilters>({
    status: "all",
    role: "all",
    lastAccess: "all",
  })

  // Carregar colaboradores
  useEffect(() => {
    loadCollaborators()
  }, [])

  const loadCollaborators = async () => {
    setLoading(true)
    try {
      // Simular carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCollaborators(mockCollaborators)
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os colaboradores",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectCollaborator = (collaboratorId: string) => {
    setSelectedCollaborators((prev) =>
      prev.includes(collaboratorId) ? prev.filter((id) => id !== collaboratorId) : [...prev, collaboratorId],
    )
  }

  const handleSelectAll = () => {
    if (selectedCollaborators.length === filteredCollaborators.length) {
      setSelectedCollaborators([])
    } else {
      setSelectedCollaborators(filteredCollaborators.map((collaborator) => collaborator.id))
    }
  }

  const confirmDelete = (collaboratorId: string) => {
    setCollaboratorToDelete(collaboratorId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!collaboratorToDelete) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCollaborators((prevCollaborators) =>
        prevCollaborators.filter((collaborator) => collaborator.id !== collaboratorToDelete),
      )
      setSelectedCollaborators((prev) => prev.filter((id) => id !== collaboratorToDelete))

      toast({
        title: "Colaborador excluído",
        description: "O colaborador foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o colaborador",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setCollaboratorToDelete(null)
    }
  }

  const confirmBulkDelete = () => {
    if (selectedCollaborators.length === 0) return
    setBulkDeleteDialogOpen(true)
  }

  const handleBulkDelete = async () => {
    if (selectedCollaborators.length === 0) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCollaborators((prevCollaborators) =>
        prevCollaborators.filter((collaborator) => !selectedCollaborators.includes(collaborator.id)),
      )
      setSelectedCollaborators([])

      toast({
        title: "Colaboradores excluídos",
        description: `${selectedCollaborators.length} colaboradores foram excluídos com sucesso.`,
      })
    } catch (error) {
      console.error("Erro ao excluir colaboradores:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir os colaboradores selecionados",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setBulkDeleteDialogOpen(false)
    }
  }

  // Aplicar filtros avançados
  const applyAdvancedFilters = (collaborator: any) => {
    // Filtro de status
    if (advancedFilters.status !== "all") {
      if (advancedFilters.status === "active" && !collaborator.active) return false
      if (advancedFilters.status === "inactive" && collaborator.active) return false
    }

    // Filtro de cargo
    if (advancedFilters.role !== "all" && collaborator.role !== advancedFilters.role) return false

    // Filtro de último acesso
    if (advancedFilters.lastAccess !== "all") {
      const daysSinceAccess = Math.floor(
        (new Date().getTime() - new Date(collaborator.lastAccess).getTime()) / (1000 * 60 * 60 * 24),
      )
      if (advancedFilters.lastAccess === "recent" && daysSinceAccess > 7) return false
      if (advancedFilters.lastAccess === "old" && daysSinceAccess <= 30) return false
    }

    return true
  }

  // Filtrar colaboradores
  const filteredCollaborators = collaborators.filter((collaborator) => {
    const matchesSearch =
      searchTerm === "" ||
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAdvanced = applyAdvancedFilters(collaborator)

    return matchesSearch && matchesAdvanced
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Colaboradores</h1>
          <p className="text-gray-500">Gerencie os colaboradores e suas permissões</p>
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
                placeholder="Buscar colaboradores por nome, email ou cargo..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* Filters and New Collaborator Button */}
            <div className="flex gap-3 flex-shrink-0">
              {/* Advanced Filters */}
              <AdvancedCollaboratorFilters currentFilters={advancedFilters} onFiltersChange={setAdvancedFilters} />

              {/* New Collaborator Button */}
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 h-10">
                <Link href="/erp/colaboradores/criar">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Colaborador
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Collaborators Actions */}
      {selectedCollaborators.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-medium">
              {selectedCollaborators.length}{" "}
              {selectedCollaborators.length === 1 ? "colaborador selecionado" : "colaboradores selecionados"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedCollaborators([])}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      )}

      {/* Collaborators Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando colaboradores...</p>
          </div>
        </div>
      ) : (
        <CollaboratorTable
          collaborators={filteredCollaborators}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCollaborators={selectedCollaborators}
          onSelectCollaborator={handleSelectCollaborator}
          onSelectAll={handleSelectAll}
          onDeleteCollaborator={confirmDelete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este colaborador? Esta ação não pode ser desfeita.
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
              Tem certeza que deseja excluir {selectedCollaborators.length} colaboradores? Esta ação não pode ser
              desfeita.
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
                "Excluir Colaboradores"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
