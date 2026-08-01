import { SITE } from '@/lib/constants'
import type { HeadlineLine } from '@/types/content'

/**
 * Textos institucionales. Provienen literalmente del brief del cliente, salvo la
 * normalización del nombre de la empresa: el brief alternaba "Ventori" y
 * "Venturi"; se unificó en `SITE.name`.
 */
export const ABOUT = {
  eyebrow: 'Quiénes somos',
  heading: 'Soluciones técnicas integrales para la infraestructura del país',
  paragraphs: [
    `En ${SITE.name} somos una empresa colombiana especializada en ingeniería, consultoría e interventoría, enfocada en desarrollar soluciones técnicas integrales para proyectos de infraestructura pública y privada.`,
    'Trabajamos con altos estándares de calidad, eficiencia e innovación, acompañando a nuestros clientes en cada etapa del proyecto, desde la planeación y estructuración hasta la ejecución, supervisión y cierre, garantizando el cumplimiento de los objetivos técnicos, financieros, ambientales y sociales.',
    'Nuestro compromiso es generar proyectos sostenibles que contribuyan al desarrollo del territorio, optimizando recursos y creando valor para nuestros clientes y las comunidades.',
  ],
} as const

export const MISSION = {
  eyebrow: 'Misión',
  text: 'Desarrollamos soluciones integrales en ingeniería, consultoría e interventoría mediante un equipo altamente calificado, ofreciendo servicios con excelencia técnica, innovación y compromiso para impulsar infraestructura sostenible, generar valor para nuestros clientes y contribuir al desarrollo del país.',
  icon: 'Target',
} as const

export const VISION = {
  eyebrow: 'Visión',
  text: 'Ser una empresa líder y referente en Colombia en servicios de ingeniería, consultoría e interventoría, reconocida por la calidad de nuestros proyectos, la innovación, la transparencia y nuestro compromiso con el desarrollo sostenible y el bienestar de las comunidades.',
  icon: 'Eye',
} as const

export const COMMITMENT = {
  eyebrow: 'Nuestro compromiso',
  heading: 'Cada proyecto es una oportunidad para generar desarrollo',
  text: `En ${SITE.name} creemos que cada proyecto representa una oportunidad para generar desarrollo. Por ello trabajamos con responsabilidad, ética y excelencia, ofreciendo soluciones que respondan a las necesidades de nuestros clientes y aporten al crecimiento sostenible de las regiones.`,
} as const

/** Copy del hero de la home. */
export const HERO = {
  /** Las tres disciplinas, listadas como piezas separadas para poder numerarlas. */
  disciplines: ['Ingeniería', 'Consultoría', 'Interventoría'],
  lines: [
    'Infraestructura',
    'que responde',
    { text: 'por sus resultados', accent: true },
  ] as const satisfies readonly HeadlineLine[],
  subheadline:
    'Acompañamos proyectos de infraestructura pública y privada en Colombia, desde la planeación y estructuración hasta la ejecución, supervisión y cierre.',
  primaryCta: 'Hablemos de tu proyecto',
  secondaryCta: 'Ver servicios',
  /** Texto del indicador de scroll, leído por lectores de pantalla. */
  scrollHint: 'Desplázate para continuar',
} as const

/** Copy de la banda de cierre, reutilizada en varias páginas. */
export const CTA_BAND = {
  eyebrow: 'Siguiente paso',
  lines: [
    '¿Tienes un proyecto',
    { text: 'de infraestructura', accent: true },
    'en marcha?',
  ] as const satisfies readonly HeadlineLine[],
  text: 'Cuéntanos en qué etapa está y qué necesitas resolver. Te respondemos con una propuesta de alcance concreta.',
  cta: 'Contáctanos',
} as const
