import type { Metadata } from "next"
import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import { CategoryHero } from "./components/category-hero"
import { ProductFilters } from "./components/product-filters"
import { ProductGrid } from "./components/product-grid"

// Esta função seria substituída por uma busca real ao banco de dados
async function getCategoryInfo(category: string) {
  const categories = {
    som: {
      name: "Som Automotivo",
      description:
        "Encontre os melhores equipamentos de som para o seu veículo. Amplificadores, alto-falantes, subwoofers e mais.",
      image: "/placeholder.svg?height=600&width=1200",
      productCount: 48,
    },
    peliculas: {
      name: "Películas",
      description:
        "Películas de controle solar e segurança para seu veículo. Proteção UV, redução de calor e privacidade.",
      image: "/placeholder.svg?height=600&width=1200",
      productCount: 24,
    },
    multimidia: {
      name: "Centrais Multimídia",
      description: "Centrais multimídia com GPS, Bluetooth, Android Auto, Apple CarPlay e muito mais para seu veículo.",
      image: "/placeholder.svg?height=600&width=1200",
      productCount: 36,
    },
    acessorios: {
      name: "Acessórios",
      description: "Acessórios para personalizar e melhorar seu veículo. Tapetes, capas, suportes e muito mais.",
      image: "/placeholder.svg?height=600&width=1200",
      productCount: 72,
    },
    alarmes: {
      name: "Alarmes e Segurança",
      description: "Sistemas de segurança e rastreamento para seu veículo. Alarmes, bloqueadores, rastreadores e mais.",
      image: "/placeholder.svg?height=600&width=1200",
      productCount: 18,
    },
  }

  return (
    categories[category as keyof typeof categories] || {
      name: "Categoria não encontrada",
      description: "Esta categoria não existe ou foi removida.",
      image: "/placeholder.svg?height=600&width=1200",
      productCount: 0,
    }
  )
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryInfo = await getCategoryInfo(params.category)

  return {
    title: `${categoryInfo.name} | Like Kar`,
    description: categoryInfo.description,
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryInfo = await getCategoryInfo(params.category)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <CategoryHero
          title={categoryInfo.name}
          description={categoryInfo.description}
          image={categoryInfo.image}
          productCount={categoryInfo.productCount}
        />

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <ProductFilters category={params.category} />
            </div>

            {/* Product Grid */}
            <div className="lg:w-3/4">
              <ProductGrid category={params.category} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
