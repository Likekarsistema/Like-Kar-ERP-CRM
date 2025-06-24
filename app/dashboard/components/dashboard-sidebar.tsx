"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, HelpCircle, LogOut, Menu, X } from "lucide-react"
import { logoutAction } from "@/app/login/actions"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleLogout = async () => {
    await logoutAction()
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Produtos", icon: Package, path: "/dashboard/produtos" },
    { name: "Pedidos", icon: ShoppingBag, path: "/dashboard/pedidos" },
    { name: "Clientes", icon: Users, path: "/dashboard/clientes" },
    { name: "Configurações", icon: Settings, path: "/dashboard/configuracoes" },
    { name: "Ajuda", icon: HelpCircle, path: "/dashboard/ajuda" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white w-64 shadow-lg flex-shrink-0 flex flex-col z-40 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "fixed inset-y-0 left-0" : "fixed -left-64 md:left-0 md:relative"}`}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIKE%20KAR%20%281%29-GhqLT1V6Xg5zFPyWk7o4TiKtJyIHdw.png"
              alt="LIKE KAR Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path) ? "bg-yellow-400 text-black font-medium" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
