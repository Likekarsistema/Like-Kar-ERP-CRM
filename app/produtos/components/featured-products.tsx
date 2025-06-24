import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Central Multimídia Pioneer DMH-ZS9280TV",
    category: "multimidia",
    image: "/placeholder.svg?height=300&width=400",
    price: 2499.9,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Kit Alto-falantes JBL Club 6520",
    category: "som",
    image: "/placeholder.svg?height=300&width=400",
    price: 699.9,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 3,
    name: "Película Insulfilm Premium G20",
    category: "peliculas",
    image: "/placeholder.svg?height=300&width=400",
    price: 399.9,
    rating: 4.9,
    reviews: 76,
  },
  {
    id: 4,
    name: "Amplificador Taramps TS800x4",
    category: "som",
    image: "/placeholder.svg?height=300&width=400",
    price: 899.9,
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 5,
    name: "Alarme Automotivo Positron Cyber FX 330",
    category: "alarmes",
    image: "/placeholder.svg?height=300&width=400",
    price: 349.9,
    rating: 4.5,
    reviews: 87,
  },
  {
    id: 6,
    name: "Subwoofer Bravox Premium Plus P12X-D4",
    category: "som",
    image: "/placeholder.svg?height=300&width=400",
    price: 599.9,
    rating: 4.8,
    reviews: 65,
  },
]

export function FeaturedProducts() {
  return (
    <section id="produtos-destaque" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-gray-600">Conheça nossos produtos mais populares e bem avaliados</p>
          </div>
          <Link
            href="/produtos/todos"
            className="hidden md:flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Ver todos os produtos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/produtos/${product.id}`} className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                    Destaque
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-gray-500 mb-2 uppercase">
                    {product.category === "multimidia" && "Central Multimídia"}
                    {product.category === "som" && "Som Automotivo"}
                    {product.category === "peliculas" && "Películas"}
                    {product.category === "alarmes" && "Alarmes e Segurança"}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
                        Solicitar Orçamento
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/produtos/todos"
            className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
          >
            Ver todos os produtos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
