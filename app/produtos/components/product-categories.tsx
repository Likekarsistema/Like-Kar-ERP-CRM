import Link from "next/link"
import { Speaker, Shield, Monitor, Car, Headphones } from "lucide-react"

const categories = [
  {
    id: "som",
    name: "Som Automotivo",
    description: "Amplificadores, alto-falantes, subwoofers e mais",
    icon: Speaker,
    count: 48,
    color: "bg-blue-500",
  },
  {
    id: "peliculas",
    name: "Películas",
    description: "Películas de controle solar e segurança",
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
    id: "acessorios",
    name: "Acessórios",
    description: "Acessórios para personalizar seu veículo",
    icon: Car,
    count: 72,
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
    id: "audio",
    name: "Áudio Premium",
    description: "Soluções de áudio de alta qualidade",
    icon: Headphones,
    count: 32,
    color: "bg-indigo-500",
  },
]

export function ProductCategories() {
  return (
    <section id="categorias" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorias de Produtos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa ampla variedade de produtos e serviços para seu veículo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/produtos/categoria/${category.id}`}
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
                    <div className="text-sm text-gray-500">{category.count} produtos</div>
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
