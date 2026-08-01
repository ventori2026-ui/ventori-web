'use client'

import { motion } from 'framer-motion'
import { entranceTriggerProps, type EntranceTrigger } from '@/components/motion/entrance'
import { MOTION } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface RuleProps {
  className?: string
  delay?: number
  /** Vertical para las reglas que separan columnas en escritorio. */
  orientation?: 'horizontal' | 'vertical'
  /** `mount` para lo que ya está en pantalla al cargar. Ver `entrance.ts`. */
  trigger?: EntranceTrigger
}

/**
 * Regla que se traza al entrar en viewport, como una línea de cota que se dibuja
 * sobre un plano.
 *
 * Acompaña siempre a un índice de sección: la línea termina de trazarse justo
 * cuando el titular empieza a subir, y esa secuencia es la que ordena la lectura
 * de cada bloque.
 *
 * Escala en un solo eje desde el origen, así que el navegador la resuelve en la
 * capa de composición y nunca provoca reflow.
 *
 * Son dos elementos y no uno por la misma razón que en `<Headline>`: el trazo
 * arranca en `scale 0`, su rectángulo visible mide cero y el navegador no lo
 * daría nunca por dentro del viewport. Quien observa es el envoltorio, que
 * conserva su caja.
 */
export function Rule({
  className,
  delay = 0,
  orientation = 'horizontal',
  trigger = 'view',
}: RuleProps) {
  const horizontal = orientation === 'horizontal'

  return (
    <motion.span
      aria-hidden="true"
      className={cn('block', horizontal ? 'h-px w-full' : 'h-full w-px', className)}
      {...entranceTriggerProps(trigger)}
    >
      <motion.span
        data-reveal
        className={cn(
          'block h-full w-full bg-current',
          horizontal ? 'origin-left' : 'origin-top',
        )}
        variants={{
          hidden: { scaleX: horizontal ? 0 : 1, scaleY: horizontal ? 1 : 0 },
          visible: {
            scaleX: 1,
            scaleY: 1,
            transition: { duration: MOTION.duration.slow, delay, ease: MOTION.ease },
          },
        }}
      />
    </motion.span>
  )
}
