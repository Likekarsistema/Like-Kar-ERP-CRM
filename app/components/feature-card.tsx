"use client"

import { useRef, useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  Icon: LucideIcon
  delay?: number
}

export function FeatureCard({ title, description, Icon, delay = 0 }: FeatureCardProps) {
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
      className={`flex items-start space-x-5 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-black" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
