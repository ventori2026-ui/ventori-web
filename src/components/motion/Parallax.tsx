'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { MOTION } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  /** Multiplicador del recorrido. 1 es el valor de `MOTION.parallax`. */
  strength?: number
}

/**
 * Desplaza su contenido en sentido contrario al scroll mientras la sección
 * cruza la pantalla.
 *
 * Pensado para envolver una imagen dentro de un marco con `overflow-hidden`. La
 * imagen debe ser más alta que el marco —de ahí el `scale` del contenedor— o el
 * desplazamiento dejaría ver el borde inferior.
 *
 * El recorrido es corto a propósito: un parallax largo desacopla la imagen de
 * su bloque y marea. `MOTION.parallax` está en 12 % del alto.
 *
 * `<MotionProvider />` no puede desactivar esto, porque no es una animación
 * declarativa sino un valor ligado al scroll. Se consulta la preferencia aquí y
 * se anula el rango de salida, de modo que lo que cambia es el valor, nunca el
 * árbol renderizado.
 */
export function Parallax({ children, className, strength = 1 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    /* De "el borde superior del elemento toca el borde inferior de la ventana"
       a "su borde inferior toca el superior": todo el cruce por pantalla. */
    offset: ['start end', 'end start'],
  })

  const distance = prefersReducedMotion ? 0 : MOTION.parallax * strength
  const y = useTransform(scrollYProgress, [0, 1], [`${-distance}%`, `${distance}%`])
  /* El muelle absorbe el scroll a saltos de rueda y trackpad, que sin suavizar
     hace que la imagen avance a tirones. */
  const smoothY = useSpring(y, MOTION.spring)

  return (
    <div ref={ref} className={cn('h-full w-full', className)}>
      {/*
        `relative` explícito: el hijo suele ser un `next/image` con `fill`, que
        se posiciona contra el ancestro posicionado más cercano. Sin esto
        dependería de que el `transform` cree el bloque contenedor, que es cierto
        pero deja de serlo en cuanto el transform se resuelve a `none`.

        La escala compensa el recorrido: sin ella, el desplazamiento dejaría ver
        el borde de la imagen dentro del marco.
      */}
      <motion.div style={{ y: smoothY }} className="relative h-full w-full scale-[1.15]">
        {children}
      </motion.div>
    </div>
  )
}
