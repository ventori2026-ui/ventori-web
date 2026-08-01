'use client'

import { motion } from 'framer-motion'
import {
  entranceProps,
  entranceTriggerProps,
  type EntranceTrigger,
} from '@/components/motion/entrance'
import { MOTION } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Retraso en segundos, para escalonar elementos sueltos fuera de un `<Stagger>`. */
  delay?: number
  /** Dirección desde la que entra el contenido. */
  from?: 'bottom' | 'left' | 'right'
  /**
   * Recorta el contenido a su caja y lo hace entrar desde fuera en vez de
   * fundirlo en el sitio. Es la entrada de los bloques con peso —marcos de
   * imagen, bandas de color— y la que da la sensación de pieza que se coloca.
   */
  mask?: boolean
  /** `mount` para lo que ya está en pantalla al cargar. Ver `entrance.ts`. */
  trigger?: EntranceTrigger
}

const OFFSETS = {
  bottom: { y: MOTION.distance, x: 0 },
  left: { y: 0, x: -MOTION.distance },
  right: { y: 0, x: MOTION.distance },
} as const

/** Recorrido completo de la caja, para que la pieza entre desde fuera del marco. */
const MASK_OFFSETS = {
  bottom: { y: '100%', x: 0 },
  left: { y: 0, x: '-100%' },
  right: { y: 0, x: '100%' },
} as const

/**
 * Entrada estándar de bloque: fundido con desplazamiento.
 *
 * El movimiento reducido lo gobierna `<MotionProvider />`, que desactiva
 * transform y conserva la opacidad. Por eso la variante `mask` se construye con
 * `translate` y no con `clip-path`: al desactivarse el transform el contenido
 * queda en su posición final y visible, sin ramificar el markup. El atributo
 * `data-reveal` permite que el `<noscript>` del layout lo fuerce visible cuando
 * no hay JavaScript.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
  mask = false,
  trigger = 'view',
}: RevealProps) {
  if (!mask) {
    return (
      <motion.div
        data-reveal
        className={className}
        initial={{ opacity: 0, ...OFFSETS[from] }}
        {...entranceProps(trigger, { opacity: 1, x: 0, y: 0 })}
        transition={{ duration: MOTION.duration.base, delay, ease: MOTION.ease }}
      >
        {children}
      </motion.div>
    )
  }

  /*
   * En modo máscara el observador va en el envoltorio y el hijo se anima por
   * variantes. El hijo arranca desplazado una caja entera hacia fuera y el
   * `overflow-hidden` lo recorta por completo: su rectángulo visible mide cero y
   * el navegador nunca lo daría por dentro del viewport. Observando el
   * envoltorio —que no se transforma nunca— el disparo es fiable.
   */
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      {...entranceTriggerProps(trigger)}
    >
      <motion.div
        data-reveal
        /* El alto se propaga a la pieza interior, para que dos `<Reveal mask>`
           hermanos en una retícula igualen altura. */
        className="h-full"
        variants={{
          hidden: { opacity: 0, ...MASK_OFFSETS[from] },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: MOTION.duration.slow, delay, ease: MOTION.ease },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
