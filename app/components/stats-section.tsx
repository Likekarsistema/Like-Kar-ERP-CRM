"use client"

import { useEffect, useRef, useState } from "react"

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

function StatItem({ value, label, suffix = "", delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const duration = 2000 // ms
    const step = Math.ceil(value / (duration / 16)) // 60fps

    // Delay the animation start
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += step
        if (start >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(start)
        }
      }, 16)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, value, delay])

  return (
    <div
      ref={ref}
      className="space-y-2 opacity-0 translate-y-4 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div className="text-5xl font-bold text-gray-800 flex items-center justify-center">
        {count}
        <span className="text-yellow-500">{suffix}</span>
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <StatItem value={26} label="Anos de Experiência" suffix="+" delay={0} />
          <StatItem value={5000} label="Clientes Satisfeitos" suffix="+" delay={200} />
          <StatItem value={50} label="Marcas Premium" suffix="+" delay={400} />
          <StatItem value={6500} label="Projetos Realizados" suffix="+" delay={600} />
        </div>
      </div>
    </div>
  )
}
