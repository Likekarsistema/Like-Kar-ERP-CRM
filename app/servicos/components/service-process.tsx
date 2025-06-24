"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle } from "lucide-react"

const processSteps = [
  {
    number: "01",
    title: "Consulta Inicial",
    description: "Entendemos suas necessidades e objetivos para seu veículo através de uma consulta personalizada.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Avaliação Técnica",
    description:
      "Nossa equipe realiza uma avaliação técnica detalhada do seu veículo para determinar as melhores soluções.",
    icon: "🔧",
  },
  {
    number: "03",
    title: "Orçamento Detalhado",
    description: "Apresentamos um orçamento transparente com todas as opções e recomendações para seu veículo.",
    icon: "📋",
  },
  {
    number: "04",
    title: "Agendamento",
    description: "Marcamos o serviço de acordo com sua disponibilidade, garantindo prazo e qualidade.",
    icon: "📅",
  },
  {
    number: "05",
    title: "Execução do Serviço",
    description: "Nossa equipe especializada realiza o serviço com precisão e atenção aos detalhes.",
    icon: "⚙️",
  },
  {
    number: "06",
    title: "Controle de Qualidade",
    description: "Realizamos testes rigorosos para garantir que tudo funcione perfeitamente antes da entrega.",
    icon: "✅",
  },
]

export function ServiceProcess() {
  const [activeStep, setActiveStep] = useState(0)
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % processSteps.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nosso Processo de Serviço</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conheça como trabalhamos para garantir a excelência em cada etapa do serviço
          </p>
        </div>

        {/* Process timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Progress bar */}
          <div className="relative h-1 bg-gray-800 mb-12 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-500 ease-out"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-black/50 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-500 ${
                  activeStep === index
                    ? "border-yellow-400 transform -translate-y-2 shadow-[0_0_15px_rgba(253,224,71,0.3)]"
                    : "border-gray-800 hover:border-gray-700"
                } ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  cursor: "pointer",
                }}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl transition-colors ${
                      activeStep === index ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-sm text-yellow-400 font-medium mb-1">Passo {step.number}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why choose us section */}
          <div className="mt-16 bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-center">Por que escolher a Like Kar?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-white">Experiência Comprovada</h4>
                  <p className="text-gray-300 text-sm">Mais de 26 anos de experiência no mercado automotivo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-white">Técnicos Especializados</h4>
                  <p className="text-gray-300 text-sm">Equipe treinada e certificada pelos principais fabricantes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-white">Produtos Premium</h4>
                  <p className="text-gray-300 text-sm">Trabalhamos apenas com as melhores marcas do mercado</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-white">Garantia Estendida</h4>
                  <p className="text-gray-300 text-sm">Oferecemos garantia em todos os serviços realizados</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-white">Atendimento Personalizado</h4>
                  <p className="text-gray-300 text-sm">Soluções sob medida para as necessidades do seu veículo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-white">Pós-venda Diferenciado</h4>
                  <p className="text-gray-300 text-sm">Suporte contínuo após a realização do serviço</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
