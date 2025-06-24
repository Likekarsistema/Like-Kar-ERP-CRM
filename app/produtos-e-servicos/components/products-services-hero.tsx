export function ProductsServicesHero() {
  return (
    <div className="relative bg-gray-900 text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 z-0"></div>
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          backgroundPosition: "center 30%",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Produtos e Serviços Premium</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Transforme seu veículo com nossa linha exclusiva de produtos de alta qualidade e serviços especializados. Na
            Like Kar, combinamos expertise técnica com atendimento personalizado para superar suas expectativas.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#produtos"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
            >
              Nossos Produtos
            </a>
            <a
              href="#servicos"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all"
            >
              Nossos Serviços
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
