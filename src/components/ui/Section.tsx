import { cn } from '@/lib/utils'

/**
 * Fondos de sección. El sitio alterna entre estos tres para marcar el ritmo del
 * scroll. `terracota` solo lleva texto navy encima — ver la regla de contraste
 * en AGENTS.md.
 */
const TONES = {
  navy: 'bg-navy-950 text-white',
  navyDeep: 'bg-navy-900 text-white',
  light: 'bg-white text-navy-950',
  terracota: 'bg-terracota-500 text-navy-950',
} as const

const SPACING = {
  none: '',
  sm: 'py-14 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-36',
} as const

interface SectionProps {
  children: React.ReactNode
  id?: string
  tone?: keyof typeof TONES
  spacing?: keyof typeof SPACING
  className?: string
  'aria-labelledby'?: string
}

export function Section({
  children,
  id,
  tone = 'navy',
  spacing = 'md',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative', TONES[tone], SPACING[spacing], className)}
      {...props}
    >
      {children}
    </section>
  )
}
