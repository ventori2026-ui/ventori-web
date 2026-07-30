import { cn } from '@/lib/utils'

/**
 * Isotipo de la marca (`public/icon.svg`) para uso decorativo: marcas de agua y
 * fondos de sección. Es puramente ornamental — el nombre de la marca siempre
 * llega por texto real, no por este glifo.
 */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 58.84 64.85"
      className={cn('fill-current', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M26.75,0v12.35l-10.7,6.17-1.81,1.05c-2.19,1.26-3.54,3.6-3.54,6.12v29.89l-8.02-4.63c-1.66-.96-2.68-2.73-2.68-4.64v-27.78c0-1.92,1.02-3.69,2.68-4.64l8.02-4.63,5.35-3.09L26.75,0Z" />
      <path d="M26.75,18.53v46.32l-8.02-4.63c-1.66-.96-2.68-2.73-2.68-4.64v-27.78c0-1.92,1.02-3.69,2.68-4.64l8.02-4.63Z" />
      <path d="M58.84,18.54v27.78c0,1.92-1.02,3.69-2.68,4.64l-8.02,4.63-5.35,3.09-10.7,6.17v-12.35l10.7-6.18,1.81-1.05c2.19-1.26,3.54-3.6,3.54-6.12V9.26l8.02,4.63c1.66.96,2.68,2.73,2.68,4.64Z" />
      <path d="M42.79,9.27v27.78c0,1.92-1.02,3.69-2.68,4.64l-8.02,4.63V0l8.02,4.63c1.66.96,2.68,2.73,2.68,4.64Z" />
    </svg>
  )
}
