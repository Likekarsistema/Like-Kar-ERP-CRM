"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadSimpleProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUploadSimple({ images, onImagesChange, maxImages = 5 }: ImageUploadSimpleProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploading(true)
    const newImages: string[] = []

    for (let i = 0; i < files.length && images.length + newImages.length < maxImages; i++) {
      const file = files[i]

      // Criar URL temporária para preview
      const imageUrl = URL.createObjectURL(file)
      newImages.push(imageUrl)
    }

    onImagesChange([...images, ...newImages])
    setUploading(false)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={uploading || images.length >= maxImages}
        />
        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Clique para fazer upload de imagens</p>
            <p className="text-xs text-gray-500">
              PNG, JPG até 5MB ({images.length}/{maxImages})
            </p>
          </div>
        </label>
      </div>

      {/* Preview das Imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg?height=200&width=200&query=product"}
                  alt={`Produto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
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
