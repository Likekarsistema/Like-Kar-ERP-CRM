import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ContactHero } from "./components/contact-hero"
import { ContactInfo } from "./components/contact-info"
import { GoogleMap } from "./components/google-map"
import { JoinOurTeam } from "./components/join-our-team"

export const metadata: Metadata = {
  title: "Contato | Like Kar",
  description: "Entre em contato com a Like Kar. Estamos localizados na Avenida Bartolomeu de Carlos, 333.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <ContactHero />
        <div className="container mx-auto px-4 py-16">
          <ContactInfo />
        </div>
        <JoinOurTeam />
        <GoogleMap />
      </main>
      <Footer />
    </div>
  )
}
