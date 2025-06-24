"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const partnerCompanies = [
  {
    id: 1,
    name: "Ituran",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EMPRESAS%20PARCEIRAS-bfn2PDVKQaC52bXKyMqvALs9wb2jv4.png",
    description:
      "Tecnologia de rastreamento e monitoramento veicular com cobertura nacional, oferecendo segurança e tranquilidade para nossos clientes.",
    benefits: ["Rastreamento 24h", "Monitoramento em tempo real", "Cobertura nacional", "Atendimento especializado"],
    link: "#",
  },
  {
    id: 2,
    name: "Sem Parar",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-hJh5N79o0qcsh34VwNt3HD8eUQEqao.png",
    description:
      "Soluções de pagamento automático para pedágios, estacionamentos e combustível, proporcionando praticidade no seu dia a dia.",
    benefits: ["Pagamento automático", "Aceito em todo Brasil", "Sem filas em pedágios", "Gestão de gastos"],
    link: "#",
  },
  {
    id: 3,
    name: "GOL Plus",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19-Ip8bIliNLGYebPCEOe22wKaFPhjSmh.png",
    description:
      "Proteção veicular completa com assistência 24h, garantindo a segurança do seu veículo com o melhor custo-benefício.",
    benefits: ["Proteção completa", "Assistência 24h", "Cobertura nacional", "Atendimento premium"],
    link: "#",
  },
]

export function PartnerCompaniesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Empresas Conveniadas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Parcerias estratégicas para oferecer os melhores serviços e benefícios aos nossos clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group"
              onMouseEnter={() => setActiveCard(company.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Logo Section */}
              <div className="p-8 border-b border-gray-100">
                <div className="relative h-32 w-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">{company.name}</h3>
                <p className="text-gray-600 mb-6">{company.description}</p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {company.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-center transition-all duration-300 ${
                        activeCard === company.id ? "translate-x-2" : ""
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={company.link}
                  className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-600 transition-colors group/link"
                >
                  Saiba mais
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Interessado em conhecer mais sobre nossos convênios e parcerias?</p>
          <a
            href="/contato"
            className="inline-flex items-center bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  )
}
