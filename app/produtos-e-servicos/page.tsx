import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ProductsServicesHero } from "./components/products-services-hero"
import { ProductsSection } from "./components/products-section"
import { ServicesSection } from "./components/services-section"
import { CallToAction } from "./components/call-to-action"

export const metadata: Metadata = {
  title: "Produtos e Serviços | Like Kar",
  description:
    "Conheça nossa linha completa de produtos e serviços automotivos de alta qualidade para transformar seu veículo.",
}

export default function ProductsServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <ProductsServicesHero />
        <ProductsSection />
        <ServicesSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
