import type React from "react"
import "../globals.css"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Like Kar - Apresentação",
  description: "Tudo para seu carro em um só lugar",
}

export default function ApresentacaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans`}>{children}</body>
    </html>
  )
}
