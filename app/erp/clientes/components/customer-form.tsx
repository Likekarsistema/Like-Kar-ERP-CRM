"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { createMockCustomer, addCarToCustomer } from "@/lib/mock-data"
import { createCustomer } from "@/lib/supabase-customers"

interface CarFormData {
  vehicle_type: "carro" | "moto" | "caminhao"
  brand: string
  model: string
  license_plate: string
  color: string
  year?: number
}

// Função para gerar ID único
function generateId() {
  return `customer_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`
}

// Função para salvar no localStorage (simulando banco de dados)
function saveCustomerToStorage(customerData: any) {
  const customers = JSON.parse(localStorage.getItem("mockCustomers") || "[]")

  const newCustomer = {
    id: generateId(),
    name: customerData.name,
    email: customerData.email || "",
    phone: customerData.phone,
    address: customerData.address || "",
    city: customerData.city || "",
    state: customerData.state || "",
    zip_code: customerData.zip_code || "",
    status: customerData.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    cars: customerData.cars.map((car: any) => ({
      id: `car_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
      customer_id: "",
      brand: car.brand,
      model: car.model,
      license_plate: car.license_plate,
      color: car.color,
      year: car.year || new Date().getFullYear(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  }

  // Atualizar customer_id nos carros
  newCustomer.cars = newCustomer.cars.map((car: any) => ({
    ...car,
    customer_id: newCustomer.id,
  }))

  customers.push(newCustomer)
  localStorage.setItem("mockCustomers", JSON.stringify(customers))

  return newCustomer
}

export function CustomerForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    status: "ativo" as "ativo" | "inativo" | "devedor",
  })

  const [cars, setCars] = useState<CarFormData[]>([
    {
      vehicle_type: "carro",
      brand: "",
      model: "",
      license_plate: "",
      color: "",
      year: undefined,
    },
  ])

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCarChange = (index: number, field: string, value: string | number) => {
    setCars((prev) => prev.map((car, i) => (i === index ? { ...car, [field]: value } : car)))
  }

  const addCar = () => {
    setCars((prev) => [
      ...prev,
      {
        vehicle_type: "carro",
        brand: "",
        model: "",
        license_plate: "",
        color: "",
        year: undefined,
      },
    ])
  }

  const removeCar = (index: number) => {
    if (cars.length > 1) {
      setCars((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerData.name || !customerData.phone) {
      toast({
        title: "Erro",
        description: "Nome e telefone são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Criar o cliente primeiro
      const newCustomer = {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        city: customerData.city,
        state: customerData.state,
        zip_code: customerData.zip_code,
        status: customerData.status,
        notes: "",
      }

      // Usar a função do Supabase
      const createdCustomer = await createCustomer(newCustomer)
      if (!createdCustomer) throw new Error("Erro ao criar cliente no banco de dados.")
      console.log("Cliente criado:", createdCustomer)

      // Adicionar apenas carros válidos (futuro: implementar integração com carros)
      // const validCars = cars.filter((car) => car.brand && car.model && car.license_plate && car.color)
      // for (const car of validCars) { ... }

      toast({
        title: "Sucesso",
        description: `Cliente ${createdCustomer.name} criado com sucesso!`,
      })

      // Redirecionar para a lista de clientes
      router.push("/erp/clientes")
      router.refresh()
    } catch (error) {
      console.error("Erro ao criar cliente:", error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o cliente. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button type="button" variant="outline" asChild>
          <Link href="/erp/clientes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Dados do Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Dados do Cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => handleCustomerChange("name", e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={customerData.phone}
                onChange={(e) => handleCustomerChange("phone", e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={customerData.email}
                onChange={(e) => handleCustomerChange("email", e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={customerData.status} onValueChange={(value) => handleCustomerChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="devedor">Devedor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={customerData.address}
              onChange={(e) => handleCustomerChange("address", e.target.value)}
              placeholder="Rua, número, bairro"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={customerData.city}
                onChange={(e) => handleCustomerChange("city", e.target.value)}
                placeholder="Cidade"
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={customerData.state}
                onChange={(e) => handleCustomerChange("state", e.target.value)}
                placeholder="SP"
                maxLength={2}
              />
            </div>
            <div>
              <Label htmlFor="zip_code">CEP</Label>
              <Input
                id="zip_code"
                value={customerData.zip_code}
                onChange={(e) => handleCustomerChange("zip_code", e.target.value)}
                placeholder="00000-000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carros */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Veículos do Cliente</CardTitle>
          <Button type="button" onClick={addCar} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Veículo
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {cars.map((car, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {car.vehicle_type === "carro" ? "Carro" : car.vehicle_type === "moto" ? "Moto" : "Caminhão"}{" "}
                  {index + 1}
                </h4>
                {cars.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeCar(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`vehicle_type-${index}`}>Tipo de Veículo *</Label>
                  <Select
                    value={car.vehicle_type}
                    onValueChange={(value) => handleCarChange(index, "vehicle_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carro">Carro</SelectItem>
                      <SelectItem value="moto">Moto</SelectItem>
                      <SelectItem value="caminhao">Caminhão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`brand-${index}`}>Marca *</Label>
                  <Input
                    id={`brand-${index}`}
                    value={car.brand}
                    onChange={(e) => handleCarChange(index, "brand", e.target.value)}
                    placeholder="Toyota, Honda, Ford..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`model-${index}`}>Modelo *</Label>
                  <Input
                    id={`model-${index}`}
                    value={car.model}
                    onChange={(e) => handleCarChange(index, "model", e.target.value)}
                    placeholder="Corolla, Civic, Focus..."
                  />
                </div>
                <div>
                  <Label htmlFor={`license_plate-${index}`}>Placa *</Label>
                  <Input
                    id={`license_plate-${index}`}
                    value={car.license_plate}
                    onChange={(e) => handleCarChange(index, "license_plate", e.target.value.toUpperCase())}
                    placeholder="ABC-1234"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`color-${index}`}>Cor *</Label>
                  <Input
                    id={`color-${index}`}
                    value={car.color}
                    onChange={(e) => handleCarChange(index, "color", e.target.value)}
                    placeholder="Branco, Preto, Prata..."
                  />
                </div>
                <div>
                  <Label htmlFor={`year-${index}`}>Ano</Label>
                  <Input
                    id={`year-${index}`}
                    type="number"
                    value={car.year || ""}
                    onChange={(e) => handleCarChange(index, "year", Number.parseInt(e.target.value) || undefined)}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" asChild>
          <Link href="/erp/clientes">Cancelar</Link>
        </Button>
        <Button type="submit" disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-black">
          {loading ? "Salvando..." : "Salvar Cliente"}
        </Button>
      </div>
    </form>
  )
}
