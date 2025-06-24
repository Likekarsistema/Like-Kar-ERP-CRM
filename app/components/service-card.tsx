"use client"

import { useRef, useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  Icon: LucideIcon
  delay?: number
}

export function ServiceCard({ title, description, Icon, delay = 0 }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`bg-white p-8 rounded-xl shadow-md text-center hover-lift transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-6 transform transition-transform group-hover:rotate-6">
        <Icon className="w-8 h-8 text-black" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
