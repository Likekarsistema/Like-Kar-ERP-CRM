// Arquivo de ajuda para depuração

export function debugLocalStorage() {
  if (typeof window !== "undefined") {
    try {
      // Listar todas as chaves no localStorage
      console.log("Chaves no localStorage:", Object.keys(localStorage))

      // Verificar dados de clientes
      const mockCustomers = localStorage.getItem("mockCustomers")
      console.log("mockCustomers existe:", !!mockCustomers)
      if (mockCustomers) {
        const parsedCustomers = JSON.parse(mockCustomers)
        console.log("Número de clientes:", parsedCustomers.length)
        console.log("Primeiro cliente:", parsedCustomers[0])
      }

      return true
    } catch (error) {
      console.error("Erro ao depurar localStorage:", error)
      return false
    }
  }
  return false
}

export function resetCustomersData() {
  if (typeof window !== "undefined") {
    try {
      // Dados iniciais de clientes
      const initialCustomers = [
        {
          id: "customer_1",
          name: "João Silva",
          email: "joao@email.com",
          phone: "(11) 99999-1111",
          address: "Rua das Flores, 123",
          city: "São Paulo",
          state: "SP",
          zip_code: "01234-567",
          status: "ativo",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          cars: [
            {
              id: "car_1",
              customer_id: "customer_1",
              brand: "Toyota",
              model: "Corolla",
              license_plate: "ABC-1234",
              color: "Branco",
              year: 2020,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "car_2",
              customer_id: "customer_1",
              brand: "Honda",
              model: "Civic",
              license_plate: "DEF-5678",
              color: "Preto",
              year: 2019,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
        },
        {
          id: "customer_2",
          name: "Maria Santos",
          email: "maria@email.com",
          phone: "(11) 99999-2222",
          address: "Av. Paulista, 456",
          city: "São Paulo",
          state: "SP",
          zip_code: "01310-100",
          status: "devedor",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          cars: [
            {
              id: "car_3",
              customer_id: "customer_2",
              brand: "Ford",
              model: "Focus",
              license_plate: "GHI-9012",
              color: "Azul",
              year: 2018,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
        },
        {
          id: "customer_3",
          name: "Pedro Oliveira",
          phone: "(11) 99999-3333",
          address: "Rua Augusta, 789",
          city: "São Paulo",
          state: "SP",
          status: "inativo",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          cars: [],
        },
      ]

      // Resetar dados de clientes
      localStorage.setItem("mockCustomers", JSON.stringify(initialCustomers))

      console.log("Dados de clientes resetados com sucesso!")
      return true
    } catch (error) {
      console.error("Erro ao resetar dados de clientes:", error)
      return false
    }
  }
  return false
}

export function testCreateCustomer() {
  if (typeof window !== "undefined") {
    try {
      // Obter clientes atuais
      const currentCustomers = JSON.parse(localStorage.getItem("mockCustomers") || "[]")
      const countBefore = currentCustomers.length

      // Criar um novo cliente diretamente
      const newCustomer = {
        id: `customer_test_${Date.now()}`,
        name: "Cliente Teste",
        email: "teste@email.com",
        phone: "(11) 99999-9999",
        address: "Rua de Teste, 123",
        city: "São Paulo",
        state: "SP",
        status: "ativo",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        cars: [],
      }

      currentCustomers.push(newCustomer)
      localStorage.setItem("mockCustomers", JSON.stringify(currentCustomers))

      // Verificar se o cliente foi adicionado
      const updatedCustomers = JSON.parse(localStorage.getItem("mockCustomers") || "[]")
      const countAfter = updatedCustomers.length

      console.log(`Clientes antes: ${countBefore}, Clientes depois: ${countAfter}`)
      console.log("Cliente de teste adicionado com sucesso!")

      return true
    } catch (error) {
      console.error("Erro ao testar criação de cliente:", error)
      return false
    }
  }
  return false
}
