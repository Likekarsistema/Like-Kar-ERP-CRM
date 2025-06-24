"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Grid, List, ArrowUpDown } from "lucide-react"

interface ProductGridProps {
  category: string
}

// Esta função seria substituída por uma busca real ao banco de dados
function getCategoryProducts(category: string) {
  // Produtos para a categoria "som"
  if (category === "som") {
    return [
      {
        id: 2,
        name: "Kit Alto-falantes JBL Club 6520",
        category: "som",
        image: "/placeholder.svg?height=300&width=400",
        price: 699.9,
        rating: 4.7,
        reviews: 98,
        brand: "JBL",
      },
      {
        id: 4,
        name: "Amplificador Taramps TS800x4",
        category: "som",
        image: "/placeholder.svg?height=300&width=400",
        price: 899.9,
        rating: 4.6,
        reviews: 112,
        brand: "Taramps",
      },
      {
        id: 6,
        name: "Subwoofer Bravox Premium Plus P12X-D4",
        category: "som",
        image: "/placeholder.svg?height=300&width=400",
        price: 599.9,
        rating: 4.8,
        reviews: 65,
        brand: "Bravox",
      },
      {
        id: 7,
        name: "Módulo Amplificador Stetsom EX 3000",
        category: "som",
        image: "/placeholder.svg?height=300&width=400",
        price: 1299.9,
        rating: 4.9,
        reviews: 43,
        brand: "Stetsom",
      },
      {
        id: 8,
        name: "Kit Componentes Audiophonic Club KC 6.3",
        category: "som",
        image: "/placeholder.svg?height=300&width=400",
        price: 849.9,
        rating: 4.5,
        reviews: 78,
        brand: "Audiophonic",
      },
      {
        id: 9,
        name: "Tweeter Eros ET-1 120W RMS",
        category: "som",
        image: "/placeholder.svg?height=300&width=400",
        price: 199.9,
        rating: 4.3,
        reviews: 56,
        brand: "Eros",
      },
    ]
  }

  // Produtos para a categoria "multimidia"
  if (category === "multimidia") {
    return [
      {
        id: 1,
        name: "Central Multimídia Pioneer DMH-ZS9280TV",
        category: "multimidia",
        image: "/placeholder.svg?height=300&width=400",
        price: 2499.9,
        rating: 4.8,
        reviews: 124,
        brand: "Pioneer",
      },
      {
        id: 10,
        name: "Central Multimídia Positron SP8830 Link",
        category: "multimidia",
        image: "/placeholder.svg?height=300&width=400",
        price: 1299.9,
        rating: 4.4,
        reviews: 87,
        brand: "Positron",
      },
      {
        id: 11,
        name: "Central Multimídia H-Tech HT-8020",
        category: "multimidia",
        image: "/placeholder.svg?height=300&width=400",
        price: 1099.9,
        rating: 4.2,
        reviews: 65,
        brand: "H-tech",
      },
      {
        id: 12,
        name: "Central Multimídia E-Tech Universal",
        category: "multimidia",
        image: "/placeholder.svg?height=300&width=400",
        price: 899.9,
        rating: 4.0,
        reviews: 42,
        brand: "E-tech",
      },
    ]
  }

  // Produtos para a categoria "peliculas"
  if (category === "peliculas") {
    return [
      {
        id: 3,
        name: "Película Insulfilm Premium G20",
        category: "peliculas",
        image: "/placeholder.svg?height=300&width=400",
        price: 399.9,
        rating: 4.9,
        reviews: 76,
        brand: "Insulfilm",
      },
      {
        id: 13,
        name: "Película Solar 3M FX-ST 05",
        category: "peliculas",
        image: "/placeholder.svg?height=300&width=400",
        price: 599.9,
        rating: 4.7,
        reviews: 54,
        brand: "3M",
      },
      {
        id: 14,
        name: "Película Antivandalismo SunTek 4mil",
        category: "peliculas",
        image: "/placeholder.svg?height=300&width=400",
        price: 799.9,
        rating: 4.8,
        reviews: 32,
        brand: "SunTek",
      },
    ]
  }

  // Produtos para a categoria "alarmes"
  if (category === "alarmes") {
    return [
      {
        id: 5,
        name: "Alarme Automotivo Positron Cyber FX 330",
        category: "alarmes",
        image: "/placeholder.svg?height=300&width=400",
        price: 349.9,
        rating: 4.5,
        reviews: 87,
        brand: "Positron",
      },
      {
        id: 15,
        name: "Alarme Automotivo Taramps TW20 G4",
        category: "alarmes",
        image: "/placeholder.svg?height=300&width=400",
        price: 249.9,
        rating: 4.3,
        reviews: 45,
        brand: "Taramps",
      },
      {
        id: 16,
        name: "Kit Alarme e Bloqueador Stetsom Evolution",
        category: "alarmes",
        image: "/placeholder.svg?height=300&width=400",
        price: 399.9,
        rating: 4.6,
        reviews: 38,
        brand: "Stetsom",
      },
    ]
  }

  // Produtos para a categoria "acessorios"
  return [
    {
      id: 17,
      name: "Kit Tapetes Automotivos Universais",
      category: "acessorios",
      image: "/placeholder.svg?height=300&width=400",
      price: 149.9,
      rating: 4.2,
      reviews: 112,
      brand: "Universal",
    },
    {
      id: 18,
      name: "Suporte Veicular para Smartphone",
      category: "acessorios",
      image: "/placeholder.svg?height=300&width=400",
      price: 89.9,
      rating: 4.4,
      reviews: 98,
      brand: "Tech",
    },
    {
      id: 19,
      name: "Carregador Veicular USB Duplo",
      category: "acessorios",
      image: "/placeholder.svg?height=300&width=400",
      price: 59.9,
      rating: 4.7,
      reviews: 76,
      brand: "Power",
    },
  ]
}

export function ProductGrid({ category }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  const products = getCategoryProducts(category)

  // Ordenar produtos
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    // Default: featured
    return 0
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-gray-600">Mostrando {products.length} produtos</div>

        <div className="flex items-center gap-4">
          {/* View Mode */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-yellow-400 text-black" : "bg-white text-gray-600"}`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-yellow-400 text-black" : "bg-white text-gray-600"}`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Sort By */}
          <div className="relative">
            <div className="flex items-center">
              <ArrowUpDown className="w-4 h-4 text-gray-600 absolute left-3" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white"
              >
                <option value="featured">Destaques</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
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
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <Link key={product.id} href={`/produtos/${product.id}`} className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
