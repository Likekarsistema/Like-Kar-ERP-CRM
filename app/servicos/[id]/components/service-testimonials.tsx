"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// This would be replaced with a database query in a real application
const getTestimonials = (serviceId: string) => {
  return [
    {
      id: 1,
      name: "Carlos Silva",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      comment:
        "Serviço excelente! A equipe foi muito profissional e o resultado superou minhas expectativas. Recomendo a todos.",
      date: "15/03/2023"
    },
    {
      id: 2,
      name: "Ana Oliveira",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      comment:
        "Atendimento de primeira qualidade. O serviço foi realizado no prazo combinado e com acabamento perfeito.",
      date: "22/04/2023"
    },
    {
      id: 3,
      name: "Marcos Santos",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      comment: "Muito satisfeito com o resultado. A equipe foi atenciosa e explicou todo o processo detalhadamente.",
      date: "10/05/2023"
    }
  ]
}

interface ServiceTestimonialsProps {
  serviceId: string
}

export function ServiceTestimonials({ serviceId }: ServiceTestimonialsProps) {
  const testimonials = getTestimonials(serviceId)
  const [currentIndex, setCurrentIndex] = useState(0)
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (!testimonials || testimonials.length === 0) return null

  return (
    <div ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">O que nossos clientes dizem</h2>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white shadow-md p-3 rounded-full hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white shadow-md p-3 rounded-full hover:bg-gray-50 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Testimonial card */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{testimonials[currentIndex].date}</span>
                  </div>
                </div>
              </div>

              <blockquote className="text-xl italic text-gray-700 mb-6">
                "{testimonials[currentIndex].comment}"
              </blockquote>

              {/* Pagination dots */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index ? "bg-yellow-400 w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
