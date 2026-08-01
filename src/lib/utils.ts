import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Tamaños de tipografía propios, declarados en `styles/tokens.css`.
 *
 * tailwind-merge solo conoce la escala por defecto (`text-xs` … `text-9xl`).
 * Cualquier otro `text-*` lo clasifica como color, así que sin registrarlos aquí
 * consideraría que `text-display-xl` y `text-white` son la misma propiedad y
 * descartaría el tamaño al fusionarlos —el titular se quedaba en 16 px—.
 */
const FONT_SIZES = ['display-sm', 'display-md', 'display-lg', 'display-xl', 'label'] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
    },
  },
})

/** Combina clases de Tailwind resolviendo conflictos a favor de la última. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Índice con cero a la izquierda: `0` → `"01"`.
 *
 * La numeración es visible en toda la interfaz —secciones, servicios, fases— y
 * arranca en 1 aunque el índice del arreglo arranque en 0, porque quien lee la
 * página cuenta desde uno.
 */
export function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}
