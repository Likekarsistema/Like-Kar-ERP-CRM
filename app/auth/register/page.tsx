import type { Metadata } from "next"
import { RegisterForm } from "./components/register-form"

export const metadata: Metadata = {
  title: "Criar Conta | Like Kar",
  description: "Crie sua conta Like Kar",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  )
}
