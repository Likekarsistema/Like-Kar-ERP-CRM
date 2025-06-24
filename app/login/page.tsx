import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { LoginForm } from "./components/login-form"

export const metadata: Metadata = {
  title: "Login | Like Kar",
  description: "Acesse o painel administrativo da Like Kar",
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
