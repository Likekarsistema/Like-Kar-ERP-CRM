"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, User, ChevronDown, Search } from "lucide-react"
import { signOutAction } from "@/app/auth/actions"

interface CrmHeaderProps {
  user: any
}

export function CrmHeader({ user }: CrmHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário"

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo e título */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-black font-bold text-sm">LK</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-800">Like Kar</h1>
              <p className="text-xs text-gray-500 -mt-1">CRM System</p>
            </div>
          </div>

          {/* Ações mobile */}
          <div className="flex items-center space-x-2">
            {/* Busca mobile */}
            <button className="p-2 text-gray-500 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-all">
              <Search size={20} />
            </button>

            {/* Notificações mobile */}
            <button className="relative p-2 text-gray-500 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* Perfil mobile */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <User size={16} className="text-black" />
                </div>
              </button>

              {/* Menu dropdown mobile */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">{userName}</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                  </div>
                  <a
                    href="/crm/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Meu Perfil
                  </a>
                  <a
                    href="/crm/configuracoes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Configurações
                  </a>
                  <hr className="my-1 border-gray-100" />
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sair
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Busca desktop */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Ações desktop */}
          <div className="flex items-center space-x-4">
            {/* Notificações desktop */}
            <button className="relative p-2 text-gray-500 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* Perfil desktop */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <User size={18} className="text-black" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-32">{userName}</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Menu dropdown desktop */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
                  <a
                    href="/crm/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Meu Perfil
                  </a>
                  <a
                    href="/crm/configuracoes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Configurações
                  </a>
                  <hr className="my-1 border-gray-100" />
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sair
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
