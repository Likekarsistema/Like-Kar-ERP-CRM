"use client"

import { useState } from "react"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

interface ProductFiltersProps {
  category: string
}

export function ProductFilters({ category }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    categories: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Marcas específicas para cada categoria
  const getBrands = () => {
    switch (category) {
      case "som":
        return ["JBL", "Pioneer", "Bravox", "Taramps", "Stetsom", "Eros", "Audiophonic"]
      case "peliculas":
        return ["3M", "SunTek", "Llumar", "InsulFilm", "SolarGard"]
      case "multimidia":
        return ["Pioneer", "JBL", "Positron", "H-tech", "E-tech", "Uninca"]
      case "alarmes":
        return ["Positron", "Taramps", "Stetsom", "Pósitron", "Quantum"]
      default:
        return ["JBL", "Pioneer", "Positron", "Taramps"]
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Filtros</h2>
        <Filter className="w-5 h-5 text-gray-600" />
      </div>

      {/* Brands Filter */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-4"
          onClick={() => toggleSection("brands")}
        >
          <span>Marcas</span>
          {expandedSections.brands ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {expandedSections.brands && (
          <div className="space-y-2">
            {getBrands().map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Categories Filter */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium mb-4"
          onClick={() => toggleSection("categories")}
        >
          <span>Categorias de Produtos</span>
          {expandedSections.categories ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cat-som"
                className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
              />
              <label htmlFor="cat-som" className="ml-2 text-gray-700">
                Som Automotivo
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cat-peliculas"
                className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
              />
              <label htmlFor="cat-peliculas" className="ml-2 text-gray-700">
                Películas
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cat-multimidia"
                className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
              />
              <label htmlFor="cat-multimidia" className="ml-2 text-gray-700">
                Centrais Multimídia
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cat-acessorios"
                className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
              />
              <label htmlFor="cat-acessorios" className="ml-2 text-gray-700">
                Acessórios
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cat-alarmes"
                className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
              />
              <label htmlFor="cat-alarmes" className="ml-2 text-gray-700">
                Alarmes e Segurança
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
        Aplicar Filtros
      </button>
    </div>
  )
}
