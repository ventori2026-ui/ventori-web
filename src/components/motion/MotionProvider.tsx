'use client'

import { MotionConfig } from 'framer-motion'
import { MOTION } from '@/lib/constants'

/**
 * Raíz del sistema de movimiento.
 *
 * `reducedMotion="user"` deja que framer-motion consulte la preferencia del
 * sistema y desactive las animaciones de transform y layout, conservando las de
 * opacidad —que no producen sensación de movimiento—. Todas las primitivas se
 * construyen sobre transform precisamente por esto: al desactivarse, el
 * contenido queda en su posición final y legible sin ramificar el markup.
 *
 * Se resuelve aquí, y no con `useReducedMotion()` dentro de cada primitiva,
 * porque ese hook devuelve valores distintos en servidor y en cliente: dos
 * árboles diferentes rompían la hidratación. Las primitivas ligadas al scroll,
 * que framer no puede desactivar sola, sí lo consultan, pero solo para anular
 * el rango de salida —nunca para cambiar lo que se renderiza—.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: MOTION.duration.base, ease: MOTION.ease }}
    >
      {children}
    </MotionConfig>
  )
}
