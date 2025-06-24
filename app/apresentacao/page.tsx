"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ApresentacaoPage() {
  const [mounted, setMounted] = useState(false)
  const [activeButton, setActiveButton] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)

    // Efeito de animação sequencial nos botões
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveButton((prev) => {
          if (prev === null) return 0
          if (prev >= 3) return null
          return prev + 1
        })
      }, 300)

      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 animate-shine"></div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20-%20LIKE%20KAR-1SdhKPxuiz8yuIvjatA8CjAik7jO9R.png"
            alt="Like Kar Logo"
            width={80}
            height={80}
            className="object-contain z-10 drop-shadow-lg"
          />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-black mb-2 relative">
          <span className="animate-text-gradient bg-gradient-to-r from-yellow-500 via-black to-yellow-500 bg-clip-text text-transparent bg-[length:200%_auto]">
            LIKE KAR
          </span>
        </h1>

        <p className="text-gray-700 mb-10 text-center">Tudo para seu carro em um só lugar</p>

        {/* Botões com animações */}
        <div className="w-full space-y-5 mb-10">
          {[
            { text: "NOSSO SITE", href: "/" },
            { text: "NOSSOS SERVIÇOS", href: "/servicos", bgClass: "bg-[#1c2331]" },
            { text: "FAÇA SEU AGENDAMENTO", href: "/contato" },
            { text: "NOSSO ENDEREÇO", href: "https://maps.google.com" },
          ].map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`group relative flex items-center justify-center py-4 px-6 rounded-full w-full transition-all duration-500 overflow-hidden ${button.bgClass || "bg-black"} ${activeButton === index ? "scale-105" : ""}`}
            >
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Partículas animadas (pontos amarelos) */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 3}s`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Texto com efeito de brilho */}
              <span className="font-medium text-white relative z-10 tracking-wider">{button.text}</span>

              {/* Efeito de borda animada */}
              <div className="absolute inset-0 border border-yellow-400/0 group-hover:border-yellow-400/50 rounded-full transition-all duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Rodapé */}
        <p className="text-sm text-gray-500">© 2025 Like Kar - Todos os direitos reservados</p>
      </div>
    </div>
  )
}
