import type { Pillar } from '@/types/content'

/**
 * Las tres fases del ciclo de proyecto, para la sección de scroll fijo.
 *
 * Es el equivalente al bloque Community/Creativity/Clients de la referencia:
 * una lista corta de palabras a la izquierda que se va activando mientras
 * pasan las tarjetas de la derecha. Las etiquetas son de una sola palabra a
 * propósito — a ese tamaño tipográfico, dos palabras rompen la columna.
 */
export const PILLARS: readonly Pillar[] = [
  {
    id: 'estructuracion',
    label: 'Estructuración',
    title: 'Antes de mover un metro cúbico',
    description:
      'Definimos alcance, evaluamos alternativas y dimensionamos costo y plazo. Un proyecto bien estructurado evita la mayoría de los sobrecostos que aparecen después en obra.',
    media: 'pillarEstructuracion',
  },
  {
    id: 'ejecucion',
    label: 'Ejecución',
    title: 'Control en el sitio, no en el escritorio',
    description:
      'Verificamos calidad de materiales, procedimientos constructivos y avance real frente a la programación, con presencia técnica permanente durante toda la obra.',
    media: 'pillarEjecucion',
  },
  {
    id: 'cierre',
    label: 'Cierre',
    title: 'Entregar es también documentar',
    description:
      'Liquidación, actas, planos de lo construido y soportes en orden. La obra queda operando y el expediente queda listo para cualquier auditoría posterior.',
    media: 'pillarCierre',
  },
] as const

/** Encabezado de la sección. */
export const PILLARS_INTRO = {
  eyebrow: 'Cómo trabajamos',
  heading: 'Acompañamos el proyecto en sus tres momentos críticos',
  text: 'Cada etapa tiene sus propios riesgos. Estar en las tres es lo que permite que las decisiones tempranas no se paguen caro al final.',
} as const
