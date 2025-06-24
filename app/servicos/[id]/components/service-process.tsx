"use client"

import { useState, useEffect, useRef } from "react"

interface ProcessStep {
  title: string
  description: string
}

interface ServiceProcessProps {
  steps: ProcessStep[]
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
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

  useEffect(() => {
    if (isVisible && steps && steps.length > 0) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isVisible, steps])

  if (!steps || steps.length === 0) return null

  return (
    <div ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Como Funciona o Processo</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps list */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-500 ${
                  activeStep === index
                    ? "border-l-4 border-yellow-400 transform -translate-x-2"
                    : "border-l-4 border-transparent"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeStep === index ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual representation */}
          <div className="relative h-80 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold">{activeStep + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
                <p className="text-gray-600">{steps[activeStep].description}</p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
