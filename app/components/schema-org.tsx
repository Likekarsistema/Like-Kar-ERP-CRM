export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "Like Kar - Loja de Som e Acessórios Automotivos",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIKE%20KAR%20%281%29-GhqLT1V6Xg5zFPyWk7o4TiKtJyIHdw.png",
    url: "https://www.likekar.com.br",
    telephone: "+551145740701",
    description:
      "Loja especializada em som automotivo, películas e acessórios para carros em Guarulhos. Localizada próximo ao Shopping Maia, oferecemos as melhores marcas do mercado.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida Bartolomeu de Carlos, 333",
      addressLocality: "Guarulhos",
      addressRegion: "SP",
      postalCode: "07097-420",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.4442101,
      longitude: -46.5388447,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:30",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/lojaguarulhos/",
      "https://www.instagram.com/likekar_automotive/",
      "https://www.youtube.com/@likekar6754",
    ],
    keywords:
      "som automotivo guarulhos, loja de som e acessórios guarulhos, acessórios automotivos shopping maia, películas automotivas guarulhos, central multimídia guarulhos, insulfilm guarulhos, loja de som perto do shopping maia",
    hasMap: "https://www.google.com/maps?cid=1742188542579335809",
    areaServed: ["Guarulhos", "São Paulo", "Jardim Flor da Montanha", "Vila Rio", "Maia"],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Localização",
        value: "Ao lado do Shopping Maia",
      },
      {
        "@type": "PropertyValue",
        name: "Referência",
        value: "Em frente ao Carrefour Vila Rio",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
