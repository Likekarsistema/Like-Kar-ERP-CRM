"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

// This would be replaced with a database query in a real application
const getRelatedServices = (serviceIds: string[], currentId: string) => {
  const services: Record<string, any> = {
    multimidia: {
      id: "multimidia",
      name: "Instalação de Central Multimídia",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-S2diK8OO0ybiOSIEwwAigMuxyuwrOK.png",
      description: "Transforme a experiência a bordo do seu veículo com sistemas multimídia de última geração.",
    },
    som: {
      id: "som",
      name: "Instalação de Som Automotivo",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Auxq1FUwx4yBaT956m2P28rxcUNvom.png",
      description: "Sistemas de som personalizados para uma experiência sonora excepcional em seu veículo.",
    },
    peliculas: {
      id: "peliculas",
      name: "Aplicação de Película Automotiva",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-632S0LIoUOSoeSpb06MRmg9SzQA3R2.png",
      description: "Proteção solar, privacidade e segurança com películas de alta qualidade e instalação profissional.",
    },
    envelopamento: {
      id: "envelopamento",
      name: "Envelopamento Automotivo",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-sw8xbd7m4mojLbFX9Iho2cAbjzfYVq.png",
      description: "Transforme o visual do seu veículo com envelopamento de alta qualidade e acabamento impecável.",
    },
    alarmes: {
      id: "alarmes",
      name: "Instalação de Alarmes e Rastreadores",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-PTGmkyxcKms5YZQvZbLYc4TBpBXQvM.png",
      description: "Proteja seu investimento com sistemas de segurança avançados e monitoramento em tempo real.",
    },
    engates: {
      id: "engates",
      name: "Instalação de Engates",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-N1Tmsguh0EV6tv9P4eunogaMsgoFkl.png",
      description: "Instalação profissional de engates para reboque com segurança e qualidade garantidas.",
    },
    "insulfilm-residencial": {
      id: "insulfilm-residencial",
      name: "Insulfilm Residencial",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23-mmzANDk9i4O5Ypz9V8ZUE8r0jyApBR.png",
      description: "Proteção solar, privacidade e conforto térmico para sua casa ou escritório.",
    },
    ppf: {
      id: "ppf",
      name: "Película PPF",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/36-yB9pcNSxRXyQdehYP2JECR5aZkZRo6.png",
      description: "Proteção invisível para a pintura do seu veículo contra riscos, impactos e intempéries.",
    },
    "caixa-som": {
      id: "caixa-som",
      name: "Caixa de Som Personalizada",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30-TggyE2FcsI6psoRXWhCJx98xbvb2kH.png",
      description: "Projetos personalizados de caixas acústicas para máxima performance sonora em seu veículo.",
    },
  }

  return (serviceIds || []).filter((id) => id !== currentId && services[id]).map((id) => services[id])
}

interface ServiceRelatedProps {
  relatedServices: string[]
  currentServiceId: string
}

export function ServiceRelated({ relatedServices, currentServiceId }: ServiceRelatedProps) {
  const services = getRelatedServices(relatedServices, currentServiceId)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!services || services.length === 0) return null

  return (
    <div ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Serviços Relacionados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link href={`/servicos/${service.id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        Ver detalhes
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-500 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="mt-auto">
                      <span className="text-yellow-500 font-medium flex items-center group-hover:text-yellow-600">
                        Saiba mais
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
