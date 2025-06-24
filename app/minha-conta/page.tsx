import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { AccountDashboard } from "./components/account-dashboard"

export const metadata: Metadata = {
  title: "Minha Conta | Like Kar",
  description: "Gerencie sua conta Like Kar",
}

export default function MyAccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <AccountDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
