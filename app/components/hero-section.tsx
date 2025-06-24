"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronRight, Star } from "lucide-react"

export function HeroSection() {
  const elementsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Animação de entrada dos elementos
    elementsRef.current.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("opacity-100")
          el.classList.remove("translate-y-10")
        }, 100 * index)
      }
    })
  }, [])

  return (
    <div className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        {/* Premium Products Badge */}
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="inline-flex items-center bg-yellow-100 text-black px-5 py-2 rounded-full mb-8 opacity-0 translate-y-10 transition-all duration-700"
        >
          <Star className="w-4 h-4 text-yellow-500 mr-2" />
          <span className="font-medium">Serviços Premium para seu Carro</span>
        </div>

        {/* Main Heading - Otimizado para SEO com H1 */}
        <h1
          ref={(el) => (elementsRef.current[1] = el)}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight opacity-0 translate-y-10 transition-all duration-700 font-heading"
        >
          Tudo para seu carro em <span className="text-yellow-400 block md:inline">um só lugar</span>
        </h1>

        {/* Subtext - Otimizado para SEO com palavras-chave relevantes e locais */}
        <p
          ref={(el) => (elementsRef.current[2] = el)}
          className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg opacity-0 translate-y-10 transition-all duration-700"
        >
          A melhor loja de som e acessórios automotivos de Guarulhos, próxima ao Shopping Maia.
          <br />
          Há mais de 26 anos oferecendo som, películas e acessórios de alta qualidade.
        </p>

        {/* Call to Action Buttons */}
        <div
          ref={(el) => (elementsRef.current[3] = el)}
          className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 translate-y-10 transition-all duration-700"
        >
          <Link
            href="/servicos"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center relative z-10 min-h-[3rem]"
          >
            Ver Serviços <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="https://wa.me/551145740701"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 text-black px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
          >
            Fale Conosco
          </Link>
        </div>
      </div>
    </div>
  )
}
