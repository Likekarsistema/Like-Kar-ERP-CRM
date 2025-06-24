import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Cliente desde 2019",
    content:
      "Instalei uma central multimídia e um sistema de som completo na Like Kar. O atendimento foi excelente, a instalação ficou perfeita e o som está incrível. Recomendo a todos!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Ana Oliveira",
    role: "Cliente desde 2021",
    content:
      "Fiz a aplicação de película e instalação de alarme no meu carro. Serviço impecável, acabamento perfeito e atendimento nota 10. Voltarei com certeza para outros serviços.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Marcos Santos",
    role: "Cliente desde 2020",
    content:
      "Envelopei meu carro na Like Kar e o resultado superou minhas expectativas. Trabalho de altíssima qualidade, acabamento perfeito e atendimento excelente. Super recomendo!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A satisfação dos nossos clientes é o nosso maior orgulho. Confira alguns depoimentos de quem já transformou
            seu veículo conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
