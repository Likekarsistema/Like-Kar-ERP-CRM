import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"
import { WhatsAppButton } from "./components/whatsapp-button"
import { ScrollToTop } from "./components/scroll-to-top"
import { SchemaOrg } from "./components/schema-org"

// Fontes modernas e elegantes
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
})

// Metadados para SEO
export const metadata: Metadata = {
  title: "LIKE KAR - Loja de Som e Acessórios Automotivos em Guarulhos | Próximo ao Shopping Maia",
  description:
    "Especialistas em som automotivo, películas e acessórios para carros em Guarulhos. Localizada próximo ao Shopping Maia, a Like Kar oferece as melhores marcas do mercado com atendimento personalizado.",
  keywords:
    "som automotivo guarulhos, loja de som e acessórios guarulhos, acessórios automotivos shopping maia, películas automotivas guarulhos, central multimídia guarulhos, insulfilm guarulhos, loja de som perto do shopping maia",
  authors: [{ name: "Like Kar" }],
  robots: "index, follow",
  openGraph: {
    title: "LIKE KAR - Loja de Som e Acessórios Automotivos em Guarulhos | Próximo ao Shopping Maia",
    description:
      "Especialistas em som automotivo, películas e acessórios para carros em Guarulhos. Localizada próximo ao Shopping Maia, a Like Kar oferece as melhores marcas do mercado com atendimento personalizado.",
    url: "https://www.likekar.com.br",
    siteName: "Like Kar",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIKE%20KAR%20%281%29-GhqLT1V6Xg5zFPyWk7o4TiKtJyIHdw.png",
        width: 1200,
        height: 630,
        alt: "Like Kar - Loja de Som e Acessórios Automotivos em Guarulhos",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <SchemaOrg />
      </head>
      <body className={`${montserrat.variable} ${poppins.variable} font-sans antialiased`}>
        <ScrollToTop />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
