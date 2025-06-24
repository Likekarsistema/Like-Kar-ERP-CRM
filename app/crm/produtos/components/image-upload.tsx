"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  disabled?: boolean
}

export function ImageUpload({ images, onImagesChange, maxImages = 5, disabled = false }: ImageUploadProps) {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: string[] = []

    try {
      for (let i = 0; i < files.length && images.length + newImages.length < maxImages; i++) {
        const file = files[i]

        // Validar tipo de arquivo
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Formato inválido",
            description: `${file.name} não é uma imagem válida.`,
            variant: "destructive",
          })
          continue
        }

        // Validar tamanho (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Arquivo muito grande",
            description: `${file.name} excede o limite de 5MB.`,
            variant: "destructive",
          })
          continue
        }

        // Em um ambiente real, aqui faríamos o upload para o Supabase Storage
        // Por enquanto, vamos usar URL.createObjectURL para simular
        const imageUrl = URL.createObjectURL(file)
        newImages.push(imageUrl)
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages])
        toast({
          title: "Upload concluído",
          description: `${newImages.length} ${newImages.length === 1 ? "imagem adicionada" : "imagens adicionadas"}.`,
        })
      }
    } catch (error) {
      console.error("Erro no upload:", error)
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer o upload das imagens.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (disabled || uploading) return

    const files = event.dataTransfer.files
    if (!files || files.length === 0) return

    // Simular o mesmo comportamento do input file
    const dataTransfer = new DataTransfer()
    for (let i = 0; i < files.length; i++) {
      dataTransfer.items.add(files[i])
    }

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files
      const changeEvent = new Event("change", { bubbles: true })
      fileInputRef.current.dispatchEvent(changeEvent)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
    toast({
      title: "Imagem removida",
      description: "A imagem foi removida com sucesso.",
    })
  }

  const setMainImage = (index: number) => {
    if (index === 0) return // Já é a imagem principal

    const newImages = [...images]
    const mainImage = newImages.splice(index, 1)[0]
    newImages.unshift(mainImage)
    onImagesChange(newImages)
    toast({
      title: "Imagem principal definida",
      description: "A imagem principal foi atualizada.",
    })
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          disabled ? "bg-gray-50 border-gray-200" : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          ref={fileInputRef}
          disabled={disabled || uploading || images.length >= maxImages}
        />
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center gap-2 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-gray-400" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">
              {disabled
                ? "Upload de imagens desativado"
                : uploading
                  ? "Processando..."
                  : "Clique ou arraste para fazer upload"}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG até 5MB ({images.length}/{maxImages})
            </p>
          </div>
        </label>
      </div>

      {/* Preview das Imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Produto - Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {!disabled && (
                <>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  {index !== 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setMainImage(index)}
                    >
                      Definir como principal
                    </Button>
                  )}
                </>
              )}
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Nenhuma imagem adicionada</p>
        </div>
      )}
    </div>
  )
}
