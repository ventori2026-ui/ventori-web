'use client'

import { MotionConfig } from 'framer-motion'

/**
 * `reducedMotion="user"` deja que framer-motion consulte la preferencia del
 * sistema y desactive las animaciones de transform y layout, conservando las de
 * opacidad —que no producen sensación de movimiento—.
 *
 * Se resuelve aquí, y no ramificando el markup dentro de cada primitiva, porque
 * `useReducedMotion()` devuelve valores distintos en servidor y en cliente: dos
 * árboles diferentes rompían la hidratación.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
