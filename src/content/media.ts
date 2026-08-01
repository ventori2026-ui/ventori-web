/**
 * GENERADO POR `npm run media` — no editar a mano.
 *
 * Fotografía y vídeo de ambientación descargados de Pexels. Los componentes
 * referencian estas claves, nunca rutas, para que sustituir un activo por
 * material propio de Ventori sea un cambio en un solo sitio.
 *
 * Créditos y licencias en public/media/CREDITS.md
 *
 * El vídeo del hero NO está aquí: es material propio de la empresa y vive en
 * `content/hero-video.ts`, fuera del alcance del generador.
 */

export interface MediaImage {
  src: string
  width: number
  height: number
  alt: string
}

export interface MediaVideo {
  src: string
  poster: string
  alt: string
}

export const MEDIA = {
  sectorVial: {
    src: '/media/sectorVial.jpg',
    width: 2400,
    height: 1350,
    alt: 'Vista aérea de una carretera de doble calzada atravesando el territorio',
  },
  sectorObrasCiviles: {
    src: '/media/sectorObrasCiviles.jpg',
    width: 2400,
    height: 1600,
    alt: 'Trabajos de estructura en concreto y acero de refuerzo',
  },
  sectorEquipamientos: {
    src: '/media/sectorEquipamientos.jpg',
    width: 2400,
    height: 1800,
    alt: 'Fachada de una edificación institucional contemporánea',
  },
  sectorUrbanismo: {
    src: '/media/sectorUrbanismo.jpg',
    width: 2400,
    height: 1350,
    alt: 'Vista cenital de la trama urbana de una ciudad',
  },
  sectorTerritorial: {
    src: '/media/sectorTerritorial.jpg',
    width: 2400,
    height: 1271,
    alt: 'Vista aérea del crecimiento urbano sobre el territorio',
  },
  sectorEntidades: {
    src: '/media/sectorEntidades.jpg',
    width: 2400,
    height: 1600,
    alt: 'Edificación institucional contemporánea de fachada acristalada',
  },
  sectorPrivadas: {
    src: '/media/sectorPrivadas.jpg',
    width: 2400,
    height: 1601,
    alt: 'Grúa torre sobre una obra de edificación en curso',
  },
  aboutSplit: {
    src: '/media/aboutSplit.jpg',
    width: 2400,
    height: 1600,
    alt: 'Equipo de ingeniería revisando planos en obra',
  },
  pillarEstructuracion: {
    src: '/media/pillarEstructuracion.jpg',
    width: 2400,
    height: 1600,
    alt: 'Planos técnicos y documentos sobre una mesa de trabajo',
  },
  pillarEjecucion: {
    src: '/media/pillarEjecucion.jpg',
    width: 2400,
    height: 1574,
    alt: 'Maquinaria pesada trabajando en la construcción de una vía',
  },
  pillarCierre: {
    src: '/media/pillarCierre.jpg',
    width: 2400,
    height: 1800,
    alt: 'Puente terminado y en servicio',
  },
  servicesSupport: {
    src: '/media/servicesSupport.jpg',
    width: 2400,
    height: 1600,
    alt: 'Topógrafo tomando mediciones con estación total en campo',
  },
  whyUs: {
    src: '/media/whyUs.jpg',
    width: 2400,
    height: 1601,
    alt: 'Profesionales de ingeniería coordinando trabajos en terreno',
  },
  ctaBand: {
    src: '/media/ctaBand.jpg',
    width: 2400,
    height: 1345,
    alt: 'Corredor vial al atardecer visto desde el aire',
  },
} as const satisfies Record<string, MediaImage>

export type MediaKey = keyof typeof MEDIA

