"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Trash2, Loader2, MoreHorizontal, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  name: string
  description: string
  price: number
  status: "ativo" | "inativo"
  timesPerformed: number
  createdAt: string
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Troca de Óleo",
    description: "Troca completa do óleo do motor com filtro",
    price: 89.9,
    status: "ativo",
    timesPerformed: 156,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Alinhamento e Balanceamento",
    description: "Alinhamento das rodas e balanceamento dos pneus",
    price: 120.0,
    status: "ativo",
    timesPerformed: 89,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Revisão Completa",
    description: "Revisão geral do veículo com checklist completo",
    price: 250.0,
    status: "ativo",
    timesPerformed: 45,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Troca de Pastilhas de Freio",
    description: "Substituição das pastilhas de freio dianteiras",
    price: 180.0,
    status: "ativo",
    timesPerformed: 67,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Instalação de Som",
    description: "Instalação de sistema de som automotivo",
    price: 150.0,
    status: "inativo",
    timesPerformed: 23,
    createdAt: "2024-01-01",
  },
]

export default function ServicosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>(mockServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Função para navegar para criar serviço
  const handleCreateService = () => {
    router.push("/crm/servicos/criar")
  }

  // Filtrar serviços
  const filteredServices = services.filter((service) => {
    return (
      searchTerm === "" ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleSelectAll = () => {
    if (selectedServices.length === filteredServices.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(filteredServices.map((service) => service.id))
    }
  }

  const confirmDelete = (serviceId: string) => {
    setServiceToDelete(serviceId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!serviceToDelete) return

    setIsDeleting(true)
    try {
      // Simulação de exclusão
      setServices((prevServices) => prevServices.filter((service) => service.id !== serviceToDelete))
      setSelectedServices((prev) => prev.filter((id) => id !== serviceToDelete))

      toast({
        title: "Serviço excluído",
        description: "O serviço foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir serviço:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o serviço",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    }
  }

  const confirmBulkDelete = () => {
    if (selectedServices.length === 0) return
    setBulkDeleteDialogOpen(true)
  }

  const handleBulkDelete = async () => {
    if (selectedServices.length === 0) return

    setIsDeleting(true)
    try {
      // Simulação de exclusão em massa
      setServices((prevServices) => prevServices.filter((service) => !selectedServices.includes(service.id)))
      setSelectedServices([])

      toast({
        title: "Serviços excluídos",
        description: `${selectedServices.length} serviços foram excluídos com sucesso.`,
      })
    } catch (error) {
      console.error("Erro ao excluir serviços:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir os serviços selecionados",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setBulkDeleteDialogOpen(false)
    }
  }

  const handleViewDetails = (serviceId: string) => {
    router.push(`/crm/servicos/${serviceId}`)
  }

  const handleEditService = (serviceId: string) => {
    router.push(`/crm/servicos/${serviceId}/editar`)
  }

  const getStatusBadge = (status: string) => {
    if (status === "ativo") {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Ativo
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-red-100 text-red-800">
        Inativo
      </Badge>
    )
  }

  const isAllSelected = selectedServices.length === filteredServices.length && filteredServices.length > 0

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Serviços</h1>
          <p className="text-gray-500">Gerencie os serviços oferecidos pela oficina</p>
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
                placeholder="Buscar serviços por nome ou descrição..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* New Service Button - CORRIGIDO */}
            <Button
              onClick={handleCreateService}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 h-10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Services Actions */}
      {selectedServices.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-medium">
              {selectedServices.length}{" "}
              {selectedServices.length === 1 ? "serviço selecionado" : "serviços selecionados"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedServices([])}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      )}

      {/* Services Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando serviços...</p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  </TableHead>
                  <TableHead>Nome do Serviço</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleSelectService(service.id)}
                        className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium text-gray-900 cursor-pointer">{service.name}</span>
                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        R$ {service.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(service.id)}>
                            <Eye size={16} className="mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditService(service.id)}>
                            <Edit size={16} className="mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => confirmDelete(service.id)}
                          >
                            <Trash2 size={16} className="mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleSelectService(service.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 cursor-pointer">{service.name}</span>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(service.id)}>
                        <Eye size={16} className="mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditService(service.id)}>
                        <Edit size={16} className="mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => confirmDelete(service.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    R$ {service.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  {getStatusBadge(service.status)}
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum serviço encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novos serviços.</p>
              <Button onClick={handleCreateService} className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Serviço
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
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
              Tem certeza que deseja excluir {selectedServices.length} serviços? Esta ação não pode ser desfeita.
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
                "Excluir Serviços"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
