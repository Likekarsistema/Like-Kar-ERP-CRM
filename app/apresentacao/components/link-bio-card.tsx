"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Phone, Instagram, Facebook, Globe, Wrench, Calendar, MapPin, MessageSquare } from "lucide-react"

export function LinkBioCard() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Estado para controlar as animações de entrada
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Iniciar animações após um pequeno delay
    const timer = setTimeout(() => {
      setAnimationStarted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white overflow-x-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-yellow-50 to-white z-0"></div>
      <div className="absolute top-20 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>

      {/* Padrão de pontos decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] z-0 opacity-30"></div>

      {/* Container principal com scroll */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center py-12 px-6 max-w-md mx-auto">
        {/* Logo */}
        <div
          className={`relative w-28 h-28 mb-6 transform transition-all duration-700 ${
            animationStarted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md animate-pulse-slow"></div>
          <div className="relative z-10 w-full h-full rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20-%20LIKE%20KAR-1SdhKPxuiz8yuIvjatA8CjAik7jO9R.png"
              alt="Like Kar Logo"
              width={90}
              height={90}
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Título */}
        <h1
          className={`text-4xl font-extrabold text-black mb-1 tracking-wider transform transition-all duration-700 delay-100 ${
            animationStarted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 animate-text-gradient">
            LIKE KAR
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className={`text-gray-600 text-base mb-10 font-light transform transition-all duration-700 delay-200 ${
            animationStarted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Tudo para seu carro em um só lugar
        </p>

        {/* Links */}
        <div className="w-full space-y-4 mb-10">
          {[
            {
              href: "/",
              icon: <Globe size={18} className="text-white" />,
              text: "NOSSO SITE",
              delay: 300,
            },
            {
              href: "/servicos",
              icon: <Wrench size={18} className="text-white" />,
              text: "NOSSOS SERVIÇOS",
              delay: 400,
            },
            {
              href: "/contato",
              icon: <Calendar size={18} className="text-white" />,
              text: "FAÇA SEU AGENDAMENTO",
              delay: 500,
            },
            {
              href: "https://maps.google.com/?q=Like+Kar",
              icon: <MapPin size={18} className="text-white" />,
              text: "NOSSO ENDEREÇO",
              delay: 600,
            },
          ].map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group bg-gradient-to-r from-black to-gray-800 text-white rounded-xl py-3.5 px-6 flex items-center gap-3 font-semibold text-base w-full transition-all duration-500 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] relative overflow-hidden transform ${
                animationStarted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${link.delay}ms`,
                animationDelay: `${link.delay}ms`,
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <div className="bg-yellow-400 rounded-lg p-2">{link.icon}</div>
              <span className="tracking-wide">{link.text}</span>
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div
          className={`flex items-center justify-center gap-5 mb-10 transform transition-all duration-700 delay-700 ${
            animationStarted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            {
              href: "tel:+551199999999",
              icon: <Phone size={20} />,
              label: "Telefone",
              color: "bg-blue-500",
            },
            {
              href: "https://wa.me/5511999999999",
              icon: <MessageSquare size={20} />,
              label: "WhatsApp",
              color: "bg-green-500",
            },
            {
              href: "https://instagram.com/likekar",
              icon: <Instagram size={20} />,
              label: "Instagram",
              color: "bg-pink-600",
            },
            {
              href: "https://facebook.com/likekar",
              icon: <Facebook size={20} />,
              label: "Facebook",
              color: "bg-blue-600",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`${social.color} text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg`}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`text-gray-400 text-xs font-light mt-auto transform transition-all duration-700 delay-800 ${
            animationStarted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          © 2025 Like Kar - Todos os direitos reservados
        </div>
      </div>
    </div>
  )
}
