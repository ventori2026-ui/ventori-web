'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { MOTION, SITE } from '@/lib/constants'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/** Curva de desaceleración, para que el conteo no termine de golpe. */
function easeOut(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

/**
 * Cuenta de 0 al valor indicado la primera vez que entra en viewport.
 *
 * El valor final está siempre en el DOM vía `aria-label`, así que el conteo es
 * puramente visual. Con movimiento reducido la duración es 0 y el número
 * aparece directo; el render inicial es idéntico en servidor y cliente, de modo
 * que la preferencia no introduce desajustes de hidratación.
 */
export function Counter({ value, prefix = '', suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: MOTION.viewportMargin })
  const prefersReducedMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = prefersReducedMotion ? 0 : MOTION.counterDuration
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1)
      setDisplayed(Math.round(easeOut(progress) * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, prefersReducedMotion, value])

  const formatted = new Intl.NumberFormat(SITE.lang).format(displayed)

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  )
}
