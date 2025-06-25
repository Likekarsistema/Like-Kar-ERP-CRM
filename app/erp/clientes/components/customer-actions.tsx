"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function CustomerActions() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
        <Link href="/erp/clientes/novo">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Link>
      </Button>
    </div>
  )
}
