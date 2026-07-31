import type { Differentiator } from '@/types/content'

/** "Por qué elegirnos" — los siete puntos del brief, con una línea de sustento. */
export const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    id: 'experiencia',
    title: 'Experiencia en proyectos de infraestructura',
    description:
      'Conocemos cómo se comporta un proyecto de infraestructura en campo, no solo en el papel.',
    icon: 'Award',
  },
  {
    id: 'equipo',
    title: 'Equipo profesional multidisciplinario',
    description:
      'Ingeniería, gestión ambiental, componente social, jurídico y financiero trabajando sobre el mismo proyecto.',
    icon: 'Users',
  },
  {
    id: 'normatividad',
    title: 'Cumplimiento de estándares técnicos y normativos',
    description:
      'Cada entregable se construye contra la norma aplicable y queda soportado documentalmente.',
    icon: 'Scale',
  },
  {
    id: 'soluciones-integrales',
    title: 'Soluciones integrales adaptadas a cada cliente',
    description: 'Ajustamos el alcance a la realidad del proyecto y de la entidad, no al revés.',
    icon: 'Layers',
  },
  {
    id: 'transparencia',
    title: 'Transparencia y responsabilidad en la ejecución',
    description:
      'Información clara y verificable en cada informe, con trazabilidad de las decisiones.',
    icon: 'SearchCheck',
  },
  {
    id: 'innovacion',
    title: 'Enfoque en innovación y sostenibilidad',
    description: 'Buscamos soluciones que optimicen recursos y sostengan su valor en el tiempo.',
    icon: 'Leaf',
  },
  {
    id: 'acompanamiento',
    title: 'Acompañamiento permanente en todas las fases',
    description:
      'Desde la planeación hasta el cierre, con el mismo equipo respondiendo por el proyecto.',
    icon: 'Handshake',
  },
] as const
