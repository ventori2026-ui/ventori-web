'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { MOTION } from '@/lib/constants'

/**
 * Viga de progreso en el borde superior de la ventana.
 *
 * Se lee como una de las vigas del isotipo avanzando: es la única pieza que
 * acompaña al usuario durante toda la página, así que se mantiene en 2 px y en
 * terracota, sin sombra ni brillo.
 *
 * `data-scroll-progress` la retira por completo con movimiento reducido, desde
 * `globals.css`: es movimiento continuo y sin carga informativa crítica.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, MOTION.spring)

  return (
    <motion.div
      data-scroll-progress
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-terracota-500"
    />
  )
}
