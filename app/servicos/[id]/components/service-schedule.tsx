"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Info, Phone } from "lucide-react"

interface ScheduleInfo {
  availability: string
  duration: string
  location: string
  preparation: string
}

interface ServiceScheduleProps {
  schedule: ScheduleInfo
}

export function ServiceSchedule({ schedule }: ServiceScheduleProps) {
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

  if (!schedule) return null

  return (
    <div ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Agende seu Serviço</h2>

        <div
          className={`max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-8 bg-yellow-400">
            <h3 className="text-2xl font-bold text-black">Informações de Agendamento</h3>
            <p className="text-black/80">Agende seu serviço de forma rápida e conveniente</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Horário de Atendimento</h4>
                    <p className="text-gray-600">{schedule.availability}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Duração do Serviço</h4>
                    <p className="text-gray-600">{schedule.duration}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Localização</h4>
                    <p className="text-gray-600">{schedule.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Info className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Informações Adicionais</h4>
                    <p className="text-gray-600">{schedule.preparation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-1">Pronto para agendar?</h4>
                  <p className="text-gray-600">Entre em contato agora mesmo e garanta seu horário</p>
                </div>

                <Link
                  href="https://wa.me/551145740701?text=Olá! Gostaria de agendar um serviço"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5" />
                  Agendar pelo WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
