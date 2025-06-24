"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const partners = [
  {
    id: 1,
    name: "H-TECH",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-dE4FLdDBVfcn7gWDkbobDwJyCf60vF.png",
  },
  {
    id: 2,
    name: "Roadstar",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-0tW3sWBKQ6LF9ZfXdNCUsM8YOKCMdQ.png",
  },
  {
    id: 3,
    name: "Falcon",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-3cclQBYbhdm0eAozAfqVO3huHWHsPE.png",
  },
  {
    id: 4,
    name: "Stetsom",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-GGNPqDhS8pkBgLxfEaFpZMlfBIVLV3.png",
  },
  {
    id: 5,
    name: "JBL Harman",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-SA6509kCNfhWFTkLzfRUg5N7OGS15I.png",
  },
  {
    id: 6,
    name: "Pioneer",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-H8w8DhrIIpA5GTTCZr870p0nh0fBB4.png",
  },
  {
    id: 7,
    name: "2MIX",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-5qVdvUz0NpsPtar4HVOhcSoULDcfZb.png",
  },
  {
    id: 8,
    name: "Winca",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-LIvaAnfHM416JKoEEcf0EcttEhpNEN.png",
  },
  {
    id: 9,
    name: "OSRAM",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-yMUgMd8VOtwNvtVVjrY3k35C6o5TKQ.png",
  },
  {
    id: 10,
    name: "Bravox",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-w8jkGXZah0G66J5fDpSoY1eBLisoWV.png",
  },
  {
    id: 11,
    name: "Positron",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-CsilpyDvikVma8NRIKyto7rqy9fGzq.png",
  },
  {
    id: 12,
    name: "Taramps",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-os9KhPRJKtucHfCHbicRzzRrmmlogs.png",
  },
  {
    id: 13,
    name: "Tury",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-NGgqasDXIjK9VICgfAh7ryCCjEnMXP.png",
  },
  {
    id: 14,
    name: "E-tech",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-K8DaZpAEVTpJxR8UmKSoWwoIuFbv6f.png",
  },
  {
    id: 15,
    name: "Eros",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-5w8QrfxCH7RzVzcqbIG7Ye6V1K6b3E.png",
  },
  {
    id: 16,
    name: "Audiophonic",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-69ilK3htJuLYNtoFVQj0KSZeWW0pBX.png",
  },
]

export function PartnersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Empresas Parceiras</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trabalhamos com as melhores marcas do mercado para garantir a qualidade dos nossos serviços
          </p>
        </div>

        <div className="relative px-4">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 group"
              aria-label="Rolar para a esquerda"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-yellow-500 transition-colors" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 group"
              aria-label="Rolar para a direita"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-yellow-500 transition-colors" />
            </button>
          )}

          {/* Partners Slider */}
          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide" onScroll={checkScroll}>
            <div className="flex gap-6 min-w-max px-2">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="w-[280px] h-[160px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 p-8 flex items-center justify-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 transition-all duration-500" />
                  <div className="relative w-full h-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain filter group-hover:brightness-110 transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
