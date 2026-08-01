import type { MediaKey } from '@/content/media'

/**
 * Una línea de titular. El corte de línea es una decisión editorial declarada en
 * `content/`, no el resultado del ancho disponible: `<Headline>` revela línea a
 * línea y necesita saber dónde parte cada una.
 *
 * La forma de objeto marca la línea que va en terracota, siempre sobre navy.
 */
export type HeadlineLine = string | { text: string; accent?: boolean }

/** Nombres de icono admitidos. Se resuelven a componentes en `components/ui/Icon.tsx`. */
export type IconName =
  | 'ClipboardCheck'
  | 'ShieldCheck'
  | 'Compass'
  | 'Ruler'
  | 'HardHat'
  | 'Leaf'
  | 'FileText'
  | 'Users'
  | 'Route'
  | 'Building2'
  | 'Landmark'
  | 'LayoutGrid'
  | 'Globe2'
  | 'Briefcase'
  | 'Award'
  | 'Scale'
  | 'Lightbulb'
  | 'Handshake'
  | 'TrendingUp'
  | 'Target'
  | 'Eye'
  | 'Layers'
  | 'Network'
  | 'SearchCheck'
  | 'Truck'

export interface Service {
  /** Se usa como ancla en /servicios (`#${id}`). */
  id: string
  title: string
  /** Una línea para las tarjetas de la home. */
  summary: string
  /** Párrafo completo para la página de servicios. */
  description: string
  /** Entregables concretos, listados en la página de servicios. */
  deliverables: readonly string[]
  icon: IconName
}

export interface Sector {
  id: string
  title: string
  description: string
  icon: IconName
  /** Clave de `content/media.ts`; nunca una ruta de archivo. */
  media: MediaKey
}

/** Fase del ciclo de proyecto que se muestra en la sección de scroll fijo. */
export interface Pillar {
  id: string
  /** Palabra única de la lista lateral. */
  label: string
  title: string
  description: string
  media: MediaKey
}

export interface Differentiator {
  id: string
  title: string
  description: string
  icon: IconName
}

export interface Stat {
  id: string
  /** Valor numérico al que llega el contador. */
  value: number
  /** Se antepone al número, p. ej. "+". */
  prefix?: string
  /** Se pospone al número, p. ej. "km" o "%". */
  suffix?: string
  label: string
}

export interface Project {
  id: string
  title: string
  client: string
  location: string
  year: string
  scope: string
  /** Ruta dentro de /public. */
  image: string
  sectorId: Sector['id']
}
