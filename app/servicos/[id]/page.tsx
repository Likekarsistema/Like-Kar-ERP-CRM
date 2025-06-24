import type { Metadata } from "next"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { ServiceGallery } from "./components/service-gallery"
import { ServiceDetail } from "./components/service-detail"
import { ServiceBenefits } from "./components/service-benefits"
import { ServiceProcess } from "./components/service-process"
import { ServiceSchedule } from "./components/service-schedule"

// This would be replaced with a database query in a real application
const getServiceData = (id: string) => {
  const services: Record<string, any> = {
    multimidia: {
      id: "multimidia",
      name: "Instalação de Central Multimídia",
      description: "Transforme a experiência a bordo do seu veículo com sistemas multimídia de última geração.",
      longDescription: `<p>Nossa equipe especializada realiza a instalação de centrais multimídia com perfeição, garantindo que você tenha acesso a todas as funcionalidades modernas sem comprometer a estética original do seu veículo.</p><p>Trabalhamos com as melhores marcas do mercado, oferecendo sistemas compatíveis com Android Auto, Apple CarPlay, navegação GPS, câmeras de ré e muito mais.</p><p>Cada instalação é personalizada de acordo com o modelo do seu veículo, garantindo um acabamento impecável e funcionamento perfeito.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-S2diK8OO0ybiOSIEwwAigMuxyuwrOK.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-ifsUGR4ZZCvDuj0fMyKUAAQChkJB4A.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-STam4pwg2FS06UdpQcub95Hb3UbUhG.png",
      ],
      benefits: [
        "Compatibilidade com Android Auto e Apple CarPlay",
        "Navegação GPS integrada",
        "Conectividade Bluetooth avançada",
        "Integração com câmera de ré",
        "Controle por voz e comandos no volante",
        "Instalação profissional com garantia",
      ],
      process: [
        {
          title: "Avaliação Inicial",
          description: "Analisamos o modelo do seu veículo e suas necessidades específicas.",
        },
        {
          title: "Escolha do Equipamento",
          description: "Recomendamos as melhores opções de centrais multimídia compatíveis com seu veículo.",
        },
        {
          title: "Desmontagem Cuidadosa",
          description: "Removemos os componentes originais com técnicas que preservam o interior do veículo.",
        },
        {
          title: "Instalação Profissional",
          description: "Realizamos a instalação com cabeamento de alta qualidade e conexões seguras.",
        },
        {
          title: "Configuração Completa",
          description: "Configuramos todas as funcionalidades e integramos com os sistemas do veículo.",
        },
        {
          title: "Testes e Ajustes",
          description: "Realizamos testes completos para garantir o funcionamento perfeito.",
        },
      ],
      faq: [
        {
          question: "A instalação da central multimídia afeta a garantia do meu veículo?",
          answer:
            "Não. Nossa instalação é realizada por profissionais treinados que preservam a integridade dos sistemas originais do veículo, não afetando a garantia de fábrica.",
        },
        {
          question: "Quanto tempo leva para instalar uma central multimídia?",
          answer:
            "O tempo médio de instalação é de 4 a 6 horas, dependendo do modelo do veículo e da complexidade da instalação.",
        },
        {
          question: "Posso usar os controles originais do volante com a nova central?",
          answer:
            "Sim, utilizamos interfaces específicas que mantêm a funcionalidade dos controles do volante com a nova central multimídia.",
        },
        {
          question: "Vocês oferecem garantia para o serviço?",
          answer:
            "Sim, oferecemos garantia de 1 ano para o serviço de instalação, além da garantia do fabricante para o equipamento.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "4 a 6 horas",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation: "Recomendamos agendar com antecedência. Não é necessário deixar o veículo por mais de um dia.",
      },
      relatedServices: ["som", "alarmes", "engates"],
    },
    som: {
      id: "som",
      name: "Instalação de Som Automotivo",
      description: "Sistemas de som personalizados para uma experiência sonora excepcional em seu veículo.",
      longDescription: `<p>Transforme a experiência auditiva no seu veículo com nossos sistemas de som automotivo de alta qualidade. Nossa equipe especializada realiza instalações personalizadas que garantem o melhor desempenho acústico possível.</p><p>Trabalhamos com as melhores marcas do mercado, oferecendo alto-falantes, amplificadores, subwoofers e processadores de áudio que proporcionam uma qualidade sonora excepcional.</p><p>Cada instalação é projetada considerando as características acústicas específicas do seu veículo, garantindo o melhor resultado possível.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Auxq1FUwx4yBaT956m2P28rxcUNvom.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-wCYjxOoLlP471PbLXYBFyNWwyHuKti.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-1hWfCt7dGroX4XMivWVhJQ9nnrSEZK.png",
      ],
      benefits: [
        "Qualidade sonora superior",
        "Instalação profissional com isolamento acústico",
        "Sistemas personalizados para cada veículo",
        "Marcas premium com garantia",
        "Preservação da estética original",
        "Calibração profissional para o melhor desempenho",
      ],
      process: [
        {
          title: "Avaliação Acústica",
          description: "Analisamos as características acústicas do seu veículo para determinar a melhor configuração.",
        },
        {
          title: "Projeto Personalizado",
          description: "Desenvolvemos um projeto que atende às suas preferências e ao espaço disponível no veículo.",
        },
        {
          title: "Preparação do Veículo",
          description: "Realizamos o isolamento acústico necessário para melhorar a performance do sistema.",
        },
        {
          title: "Instalação dos Componentes",
          description: "Instalamos alto-falantes, amplificadores e subwoofers com técnicas profissionais.",
        },
        {
          title: "Cabeamento de Alta Qualidade",
          description: "Utilizamos cabos de alta qualidade e conexões seguras para evitar interferências.",
        },
        {
          title: "Calibração e Ajustes",
          description: "Realizamos a calibração completa do sistema para obter o melhor desempenho sonoro.",
        },
      ],
      faq: [
        {
          question: "A instalação de som consome muita bateria do carro?",
          answer:
            "Sistemas bem dimensionados e instalados corretamente não sobrecarregam a bateria do veículo. Em casos de sistemas mais potentes, podemos recomendar o upgrade da bateria ou a instalação de capacitores.",
        },
        {
          question: "É possível manter a aparência original do interior do veículo?",
          answer:
            "Sim, realizamos instalações discretas que preservam a estética original do veículo, com acabamento de fábrica.",
        },
        {
          question: "Quanto tempo leva para instalar um sistema de som completo?",
          answer:
            "O tempo médio varia de 6 a 8 horas para sistemas completos, podendo ser mais para instalações complexas com caixas personalizadas.",
        },
        {
          question: "Vocês oferecem garantia para o serviço?",
          answer:
            "Sim, oferecemos garantia de 1 ano para o serviço de instalação, além da garantia do fabricante para os equipamentos.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "6 a 8 horas",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation:
          "Recomendamos agendar com antecedência. Para sistemas completos, pode ser necessário deixar o veículo por um dia.",
      },
      relatedServices: ["multimidia", "caixa-som", "alarmes"],
    },
    peliculas: {
      id: "peliculas",
      name: "Insulfilm Profissional",
      description: "Proteção solar, privacidade e segurança com películas de alta qualidade e instalação profissional.",
      longDescription: `<p>Nosso Insulfilm Profissional oferece proteção contra os raios UV, redução de calor, privacidade e segurança para seu veículo. Trabalhamos com as melhores marcas do mercado, garantindo durabilidade e qualidade superior.</p><p>A aplicação é realizada em ambiente controlado, livre de poeira e contaminantes, por profissionais especializados que garantem um acabamento perfeito, sem bolhas ou imperfeições.</p><p>O Insulfilm Profissional oferece boa visibilidade e é ideal para quem busca qualidade com excelente custo-benefício, com garantia de 5 anos contra descolamento, bolhas e descoloração.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-632S0LIoUOSoeSpb06MRmg9SzQA3R2.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17-vEnFvoGKUHDsFCFaT4P2lnxNz1Rz4K.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-n3ZXXQjH0rtGlYkEhSHWG5ACQDH7eb.png",
      ],
      benefits: [
        "Proteção contra até 99% dos raios UV",
        "Redução de calor interno",
        "Maior privacidade e segurança",
        "Proteção contra estilhaçamento dos vidros",
        "Aplicação profissional sem bolhas",
        "Garantia de 5 anos",
      ],
      process: [
        {
          title: "Limpeza Profunda",
          description: "Realizamos uma limpeza minuciosa dos vidros para remover qualquer resíduo.",
        },
        {
          title: "Corte Preciso",
          description: "Utilizamos tecnologia de corte computadorizado para garantir o encaixe perfeito.",
        },
        {
          title: "Aplicação em Ambiente Controlado",
          description: "Trabalhamos em ambiente livre de poeira para evitar imperfeições.",
        },
        {
          title: "Técnica Profissional",
          description: "Aplicamos a película com técnicas que eliminam bolhas e imperfeições.",
        },
        {
          title: "Acabamento de Bordas",
          description: "Realizamos um acabamento perfeito nas bordas para maior durabilidade.",
        },
        {
          title: "Inspeção Final",
          description: "Verificamos minuciosamente toda a aplicação para garantir a qualidade.",
        },
      ],
      faq: [
        {
          question: "Qual é o tempo de cura da película após a aplicação?",
          answer:
            "O tempo de cura varia de 3 a 7 dias, dependendo das condições climáticas. Durante este período, recomendamos não abrir os vidros do veículo.",
        },
        {
          question: "As películas interferem nos sinais de celular ou GPS?",
          answer:
            "Não, nossas películas modernas não interferem em sinais eletrônicos como celular, GPS ou passes de pedágio.",
        },
        {
          question: "Quanto tempo dura a aplicação de película em um carro completo?",
          answer: "A aplicação completa leva em média 3 a 4 horas, dependendo do modelo do veículo.",
        },
        {
          question: "Vocês oferecem garantia para o serviço?",
          answer:
            "Sim, oferecemos garantia de 5 anos contra descolamento, bolhas e descoloração para nosso Insulfilm Profissional.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "3 a 4 horas",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation:
          "Recomendamos agendar com antecedência. Após a aplicação, o veículo não deve ser lavado por 7 dias.",
      },
      relatedServices: ["insulfilm-premium", "insulfilm-antivandalismo", "envelopamento"],
    },
    envelopamento: {
      id: "envelopamento",
      name: "Envelopamento Automotivo",
      description: "Transforme o visual do seu veículo com envelopamento de alta qualidade e acabamento impecável.",
      longDescription: `<p>Nosso serviço de envelopamento automotivo oferece uma transformação completa para o visual do seu veículo, com proteção para a pintura original e possibilidades infinitas de personalização.</p><p>Trabalhamos com materiais de alta qualidade das melhores marcas do mercado, garantindo durabilidade, resistência e acabamento perfeito.</p><p>A aplicação é realizada por profissionais especializados em ambiente controlado, garantindo um resultado impecável.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-sw8xbd7m4mojLbFX9Iho2cAbjzfYVq.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-GGNPqDhS8pkBgLxfEaFpZMlfBIVLV3.png",
      ],
      benefits: [
        "Proteção da pintura original",
        "Personalização completa do veículo",
        "Fácil manutenção e limpeza",
        "Remoção sem danos à pintura",
        "Resistência a raios UV e intempéries",
        "Aplicação profissional com garantia",
      ],
      process: [
        {
          title: "Avaliação do Veículo",
          description: "Analisamos o estado da pintura e as características do veículo.",
        },
        {
          title: "Preparação da Superfície",
          description: "Realizamos limpeza profunda e correção de imperfeições na pintura.",
        },
        {
          title: "Desmontagem de Peças",
          description: "Removemos peças necessárias para garantir aplicação perfeita nas bordas.",
        },
        {
          title: "Aplicação do Vinil",
          description: "Aplicamos o material com técnicas profissionais que garantem acabamento perfeito.",
        },
        {
          title: "Acabamento de Detalhes",
          description: "Realizamos acabamento minucioso em recortes e bordas.",
        },
        {
          title: "Remontagem e Inspeção",
          description: "Remontamos as peças e realizamos inspeção final de qualidade.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "1 a 3 dias",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation: "Recomendamos agendar com antecedência. O veículo deve ficar conosco durante todo o processo.",
      },
      relatedServices: ["peliculas", "ppf", "insulfilm-premium"],
    },
    alarmes: {
      id: "alarmes",
      name: "Instalação de Alarmes e Rastreadores",
      description: "Proteja seu investimento com sistemas de segurança avançados e monitoramento em tempo real.",
      longDescription: `<p>Nossos sistemas de alarme e rastreamento oferecem proteção completa para seu veículo, com tecnologia avançada e monitoramento em tempo real.</p><p>Trabalhamos com as melhores marcas do mercado, oferecendo soluções que vão desde alarmes convencionais até sistemas completos de rastreamento via GPS e bloqueadores.</p><p>A instalação é realizada por técnicos especializados, garantindo a integração perfeita com os sistemas originais do veículo.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-PTGmkyxcKms5YZQvZbLYc4TBpBXQvM.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-NGgqasDXIjK9VICgfAh7ryCCjEnMXP.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-K8DaZpAEVTpJxR8UmKSoWwoIuFbv6f.png",
      ],
      benefits: [
        "Proteção contra furto e roubo",
        "Monitoramento em tempo real",
        "Bloqueio remoto do veículo",
        "Alertas de violação via aplicativo",
        "Instalação discreta e profissional",
        "Garantia e suporte técnico",
      ],
      process: [
        {
          title: "Avaliação de Segurança",
          description: "Analisamos as necessidades específicas de segurança do seu veículo.",
        },
        {
          title: "Escolha do Sistema",
          description: "Recomendamos o sistema mais adequado para suas necessidades.",
        },
        {
          title: "Instalação Profissional",
          description: "Realizamos a instalação com técnicas que preservam a integridade do veículo.",
        },
        {
          title: "Configuração do Sistema",
          description: "Configuramos todas as funcionalidades e integramos com seu smartphone.",
        },
        {
          title: "Testes de Segurança",
          description: "Realizamos testes completos para garantir o funcionamento perfeito.",
        },
        {
          title: "Orientação de Uso",
          description: "Explicamos detalhadamente como utilizar todas as funcionalidades.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "3 a 5 horas",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation: "Recomendamos agendar com antecedência. O serviço geralmente é concluído no mesmo dia.",
      },
      relatedServices: ["multimidia", "som", "engates"],
    },
    engates: {
      id: "engates",
      name: "Instalação de Engates",
      description: "Instalação profissional de engates para reboque com segurança e qualidade garantidas.",
      longDescription: `<p>Realizamos a instalação de engates homologados para diversos modelos de veículos, garantindo segurança e qualidade.</p><p>Trabalhamos com as melhores marcas do mercado, oferecendo produtos homologados pelo INMETRO e que atendem às normas de segurança.</p><p>A instalação é realizada por profissionais especializados, garantindo a fixação correta e segura do engate ao veículo.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-N1Tmsguh0EV6tv9P4eunogaMsgoFkl.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-69ilK3htJuLYNtoFVQj0KSZeWW0pBX.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17-vEnFvoGKUHDsFCFaT4P2lnxNz1Rz4K.png",
      ],
      benefits: [
        "Engates homologados pelo INMETRO",
        "Instalação profissional e segura",
        "Compatibilidade garantida com seu veículo",
        "Não afeta a garantia do veículo",
        "Documentação completa fornecida",
        "Garantia do produto e da instalação",
      ],
      process: [
        {
          title: "Verificação do Modelo",
          description: "Confirmamos o modelo exato do engate compatível com seu veículo.",
        },
        {
          title: "Preparação do Veículo",
          description: "Preparamos o veículo para a instalação, removendo peças necessárias.",
        },
        {
          title: "Fixação do Engate",
          description: "Realizamos a fixação do engate seguindo as especificações do fabricante.",
        },
        {
          title: "Instalação Elétrica",
          description: "Instalamos a parte elétrica para funcionamento das luzes do reboque.",
        },
        {
          title: "Acabamento",
          description: "Realizamos o acabamento para garantir a estética e funcionalidade.",
        },
        {
          title: "Teste de Carga",
          description: "Realizamos testes para garantir a segurança e resistência da instalação.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "3 a 4 horas",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation: "Recomendamos agendar com antecedência. O serviço geralmente é concluído no mesmo dia.",
      },
      relatedServices: ["alarmes", "multimidia", "som"],
    },
    "insulfilm-residencial": {
      id: "insulfilm-residencial",
      name: "Insulfilm Residencial",
      description: "Proteção solar, privacidade e conforto térmico para sua casa ou escritório.",
      longDescription: `<p>Nosso serviço de Insulfilm Residencial oferece proteção solar, privacidade e conforto térmico para residências e escritórios.</p><p>Trabalhamos com películas de alta qualidade que bloqueiam até 99% dos raios UV e redu...</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23-mmzANDk9i4O5Ypz9V8ZUE8r0jyApBR.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
      ],
      benefits: [
        "Proteção contra até 99% dos raios UV",
        "Redução significativa do calor",
        "Maior privacidade",
        "Economia de energia",
        "Proteção contra estilhaçamento dos vidros",
        "Aplicação profissional com garantia",
      ],
      process: [
        {
          title: "Avaliação do Local",
          description: "Analisamos as características dos vidros e as necessidades específicas do ambiente.",
        },
        {
          title: "Escolha da Película",
          description: "Recomendamos o tipo de película mais adequado para suas necessidades.",
        },
        {
          title: "Limpeza dos Vidros",
          description: "Realizamos limpeza minuciosa dos vidros para garantir aderência perfeita.",
        },
        {
          title: "Aplicação Profissional",
          description: "Aplicamos a película com técnicas que eliminam bolhas e imperfeições.",
        },
        {
          title: "Acabamento de Bordas",
          description: "Realizamos acabamento perfeito nas bordas para maior durabilidade.",
        },
        {
          title: "Orientações de Cuidados",
          description: "Fornecemos orientações sobre cuidados e manutenção da película.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "Varia conforme o tamanho do projeto",
        location: "Atendemos em domicílio ou em nossa loja na Av. Bartolomeu de Carlos, 333",
        preparation: "Recomendamos agendar com antecedência. Realizamos visita técnica para orçamento.",
      },
      relatedServices: ["peliculas", "insulfilm-premium", "insulfilm-antivandalismo"],
    },
    ppf: {
      id: "ppf",
      name: "Película PPF",
      description: "Proteção invisível para a pintura do seu veículo contra riscos, impactos e intempéries.",
      longDescription: `<p>A Película de Proteção de Pintura (PPF) é uma solução avançada para proteger a pintura do seu veículo contra riscos, impactos, insetos e contaminantes.</p><p>Transparente e praticamente invisível, a PPF preserva a aparência original do veículo enquanto oferece proteção superior contra danos do dia a dia.</p><p>Aplicada por profissionais especializados, a película se regenera de pequenos riscos e tem propriedades hidrofóbicas que facilitam a limpeza.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/36-yB9pcNSxRXyQdehYP2JECR5aZkZRo6.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/37-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
      ],
      benefits: [
        "Proteção contra riscos e arranhões",
        "Resistência a impactos e pedras",
        "Propriedades auto-regenerativas",
        "Superfície hidrofóbica de fácil limpeza",
        "Preservação do valor do veículo",
        "Garantia de até 10 anos",
      ],
      process: [
        {
          title: "Avaliação do Veículo",
          description: "Analisamos o estado da pintura e as áreas que necessitam de proteção.",
        },
        {
          title: "Preparação da Superfície",
          description: "Realizamos limpeza profunda e correção de imperfeições na pintura.",
        },
        {
          title: "Corte Preciso",
          description: "Utilizamos tecnologia de corte computadorizado para garantir o encaixe perfeito.",
        },
        {
          title: "Aplicação Profissional",
          description: "Aplicamos a película com técnicas avançadas que garantem aderência perfeita.",
        },
        {
          title: "Acabamento de Bordas",
          description: "Realizamos acabamento minucioso nas bordas para maior durabilidade.",
        },
        {
          title: "Cura e Inspeção Final",
          description: "Permitimos o tempo de cura adequado e realizamos inspeção final de qualidade.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "1 a 2 dias",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation: "Recomendamos agendar com antecedência. O veículo deve ficar conosco durante todo o processo.",
      },
      relatedServices: ["envelopamento", "peliculas", "insulfilm-premium"],
    },
    "caixa-som": {
      id: "caixa-som",
      name: "Caixa de Som Personalizada",
      description: "Projetos personalizados de caixas acústicas para máxima performance sonora em seu veículo.",
      longDescription: `<p>Desenvolvemos projetos personalizados de caixas acústicas que maximizam a performance do seu sistema de som automotivo.</p><p>Cada projeto é desenvolvido considerando as características acústicas do seu veículo, o espaço disponível e suas preferências sonoras.</p><p>Utilizamos materiais de alta qualidade e técnicas avançadas de construção para garantir o melhor resultado sonoro possível.</p>`,
      mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30-TggyE2FcsI6psoRXWhCJx98xbvb2kH.png",
      gallery: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/31-kZvPajskdRbvbMncxj0cTQLDgRu3ln.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/32-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
      ],
      benefits: [
        "Projeto personalizado para seu veículo",
        "Máxima performance sonora",
        "Materiais de alta qualidade",
        "Acabamento premium",
        "Otimização do espaço disponível",
        "Garantia de qualidade",
      ],
      process: [
        {
          title: "Avaliação Acústica",
          description: "Analisamos as características acústicas do seu veículo e suas preferências sonoras.",
        },
        {
          title: "Projeto Personalizado",
          description: "Desenvolvemos um projeto que atende às suas necessidades e ao espaço disponível.",
        },
        {
          title: "Seleção de Materiais",
          description: "Selecionamos os melhores materiais para garantir durabilidade e qualidade sonora.",
        },
        {
          title: "Construção da Caixa",
          description: "Construímos a caixa acústica seguindo especificações técnicas precisas.",
        },
        {
          title: "Acabamento Premium",
          description: "Realizamos acabamento de alta qualidade que valoriza a estética do seu veículo.",
        },
        {
          title: "Instalação e Calibração",
          description: "Instalamos a caixa e calibramos o sistema para obter o melhor desempenho sonoro.",
        },
      ],
      schedule: {
        availability: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        duration: "3 a 7 dias",
        location: "Av. Bartolomeu de Carlos, 333 - Ao lado do Shopping Maia",
        preparation: "Recomendamos agendar uma consulta inicial para avaliação e orçamento.",
      },
      relatedServices: ["som", "multimidia", "alarmes"],
    },
  }

  // Return the service data or a default "not found" object
  return (
    services[id] || {
      id: "not-found",
      name: "Serviço não encontrado",
      description: "O serviço solicitado não foi encontrado.",
      longDescription: "<p>Desculpe, o serviço que você está procurando não está disponível.</p>",
      mainImage: "/placeholder.svg?height=400&width=600",
      gallery: [],
      benefits: [],
      process: [],
      faq: [],
      schedule: {
        availability: "",
        duration: "",
        location: "",
        preparation: "",
      },
      relatedServices: [],
    }
  )
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const service = getServiceData(params.id)

  return {
    title: `${service.name} | Like Kar`,
    description: service.description,
  }
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = getServiceData(params.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Service Gallery and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <ServiceGallery images={service.gallery} mainImage={service.mainImage} />
            <ServiceDetail service={service} />
          </div>

          {/* Benefits Section */}
          {service.benefits && service.benefits.length > 0 && <ServiceBenefits benefits={service.benefits} />}

          {/* Process Section */}
          {service.process && service.process.length > 0 && <ServiceProcess steps={service.process} />}

          {/* Schedule Section */}
          {service.schedule && <ServiceSchedule schedule={service.schedule} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
