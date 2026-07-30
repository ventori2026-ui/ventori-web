import Image from 'next/image'
import { MEDIA, type MediaKey } from '@/content/media'
import { cn } from '@/lib/utils'

const TONES = {
  navy: 'bg-navy-950 text-white',
  navyDeep: 'bg-navy-900 text-white',
  terracota: 'bg-terracota-500 text-navy-950',
  light: 'bg-white text-navy-950',
} as const

interface SplitPanelProps {
  media: MediaKey
  children: React.ReactNode
  /** Lado que ocupa la fotografía en escritorio. En móvil siempre va arriba. */
  mediaSide?: 'left' | 'right'
  tone?: keyof typeof TONES
  /** Texto opcional superpuesto abajo a la izquierda de la foto. */
  caption?: React.ReactNode
  className?: string
}

/**
 * Mitad fotografía a sangre, mitad panel de color con contenido. Es el patrón
 * que la referencia repite en "Engineering Tomorrow" y "Build What Matters", y
 * aquí se reutiliza en cuatro secciones.
 *
 * La imagen no lleva relación de aspecto fija: se estira a la altura del panel,
 * con un mínimo para que en móvil no quede como una franja.
 */
export function SplitPanel({
  media,
  children,
  mediaSide = 'right',
  tone = 'navy',
  caption,
  className,
}: SplitPanelProps) {
  const image = MEDIA[media]

  return (
    <div className={cn('grid lg:grid-cols-2', className)}>
      <div
        className={cn(
          'relative min-h-[320px] overflow-hidden bg-navy-900 md:min-h-[420px] lg:min-h-[560px]',
          mediaSide === 'left' ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />

        {caption ? (
          <>
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">{caption}</div>
          </>
        ) : null}
      </div>

      <div
        className={cn(
          'flex flex-col justify-center px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-24',
          TONES[tone],
          mediaSide === 'left' ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        <div className="max-w-xl">{children}</div>
      </div>
    </div>
  )
}
