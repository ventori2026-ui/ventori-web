'use client'

import { motion } from 'framer-motion'
import { MOTION } from '@/lib/constants'

/**
 * Entrada de página, montada desde `app/template.tsx`.
 *
 * Next remonta el template en cada navegación, así que basta con animar la
 * entrada: no hace falta `AnimatePresence` ni retener la página saliente, que
 * obligaría a mantener dos árboles en memoria y retrasaría el contenido nuevo.
 *
 * El recorrido es la mitad del de un bloque normal y el fundido va por delante
 * del desplazamiento. Una transición de página larga se interpone entre el
 * usuario y lo que ha pedido; esta solo tiene que hacer que el cambio no sea un
 * corte seco.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: MOTION.distance / 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION.duration.base, ease: MOTION.ease }}
    >
      {children}
    </motion.div>
  )
}
