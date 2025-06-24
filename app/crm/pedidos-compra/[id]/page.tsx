"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Package, Calendar, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { getPurchaseOrderById, deletePurchaseOrder } from "@/lib/mock-data"
import type { PurchaseOrder } from "@/lib/mock-data"
import Link from "next/link"

export default function PurchaseOrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<PurchaseOrder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [params.id])

  const loadOrder = async () => {
    setLoading(true)
    try {
      const orderData = getPurchaseOrderById(params.id as string)
      if (orderData) {
        setOrder(orderData)
      } else {
        toast({
          title: "Erro",
          description: "Pedido não encontrado",
          variant: "destructive",
        })
        router.push("/crm/pedidos-compra")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar pedido",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!order) return

    if (confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        const success = deletePurchaseOrder(order.id)
        if (success) {
          toast({
            title: "Sucesso",
            description: "Pedido excluído com sucesso",
          })
          router.push("/crm/pedidos-compra")
        } else {
          throw new Error("Falha ao excluir")
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o pedido",
          variant: "destructive",
        })
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: "bg-orange-100 text-orange-800 border-orange-200",
      aprovado: "bg-blue-100 text-blue-800 border-blue-200",
      concluido: "bg-green-100 text-green-800 border-green-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
    }

    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente}>
        {status === "concluido" ? "Concluído" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Carregando pedido...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Pedido não encontrado</h1>
          <p className="text-gray-500 mt-2">O pedido solicitado não existe ou foi removido.</p>
          <Button asChild className="mt-4">
            <Link href="/crm/pedidos-compra">Voltar para Pedidos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/crm/pedidos-compra">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pedido {order.number}</h1>
            <p className="text-gray-500">{order.supplier}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/crm/pedidos-compra/${order.id}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados do Fornecedor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Dados do Fornecedor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome</label>
                  <p className="font-medium">{order.supplier}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="font-medium">{order.supplierEmail || "Não informado"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Telefone</label>
                  <p className="font-medium">{order.supplierPhone || "Não informado"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Departamento</label>
                  <p className="font-medium">{order.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itens do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Itens do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.productName}</h4>
                      <p className="text-sm text-gray-500">
                        Quantidade: {item.quantity} | Preço unitário: {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(item.total)}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Geral:</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar com Informações */}
        <div className="space-y-6">
          {/* Status e Datas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Status e Datas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge("concluido")}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data do Pedido</label>
                <p className="font-medium">{formatDate(order.orderDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Esperada</label>
                <p className="font-medium">{formatDate(order.expectedDate)}</p>
              </div>
              {order.receivedDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Recebimento</label>
                  <p className="font-medium">{formatDate(order.receivedDate)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Prioridade</label>
                <p className="font-medium capitalize">{order.priority}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Criado por</label>
                <p className="font-medium">{order.createdBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Total de Itens</label>
                <p className="font-medium">{order.items.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
