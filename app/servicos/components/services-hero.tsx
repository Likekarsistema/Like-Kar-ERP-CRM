"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"

export function ServicesHero() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY
        const heroElement = heroRef.current

        // Parallax effect for background
        heroElement.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Em vez de redirecionar, vamos apenas passar o termo de pesquisa para o componente de serviços
    if (searchTerm.trim()) {
      // Rolagem suave até a seção de serviços em destaque
      const featuredServicesSection = document.getElementById("servicos-destaque")
      if (featuredServicesSection) {
        featuredServicesSection.scrollIntoView({ behavior: "smooth" })
      }

      // Disparar um evento personalizado com o termo de pesquisa
      const searchEvent = new CustomEvent("serviceSearch", {
        detail: { searchTerm: searchTerm.trim() },
      })
      window.dispatchEvent(searchEvent)
    }
  }

  return (
    <div ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Car image with overlay */}
      <div
        className="absolute inset-0 opacity-30 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxury-car-service-min-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Animated badge */}
          <div
            className="inline-flex items-center bg-yellow-400 text-black px-5 py-2 rounded-full mb-8 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <span className="font-medium">Serviços Exclusivos</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Serviços Automotivos{" "}
            <span className="text-yellow-400 inline-block relative">
              Premium
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 animate-pulse"></span>
            </span>
          </h1>

          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            Transforme seu veículo com nossa expertise técnica e atendimento personalizado. Qualidade garantida em cada
            detalhe.
          </p>

          {/* Formulário de pesquisa que filtra os serviços em destaque */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-6 py-2 bg-yellow-400 text-black rounded-full m-1 font-medium hover:bg-yellow-500 transition-all flex items-center"
            >
              Buscar
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#servicos-destaque"
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 group"
            >
              Ver Serviços
              <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://wa.me/551145740701"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-medium hover:bg-yellow-400/10 transition-all transform hover:-translate-y-1"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
