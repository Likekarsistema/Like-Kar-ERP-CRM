import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Instalação de Som Automotivo",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Nossa equipe de especialistas em áudio oferece um serviço de instalação premium para sistemas de som automotivo. Utilizamos técnicas avançadas para garantir a integração perfeita dos componentes, preservando a estética original do veículo enquanto maximizamos a qualidade sonora. Cada instalação inclui isolamento acústico profissional, cabeamento de alta qualidade e calibração personalizada para o ambiente específico do seu carro. Nossos técnicos certificados têm experiência com todas as principais marcas e modelos, garantindo resultados excepcionais independentemente do seu veículo.",
    benefits: [
      "Instalação profissional por técnicos certificados",
      "Isolamento acústico premium para qualidade sonora superior",
      "Cabeamento de alta qualidade com proteção contra interferências",
      "Calibração personalizada para o ambiente do seu veículo",
      "Garantia estendida em todos os serviços de instalação",
    ],
  },
  {
    id: 2,
    name: "Aplicação de Películas",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Nosso serviço de aplicação de películas automotivas é realizado por técnicos altamente especializados, garantindo um resultado impecável e duradouro. Utilizamos tecnologia de corte computadorizado para assegurar o encaixe perfeito em cada vidro do seu veículo, sem falhas ou imperfeições. O processo de aplicação ocorre em ambiente controlado, livre de poeira e contaminantes, resultando em um acabamento cristalino sem bolhas ou imperfeições. Oferecemos garantia contra descolamento, bolhas e descoloração, assegurando anos de proteção e conforto para seu veículo.",
    benefits: [
      "Aplicação em ambiente controlado livre de poeira",
      "Corte computadorizado para encaixe perfeito",
      "Técnica avançada que elimina bolhas e imperfeições",
      "Acabamento profissional nas bordas e detalhes",
      "Garantia contra descolamento e descoloração",
    ],
  },
  {
    id: 3,
    name: "Instalação de Multimídia",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Transforme a experiência de entretenimento do seu veículo com nosso serviço especializado de instalação de sistemas multimídia. Nossos técnicos são treinados para integrar perfeitamente centrais multimídia, telas, câmeras e sensores ao sistema original do seu carro, preservando todas as funcionalidades de fábrica. Realizamos adaptações personalizadas quando necessário, garantindo um acabamento que parece ter saído diretamente da montadora. O serviço inclui programação completa, testes extensivos e uma sessão detalhada de orientação para que você aproveite ao máximo todos os recursos do seu novo sistema.",
    benefits: [
      "Integração perfeita com sistemas originais do veículo",
      "Adaptações personalizadas para acabamento de fábrica",
      "Programação completa de todas as funcionalidades",
      "Instalação de câmeras e sensores complementares",
      "Treinamento detalhado para utilização do sistema",
    ],
  },
  {
    id: 4,
    name: "Instalação de Alarmes e Rastreadores",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Proteja seu investimento com nosso serviço premium de instalação de sistemas de segurança automotiva. Nossos técnicos especializados realizam a instalação de alarmes, rastreadores GPS e bloqueadores com técnicas avançadas que garantem funcionamento perfeito sem interferir nos sistemas eletrônicos originais do veículo. Utilizamos pontos estratégicos para posicionamento de sensores e módulos, tornando o sistema altamente eficaz e ao mesmo tempo discreto. Cada instalação inclui programação personalizada, testes abrangentes e orientação completa sobre todas as funcionalidades de segurança.",
    benefits: [
      "Instalação discreta que preserva a estética original",
      "Integração com sistemas eletrônicos sem interferências",
      "Posicionamento estratégico de sensores para máxima eficácia",
      "Programação personalizada conforme suas necessidades",
      "Suporte técnico prioritário pós-instalação",
    ],
  },
  {
    id: 5,
    name: "Personalização de Interiores",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Eleve o conforto e a estética do interior do seu veículo com nosso serviço exclusivo de personalização. Nossa equipe especializada transforma o ambiente interno do seu carro com revestimentos premium, iluminação ambiente personalizada, sistemas de entretenimento integrados e muito mais. Trabalhamos com materiais de alta qualidade, incluindo couro natural, alcântara, fibra de carbono e madeiras nobres. Cada projeto é desenvolvido considerando seu estilo pessoal e as características específicas do seu veículo, resultando em um interior verdadeiramente único e sofisticado.",
    benefits: [
      "Design personalizado conforme seu estilo e preferências",
      "Materiais premium com acabamento impecável",
      "Iluminação ambiente customizada com controle de cores",
      "Integração harmoniosa de tecnologia e conforto",
      "Valorização significativa do seu veículo",
    ],
  },
  {
    id: 6,
    name: "Consultoria Técnica Especializada",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Nosso serviço de consultoria técnica oferece orientação especializada para ajudá-lo a tomar as melhores decisões na personalização do seu veículo. Nossos consultores avaliam detalhadamente seu carro e suas necessidades, desenvolvendo um projeto personalizado que otimiza performance, conforto e estética. Apresentamos simulações visuais e demonstrações práticas das soluções recomendadas, permitindo que você visualize o resultado final antes de qualquer implementação. Este serviço é ideal para quem busca uma abordagem planejada e coerente para transformar seu veículo.",
    benefits: [
      "Avaliação técnica detalhada do seu veículo",
      "Projeto personalizado baseado em suas necessidades",
      "Simulações visuais das modificações propostas",
      "Recomendações de produtos e serviços compatíveis",
      "Planejamento de implementação em fases, se desejado",
    ],
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Oferecemos serviços especializados realizados por profissionais altamente qualificados, garantindo
            excelência em cada detalhe da transformação do seu veículo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full flex flex-col"
            >
              {/* Service Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Service Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                <div className="mt-auto">
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">Serviço Premium</span>
                  </div>

                  <Link
                    href={`/servicos/${service.id}`}
                    className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-600 transition-colors group"
                  >
                    Ver detalhes completos
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
