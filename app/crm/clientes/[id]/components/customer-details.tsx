"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  Plus,
  AlertCircle,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { getMockCustomerById, deleteCustomer, deleteCarFromCustomer } from "@/lib/mock-data"
import type { Customer } from "@/lib/mock-data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CustomerDetailsProps {
  customerId: string
}

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [carToDelete, setCarToDelete] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Simular delay de rede
        await new Promise((resolve) => setTimeout(resolve, 500))

        const data = getMockCustomerById(customerId)
        if (data) {
          setCustomer(data)
        } else {
          toast({
            title: "Erro",
            description: "Cliente não encontrado",
            variant: "destructive",
          })
          router.push("/crm/clientes")
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do cliente",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [customerId, router, toast])

  const handleDeleteCustomer = async () => {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 500))

      deleteCustomer(customerId)

      toast({
        title: "Sucesso",
        description: "Cliente excluído com sucesso",
      })

      router.push("/crm/clientes")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o cliente",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCar = async (carId: string) => {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 500))

      deleteCarFromCustomer(customerId, carId)

      toast({
        title: "Sucesso",
        description: "Veículo excluído com sucesso",
      })

      // Atualizar o estado local para refletir a exclusão
      setCustomer((prev) => {
        if (!prev) return null
        return {
          ...prev,
          cars: prev.cars?.filter((car) => car.id !== carId) || [],
        }
      })

      setCarToDelete(null)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o veículo",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "inativo":
        return <Badge variant="outline">Inativo</Badge>
      case "devedor":
        return <Badge className="bg-red-500">Devedor</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVehicleTypeName = (type: string) => {
    switch (type) {
      case "carro":
        return "Carro"
      case "moto":
        return "Moto"
      case "caminhao":
        return "Caminhão"
      default:
        return "Veículo"
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Cliente não encontrado</CardTitle>
            <CardDescription>O cliente solicitado não existe ou foi removido.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/crm/clientes">Voltar para a lista de clientes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/crm/clientes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span>Cliente desde {new Date(customer.created_at).toLocaleDateString()}</span>
              {getStatusBadge(customer.status)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/crm/clientes/${customerId}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informações do Cliente */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customer.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{customer.phone}</span>
              </div>
            )}
            {customer.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{customer.email}</span>
              </div>
            )}
            {customer.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p>{customer.address}</p>
                  {customer.city && customer.state && (
                    <p>
                      {customer.city}, {customer.state} {customer.zip_code && `- ${customer.zip_code}`}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Cadastrado em {new Date(customer.created_at).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para Veículos e Histórico */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <Tabs defaultValue="vehicles">
              <div className="flex justify-between items-center mb-2">
                <TabsList>
                  <TabsTrigger value="vehicles">Veículos</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                <Button size="sm" asChild>
                  <Link href={`/crm/clientes/${customerId}/carro/novo`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Veículo
                  </Link>
                </Button>
              </div>

              <TabsContent value="vehicles">
                {customer.cars && customer.cars.length > 0 ? (
                  <div className="space-y-4">
                    {customer.cars.map((car) => (
                      <Card key={car.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <Car className="h-5 w-5 text-gray-500" />
                              <div>
                                <h3 className="font-medium">
                                  {getVehicleTypeName(car.vehicle_type)}: {car.brand} {car.model}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {car.license_plate} • {car.color} {car.year && `• ${car.year}`}
                                </p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/crm/clientes/${customerId}/carro/${car.id}/editar`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => setCarToDelete(car.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Car className="h-12 w-12 text-gray-300 mb-2" />
                    <h3 className="text-lg font-medium">Nenhum veículo cadastrado</h3>
                    <p className="text-gray-500 mb-4">Adicione o primeiro veículo deste cliente</p>
                    <Button asChild>
                      <Link href={`/crm/clientes/${customerId}/carro/novo`}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Veículo
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium">Histórico não disponível</h3>
                  <p className="text-gray-500">O histórico de interações será implementado em breve</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>

      {/* Diálogo de confirmação para excluir cliente */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir cliente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita e todos os dados relacionados
              serão perdidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCustomer} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de confirmação para excluir carro */}
      <AlertDialog open={!!carToDelete} onOpenChange={() => setCarToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir veículo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => carToDelete && handleDeleteCar(carToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
