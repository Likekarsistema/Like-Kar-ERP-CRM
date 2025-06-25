"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { getQuoteItemById, deleteQuoteItem, type QuoteItem } from "@/lib/supabase-quote-items"
import Image from "next/image"
import Link from "next/link"

export default function QuoteItemDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [item, setItem] = useState<QuoteItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const itemId = params.id as string

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true)
        const itemData = await getQuoteItemById(itemId)
        if (!itemData) {
          toast({
            title: "Erro",
            description: "Item não encontrado.",
            variant: "destructive",
          })
          router.push("/crm/orcamentos")
          return
        }
        setItem(itemData)
      } catch (error) {
        console.error("Erro ao carregar item:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar o item.",
          variant: "destructive",
        })
        router.push("/crm/orcamentos")
      } finally {
        setLoading(false)
      }
    }

    if (itemId) {
      loadItem()
    }
  }, [itemId, router, toast])

  const handleDelete = async () => {
    if (!item) return

    if (!confirm("Tem certeza que deseja excluir este item?")) return

    try {
      setDeleting(true)
      await deleteQuoteItem(item.id)
      toast({
        title: "Sucesso",
        description: "Item excluído com sucesso.",
      })
      router.push("/crm/orcamentos")
    } catch (error) {
      console.error("Erro ao excluir item:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o item.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 py-6 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Button>
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mt-2 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="space-y-6 py-6 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Button>
        </div>
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Item não encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">O item solicitado não existe ou foi removido.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6 px-4 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Item</h1>
            <p className="text-gray-600">Informações completas do produto/serviço</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/crm/orcamentos/${item.id}/editar`}>
              <Edit size={16} className="mr-2" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            <Trash2 size={16} className="mr-2" />
            {deleting ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                {item.brand && (
                  <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                    {item.brand}
                  </Badge>
                )}
              </div>

              {item.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Descrição</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Preço</h3>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Status</h3>
                  <Badge variant={item.is_active ? "default" : "secondary"} className="mt-1">
                    {item.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Data de Criação</h3>
                  <p className="text-gray-600">{new Date(item.created_at).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Última Atualização</h3>
                  <p className="text-gray-600">{new Date(item.updated_at).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Imagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {item.image_url ? (
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Sem imagem</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
