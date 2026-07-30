import type { Sector } from '@/types/content'

/**
 * Los siete sectores del brief. Títulos literales del cliente; descripciones
 * redactadas por nosotros, pendientes de su revisión.
 */
export const SECTORS: readonly Sector[] = [
  {
    id: 'infraestructura-vial',
    title: 'Infraestructura vial',
    description:
      'Vías urbanas y rurales, pavimentos, obras de drenaje y estructuras asociadas, desde el diagnóstico del corredor hasta la entrega de la obra.',
    icon: 'Route',
  },
  {
    id: 'obras-civiles',
    title: 'Obras civiles',
    description:
      'Estructuras, cimentaciones, redes y obras complementarias, con control de calidad sobre materiales y procedimientos constructivos.',
    icon: 'HardHat',
  },
  {
    id: 'equipamientos-publicos',
    title: 'Equipamientos públicos',
    description:
      'Instituciones educativas, centros de salud, escenarios deportivos y edificaciones institucionales al servicio de la comunidad.',
    icon: 'Building2',
  },
  {
    id: 'urbanismo',
    title: 'Urbanismo',
    description:
      'Espacio público, andenes, parques y proyectos de renovación urbana que mejoran la manera en que se habita la ciudad.',
    icon: 'LayoutGrid',
  },
  {
    id: 'desarrollo-territorial',
    title: 'Desarrollo territorial',
    description:
      'Proyectos que articulan infraestructura con planificación del territorio y con las prioridades de desarrollo de la región.',
    icon: 'Globe2',
  },
  {
    id: 'entidades-publicas',
    title: 'Entidades públicas',
    description:
      'Alcaldías, gobernaciones, institutos descentralizados y entidades del orden nacional, con el rigor documental que exige lo público.',
    icon: 'Landmark',
  },
  {
    id: 'empresas-privadas',
    title: 'Empresas privadas',
    description:
      'Constructoras, promotores e industria que requieren control técnico independiente sobre su inversión en infraestructura.',
    icon: 'Briefcase',
  },
] as const
