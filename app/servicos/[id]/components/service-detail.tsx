"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Phone } from "lucide-react"

interface ServiceDetailProps {
  service: any
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative py-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-400/5 -skew-x-12 transform origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              Início
            </Link>
            {" > "}
            <Link href="/servicos" className="hover:text-yellow-500 transition-colors">
              Serviços
            </Link>
            {" > "}
            <span className="text-gray-700">{service.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{service.name}</h1>

              <div
                className="text-gray-700 mb-6 prose prose-lg"
                dangerouslySetInnerHTML={{ __html: service.longDescription }}
              ></div>

              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Serviço Premium</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Disponível
                  </span>
                </div>

                <p className="text-gray-600 mb-6">
                  Agende agora mesmo e transforme seu veículo com a qualidade Like Kar. Estamos localizados ao lado do
                  Shopping Maia para sua conveniência.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`https://wa.me/551145740701?text=Olá! Gostaria de agendar o serviço de ${service.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <Calendar className="w-5 h-5" />
                    Agendar Agora
                  </Link>
                  <Link
                    href={`https://wa.me/551145740701?text=Olá! Gostaria de mais informações sobre o serviço de ${service.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 bg-white px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                  >
                    <Phone className="w-5 h-5" />
                    Solicitar Orçamento
                  </Link>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Agendamento rápido e flexível</span>
                <span className="mx-3">•</span>
                <ArrowRight className="w-4 h-4 mr-2" />
                <span>Atendimento prioritário</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
