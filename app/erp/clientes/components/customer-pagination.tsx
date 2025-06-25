"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomerPaginationProps {
  totalItems: number
  itemsPerPage: number
}

export function CustomerPagination({ totalItems, itemsPerPage }: CustomerPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(itemsPerPage)

  const totalPages = Math.ceil(totalItems / perPage)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handlePerPageChange = (value: string) => {
    setPerPage(Number.parseInt(value))
    setCurrentPage(1)
  }

  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4">
      <div className="text-sm text-gray-500">
        Mostrando <span className="font-medium">{startItem}</span> a <span className="font-medium">{endItem}</span> de{" "}
        <span className="font-medium">{totalItems}</span> clientes
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <label htmlFor="perPage" className="text-sm text-gray-500 mr-2">
            Por página:
          </label>
          <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue placeholder={perPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center">
            <span className="text-sm font-medium">
              Página {currentPage} de {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
