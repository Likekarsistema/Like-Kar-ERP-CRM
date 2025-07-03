import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
      <p className="text-gray-500 mb-6">A página que você está procurando não existe ou foi removida.</p>
      <Link href="/crm/servicos">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Voltar para Serviços</Button>
      </Link>
    </div>
  )
}
