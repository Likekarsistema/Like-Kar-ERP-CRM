"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  faq: FAQItem[]
}

export function ServiceFAQ({ faq }: ServiceFAQProps) {
  const [openItem, setOpenItem] = useState<number | null>(0)
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

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  if (!faq || faq.length === 0) return null

  return (
    <div ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Perguntas Frequentes</h2>

        <div className="max-w-3xl mx-auto">
          {faq.map((item, index) => (
            <div
              key={index}
              className={`mb-4 transition-all duration-500 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full text-left p-6 rounded-xl flex justify-between items-center transition-all ${
                  openItem === index ? "bg-yellow-50 shadow-md" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="font-semibold text-lg">{item.question}</span>
                {openItem === index ? (
                  <ChevronUp className="w-5 h-5 text-yellow-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {openItem === index && (
                <div className="p-6 bg-white border-t border-gray-100 rounded-b-xl">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
