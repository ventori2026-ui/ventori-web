'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Barra fina de progreso de lectura, anclada bajo el header.
 *
 * Se oculta con movimiento reducido desde CSS (`globals.css`) y no con una rama
 * en JavaScript: así el markup de servidor y de cliente coincide.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      data-scroll-progress
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-terracota-500"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
