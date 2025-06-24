"use client"

import { useState, useEffect, useRef } from "react"

export function GoogleMap() {
  const [isVisible, setIsVisible] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={mapRef}
      className={`w-full h-[500px] bg-gray-100 transition-all duration-1000 transform ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.7047859205787!2d-46.54103372374385!3d-23.444210077485786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef5193749e9e7%3A0xf1c5cd4321a5cb81!2sAv.%20Bartolomeu%20de%20Carlos%2C%20333%20-%20Jardim%20Flor%20da%20Montanha%2C%20Guarulhos%20-%20SP%2C%2007097-420!5e0!3m2!1spt-BR!2sbr!4v1709582431435!5m2!1spt-BR!2sbr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização da Like Kar - Avenida Bartolomeu de Carlos, 333"
        aria-label="Mapa mostrando a localização da Like Kar na Avenida Bartolomeu de Carlos, 333"
      ></iframe>
    </div>
  )
}
