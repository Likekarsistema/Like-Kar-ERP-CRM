"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-yWz5UsPjX1KsD67UqomkIDmLDO4NiC.png",
    alt: "Centrais Multimídias",
    title: "Centrais Multimídias",
    description: "Transforme a experiência de dirigir com nossos sistemas de última geração",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-hgVKx7qvlyq0E5ekVcctUXBpK98kdv.png",
    alt: "Venha conferir nossas novidades",
    title: "Novidades Imperdíveis",
    description: "Conheça os lançamentos que acabaram de chegar na Like Kar",
  },
]

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    const startTimer = () => {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true)
        setCurrent((prev) => (prev + 1) % banners.length)

        // Reset animation state after transition completes
        setTimeout(() => {
          setIsAnimating(false)
        }, 500)
      }, 5000) // Change slide every 5 seconds
    }

    startTimer()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  const navigate = (direction: "next" | "prev") => {
    if (isAnimating) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsAnimating(true)

    if (direction === "next") {
      setCurrent((prev) => (prev + 1) % banners.length)
    } else {
      setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
    }

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="py-16 px-4 md:py-20 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto relative overflow-hidden h-[280px] sm:h-[320px] md:h-[380px] lg:h-[450px]">
        {/* Carousel container */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0 relative h-full overflow-hidden">
              <Image
                src={banner.src || "/placeholder.svg"}
                alt={banner.alt}
                fill
                className="object-contain md:object-cover w-full h-full"
                priority={banner.id === 1}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="text-white p-8 md:p-12 max-w-md">{/* Text content removed */}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => navigate("prev")}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
          aria-label="Previous slide"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate("next")}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
          aria-label="Next slide"
          disabled={isAnimating}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== current) {
                  setIsAnimating(true)
                  setCurrent(index)
                  setTimeout(() => setIsAnimating(false), 500)

                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                  }
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index ? "bg-white scale-125 w-8" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
