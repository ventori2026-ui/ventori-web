'use client'

import { motion } from 'framer-motion'
import { MOTION } from '@/lib/constants'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Retraso en segundos, para escalonar elementos que no están en un `<Stagger>`. */
  delay?: number
  /** Dirección desde la que entra el contenido. */
  from?: 'bottom' | 'left' | 'right'
}

const OFFSETS = {
  bottom: { y: MOTION.distance, x: 0 },
  left: { y: 0, x: -MOTION.distance },
  right: { y: 0, x: MOTION.distance },
} as const

/**
 * Entrada estándar del sitio: fade + desplazamiento corto al entrar en viewport.
 * Es el equivalente al reveal que usa la referencia en todas sus secciones.
 *
 * La preferencia de movimiento reducido la gobierna `<MotionProvider />`: el
 * desplazamiento se anula y solo queda el fundido. El atributo `data-reveal`
 * permite que el `<noscript>` del layout fuerce la visibilidad sin JavaScript.
 */
export function Reveal({ children, className, delay = 0, from = 'bottom' }: RevealProps) {
  const offset = OFFSETS[from]

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: MOTION.viewportMargin }}
      transition={{ duration: MOTION.duration, delay, ease: MOTION.ease }}
    >
      {children}
    </motion.div>
  )
}
