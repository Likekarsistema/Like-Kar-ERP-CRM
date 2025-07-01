import { createSupabaseClient } from "./supabase"

export type Product = {
  id: string
  name: string
  description?: string
  sku: string
  category_id?: string
  supplier_id?: string
  brand?: string
  model?: string
  cost_price: number
  sale_price: number
  current_stock: number
  min_stock: number
  max_stock: number
  unit_of_measure: string
  status: string
  is_deleted?: boolean
  created_at?: string
  updated_at?: string
}

const supabase = createSupabaseClient()

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Erro ao buscar produtos:", error)
    return []
  }
  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
  if (error) {
    console.error("Erro ao buscar produto:", error)
    return null
  }
  return data as Product
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product | null> {
  const { data, error } = await supabase.from("products").insert(product).select().single()
  if (error) {
    console.error("Erro ao criar produto:", error)
    return null
  }
  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single()
  if (error) {
    console.error("Erro ao atualizar produto:", error)
    return null
  }
  return data as Product
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) {
    console.error("Erro ao deletar produto:", error)
    return false
  }
  return true
}

export interface ProductCategory {
  id: string
  name: string
  description?: string
  parent_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  document?: string
  email?: string
  phone?: string
  address?: any
  contact_person?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface StockMovement {
  id: string
  product_id: string
  type: "entrada" | "saida" | "ajuste"
  quantity: number
  previous_stock: number
  new_stock: number
  unit_cost?: number
  total_cost?: number
  reason: string
  reference_document?: string
  notes?: string
  created_at: string
  created_by: string
  // Relacionamentos
  product?: Product
}

// Funções para Produtos
export async function getProducts(includeDeleted = false) {
  let query = supabase
    .from("products")
    .select(`
      *,
      category:product_categories(*),
      supplier:suppliers(*)
    `)
    .order("created_at", { ascending: false })

  if (!includeDeleted) {
    query = query.eq("is_deleted", false)
  }

  const { data, error } = await query

  if (error) {
    console.error("Erro ao buscar produtos:", error)
    throw error
  }

  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:product_categories(*),
      supplier:suppliers(*)
    `)
    .eq("id", id)
    .eq("is_deleted", false)
    .single()

  if (error) {
    console.error("Erro ao buscar produto:", error)
    throw error
  }

  return data as Product
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at" | "is_deleted">) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      markup_percentage:
        product.sale_price > 0 && product.cost_price > 0
          ? ((product.sale_price - product.cost_price) / product.sale_price) * 100
          : null,
    })
    .select()
    .single()

  if (error) {
    console.error("Erro ao criar produto:", error)
    throw error
  }

  // Criar movimentação inicial de estoque se houver
  if (product.current_stock > 0) {
    await createStockMovement({
      product_id: data.id,
      type: "entrada",
      quantity: product.current_stock,
      previous_stock: 0,
      new_stock: product.current_stock,
      reason: "Estoque inicial",
      created_by: product.created_by || "system",
    })
  }

  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data: currentProduct } = await supabase.from("products").select("*").eq("id", id).single()

  if (!currentProduct) {
    throw new Error("Produto não encontrado")
  }

  // Calcular markup se preços foram alterados
  if (updates.sale_price || updates.cost_price) {
    const salePrice = updates.sale_price || currentProduct.sale_price
    const costPrice = updates.cost_price || currentProduct.cost_price

    if (salePrice > 0 && costPrice > 0) {
      updates.markup_percentage = ((salePrice - costPrice) / salePrice) * 100
    }
  }

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select(`
      *,
      category:product_categories(*),
      supplier:suppliers(*)
    `)
    .single()

  if (error) {
    console.error("Erro ao atualizar produto:", error)
    throw error
  }

  return data as Product
}

export async function softDeleteProduct(id: string, userId = "system") {
  const { data, error } = await supabase
    .from("products")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      deleted_by: userId,
      status: "inativo",
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Erro ao excluir produto:", error)
    throw error
  }

  return data
}

export async function restoreProduct(id: string) {
  const { data, error } = await supabase.rpc("restore_product", {
    product_uuid: id,
  })

  if (error) {
    console.error("Erro ao restaurar produto:", error)
    throw error
  }

  return data
}

// Adicionar função para exclusão múltipla:
export async function softDeleteMultipleProducts(ids: string[], userId = "system") {
  const { data, error } = await supabase
    .from("products")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      deleted_by: userId,
      status: "inativo",
    })
    .in("id", ids)
    .select()

  if (error) {
    console.error("Erro ao excluir produtos:", error)
    throw error
  }

  return data
}

// Funções para Upload de Imagens
export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const fileExt = file.name.split(".").pop()
  const fileName = `${productId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage.from("product-images").upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    console.error("Erro ao fazer upload da imagem:", error)
    throw error
  }

  // Obter URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(data.path)

  return publicUrl
}

export async function deleteProductImage(imagePath: string) {
  const { error } = await supabase.storage.from("product-images").remove([imagePath])

  if (error) {
    console.error("Erro ao excluir imagem:", error)
    throw error
  }
}

// Funções para Movimentações de Estoque
export async function createStockMovement(movement: Omit<StockMovement, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("stock_movements")
    .insert(movement)
    .select(`
      *,
      product:products(name, sku)
    `)
    .single()

  if (error) {
    console.error("Erro ao criar movimentação:", error)
    throw error
  }

  // Atualizar estoque do produto
  await supabase.from("products").update({ current_stock: movement.new_stock }).eq("id", movement.product_id)

  return data as StockMovement
}

export async function getStockMovements(productId?: string) {
  let query = supabase
    .from("stock_movements")
    .select(`
      *,
      product:products(name, sku)
    `)
    .order("created_at", { ascending: false })

  if (productId) {
    query = query.eq("product_id", productId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Erro ao buscar movimentações:", error)
    throw error
  }

  return data as StockMovement[]
}

// Funções para Categorias
export async function getProductCategories() {
  const { data, error } = await supabase.from("product_categories").select("*").eq("is_active", true).order("name")

  if (error) {
    console.error("Erro ao buscar categorias:", error)
    throw error
  }

  return data as ProductCategory[]
}

// Funções para Fornecedores
export async function getSuppliers() {
  const { data, error } = await supabase.from("suppliers").select("*").eq("is_active", true).order("name")

  if (error) {
    console.error("Erro ao buscar fornecedores:", error)
    throw error
  }

  return data as Supplier[]
}
