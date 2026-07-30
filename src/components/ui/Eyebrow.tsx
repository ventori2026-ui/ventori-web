import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  /** `onLight` usa navy en vez de terracota: terracota sobre blanco no pasa AA. */
  tone?: 'onDark' | 'onLight'
  className?: string
}

/** Etiqueta corta en mayúsculas que precede al titular de cada sección. */
export function Eyebrow({ children, tone = 'onDark', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]',
        tone === 'onDark' ? 'text-terracota-400' : 'text-navy-700',
        className,
      )}
    >
      <span
        className={cn(
          'h-px w-8 shrink-0',
          tone === 'onDark' ? 'bg-terracota-500' : 'bg-navy-700',
        )}
        aria-hidden="true"
      />
      {children}
    </p>
  )
}
