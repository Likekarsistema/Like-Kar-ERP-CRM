"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const serviceCategories = [
  "Manutenção",
  "Pneus",
  "Revisão",
  "Freios",
  "Elétrica",
  "Motor",
  "Suspensão",
  "Ar Condicionado",
  "Outros",
]

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

export default function EditarServicoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    status: "ativo",
  })

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Simulação de busca de dados
        await new Promise((resolve) => setTimeout(resolve, 500))

        const service = mockServices.find((s) => s.id === params.id)

        if (!service) {
          toast({
            title: "Serviço não encontrado",
            description: "O serviço solicitado não foi encontrado.",
            variant: "destructive",
          })
          router.push("/crm/servicos")
          return
        }

        setFormData({
          name: service.name,
          description: service.description,
          category: service.category,
          price: service.price.toString(),
          duration: service.duration.toString(),
          status: service.status,
        })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.name || !formData.price) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso.",
      })

      router.push("/crm/servicos")
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o serviço.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          <p className="text-sm text-gray-500">Carregando serviço...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar Serviço</h1>
          <p className="text-gray-500">Atualize as informações do serviço</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informações Básicas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Serviço *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Troca de Óleo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descreva o serviço..."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preços e Duração */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preços e Duração</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (minutos)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="0"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 30"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Status</h2>

              <div className="space-y-2">
                <Label htmlFor="status">Status do Serviço</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="hover:bg-transparent focus:ring-0">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
