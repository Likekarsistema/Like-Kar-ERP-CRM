"use client"

import { useState } from "react"

interface ProductTabsProps {
  description: string
  specifications: Array<{ name: string; value: string }>
  features: string[]
}

export function ProductTabs({ description, specifications, features }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex flex-wrap -mb-px">
          <button
            onClick={() => setActiveTab("description")}
            className={`inline-block py-4 px-6 text-sm font-medium ${
              activeTab === "description"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
          >
            Descrição
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`inline-block py-4 px-6 text-sm font-medium ${
              activeTab === "specifications"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
          >
            Especificações
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`inline-block py-4 px-6 text-sm font-medium ${
              activeTab === "features"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
          >
            Características
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg p-6">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: description }}></div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, index) => (
              <div key={index} className="flex border-b border-gray-100 py-3">
                <div className="w-1/2 font-medium text-gray-700">{spec.name}</div>
                <div className="w-1/2 text-gray-600">{spec.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
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
        )}
      </div>
    </div>
  )
}
