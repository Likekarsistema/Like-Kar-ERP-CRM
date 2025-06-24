"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Phone, Calendar, ArrowRight } from "lucide-react"

export function ServiceCTA() {
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

  return (
    <section ref={sectionRef} className="relative py-20 bg-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transforme seu veículo com a
            <span className="text-yellow-400 relative ml-2">
              excelência Like Kar
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 animate-pulse"></span>
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Nossa equipe de especialistas está pronta para ajudá-lo a escolher os melhores serviços para seu veículo.
            Entre em contato hoje mesmo para uma consulta personalizada.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Link
              href="https://wa.me/551145740701"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 group"
            >
              <Phone className="w-5 h-5" />
              Fale Conosco
              <ArrowRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://wa.me/551145740701?text=Olá! Gostaria de agendar um serviço"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-medium hover:bg-yellow-400/10 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5" />
              Agende um Serviço
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              <span>Segunda a Sábado: 8:30h às 18h</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span>Ao lado do Shopping Maia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
