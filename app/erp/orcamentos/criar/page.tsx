"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { createQuoteItem, uploadQuoteItemImage, updateQuoteItem } from "@/lib/supabase-quote-items"

export default function CreateQuoteItemPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageUploadWarning, setImageUploadWarning] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageUploadWarning(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      toast({
        title: "Erro",
        description: "Nome e preço são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      // Criar o item
      const newItem = await createQuoteItem({
        name: formData.name,
        description: formData.description || undefined,
        brand: formData.brand || undefined,
        price: Number.parseFloat(formData.price),
        is_active: true,
      })

      // Tentar upload da imagem se fornecida
      if (imageFile) {
        try {
          const imageUrl = await uploadQuoteItemImage(imageFile, newItem.id)

          if (imageUrl) {
            // Atualizar o item com a URL da imagem
            await updateQuoteItem(newItem.id, { image_url: imageUrl })
            toast({
              title: "Sucesso",
              description: "Item criado com sucesso e imagem enviada!",
            })
          } else {
            // Item criado mas imagem não foi enviada
            setImageUploadWarning(true)
            toast({
              title: "Item criado",
              description:
                "Item criado com sucesso, mas a imagem não pôde ser enviada. Configure o storage no Supabase.",
              variant: "default",
            })
          }
        } catch (imageError) {
          console.error("Erro ao fazer upload da imagem:", imageError)
          setImageUploadWarning(true)
          toast({
            title: "Item criado",
            description: "Item criado com sucesso, mas houve um problema com o upload da imagem.",
            variant: "default",
          })
        }
      } else {
        toast({
          title: "Sucesso",
          description: "Item criado com sucesso!",
        })
      }

      // Aguardar um pouco antes de redirecionar para mostrar o toast
      setTimeout(() => {
        router.push("/erp/orcamentos")
      }, 1500)
    } catch (error) {
      console.error("Erro ao criar item:", error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o item.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 py-6 px-4 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Item de Orçamento</h1>
          <p className="text-gray-600">Adicione um novo produto ou serviço ao catálogo</p>
        </div>
      </div>

      {/* Storage Warning */}
      {imageUploadWarning && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            O storage de imagens não está configurado. Execute o script <code>setup-quote-items-storage.sql</code> no
            Supabase para habilitar o upload de imagens.
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Multimídia Citroen C3 Aircross 2017 2018 2019 V2 Carplay 7&quot; 2016"
                  required={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0,00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Ex: Citroen"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagem (opcional)</Label>
                <div className="flex items-center gap-2">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                  <Upload className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Formatos aceitos: JPG, PNG, WebP, GIF (máx. 5MB)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva o produto ou serviço..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
              >
                {loading ? "Criando..." : "Criar Item"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
