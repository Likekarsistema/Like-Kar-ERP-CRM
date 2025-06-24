"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Clock, Car, Instagram, Facebook, Smartphone } from "lucide-react"
import Link from "next/link"

export function ContactInfo() {
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
    <div
      ref={sectionRef}
      className={`bg-white py-16 rounded-xl transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="text-center mb-16">
        <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
          FALE CONOSCO
        </span>
        <h2 className="text-3xl font-bold mb-4">Informações de Contato</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Estamos à disposição para atender você e tirar todas as suas dúvidas sobre nossos produtos e serviços. Visite
          nossa loja ou entre em contato pelos canais abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-400"
            style={{ transitionDelay: "100ms" }}
          >
            <div className="flex items-start">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Endereço</h3>
                <p className="text-gray-600">
                  Avenida Bartolomeu de Carlos, 333
                  <br />
                  Jardim Flor da Montanha
                  <br />
                  Guarulhos - SP
                  <br />
                  CEP: 07097-420
                </p>
                <div className="mt-3 text-yellow-500 font-medium">
                  ✓ Ao lado do Shopping Maia
                  <br />✓ Em frente ao Carrefour Vila Rio
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-400"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-start">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Horário de Funcionamento</h3>
                <p className="text-gray-600">
                  Segunda a Sexta: 8:30h às 18h
                  <br />
                  Sábado: 8:30h às 14h
                  <br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-400"
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-start">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Telefone</h3>
                <p className="text-gray-600">
                  <Link href="tel:+551145740701" className="hover:text-yellow-500 transition-colors">
                    (11) 4574-0701
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-400"
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex items-start">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">E-mail</h3>
                <p className="text-gray-600">
                  <Link href="mailto:contato@likekar.com.br" className="hover:text-yellow-500 transition-colors">
                    contato@likekar.com.br
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-400"
            style={{ transitionDelay: "500ms" }}
          >
            <div className="flex items-start">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <Smartphone className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Redes Sociais</h3>
                <div className="flex space-x-4 mt-2">
                  <Link
                    href="https://www.instagram.com/likekar_automotive/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-yellow-100 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-gray-700" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/lojaguarulhos/?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-yellow-100 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-gray-700" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-12 bg-yellow-50 p-8 rounded-xl border border-yellow-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex items-center mb-4">
          <Car className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="font-semibold text-lg">Agendamento de Serviços</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Para melhor atendê-lo, recomendamos o agendamento prévio para serviços de instalação e manutenção.
        </p>
        <Link
          href="https://wa.me/551145740701"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all"
        >
          Agende pelo WhatsApp: (11) 4574-0701
        </Link>
      </div>
    </div>
  )
}
