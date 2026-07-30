import type { Stat } from '@/types/content'

/**
 * Cifras de la barra de indicadores.
 *
 * PENDIENTE DEL CLIENTE. Deliberadamente vacío: no inventamos cifras de una
 * empresa real. Cuando lleguen los datos (proyectos ejecutados, años de
 * experiencia, municipios atendidos, km o m² intervenidos) se agregan aquí y la
 * sección aparece sola — `<StatsBar />` no se renderiza si el arreglo está vacío.
 *
 * Ejemplo del formato esperado:
 *   { id: 'proyectos', value: 120, prefix: '+', label: 'Proyectos ejecutados' }
 */
export const STATS: readonly Stat[] = [] as const

export const HAS_STATS = STATS.length > 0
