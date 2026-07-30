'use client'

import { motion, type Variants } from 'framer-motion'
import { MOTION } from '@/lib/constants'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.stagger } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: MOTION.distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration, ease: MOTION.ease },
  },
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  /** Etiqueta a renderizar. Las grillas semánticas usan `ul` con `<StaggerItem as="li">`. */
  as?: 'div' | 'ul'
}

/** Contenedor que escalona la entrada de sus `<StaggerItem>` hijos. */
export function Stagger({ children, className, as = 'div' }: StaggerProps) {
  const Tag = as === 'ul' ? motion.ul : motion.div

  return (
    <Tag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: MOTION.viewportMargin }}
    >
      {children}
    </Tag>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li'
  /** Ancla del elemento, p. ej. para enlazar a un sector concreto. */
  id?: string
}

export function StaggerItem({ children, className, as = 'div', id }: StaggerItemProps) {
  const Tag = as === 'li' ? motion.li : motion.div

  return (
    <Tag data-reveal id={id} className={className} variants={itemVariants}>
      {children}
    </Tag>
  )
}
