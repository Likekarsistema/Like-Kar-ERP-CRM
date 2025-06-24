import Link from "next/link"
import {
  Music,
  Shield,
  Monitor,
  Wrench,
  PenToolIcon as Tool,
  Home,
  FileX,
  Lightbulb,
  Speaker,
  Settings,
  CreditCard,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react"

const categories = [
  {
    id: "som",
    name: "Som Automotivo",
    description: "Amplificadores, alto-falantes, subwoofers e instalação profissional",
    icon: Music,
    count: 48,
    color: "bg-blue-500",
  },
  {
    id: "peliculas",
    name: "Insulfilm Profissional",
    description: "Películas de controle solar e segurança com garantia de 5 anos",
    icon: Shield,
    count: 24,
    color: "bg-purple-500",
  },
  {
    id: "multimidia",
    name: "Centrais Multimídia",
    description: "Sistemas completos com GPS, Bluetooth e mais",
    icon: Monitor,
    count: 36,
    color: "bg-red-500",
  },
  {
    id: "engates",
    name: "Instalação de Engates",
    description: "Engates homologados com instalação profissional",
    icon: Tool,
    count: 18,
    color: "bg-green-500",
  },
  {
    id: "alarmes",
    name: "Alarmes e Segurança",
    description: "Sistemas de segurança e rastreamento",
    icon: Shield,
    count: 18,
    color: "bg-orange-500",
  },
  {
    id: "envelopamento",
    name: "Envelopamento",
    description: "Personalização e proteção da pintura original",
    icon: Wrench,
    count: 32,
    color: "bg-indigo-500",
  },
  {
    id: "insulfilm-residencial",
    name: "Insulfilm Residencial",
    description: "Proteção solar e privacidade para residências",
    icon: Home,
    count: 15,
    color: "bg-teal-500",
  },
  {
    id: "ppf",
    name: "PPF - Paint Protection Film",
    description: "Proteção invisível para a pintura do veículo",
    icon: FileX,
    count: 12,
    color: "bg-cyan-500",
  },
  {
    id: "lampadas",
    name: "Revisão de Lâmpadas",
    description: "Substituição e manutenção de sistemas de iluminação",
    icon: Lightbulb,
    count: 20,
    color: "bg-amber-500",
  },
  {
    id: "caixa-som",
    name: "Caixa de Som Personalizada",
    description: "Projetos exclusivos para máxima performance sonora",
    icon: Speaker,
    count: 25,
    color: "bg-pink-500",
  },
  {
    id: "maquina-vidro",
    name: "Conserto de Máquina de Vidro",
    description: "Reparo e substituição de máquinas de vidro elétrico",
    icon: Settings,
    count: 15,
    color: "bg-gray-500",
  },
  {
    id: "insulfilm-premium",
    name: "Insulfilm Premium",
    description: "Película premium com 10 anos de garantia e máxima retenção de calor",
    icon: Shield,
    count: 10,
    color: "bg-violet-600",
  },
  {
    id: "insulfilm-antivandalismo",
    name: "Insulfilm Anti-vandalismo",
    description: "Película de segurança contra quebra de vidros e tentativas de roubo",
    icon: Shield,
    count: 8,
    color: "bg-slate-700",
  },
  {
    id: "sem-parar",
    name: "Loja Sem Parar Autorizada",
    description: "Instalação e ativação oficial do Sem Parar",
    icon: CreditCard,
    count: 10,
    color: "bg-emerald-500",
  },
  {
    id: "seguro-gol",
    name: "Venda de Seguro Gol Plus",
    description: "Proteção veicular completa com assistência 24h",
    icon: ShieldCheck,
    count: 8,
    color: "bg-blue-600",
  },
  {
    id: "seguro-suhai",
    name: "Venda de Seguro Suhai",
    description: "Seguro especializado em roubo e furto com rastreador",
    icon: ShieldAlert,
    count: 8,
    color: "bg-red-600",
  },
]

export function ServiceCategories() {
  return (
    <section id="categorias" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorias de Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore nossa ampla variedade de serviços para seu veículo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/servicos/${category.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="text-sm text-gray-500">{category.count} serviços disponíveis</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
