"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ServiceGalleryProps {
  images: string[]
  mainImage: string
}

export function ServiceGallery({ images, mainImage }: ServiceGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // Ensure mainImage is always the first image shown
  const allImages = [mainImage, ...(images || [])]

  useEffect(() => {
    setIsVisible(true)
    // Explicitly ensure we start with the main image
    setCurrentImage(0)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div
      className={`transition-all duration-1000 transform pt-4 pb-4 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="relative aspect-[16/9] md:aspect-[4/3] max-h-[400px] rounded-xl overflow-hidden shadow-lg mb-4">
        <div
          className={`relative w-full h-full transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
        >
          <Image
            src={allImages[currentImage] || "/placeholder.svg"}
            alt="Service image"
            fill
            className="object-cover"
          />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Zoom button */}
        <button
          onClick={toggleZoom}
          className="absolute right-4 bottom-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden transition-all ${
              currentImage === index ? "ring-2 ring-yellow-400 scale-105" : "ring-1 ring-gray-200 opacity-70"
            } ${index === 0 ? "border-2 border-yellow-400" : ""}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image || "/placeholder.svg"})` }}
              aria-label={`Thumbnail ${index + 1}`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  )
}
