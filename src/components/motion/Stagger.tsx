'use client'

import { motion } from 'framer-motion'
import { ENTRANCE_VIEWPORT } from '@/components/motion/entrance'
import { MOTION } from '@/lib/constants'

interface StaggerProps {
  children: React.ReactNode
  className?: string
  /** Retraso antes de la primera pieza. */
  delay?: number
  /** Etiqueta a renderizar. Las listas deben seguir siendo `ul`. */
  as?: 'div' | 'ul' | 'ol'
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li'
}

/*
 * El escalonado se declara en el contenedor y se hereda por variantes. La
 * alternativa —calcular un `delay` por índice en cada sección— obliga a que
 * cada sitio de uso conozca el ritmo del sistema y se desincroniza en cuanto
 * uno cambia.
 */
const CONTAINER = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: MOTION.stagger, delayChildren: delay },
  }),
}

const ITEM = {
  hidden: { opacity: 0, y: MOTION.distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration.base, ease: MOTION.ease },
  },
}

/** Contenedor de una retícula o lista cuyas piezas entran una tras otra. */
export function Stagger({ children, className, delay = 0, as = 'div' }: StaggerProps) {
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      custom={delay}
      variants={CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={ENTRANCE_VIEWPORT}
    >
      {children}
    </Tag>
  )
}

/** Cada pieza dentro de un `<Stagger>`. Hereda el ritmo del contenedor. */
export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const Tag = motion[as]

  return (
    <Tag data-reveal className={className} variants={ITEM}>
      {children}
    </Tag>
  )
}
