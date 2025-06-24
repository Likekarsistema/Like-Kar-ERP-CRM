import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIKE%20KAR%20%281%29-GhqLT1V6Xg5zFPyWk7o4TiKtJyIHdw.png"
                alt="LIKE KAR Logo - Loja de Som e Acessórios Automotivos em Guarulhos"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Há mais de 26 anos transformando carros e realizando sonhos com produtos e serviços de alta qualidade. A
              melhor loja de som e acessórios automotivos de Guarulhos, próxima ao Shopping Maia.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/lojaguarulhos/?locale=pt_BR"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Facebook da Like Kar"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/likekar_automotive/"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Instagram da Like Kar"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@likekar6754"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Canal do YouTube da Like Kar"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-400 after:-mb-2">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-400 after:-mb-2">
              Nossos Serviços
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 hover:text-yellow-400 transition-colors cursor-default">
                  Som Automotivo
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-yellow-400 transition-colors cursor-default">Películas</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-yellow-400 transition-colors cursor-default">Acessórios</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-yellow-400 transition-colors cursor-default">
                  Centrais Multimídia
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-yellow-400 transition-colors cursor-default">
                  Alarmes e Segurança
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-400 after:-mb-2">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Av. Bartolomeu de Carlos, 333
                  <br />
                  Jardim Flor da Montanha
                  <br />
                  Guarulhos - SP, 07097-420
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">(11) 4574-0701</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">contato@likekar.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>©2025 – Like kar. Todos os Direitos Reservados.</p>
          <p className="mt-2">
            Desenvolvido pela Agência{" "}
            <Link
              href="https://advanceyourcompany.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-all animate-pulse inline-flex items-center"
            >
              <span className="animate-text-gradient bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                Advance Your Company
              </span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
