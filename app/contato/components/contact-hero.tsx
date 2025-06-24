"use client"

import { useEffect, useState, useRef } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export function ContactHero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={heroRef} className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      {/* Animated background elements - Alterando para amarelo mais vibrante */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Adicionar mais elementos animados */}
      <div
        className="absolute top-3/4 left-1/2 w-40 h-40 bg-yellow-500 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/3 w-32 h-32 bg-yellow-300 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{ animationDelay: "2.5s" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 z-0"></div>
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          backgroundPosition: "center 30%",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div
            className="inline-flex items-center bg-yellow-400 text-black px-5 py-2 rounded-full mb-8 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <span className="font-medium">Estamos aqui para ajudar</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Entre em{" "}
            <span className="text-yellow-400 inline-block relative">
              Contato
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 animate-pulse"></span>
            </span>
          </h1>

          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            Estamos prontos para atender você e transformar seu veículo com produtos e serviços de alta qualidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "100ms" }}
            >
              <Phone className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Telefone</h3>
              <Link href="tel:+551145740701" className="text-gray-300 hover:text-yellow-400 transition-colors">
                (11) 4574-0701
              </Link>
            </div>

            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "200ms" }}
            >
              <Mail className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">E-mail</h3>
              <Link
                href="mailto:contato@likekar.com.br"
                className="text-gray-300 hover:text-yellow-400 transition-colors text-sm break-all"
              >
                contato@likekar.com.br
              </Link>
            </div>

            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "300ms" }}
            >
              <MapPin className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Endereço</h3>
              <p className="text-gray-300">Av. Bartolomeu de Carlos, 333</p>
            </div>

            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "400ms" }}
            >
              <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Horário</h3>
              <p className="text-gray-300">Seg-Sex: 8:30h às 18h</p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="https://wa.me/551145740701"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Fale Conosco pelo WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
