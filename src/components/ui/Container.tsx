import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * `wide` para retículas y fotografía; `prose` para texto corrido, que a
   * partir de unos 75 caracteres por línea deja de leerse con comodidad.
   */
  width?: 'wide' | 'default' | 'prose'
}

const WIDTHS = {
  wide: 'max-w-[100rem]',
  default: 'max-w-7xl',
  prose: 'max-w-3xl',
} as const

/**
 * Ancho de contenido y márgenes laterales.
 *
 * Los márgenes crecen por breakpoint —24 px en móvil, 40 en tablet, 64 en
 * escritorio— porque un margen fijo que funciona en un teléfono deja el texto
 * pegado al borde en un monitor ancho.
 */
export function Container({ children, className, width = 'default' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-6 sm:px-10 lg:px-16', WIDTHS[width], className)}>
      {children}
    </div>
  )
}
