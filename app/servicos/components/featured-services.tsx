"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const featuredServices = [
  {
    id: "multimidia",
    name: "Instalação de Central Multimídia",
    category: "multimidia",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-S2diK8OO0ybiOSIEwwAigMuxyuwrOK.png",
    description: "Transforme a experiência a bordo do seu veículo com sistemas multimídia de última geração.",
  },
  {
    id: "som",
    name: "Instalação de Som Automotivo",
    category: "som",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-BgSLULAr906ZKqbVqYcxiYUd3NMFfG.png",
    description: "Sistemas de som personalizados para uma experiência sonora excepcional em seu veículo.",
  },
  {
    id: "peliculas",
    name: "Insulfilm Profissional",
    category: "peliculas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-632S0LIoUOSoeSpb06MRmg9SzQA3R2.png", // Updated to side view of tinted windows
    description: "Proteção solar, privacidade e segurança com películas de alta qualidade e garantia de 5 anos.",
  },
  {
    id: "envelopamento",
    name: "Envelopamento Automotivo",
    category: "envelopamento",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-sw8xbd7m4mojLbFX9Iho2cAbjzfYVq.png", // Update to use the matte black installation image
    description: "Transforme o visual do seu veículo com envelopamento de alta qualidade e acabamento impecável.",
  },
  {
    id: "alarmes",
    name: "Instalação de Alarmes e Rastreadores",
    category: "alarmes",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-PTGmkyxcKms5YZQvZbLYc4TBpBXQvM.png", // Updated to comprehensive tracking system image
    description: "Proteja seu investimento com sistemas de segurança avançados e monitoramento em tempo real.",
  },
  {
    id: "engates",
    name: "Instalação de Engates",
    category: "engates",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-N1Tmsguh0EV6tv9P4eunogaMsgoFkl.png", // Updated to detailed view of tow hitch
    description: "Instalação profissional de engates para reboque com segurança e qualidade garantidas.",
  },
  {
    id: "insulfilm-residencial",
    name: "Insulfilm Residencial",
    category: "insulfilm-residencial",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23-mmzANDk9i4O5Ypz9V8ZUE8r0jyApBR.png", // Updated to the first new image
    description: "Proteção solar, privacidade e conforto térmico para sua casa ou escritório.",
  },
  {
    id: "ppf",
    name: "Película PPF",
    category: "ppf",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/35-jVaI0xK3Q9YKBpIW6qf2xYQVWVtuPK.png", // Updated to new PPF installation image
    description: "Proteção invisível para a pintura do seu veículo contra riscos, impactos e intempéries.",
  },
  {
    id: "lampadas",
    name: "Revisão de Lâmpadas",
    category: "lampadas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27-VxGhqeoV601PBb4l2AxeZsubje1XjT.png", // Updated to the main headlight maintenance image
    description: "Manutenção e substituição de lâmpadas automotivas para maior segurança e visibilidade.",
  },
  {
    id: "caixa-som",
    name: "Caixa de Som Personalizada",
    category: "caixa-som",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30-TggyE2FcsI6psoRXWhCJx98xbvb2kH.png", // Updated to the Orion tri-speaker box image
    description: "Projetos personalizados de caixas acústicas para máxima performance sonora em seu veículo.",
  },
  {
    id: "maquina-vidro",
    name: "Conserto de Máquina de Vidro",
    category: "maquina-vidro",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-NR6Aqt7AxFGhzqssnZZvfmLOjN76C2.png",
    description: "Reparo e substituição de máquinas de vidro elétrico com garantia de qualidade.",
  },
  {
    id: "insulfilm-premium",
    name: "Insulfilm Premium",
    category: "insulfilm-premium",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-WzVXYPhpu0GTqkYDeabJkEjbzX9jva.png", // Updated to new main image
    description:
      "Película de alta performance com visibilidade clara por dentro, escura por fora e máxima retenção de calor.",
  },
  {
    id: "insulfilm-antivandalismo",
    name: "Insulfilm Anti-vandalismo",
    category: "insulfilm-antivandalismo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20-YiZs8g4bO0PChQ0YuVwvTL9kvf15M9.png", // Updated to the main anti-vandalism image
    description: "Película de segurança que protege contra quebra de vidros, tentativas de roubo e estilhaçamento.",
  },
  {
    id: "sem-parar",
    name: "Loja Sem Parar Autorizada",
    category: "sem-parar",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/31-Kd1ev7UegmaxESWY3Xh2w8RJpgKSfQ.png", // Updated to new Sem Parar gift card image
    description: "Instalação e ativação oficial do Sem Parar para pagamento automático em pedágios e estacionamentos.",
  },
]

export function FeaturedServices() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [searchFilter, setSearchFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [visibleItems, currentPage])

  useEffect(() => {
    // Reset visible items when changing page
    setVisibleItems([])
    // Reset refs array
    itemRefs.current = []
  }, [currentPage])

  useEffect(() => {
    // Função para lidar com o evento de pesquisa
    const handleSearchEvent = (event: CustomEvent) => {
      setSearchFilter(event.detail.searchTerm.toLowerCase())
      // Reset to first page when searching
      setCurrentPage(1)
    }

    // Adicionar o listener de evento
    window.addEventListener("serviceSearch", handleSearchEvent as EventListener)

    // Limpar o listener quando o componente for desmontado
    return () => {
      window.removeEventListener("serviceSearch", handleSearchEvent as EventListener)
    }
  }, [])

  const filteredServices = searchFilter
    ? featuredServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchFilter) ||
          service.description.toLowerCase().includes(searchFilter) ||
          service.category.toLowerCase().includes(searchFilter),
      )
    : featuredServices

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      document.getElementById("servicos-destaque")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      document.getElementById("servicos-destaque")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="servicos-destaque" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Serviços em Destaque</h2>
            <p className="text-gray-600">Conheça nossos serviços mais populares</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">Nenhum serviço encontrado para "{searchFilter}"</p>
              <button
                onClick={() => {
                  setSearchFilter("")
                  setCurrentPage(1)
                }}
                className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition-all"
              >
                Ver todos os serviços
              </button>
            </div>
          ) : (
            paginatedServices.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`group transition-all duration-700 transform ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Vamos verificar se os links para os serviços estão sendo gerados corretamente
                Certifique-se de que os IDs nos links correspondam aos IDs definidos na função getServiceData */}

                {/* Verifique o componente Link dentro do mapeamento de serviços: */}
                <Link
                  href={`https://wa.me/551145740701?text=Olá! Gostaria de saber mais sobre o serviço de ${service.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full flex flex-col border border-gray-200 hover:border-yellow-400/30">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute bottom-4 left-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                          Solicitar via WhatsApp
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-500 transition-colors text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="mt-auto">
                        <span className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium group-hover:bg-yellow-500 transition-all flex items-center justify-center">
                          Solicitar Orçamento
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {filteredServices.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1)
                    document.getElementById("servicos-destaque")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === i + 1
                      ? "bg-yellow-400 text-black font-bold"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
