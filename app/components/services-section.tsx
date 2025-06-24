"use client"

import { useRef, useEffect, useState } from "react"
import { Car, ArrowRight, Award, MessageSquare, Music, Wrench, Headphones } from "lucide-react"
import { ServiceCard } from "./service-card"
import Image from "next/image"
import Link from "next/link"

export function ServicesSection() {
  const [isImageVisible, setIsImageVisible] = useState(false)
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isChooseVisible, setIsChooseVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const chooseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers = [imageRef, headingRef, chooseRef].map(
      (ref) =>
        new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              switch (ref) {
                case imageRef:
                  setIsImageVisible(true)
                  break
                case headingRef:
                  setIsHeadingVisible(true)
                  break
                case chooseRef:
                  setIsChooseVisible(true)
                  break
              }
            }
          },
          { threshold: 0.1 },
        ),
    )

    observers.forEach((observer, index) => {
      const ref = [imageRef, headingRef, chooseRef][index]
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      {/* Services */}
      <div className="container mx-auto px-4">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-700 ${
            isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Oferecemos uma ampla gama de serviços para deixar seu carro com a sua cara
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <ServiceCard
            Icon={Car}
            title="Películas"
            description="Instalação profissional de películas automotivas com garantia"
            delay={100}
          />
          <ServiceCard
            Icon={Music}
            title="Som Automotivo"
            description="Instalação e manutenção de sistemas de som de alta qualidade"
            delay={200}
          />
          <ServiceCard
            Icon={Wrench}
            title="Acessórios"
            description="Instalação de acessórios para personalizar seu veículo"
            delay={300}
          />
          <ServiceCard
            Icon={Headphones}
            title="Consultoria"
            description="Orientação especializada para melhorar seu veículo"
            delay={400}
          />
        </div>

        {/* Why Choose Us - Redesigned to match the image */}
        <div className="mt-24" ref={chooseRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left side - Image with hover animation */}
            <div
              ref={imageRef}
              className={`relative transition-all duration-700 ${
                isImageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FT%20SITE%20-%20LIKE%20KAR-uOzdE545cLu22dx9a3PeDQav39YyuT.png"
                  alt="Like Kar Store"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Por que escolher a Like Kar?</h2>
                <p className="text-gray-600">Experiência e excelência em cada detalhe do seu veículo</p>
              </div>

              {/* Cards with hover animations */}
              <div className="space-y-4">
                {/* Card 1 */}
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6">
                      <Award className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Experiência Comprovada</h3>
                      <p className="text-gray-600">
                        Mais de 26 anos no mercado automotivo, com milhares de clientes satisfeitos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6">
                      <Car className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Sonhos Realizados</h3>
                      <p className="text-gray-600">
                        Transformamos o sonho do seu carro ideal em realidade com expertise e dedicação.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6">
                      <MessageSquare className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
                      <p className="text-gray-600">
                        Equipe especializada para atender todas as suas necessidades com excelência.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button - More centered */}
              <div className="pt-6 flex justify-center">
                <Link
                  href="/servicos"
                  className="inline-flex items-center bg-yellow-400 text-black px-8 py-4 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-105 group"
                >
                  Conheça Nossos Serviços
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
