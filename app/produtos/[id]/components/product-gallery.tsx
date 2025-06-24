"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  videoUrl?: string
}

export function ProductGallery({ images, videoUrl }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const allMedia = [...images]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
    setShowVideo(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
    setShowVideo(false)
  }

  return (
    <div>
      {/* Main Image/Video Display */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-4 aspect-[4/3]">
        {showVideo && videoUrl ? (
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <Image
            src={allMedia[activeIndex] || "/placeholder.svg"}
            alt="Product image"
            fill
            className="object-contain"
          />
        )}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              setShowVideo(false)
            }}
            className={`relative rounded-lg overflow-hidden aspect-square ${
              activeIndex === index && !showVideo ? "ring-2 ring-yellow-400" : "ring-1 ring-gray-200"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}

        {/* Video Thumbnail */}
        {videoUrl && (
          <button
            onClick={() => setShowVideo(true)}
            className={`relative rounded-lg overflow-hidden aspect-square bg-gray-800 flex items-center justify-center ${
              showVideo ? "ring-2 ring-yellow-400" : "ring-1 ring-gray-200"
            }`}
          >
            <Play className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
