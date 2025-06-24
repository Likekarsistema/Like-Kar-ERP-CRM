import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ProductsHero } from "./components/products-hero"
import { ProductCategories } from "./components/product-categories"
import { FeaturedProducts } from "./components/featured-products"
import { ProductSearch } from "./components/product-search"

export const metadata: Metadata = {
  title: "Produtos e Serviços | Like Kar",
  description:
    "Conheça nossa linha completa de produtos e serviços para seu veículo. Som automotivo, películas, acessórios e muito mais.",
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <ProductsHero />
        <ProductSearch />
        <ProductCategories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
