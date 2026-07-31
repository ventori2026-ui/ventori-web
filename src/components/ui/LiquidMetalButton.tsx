'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { LIQUID_METAL } from '@/lib/constants'
import { cn } from '@/lib/utils'

/**
 * Botón con un aro de metal líquido animado por WebGL, teñido a la terracota
 * de marca. Adaptado de jolyui.dev sobre `@paper-design/shaders`.
 *
 * Diferencias deliberadas respecto al original, todas por motivos concretos:
 *
 * - **El shader es el aro, no la cara.** El metal tiene bandas claras y oscuras
 *   en movimiento, así que ningún color de texto encima puede garantizar un
 *   ratio de contraste. La cara va en terracota sólida con la etiqueta en navy
 *   (7,4:1, AA), y el efecto queda en el perímetro, donde no hay texto.
 * - **Respeta `prefers-reduced-motion`.** Con la preferencia activa la
 *   velocidad es 0, lo que detiene el `requestAnimationFrame` de la librería
 *   por completo: queda un aro metálico estático, sin coste por fotograma.
 * - **Ancho fluido.** El original fijaba 142px con `white-space: nowrap`, y las
 *   etiquetas de este sitio ("Hablemos de tu proyecto") se desbordaban.
 * - **Conserva el foco de teclado.** El original hacía `outline: none` sin
 *   sustituto y anulaba el anillo de foco global del sitio.
 * - **Limpia bien.** El original llamaba a `destroy()`, que no existe en esta
 *   librería: el método es `dispose()`. Su limpieza no liberaba nada y cada
 *   desmontaje dejaba vivo un contexto WebGL.
 *
 * La librería ya pausa el shader cuando el elemento sale del viewport o la
 * pestaña se oculta, así que no hace falta observarlo desde aquí.
 */

interface LiquidMetalButtonBaseProps {
  children: React.ReactNode
  className?: string
  size?: 'md' | 'lg'
  withArrow?: boolean
}

const SIZES = {
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
} as const

function useLiquidMetal(enabled: boolean) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const mountRef = useRef<{ dispose: () => void; setSpeed: (n?: number) => void } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    const mount = async () => {
      const { ShaderMount, liquidMetalFragmentShader } = await import('@paper-design/shaders')
      if (cancelled || !containerRef.current) return

      mountRef.current = new ShaderMount(
        containerRef.current,
        liquidMetalFragmentShader,
        LIQUID_METAL.uniforms,
        undefined,
        // Velocidad 0 detiene el bucle de render: sin animación y sin coste.
        enabled ? LIQUID_METAL.speed.idle : 0,
      ) as unknown as typeof mountRef.current
    }

    void mount().catch(() => {
      // Sin WebGL el aro se queda en el degradado de respaldo del contenedor.
    })

    return () => {
      cancelled = true
      mountRef.current?.dispose()
      mountRef.current = null
    }
  }, [enabled])

  const setSpeed = (speed: number) => {
    if (enabled) mountRef.current?.setSpeed(speed)
  }

  return { containerRef, setSpeed }
}

function Shell({
  children,
  size = 'md',
  withArrow = false,
  containerRef,
}: Omit<LiquidMetalButtonBaseProps, 'className'> & {
  containerRef: React.RefObject<HTMLSpanElement | null>
}) {
  return (
    <>
      {/* Aro metálico. Decorativo: el nombre de la acción lo da la etiqueta. */}
      <span
        ref={containerRef}
        data-liquid-metal
        aria-hidden="true"
        /*
          El markup es idéntico con y sin movimiento reducido: la preferencia
          solo cambia la velocidad que se le pasa al shader, nunca las clases.
          Ramificarlo aquí rompía la hidratación, porque `useReducedMotion()`
          devuelve valores distintos en servidor y en cliente.
        */
        className="absolute inset-0 overflow-hidden rounded-full bg-linear-to-br from-terracota-300 via-terracota-500 to-terracota-700"
      />

      {/*
        Cara sólida: sostiene el texto y garantiza el contraste.

        Va a ancho completo del envoltorio a propósito. Si la cara se
        dimensionara por su contenido, bastaba con que el envoltorio se
        estirara —cosa que hace solo dentro de un contenedor flex— para que el
        aro asomara por el lado.
      */}
      <span
        className={cn(
          'relative z-10 flex w-full items-center justify-center gap-2 rounded-full bg-terracota-500 font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-300 group-hover:bg-terracota-400',
          SIZES[size],
        )}
      >
        {children}
        {withArrow ? (
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
            aria-hidden="true"
          />
        ) : null}
      </span>
    </>
  )
}

/**
 * `self-start` evita que un contenedor flex lo estire: sin ello, el aro se iba
 * a ancho completo mientras la cara conservaba su tamaño natural.
 *
 * `className` se aplica aquí, al elemento externo, y no a la cara. Puesto en la
 * cara, un `hidden lg:inline-flex` ocultaba el texto pero dejaba el aro
 * metálico visible en móvil.
 */
const WRAPPER =
  'group relative inline-flex self-start rounded-full p-[4px] transition-transform duration-300 active:scale-[0.98]'

interface LiquidMetalButtonLinkProps extends LiquidMetalButtonBaseProps {
  href: string
}

export function LiquidMetalButtonLink({ href, className, ...props }: LiquidMetalButtonLinkProps) {
  const prefersReducedMotion = useReducedMotion()
  const enabled = !prefersReducedMotion
  const { containerRef, setSpeed } = useLiquidMetal(enabled)

  return (
    <Link
      href={href}
      className={cn(WRAPPER, className)}
      onMouseEnter={() => setSpeed(LIQUID_METAL.speed.hover)}
      onMouseLeave={() => setSpeed(LIQUID_METAL.speed.idle)}
    >
      <Shell {...props} containerRef={containerRef} />
    </Link>
  )
}

interface LiquidMetalButtonProps
  extends
    LiquidMetalButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {}

export function LiquidMetalButton({
  children,
  className,
  size,
  withArrow,
  ...props
}: LiquidMetalButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const enabled = !prefersReducedMotion
  const { containerRef, setSpeed } = useLiquidMetal(enabled)

  return (
    <button
      className={cn(WRAPPER, 'disabled:cursor-not-allowed disabled:opacity-60', className)}
      onMouseEnter={() => setSpeed(LIQUID_METAL.speed.hover)}
      onMouseLeave={() => setSpeed(LIQUID_METAL.speed.idle)}
      {...props}
    >
      <Shell size={size} withArrow={withArrow} containerRef={containerRef}>
        {children}
      </Shell>
    </button>
  )
}
