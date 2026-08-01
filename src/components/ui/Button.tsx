import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Cada variante asume la superficie sobre la que vive, y de ahí salen su color
 * de reposo y el del barrido de hover:
 *
 * - `primary`  peach sobre navy. La acción principal.
 * - `outline`  solo contorno, sobre navy o sobre fotografía.
 * - `onPaper`  navy sobre papel. La acción de las secciones claras.
 *
 * No hay variante peach para superficie clara porque hoy no se necesita. Si
 * llega a hacer falta, no vale reutilizar `primary`: su barrido es blanco y
 * sobre papel el botón se quedaría sin límites al pasar el cursor.
 */
type ButtonVariant = 'primary' | 'outline' | 'onPaper'

interface BaseProps {
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
  /** Oculta la flecha en acciones que no llevan a otro sitio (enviar, cerrar). */
  withArrow?: boolean
}

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>)
    | ({ href?: undefined } & Omit<React.ComponentProps<'button'>, 'className'>)
  )

/*
 * El relleno de hover barre desde la izquierda con `scaleX`, que se resuelve en
 * la capa de composición. Animar el color de fondo obligaría a repintar el botón
 * entero en cada fotograma.
 */
const SWEEP = {
  /*
   * Blanco, no navy. El botón peach va siempre sobre superficie oscura, y
   * aclararlo al pasar el cursor lo separa del fondo en vez de fundirlo con él.
   * Barrer a navy sobre una sección navy hacía que el botón pareciera apagarse.
   *
   * Esto vale porque `primary` es la variante de superficie oscura. Un botón
   * peach sobre papel tendría que barrer a navy: en blanco sobre blanco el
   * relleno desaparecería y el botón se quedaría sin límites.
   */
  primary: 'bg-white',
  outline: 'bg-white',
  onPaper: 'bg-terracota-500',
} as const satisfies Record<ButtonVariant, string>

const SURFACE = {
  primary: 'bg-terracota-500 text-navy-950',
  /* Sin fondo: la variante se apoya en el anillo y deja ver la fotografía. */
  outline: 'text-white',
  onPaper: 'bg-navy-950 text-white',
} as const satisfies Record<ButtonVariant, string>

/*
 * Color del texto una vez el barrido ha cubierto el botón.
 *
 * `primary` mantiene el navy que ya tenía en reposo: pasa de navy sobre peach
 * (7.4:1) a navy sobre blanco (19.9:1), así que el texto nunca cambia de color
 * y no hay un instante intermedio de bajo contraste durante el barrido.
 */
const SURFACE_HOVER = {
  primary: 'group-hover:text-navy-950 group-focus-visible:text-navy-950',
  outline: 'group-hover:text-navy-950 group-focus-visible:text-navy-950',
  onPaper: 'group-hover:text-navy-950 group-focus-visible:text-navy-950',
} as const satisfies Record<ButtonVariant, string>

/**
 * Acción principal del sitio.
 *
 * Lleva el bisel de marca en las mismas dos esquinas que el resto de piezas.
 * `clip-path` recorta cualquier borde en las diagonales, así que la variante
 * `outline` dibuja su contorno con `.bevel-ring`: un anillo por máscara que
 * sigue el corte y deja el interior transparente, necesario porque este botón
 * vive sobre la fotografía del hero.
 *
 * Alto mínimo de 48 px en todas las variantes, incluido el móvil, para cumplir
 * el área táctil de Material y HIG.
 */
export function Button({
  children,
  variant = 'primary',
  className,
  withArrow = true,
  ...props
}: ButtonProps) {
  const outline = variant === 'outline'

  const content = (
    <>
      {/* Barrido de hover. Decorativo: no aporta significado por sí solo. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-soft)]',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
          SWEEP[variant],
        )}
      />

      {outline && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bevel-sm bevel-ring text-white/40 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white"
        />
      )}

      <span
        className={cn(
          'relative flex items-center gap-3 transition-colors duration-300',
          SURFACE_HOVER[variant],
        )}
      >
        {children}
        {withArrow && (
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
          />
        )}
      </span>
    </>
  )

  const shared = cn(
    'group relative inline-flex min-h-12 cursor-pointer items-center justify-center overflow-hidden',
    'bevel-sm px-7 py-3.5 font-mono text-label uppercase',
    'disabled:pointer-events-none disabled:opacity-50',
    SURFACE[variant],
    className,
  )

  /*
   * Se desestructura una sola vez y se reparte según haya destino o no. El tipo
   * público de arriba ya obliga a que los atributos correspondan al elemento que
   * se va a renderizar; aquí dentro la unión se ha perdido, y la aserción evita
   * duplicar toda la firma por rama.
   */
  const { href, ...rest } = props

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={shared}
        {...(rest as Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button className={shared} {...(rest as Omit<React.ComponentProps<'button'>, 'className'>)}>
      {content}
    </button>
  )
}
