export function HowToGetHere() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full opacity-5 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400 rounded-full opacity-5 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 transform transition-all duration-700 hover:scale-105">
          <div className="inline-flex items-center bg-yellow-100 text-black px-5 py-2 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Visite Nossa Loja</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Como Chegar à Like Kar</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Visite nossa loja de som e acessórios automotivos em Guarulhos, localizada próximo ao Shopping Maia. Fácil
            acesso e estacionamento disponível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mapa com animação de entrada */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-xl transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.7047859205787!2d-46.54103372374385!3d-23.444210077485786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef5193749e9e7%3A0xf1c5cd4321a5cb81!2sAv.%20Bartolomeu%20de%20Carlos%2C%20333%20-%20Jardim%20Flor%20da%20Montanha%2C%20Guarulhos%20-%20SP%2C%2007097-420!5e0!3m2!1spt-BR!2sbr!4v1709582431435!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Like Kar - Loja de Som e Acessórios Automotivos em Guarulhos"
              aria-label="Mapa mostrando a localização da Like Kar próximo ao Shopping Maia em Guarulhos"
            ></iframe>
          </div>

          {/* Informações com cards animados */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border-l-4 border-yellow-400">
              <div className="flex items-start">
                <div className="bg-yellow-400 p-3 rounded-full mr-4 transform transition-all duration-500 group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Nosso Endereço</h3>
                  <p className="text-gray-600 text-lg">
                    Av. Bartolomeu de Carlos, 333
                    <br />
                    Jardim Flor da Montanha
                    <br />
                    Guarulhos - SP
                    <br />
                    CEP: 07097-420
                  </p>
                  <div className="mt-3 text-yellow-500 font-medium">
                    ✓ Ao lado do Shopping Maia
                    <br />✓ Em frente ao Carrefour Vila Rio
                    <br />✓ Fácil acesso pela Rodovia Presidente Dutra
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border-l-4 border-yellow-400">
              <div className="flex items-start">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Horário de Funcionamento</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Segunda a Sexta: 8:30h às 18h</p>
                    <p>Sábado: 8:30h às 14h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border-l-4 border-yellow-400">
              <div className="flex items-start">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Contato</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Telefone: (11) 4574-0701</p>
                    <p>WhatsApp: (11) 4574-0701</p>
                    <p>Email: contato@likekar.com.br</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
