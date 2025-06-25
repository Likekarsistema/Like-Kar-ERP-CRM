"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Loader2, Phone, Mail, MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { useToast } from "@/hooks/use-toast"
import { getMockSupplierById, deleteMockSupplier } from "@/lib/mock-data"
import Link from "next/link"

export default function FornecedorDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const supplierId = params.id as string

  const [supplier, setSupplier] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        if (!supplierId) {
          setError(true)
          setLoading(false)
          return
        }

        const data = getMockSupplierById(supplierId)
        if (data) {
          setSupplier(data)
        } else {
          setError(true)
          toast({
            title: "Erro",
            description: "Fornecedor não encontrado",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Erro ao carregar fornecedor:", error)
        setError(true)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do fornecedor",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadSupplier()
  }, [supplierId, toast])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteMockSupplier(supplierId)
      toast({
        title: "Fornecedor excluído",
        description: "O fornecedor foi excluído com sucesso.",
      })
      router.push("/crm/fornecedores")
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
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          <p className="text-sm text-gray-500">Carregando fornecedor...</p>
        </div>
      </div>
    )
  }

  if (error || !supplier) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Fornecedor não encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">O fornecedor solicitado não existe ou ocorreu um erro.</p>
          <Button className="mt-4" asChild>
            <Link href="/crm/fornecedores">Voltar para Fornecedores</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/crm/fornecedores">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{supplier.name}</h1>
            <p className="text-gray-500">Detalhes do fornecedor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/crm/fornecedores/${supplierId}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="text-base">{supplier.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">CNPJ/CPF</p>
                  <p className="text-base font-mono">{supplier.document || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pessoa de Contato</p>
                  <p className="text-base">{supplier.contact_person || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">
                    {supplier.is_active ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Contato</p>
                <div className="space-y-2">
                  {supplier.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:underline">
                        {supplier.email}
                      </a>
                    </div>
                  )}
                  {supplier.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`tel:${supplier.phone}`} className="text-blue-600 hover:underline">
                        {supplier.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
            </CardHeader>
            <CardContent>
              {supplier.address ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <p>
                        {supplier.address.street} {supplier.address.number}
                        {supplier.address.complement && `, ${supplier.address.complement}`}
                      </p>
                      {supplier.address.neighborhood && <p>{supplier.address.neighborhood}</p>}
                      <p>
                        {supplier.address.city}
                        {supplier.address.city && supplier.address.state && ", "}
                        {supplier.address.state} {supplier.address.zip && `- ${supplier.address.zip}`}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Nenhum endereço cadastrado</p>
              )}
            </CardContent>
          </Card>

          {/* Observações */}
          {supplier.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{supplier.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informações adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Cadastro</p>
                <p className="text-base">
                  {new Date(supplier.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Última Atualização</p>
                <p className="text-base">
                  {new Date(supplier.updated_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ações rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/crm/pedidos-compra/novo?fornecedor=${supplierId}`}>
                  <Building className="h-4 w-4 mr-2" />
                  Criar Pedido de Compra
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

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
    </div>
  )
}
