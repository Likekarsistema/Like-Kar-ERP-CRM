"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Calendar, Clock, Tag, DollarSign, BarChart2, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock services data
const mockServices = [
  {
    id: "1",
    name: "Troca de Óleo",
    description: "Troca completa do óleo do motor com filtro",
    category: "Manutenção",
    price: 89.9,
    duration: 30,
    status: "ativo",
    timesPerformed: 156,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Alinhamento e Balanceamento",
    description: "Alinhamento das rodas e balanceamento dos pneus",
    category: "Pneus",
    price: 120.0,
    duration: 60,
    status: "ativo",
    timesPerformed: 89,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Revisão Completa",
    description: "Revisão geral do veículo com checklist completo",
    category: "Revisão",
    price: 250.0,
    duration: 120,
    status: "ativo",
    timesPerformed: 45,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Troca de Pastilhas de Freio",
    description: "Substituição das pastilhas de freio dianteiras",
    category: "Freios",
    price: 180.0,
    duration: 45,
    status: "ativo",
    timesPerformed: 67,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Instalação de Som",
    description: "Instalação de sistema de som automotivo",
    category: "Elétrica",
    price: 150.0,
    duration: 90,
    status: "inativo",
    timesPerformed: 23,
    createdAt: "2024-01-01",
  },
]

export default function DetalhesServicoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [service, setService] = useState<any>(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Simulação de busca de dados
        await new Promise((resolve) => setTimeout(resolve, 500))

        const foundService = mockServices.find((s) => s.id === params.id)

        if (!foundService) {
          toast({
            title: "Serviço não encontrado",
            description: "O serviço solicitado não foi encontrado.",
            variant: "destructive",
          })
          router.push("/crm/servicos")
          return
        }

        setService(foundService)
      } catch (error) {
        console.error("Erro ao buscar serviço:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do serviço.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchService()
  }, [params.id, router, toast])

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

  const handleEdit = () => {
    router.push(`/crm/servicos/${params.id}/editar`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>
          <p className="text-sm text-gray-500">Carregando serviço...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Serviço não encontrado</h3>
          <p className="mt-1 text-gray-500">O serviço solicitado não existe ou foi removido.</p>
          <Button onClick={() => router.push("/crm/servicos")} className="mt-6">
            Voltar para Serviços
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Tag className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">{service.category}</span>
              <span className="mx-2 text-gray-300">•</span>
              {getStatusBadge(service.status)}
            </div>
          </div>
        </div>
        <Button onClick={handleEdit} className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <Edit className="h-4 w-4 mr-2" />
          Editar Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descrição */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Descrição</h2>
                <p className="text-gray-700">{service.description || "Nenhuma descrição disponível."}</p>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Estatísticas</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Serviços Realizados</p>
                      <p className="font-semibold">{service.timesPerformed}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Clientes Atendidos</p>
                      <p className="font-semibold">{Math.floor(service.timesPerformed * 0.8)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Desempenho Mensal</h3>
                  <div className="h-40 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="flex items-center gap-2 text-gray-500">
                      <BarChart2 className="h-5 w-5" />
                      <span>Gráfico de desempenho seria exibido aqui</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          {/* Informações do Serviço */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Detalhes do Serviço</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Preço</p>
                    <p className="font-semibold">
                      R$ {service.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Duração</p>
                    <p className="font-semibold">{service.duration} minutos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Data de Criação</p>
                    <p className="font-semibold">{new Date(service.createdAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>

              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Agendar Serviço</Button>
                <Button variant="outline" className="w-full">
                  Adicionar ao Orçamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
