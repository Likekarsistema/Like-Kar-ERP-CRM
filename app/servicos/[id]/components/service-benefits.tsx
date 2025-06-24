"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle } from "lucide-react"

interface ServiceBenefitsProps {
  benefits: string[]
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!benefits || benefits.length === 0) return null

  return (
    <div ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Benefícios do Serviço</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-lg font-medium">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
