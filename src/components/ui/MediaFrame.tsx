import Image from 'next/image'
import { MEDIA, type MediaKey } from '@/content/media'
import { cn } from '@/lib/utils'

/** Relaciones de aspecto del sitio, calcadas del ritmo de la referencia. */
const RATIOS = {
  wide: 'aspect-16/10',
  landscape: 'aspect-4/3',
  panorama: 'aspect-21/9',
  square: 'aspect-square',
  portrait: 'aspect-3/4',
  /** Sin relación fija: la altura la impone el contenedor (paneles a sangre). */
  fill: 'h-full',
} as const

interface MediaFrameProps {
  media: MediaKey
  ratio?: keyof typeof RATIOS
  className?: string
  /** Valor de `sizes`; ajústalo al ancho real que ocupa la imagen en cada breakpoint. */
  sizes?: string
  priority?: boolean
  /** Velo navy sobre la foto, para que el texto superpuesto mantenga contraste. */
  overlay?: 'none' | 'soft' | 'strong' | 'bottom'
  /** Zoom lento en hover. Solo tiene sentido si el marco es un enlace. */
  zoomOnHover?: boolean
  children?: React.ReactNode
}

const OVERLAYS = {
  none: null,
  soft: 'bg-navy-950/35',
  strong: 'bg-navy-950/65',
  bottom: 'bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent',
} as const

/**
 * Contenedor estándar de imagen: recorta con `object-cover`, admite un velo para
 * garantizar contraste del texto encima y acepta hijos posicionados sobre la foto.
 */
export function MediaFrame({
  media,
  ratio = 'wide',
  className,
  sizes = '100vw',
  priority = false,
  overlay = 'none',
  zoomOnHover = false,
  children,
}: MediaFrameProps) {
  const image = MEDIA[media]

  return (
    <div className={cn('relative overflow-hidden bg-navy-900', RATIOS[ratio], className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'object-cover',
          zoomOnHover && 'transition-transform duration-700 ease-out group-hover:scale-105',
        )}
      />

      {OVERLAYS[overlay] ? (
        <div className={cn('absolute inset-0', OVERLAYS[overlay])} aria-hidden="true" />
      ) : null}

      {children ? <div className="absolute inset-0">{children}</div> : null}
    </div>
  )
}
