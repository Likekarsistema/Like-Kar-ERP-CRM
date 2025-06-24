"use client"

import { useState, useEffect } from "react"
import { Bell, Search } from "lucide-react"

export function DashboardHeader() {
  const [user, setUser] = useState({ name: "", email: "" })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("likekar_auth")
    if (auth) {
      try {
        const authData = JSON.parse(auth)
        if (authData.user) {
          setUser(authData.user)
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário", error)
      }
    }
  }, [])

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Search */}
        <div className="relative w-64 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-sm"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center text-black font-medium">
                {user.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="text-gray-700 font-medium hidden md:block">{user.name || "Administrador"}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Perfil
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Configurações
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    localStorage.removeItem("likekar_auth")
                    window.location.href = "/login"
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
