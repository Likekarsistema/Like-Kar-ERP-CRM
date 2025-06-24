import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Centrais Multimídia",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Transforme a experiência de dirigir com nossas centrais multimídia de última geração. Equipadas com telas de alta resolução, conectividade Bluetooth, compatibilidade com Android Auto e Apple CarPlay, e sistemas de navegação GPS integrados. Desfrute de entretenimento premium, chamadas hands-free e navegação intuitiva, tudo isso enquanto mantém os olhos na estrada. Nossas centrais são projetadas para instalação perfeita em seu veículo, com suporte técnico especializado e garantia estendida.",
    features: [
      "Telas touchscreen de alta resolução",
      "Conectividade Bluetooth avançada",
      "Compatível com Android Auto e Apple CarPlay",
      "Navegação GPS integrada",
      "Instalação profissional incluída",
    ],
  },
  {
    id: 2,
    name: "Sistemas de Som Automotivo",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Experimente qualidade sonora excepcional em seu veículo com nossos sistemas de som premium. Desde alto-falantes de alta fidelidade até subwoofers potentes e amplificadores de precisão, oferecemos componentes que transformam seu carro em uma sala de concertos. Nossos especialistas em áudio projetam sistemas personalizados que se integram perfeitamente ao interior do seu veículo, preservando espaço e estética enquanto maximizam a qualidade sonora. Cada instalação é calibrada profissionalmente para garantir o equilíbrio perfeito de graves, médios e agudos.",
    features: [
      "Alto-falantes de alta fidelidade",
      "Subwoofers potentes e precisos",
      "Amplificadores de última geração",
      "Instalação personalizada e discreta",
      "Calibração profissional de áudio",
    ],
  },
  {
    id: 3,
    name: "Películas Automotivas",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Proteja o interior do seu veículo e aumente seu conforto com nossas películas automotivas premium. Desenvolvidas com tecnologia avançada, nossas películas bloqueiam até 99% dos raios UV prejudiciais, reduzem significativamente o calor interno e proporcionam privacidade sem comprometer a visibilidade. Disponíveis em diversos níveis de transparência e acabamentos, incluindo opções que não interferem com sinais eletrônicos. A aplicação é realizada por técnicos certificados, garantindo um resultado impecável, sem bolhas ou imperfeições, e com garantia contra descoloração.",
    features: [
      "Bloqueio de até 99% dos raios UV",
      "Redução significativa de calor",
      "Privacidade com visibilidade preservada",
      "Múltiplas opções de tonalidade",
      "Aplicação profissional garantida",
    ],
  },
  {
    id: 4,
    name: "Alarmes e Sistemas de Segurança",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Proteja seu investimento com nossos sistemas de segurança automotiva de última geração. Oferecemos alarmes inteligentes com sensores avançados, sistemas de rastreamento GPS em tempo real e bloqueadores eletrônicos que impedem o funcionamento não autorizado do veículo. Nossas soluções de segurança podem ser controladas remotamente via smartphone, permitindo monitoramento constante e alertas instantâneos. A instalação é realizada por técnicos especializados que garantem a integração perfeita com os sistemas eletrônicos do seu veículo, sem interferir em sua garantia original.",
    features: [
      "Sensores de movimento avançados",
      "Rastreamento GPS em tempo real",
      "Controle via smartphone",
      "Bloqueadores eletrônicos",
      "Instalação discreta e profissional",
    ],
  },
  {
    id: 5,
    name: "Acessórios Premium",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Eleve o conforto, funcionalidade e estilo do seu veículo com nossa linha exclusiva de acessórios premium. Desde tapetes personalizados de alta durabilidade até sistemas de iluminação LED ambiente, oferecemos produtos que combinam perfeitamente com o interior do seu carro. Nossos acessórios são selecionados de fabricantes renomados, garantindo qualidade superior e durabilidade excepcional. Cada item é instalado com precisão por nossa equipe especializada, assegurando um acabamento perfeito que parece ter saído diretamente da fábrica.",
    features: [
      "Materiais de alta qualidade",
      "Design exclusivo e personalizado",
      "Compatibilidade perfeita com seu veículo",
      "Instalação profissional incluída",
      "Garantia estendida em todos os produtos",
    ],
  },
  {
    id: 6,
    name: "Iluminação Automotiva",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Transforme a aparência e segurança do seu veículo com nossa linha premium de iluminação automotiva. Oferecemos desde faróis de LED de alta performance até kits de iluminação ambiente personalizáveis para o interior. Nossas soluções de iluminação não apenas melhoram a estética do seu veículo, mas também aumentam significativamente a visibilidade noturna e a segurança. Todos os produtos são instalados por técnicos especializados que garantem o alinhamento perfeito e a compatibilidade elétrica, preservando a integridade do sistema original do veículo.",
    features: [
      "Faróis LED de alta performance",
      "Iluminação ambiente personalizável",
      "Maior visibilidade e segurança",
      "Instalação profissional com garantia",
      "Compatível com sistemas originais",
    ],
  },
]

export function ProductsSection() {
  return (
    <section id="produtos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nossos Produtos</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Oferecemos uma linha completa de produtos premium para transformar seu veículo, combinando tecnologia
            avançada, qualidade superior e design elegante.
          </p>
        </div>

        <div className="space-y-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              {/* Product Image */}
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Description */}
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>

                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-3">Características Principais:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/produtos/${product.id}`}
                    className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-600 transition-colors group"
                  >
                    Saiba mais
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
