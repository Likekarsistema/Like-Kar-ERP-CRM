"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Briefcase, Users, Award, ArrowRight } from "lucide-react"

export function JoinOurTeam() {
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
    <section ref={sectionRef} className="py-20 bg-black text-white relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tem vontade de se juntar à
            <span className="text-yellow-400 relative ml-2">
              nossa equipe?
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 animate-pulse"></span>
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Estamos sempre em busca de talentos apaixonados por carros e atendimento de qualidade. Faça parte do time
            Like Kar e cresça conosco!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "100ms" }}
            >
              <Briefcase className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Oportunidades</h3>
              <p className="text-gray-300">Vagas para técnicos, vendedores e administrativo com plano de carreira.</p>
            </div>

            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "200ms" }}
            >
              <Users className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Ambiente</h3>
              <p className="text-gray-300">
                Equipe unida e colaborativa com foco em resultados e satisfação do cliente.
              </p>
            </div>

            <div
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:bg-black/40"
              style={{ transitionDelay: "300ms" }}
            >
              <Award className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Benefícios</h3>
              <p className="text-gray-300">Treinamentos, comissões e ambiente de trabalho estimulante.</p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="https://wa.me/551145740701?text=Olá! Gostaria de enviar meu currículo para trabalhar na Like Kar."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-full font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 group"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar Currículo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
