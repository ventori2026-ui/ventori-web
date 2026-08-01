'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { ENTRANCE_VIEWPORT } from '@/components/motion/entrance'
import { MOTION } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface CounterProps {
  /** Valor final al que llega el conteo. */
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/** Curva de desaceleración del conteo, equivalente a `MOTION.ease` en valor. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

/**
 * Cifra que cuenta hasta su valor al entrar en viewport.
 *
 * El texto servido ya contiene el valor final: quien no tenga JavaScript, o
 * llegue con movimiento reducido, lee el dato correcto de inmediato. El conteo
 * solo se activa después, en el cliente.
 *
 * Las cifras van en `tabular` porque un contador con anchos variables
 * ensancha y estrecha su caja en cada fotograma, y el bloque entero tiembla.
 */
export function Counter({ value, prefix, suffix, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, ENTRANCE_VIEWPORT)
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView || prefersReducedMotion) return

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / MOTION.counterDuration, 1)
      setDisplay(Math.round(easeOut(progress) * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    /* No hace falta poner el valor en cero antes de arrancar: el primer
       fotograma llega con un progreso prácticamente nulo y lo deja ahí solo.
       Hacerlo aquí sería un `setState` síncrono dentro del efecto, con el
       render en cascada que eso provoca. */
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [inView, prefersReducedMotion, value])

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {prefix}
      {display.toLocaleString('es-CO')}
      {suffix}
    </span>
  )
}
