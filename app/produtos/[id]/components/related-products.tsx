import Link from "next/link"
import Image from "next/image"

interface RelatedProductsProps {
  productIds: number[]
}

// Esta função seria substituída por uma busca real ao banco de dados
async function getRelatedProducts(ids: number[]) {
  // Simulando produtos relacionados
  const products = [
    {
      id: 2,
      name: "Kit Alto-falantes JBL Club 6520",
      category: "som",
      image: "/placeholder.svg?height=300&width=400",
      price: 699.9,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Película Insulfilm Premium G20",
      category: "peliculas",
      image: "/placeholder.svg?height=300&width=400",
      price: 399.9,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Amplificador Taramps TS800x4",
      category: "som",
      image: "/placeholder.svg?height=300&width=400",
      price: 899.9,
      rating: 4.6,
    },
  ]

  return products.filter((product) => ids.includes(product.id))
}

export async function RelatedProducts({ productIds }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productIds)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/produtos/${product.id}`} className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="text-sm text-gray-500 mb-1 uppercase">
                  {product.category === "multimidia" && "Central Multimídia"}
                  {product.category === "som" && "Som Automotivo"}
                  {product.category === "peliculas" && "Películas"}
                  {product.category === "alarmes" && "Alarmes e Segurança"}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto">
                  <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all mt-2">
                    Solicitar Orçamento
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
