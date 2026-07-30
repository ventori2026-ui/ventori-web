import type { Project } from '@/types/content'

/**
 * Proyectos de referencia.
 *
 * PENDIENTE DEL CLIENTE. Vacío a propósito: no se publican casos inventados.
 * Cuando lleguen los 4–8 proyectos con cliente, alcance, ubicación, año y foto,
 * se agregan aquí y `/proyectos` cambia sola del estado vacío a la grilla de
 * casos, sin tocar componentes.
 *
 * Ejemplo del formato esperado:
 *   {
 *     id: 'via-x',
 *     title: 'Mejoramiento del corredor vial X',
 *     client: 'Gobernación de …',
 *     location: 'Municipio, Departamento',
 *     year: '2025',
 *     scope: 'Interventoría técnica, administrativa y financiera',
 *     image: '/proyectos/via-x.jpg',
 *     sectorId: 'infraestructura-vial',
 *   }
 */
export const PROJECTS: readonly Project[] = [] as const

export const HAS_PROJECTS = PROJECTS.length > 0
