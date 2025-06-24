"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const popularServices = [
  {
    id: 1,
    name: "Insulfilm",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tipos-de-insulfilm-min-DD87OYPKVKGptQLk7T76oyzWyc6lPg.png",
    description:
      "Proteção solar e privacidade para seu veículo com as melhores películas do mercado, instaladas por profissionais certificados.",
    benefits: [
      "Redução de até 95% do calor",
      "Proteção contra raios UV",
      "Maior privacidade",
      "Instalação profissional garantida",
    ],
    link: "/servicos/peliculas",
  },
  {
    id: 2,
    name: "Envelopamento",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-mugpDy393WpT6qaMKAXm8h5F3umNkZ.png",
    description:
      "Transforme o visual do seu veículo com envelopamento de alta qualidade, oferecendo proteção à pintura original e estilo personalizado.",
    benefits: ["Proteção da pintura original", "Personalização completa", "Fácil manutenção", "Remoção sem danos"],
    link: "/servicos/envelopamento",
  },
  {
    id: 3,
    name: "Multimídia",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/71iKx2TtzTL._AC_UF1000%2C1000_QL80-26PIAIps1POZOoSQAOTyWo9AkemGlL.png",
    description:
      "Sistemas multimídia de última geração para transformar a experiência a bordo do seu veículo com tecnologia e conectividade.",
    benefits: [
      "Compatível com Android Auto e Apple CarPlay",
      "Telas de alta resolução",
      "Conectividade Bluetooth",
      "Instalação profissional",
    ],
    link: "/servicos/multimidia",
  },
]

export function PopularServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Serviços mais procurados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça os serviços mais solicitados pelos nossos clientes, realizados com excelência e garantia de
            qualidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col group"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-center transition-all duration-300 ${
                        hoveredService === service.id ? "translate-x-2" : ""
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Link
                    href={`https://wa.me/551145740701?text=Olá! Gostaria de saber mais sobre o serviço de ${service.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all w-full justify-center group/btn"
                  >
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/servicos"
            className="inline-flex items-center border border-yellow-400 text-yellow-500 hover:bg-yellow-50 px-8 py-3 rounded-full font-medium transition-all"
          >
            Ver todos os serviços
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
