interface CategoryHeroProps {
  title: string
  description: string
  image: string
  productCount: number
}

export function CategoryHero({ title, description, image, productCount }: CategoryHeroProps) {
  return (
    <div className="relative bg-gray-900 text-white py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-90 z-0"></div>
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center 30%",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-gray-200 mb-4">{description}</p>
          <div className="text-sm text-gray-300">{productCount} produtos encontrados</div>
        </div>
      </div>
    </div>
  )
}
