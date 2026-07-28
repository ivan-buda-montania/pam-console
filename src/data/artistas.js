import { fechaRel } from "./seed";

// Perfiles de talento (solo lectura). Precios en MXN.
export const ARTISTAS = [
  {
    id: "art-1",
    nombreArtistico: "El Rayo de Linares",
    nombreReal: "Ramiro Salazar Treviño",
    genero: "Regional mexicano · Norteño",
    ciudadBase: "Monterrey, NL",
    bio: "Referente del corrido moderno con más de una década en los escenarios. Su show combina banda en vivo y una narrativa muy conectada con el público del norte del país.",
    color: "amber",
    tipo: "artista",
    redes: {
      instagram: "https://instagram.com/elrayodelinares",
      tiktok: "https://tiktok.com/@elrayodelinares",
      youtube: "https://youtube.com/@elrayodelinares",
      spotify: "https://open.spotify.com/artist/elrayodelinares",
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 380000,
      colaboracion: 140000,
      extras: [
        { id: "ext-1a", concepto: "Palenque (2 tandas)", precio: 460000 },
        { id: "ext-1b", concepto: "Meet & greet privado", precio: 65000 },
      ],
      notasNegociacion:
        "Flexibilidad de hasta 10% en fechas entre semana. No baja de $350k en fin de semana. Requiere anticipo del 50%.",
    },
    documentos: [
      { id: "doc-1a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "1.4 MB", fechaSubida: fechaRel(-120) },
      { id: "doc-1b", nombre: "Dossier artístico — El Rayo.pdf", tipo: "dossier", formato: "pdf", tamano: "8.2 MB", fechaSubida: fechaRel(-90) },
      { id: "doc-1c", nombre: "Rider técnico y hospitalidad.pdf", tipo: "rider", formato: "pdf", tamano: "820 KB", fechaSubida: fechaRel(-60) },
      { id: "doc-1d", nombre: "Acuerdo de confidencialidad.docx", tipo: "otro", formato: "docx", tamano: "48 KB", fechaSubida: fechaRel(-58) },
    ],
  },
  {
    id: "art-2",
    nombreArtistico: "Lucía Fernanda",
    nombreReal: "Lucía Fernanda Ontiveros Rangel",
    genero: "Pop · Balada",
    ciudadBase: "Ciudad de México",
    bio: "Cantautora con una voz versátil que transita entre la balada pop y el acústico íntimo. Fuerte presencia digital y base de fans joven.",
    color: "rose",
    tipo: "ambos",
    redes: {
      instagram: "https://instagram.com/luciafernanda",
      tiktok: "https://tiktok.com/@luciafernanda",
      youtube: "https://youtube.com/@luciafernanda",
      spotify: "https://open.spotify.com/artist/luciafernanda",
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 240000,
      colaboracion: 95000,
      extras: [
        { id: "ext-2a", concepto: "Show acústico privado", precio: 150000 },
        { id: "ext-2b", concepto: "Activación de marca (2 hrs)", precio: 110000 },
      ],
      notasNegociacion:
        "Ideal para activaciones de marca y eventos corporativos. Abierta a paquetes con contenido para redes.",
    },
    documentos: [
      { id: "doc-2a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "1.2 MB", fechaSubida: fechaRel(-110) },
      { id: "doc-2b", nombre: "Dossier — Lucía Fernanda.pdf", tipo: "dossier", formato: "pdf", tamano: "6.5 MB", fechaSubida: fechaRel(-85) },
      { id: "doc-2c", nombre: "Rider técnico.pdf", tipo: "rider", formato: "pdf", tamano: "540 KB", fechaSubida: fechaRel(-70) },
    ],
  },
  {
    id: "art-3",
    nombreArtistico: "Los Broncos del Norte",
    nombreReal: "Agrupación (7 integrantes)",
    genero: "Norteño-Banda",
    ciudadBase: "Culiacán, Sin.",
    bio: "Agrupación consolidada del norteño-banda con amplio catálogo de éxitos. Show de alto impacto para ferias, palenques y festivales masivos.",
    color: "emerald",
    tipo: "artista",
    redes: {
      instagram: "https://instagram.com/losbroncosdelnorte",
      tiktok: "https://tiktok.com/@losbroncosdelnorte",
      youtube: "https://youtube.com/@losbroncosdelnorte",
      spotify: "https://open.spotify.com/artist/losbroncosdelnorte",
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 520000,
      colaboracion: 180000,
      extras: [
        { id: "ext-3a", concepto: "Palenque (3 tandas)", precio: 680000 },
        { id: "ext-3b", concepto: "Hora extra de show", precio: 90000 },
      ],
      notasNegociacion:
        "Requiere producción de escenario grande y 3 camionetas de traslado. Cachet firme; margen en extras de hospitalidad.",
    },
    documentos: [
      { id: "doc-3a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "1.6 MB", fechaSubida: fechaRel(-130) },
      { id: "doc-3b", nombre: "Dossier — Los Broncos.pdf", tipo: "dossier", formato: "pdf", tamano: "11.4 MB", fechaSubida: fechaRel(-100) },
      { id: "doc-3c", nombre: "Rider técnico completo.pdf", tipo: "rider", formato: "pdf", tamano: "1.1 MB", fechaSubida: fechaRel(-95) },
      { id: "doc-3d", nombre: "Especificaciones de escenario.pdf", tipo: "rider", formato: "pdf", tamano: "760 KB", fechaSubida: fechaRel(-95) },
    ],
  },
  {
    id: "art-4",
    nombreArtistico: "DJ Katarsis",
    nombreReal: "Emilio Vázquez Luna",
    genero: "Electrónica · EDM / House",
    ciudadBase: "Guadalajara, Jal.",
    bio: "DJ y productor con sets de alta energía para clubes y festivales. Reconocido por su producción visual y transiciones en vivo.",
    color: "cyan",
    tipo: "artista",
    redes: {
      instagram: "https://instagram.com/djkatarsis",
      tiktok: "https://tiktok.com/@djkatarsis",
      youtube: "https://youtube.com/@djkatarsis",
      spotify: "https://open.spotify.com/artist/djkatarsis",
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 160000,
      colaboracion: 60000,
      extras: [
        { id: "ext-4a", concepto: "Set extendido B2B (3 hrs)", precio: 95000 },
        { id: "ext-4b", concepto: "Producción visual + LED", precio: 70000 },
      ],
      notasNegociacion:
        "Muy flexible en clubes entre semana. Cobra aparte la producción visual. Ideal para after y marcas jóvenes.",
    },
    documentos: [
      { id: "doc-4a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "980 KB", fechaSubida: fechaRel(-75) },
      { id: "doc-4b", nombre: "Dossier — DJ Katarsis.pdf", tipo: "dossier", formato: "pdf", tamano: "5.1 MB", fechaSubida: fechaRel(-70) },
      { id: "doc-4c", nombre: "Rider técnico (cabina).pdf", tipo: "rider", formato: "pdf", tamano: "420 KB", fechaSubida: fechaRel(-68) },
    ],
  },
  {
    id: "art-5",
    nombreArtistico: "Marisol Vega",
    nombreReal: "Marisol Vega Cházaro",
    genero: "Regional · Mariachi-pop",
    ciudadBase: "Guadalajara, Jal.",
    bio: "Voz potente del regional contemporáneo con fusiones de mariachi y pop. Elegante para eventos corporativos, bodas y galas.",
    color: "violet",
    tipo: "artista",
    redes: {
      instagram: "https://instagram.com/marisolvega",
      tiktok: "https://tiktok.com/@marisolvega",
      youtube: "https://youtube.com/@marisolvega",
      spotify: "https://open.spotify.com/artist/marisolvega",
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 300000,
      colaboracion: 120000,
      extras: [
        { id: "ext-5a", concepto: "Mariachi completo (12 músicos)", precio: 180000 },
        { id: "ext-5b", concepto: "Ceremonia + recepción (boda)", precio: 220000 },
      ],
      notasNegociacion:
        "Segmento premium. Muy solicitada para bodas de destino. Requiere backline de calidad y camerino privado.",
    },
    documentos: [
      { id: "doc-5a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "1.3 MB", fechaSubida: fechaRel(-105) },
      { id: "doc-5b", nombre: "Dossier — Marisol Vega.pdf", tipo: "dossier", formato: "pdf", tamano: "7.8 MB", fechaSubida: fechaRel(-88) },
      { id: "doc-5c", nombre: "Rider de hospitalidad.pdf", tipo: "rider", formato: "pdf", tamano: "610 KB", fechaSubida: fechaRel(-80) },
    ],
  },
  {
    id: "art-6",
    nombreArtistico: "Kalibre 22",
    nombreReal: "Grupo (5 integrantes)",
    genero: "Corridos tumbados · Trap corridos",
    ciudadBase: "Tijuana, BC",
    bio: "Proyecto joven en pleno ascenso dentro de los corridos tumbados. Explosión en plataformas y una base de fans muy activa en TikTok.",
    color: "lime",
    tipo: "ambos",
    redes: {
      instagram: "https://instagram.com/kalibre22",
      tiktok: "https://tiktok.com/@kalibre22",
      youtube: "https://youtube.com/@kalibre22",
      spotify: "https://open.spotify.com/artist/kalibre22",
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 280000,
      colaboracion: 130000,
      extras: [
        { id: "ext-6a", concepto: "Festival (slot headliner)", precio: 340000 },
        { id: "ext-6b", concepto: "Contenido para redes (día completo)", precio: 85000 },
      ],
      notasNegociacion:
        "Precio en alza por momentum en plataformas. Revisar tarifa cada trimestre. Prioriza festivales y fechas de alto alcance.",
    },
    documentos: [
      { id: "doc-6a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "1.1 MB", fechaSubida: fechaRel(-45) },
      { id: "doc-6b", nombre: "Dossier — Kalibre 22.pdf", tipo: "dossier", formato: "pdf", tamano: "9.0 MB", fechaSubida: fechaRel(-40) },
      { id: "doc-6c", nombre: "Rider técnico.pdf", tipo: "rider", formato: "pdf", tamano: "500 KB", fechaSubida: fechaRel(-38) },
    ],
  },
  {
    id: "art-7",
    nombreArtistico: "Valentina Ruiz",
    nombreReal: "Valentina Ruiz Contreras",
    genero: "Creadora de contenido · Lifestyle / Belleza",
    ciudadBase: "Ciudad de México",
    bio: "Creadora de contenido con una comunidad muy activa en Instagram y TikTok. Especialista en campañas de marca, unboxings y activaciones presenciales de alto alcance.",
    color: "sky",
    tipo: "influencer",
    redes: {
      instagram: "https://instagram.com/valentinaruiz",
      tiktok: "https://tiktok.com/@valentinaruiz",
      youtube: "https://youtube.com/@valentinaruiz",
      spotify: null,
    },
    manager: { nombre: "Poncho Arocha", telefono: "+52 81 1234 5678", email: "poncho@paManagement.mx" },
    precios: {
      conciertoBase: 0,
      colaboracion: 90000,
      extras: [
        { id: "ext-7a", concepto: "Campaña integral (3 piezas + stories)", precio: 150000 },
        { id: "ext-7b", concepto: "Aparición en evento + cobertura", precio: 120000 },
      ],
      notasNegociacion:
        "Tarifas por campaña, no por show. Muy fuerte en conversión para marcas de consumo. Paquetes trimestrales disponibles.",
    },
    documentos: [
      { id: "doc-7a", nombre: "Contrato marco 2026.pdf", tipo: "contrato", formato: "pdf", tamano: "0.9 MB", fechaSubida: fechaRel(-30) },
      { id: "doc-7b", nombre: "Media kit — Valentina Ruiz.pdf", tipo: "dossier", formato: "pdf", tamano: "4.2 MB", fechaSubida: fechaRel(-28) },
    ],
  },
];
