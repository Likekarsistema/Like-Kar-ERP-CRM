"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

export function TopProducts() {
  const products = [
    { name: "Polo Halógena", sales: 15, trend: "up", change: "+12%" },
    { name: "Farol LED", sales: 12, trend: "up", change: "+8%" },
    { name: "Retrovisor", sales: 8, trend: "down", change: "-3%" },
    { name: "Para-choque", sales: 6, trend: "up", change: "+5%" },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Produtos em Alta</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} vendas</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {product.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${product.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {product.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
