import Link from "next/link"
import { Phone, Calendar } from "lucide-react"

export function CallToAction() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforme seu veículo com a excelência Like Kar</h2>
          <p className="text-gray-300 text-lg mb-8">
            Nossa equipe de especialistas está pronta para ajudá-lo a escolher os melhores produtos e serviços para seu
            veículo. Entre em contato hoje mesmo para uma consulta personalizada.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contato"
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Fale Conosco
            </Link>
            <Link
              href="/agendamento"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Agende uma Visita
            </Link>
          </div>

          <div className="mt-10 text-gray-400">
            <p>
              Atendemos em horário estendido de segunda a sábado. Consulte disponibilidade para serviços específicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
