import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ServicesHero } from "./components/services-hero"
import { FeaturedServices } from "./components/featured-services"
import { ServiceProcess } from "./components/service-process"
import { ServiceCTA } from "./components/service-cta"

export const metadata: Metadata = {
  title: "Serviços | Like Kar",
  description:
    "Conheça nossa linha completa de serviços automotivos para transformar seu veículo com qualidade e excelência.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <ServicesHero />
        <FeaturedServices />
        <ServiceProcess />
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  )
}
