import Image from 'next/image'
import { Parallax } from '@/components/motion/Parallax'
import { MEDIA, type MediaKey } from '@/content/media'
import { cn } from '@/lib/utils'

interface MediaFrameProps {
  media: MediaKey
  /** Proporción del marco. La fotografía se recorta para llenarlo. */
  ratio?: 'portrait' | 'landscape' | 'square' | 'wide' | 'fill'
  /** Descriptor de anchos para el srcset. Sin él el navegador asume 100vw. */
  sizes: string
  /** Solo para la imagen que compite por ser el LCP de la página. */
  priority?: boolean
  /** Desactiva el parallax donde el marco ya está en movimiento por otra causa. */
  parallax?: boolean
  className?: string
  /** Capa opcional sobre la fotografía: pie de foto, índice, velo. */
  children?: React.ReactNode
}

const RATIOS = {
  portrait: 'aspect-3/4',
  landscape: 'aspect-4/3',
  square: 'aspect-square',
  wide: 'aspect-16/9',
  fill: 'h-full',
} as const

/**
 * Marco de fotografía con el bisel de marca.
 *
 * Toda la fotografía del sitio pasa por aquí, y esa es la razón de que el bisel
 * se lea como sistema y no como capricho: aparece siempre en las mismas dos
 * esquinas y con el mismo tamaño relativo.
 *
 * El alto y el ancho salen del manifiesto de `content/media.ts`, así que el
 * navegador reserva el espacio antes de descargar la imagen y el bloque no salta
 * (CLS). Con `fill` el espacio lo reserva la proporción del contenedor.
 */
export function MediaFrame({
  media,
  ratio = 'landscape',
  sizes,
  priority = false,
  parallax = true,
  className,
  children,
}: MediaFrameProps) {
  const asset = MEDIA[media]

  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  )

  return (
    <div className={cn('relative overflow-hidden bevel', RATIOS[ratio], className)}>
      {parallax ? <Parallax>{image}</Parallax> : image}
      {children}
    </div>
  )
}
