import type { Metadata } from "next"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { ProductGallery } from "./components/product-gallery"
import { ProductInfo } from "./components/product-info"
import { ProductTabs } from "./components/product-tabs"
import { RelatedProducts } from "./components/related-products"

// Esta função seria substituída por uma busca real ao banco de dados
async function getProduct(id: string) {
  // Simulando um produto
  return {
    id: Number.parseInt(id),
    name: "Central Multimídia Pioneer DMH-ZS9280TV",
    category: "multimidia",
    description:
      "A Central Multimídia Pioneer DMH-ZS9280TV é a escolha perfeita para quem busca qualidade de som e imagem, com tela de 9 polegadas, conectividade Bluetooth, entrada USB, e compatibilidade com Android Auto e Apple CarPlay.",
    longDescription: `
      <p>A Central Multimídia Pioneer DMH-ZS9280TV é a escolha perfeita para quem busca qualidade de som e imagem, com tela de 9 polegadas, conectividade Bluetooth, entrada USB, e compatibilidade com Android Auto e Apple CarPlay.</p>
      
      <h3>Características Principais:</h3>
      <ul>
        <li>Tela touchscreen de 9 polegadas com alta resolução</li>
        <li>Bluetooth para chamadas e streaming de áudio</li>
        <li>Compatível com Android Auto e Apple CarPlay</li>
        <li>Receptor de TV Digital integrado</li>
        <li>Entrada USB e auxiliar</li>
        <li>Equalizador de 13 bandas</li>
        <li>Potência de saída: 50W x 4</li>
        <li>3 saídas RCA para amplificadores externos</li>
      </ul>
      
      <h3>Conteúdo da Embalagem:</h3>
      <ul>
        <li>1 Central Multimídia Pioneer DMH-ZS9280TV</li>
        <li>1 Controle remoto</li>
        <li>1 Chicote de instalação</li>
        <li>1 Antena para TV Digital</li>
        <li>1 Manual de instruções</li>
        <li>1 Certificado de garantia</li>
      </ul>
      
      <h3>Garantia:</h3>
      <p>1 ano de garantia do fabricante</p>
    `,
    price: 2499.9,
    oldPrice: 2999.9,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    sku: "PIO-DMH-ZS9280TV",
    brand: "Pioneer",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Exemplo de URL de vídeo
    specifications: [
      { name: "Marca", value: "Pioneer" },
      { name: "Modelo", value: "DMH-ZS9280TV" },
      { name: "Tamanho da Tela", value: "9 polegadas" },
      { name: "Resolução", value: "1280 x 720 pixels" },
      { name: "Potência", value: "50W x 4" },
      { name: "Conectividade", value: "Bluetooth, USB, Auxiliar" },
      { name: "Compatibilidade", value: "Android Auto, Apple CarPlay" },
      { name: "TV Digital", value: "Sim" },
      { name: "Dimensões", value: "25.5 x 14.8 x 16.5 cm" },
      { name: "Peso", value: "1.2 kg" },
    ],
    features: [
      "Tela touchscreen capacitiva de alta resolução",
      "Interface intuitiva e fácil de usar",
      "Conectividade Bluetooth para chamadas e streaming de áudio",
      "Compatível com Android Auto e Apple CarPlay",
      "Receptor de TV Digital integrado",
      "Entrada USB e auxiliar para conexão de dispositivos externos",
      "Equalizador de 13 bandas para personalização do som",
      "3 saídas RCA para conexão com amplificadores externos",
      "Controle remoto incluído",
    ],
    relatedProducts: [2, 3, 4],
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: `${product.name} | Like Kar`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Galeria de Fotos */}
            <div className="lg:w-1/2">
              <ProductGallery images={product.images} videoUrl={product.videoUrl} />
            </div>

            {/* Informações do Produto */}
            <div className="lg:w-1/2">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Abas de Descrição, Especificações, etc. */}
          <div className="mt-16">
            <ProductTabs
              description={product.longDescription}
              specifications={product.specifications}
              features={product.features}
            />
          </div>

          {/* Produtos Relacionados */}
          <div className="mt-20">
            <RelatedProducts productIds={product.relatedProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
