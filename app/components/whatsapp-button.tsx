"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Verificar se estamos em páginas onde o botão não deve aparecer
    const currentPath = window.location.pathname
    const hiddenPaths = ["/auth/login", "/auth/register", "/crm"]

    const shouldHide = hiddenPaths.some((path) => currentPath.startsWith(path))

    if (shouldHide) {
      setIsVisible(false)
      return
    }

    // Mostrar o botão após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Animar a cada 10 segundos
    const animationTimer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 10000)

    // Observar quando o footer está visível
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }, // Considera o footer visível quando 30% dele está na tela
    )

    const footer = document.querySelector("footer")
    if (footer) {
      footerObserver.observe(footer)
    }

    return () => {
      clearTimeout(timer)
      clearInterval(animationTimer)
      footerObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname
      const hiddenPaths = ["/auth/login", "/auth/register", "/crm"]
      const shouldHide = hiddenPaths.some((path) => currentPath.startsWith(path))

      if (shouldHide) {
        setIsVisible(false)
      } else if (!isFooterVisible) {
        setIsVisible(true)
      }
    }

    // Escutar mudanças de rota
    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [isFooterVisible])

  const handleClick = () => {
    window.open("https://wa.me/551145740701", "_blank")
  }

  if (!isVisible || isFooterVisible) return null

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform hover:scale-110 ${
        isAnimating ? "animate-bounce" : ""
      }`}
      aria-label="Contato via WhatsApp"
      ref={buttonRef}
    >
      <div className="relative w-16 h-16">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-J20VwW8PUEc0p9yFv0FrosIFD8aW1r.png"
          alt="WhatsApp"
          width={64}
          height={64}
          className="drop-shadow-lg"
        />
      </div>
    </button>
  )
}
