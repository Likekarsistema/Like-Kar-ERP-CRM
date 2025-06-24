"use client"

import { useState } from "react"
import Link from "next/link"
import { Share2, Check, Truck, Shield, Phone } from "lucide-react"

interface ProductInfoProps {
  product: any // Tipagem simplificada para o exemplo
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/produtos" className="hover:text-yellow-500 transition-colors">
          Produtos
        </Link>
        {" > "}
        <Link href={`/produtos/categoria/${product.category}`} className="hover:text-yellow-500 transition-colors">
          {product.category === "multimidia" && "Centrais Multimídia"}
          {product.category === "som" && "Som Automotivo"}
          {product.category === "peliculas" && "Películas"}
          {product.category === "alarmes" && "Alarmes e Segurança"}
        </Link>
        {" > "}
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Product Title */}
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

      {/* Brand */}
      <div className="mb-4">
        <span className="text-gray-600">Marca: </span>
        <Link href={`/produtos/marca/${product.brand.toLowerCase()}`} className="text-yellow-500 hover:underline">
          {product.brand}
        </Link>
      </div>

      {/* Short Description */}
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* Stock */}
      <div className="flex items-center mb-6">
        <Check className="w-5 h-5 text-green-500 mr-2" />
        <span className="text-green-600">
          {product.stock > 0 ? `Em estoque - ${product.stock} unidades disponíveis` : "Produto indisponível"}
        </span>
      </div>

      {/* Request Quote Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          Solicitar Orçamento
        </button>
        <button className="sm:w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all">
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Shipping & Warranty */}
      <div className="space-y-4 border-t border-gray-200 pt-6">
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800">Entrega e Instalação</h4>
            <p className="text-gray-600 text-sm">
              Entrega gratuita para compras acima de R$ 500,00. Instalação disponível mediante agendamento.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800">Garantia</h4>
            <p className="text-gray-600 text-sm">1 ano de garantia do fabricante + 3 meses de garantia da Like Kar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
