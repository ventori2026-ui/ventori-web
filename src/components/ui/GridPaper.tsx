import { cn } from '@/lib/utils'

interface GridPaperProps {
  className?: string
  /** Sobre navy la retícula es blanca; sobre papel, navy. */
  tone?: 'dark' | 'light'
}

/**
 * Retícula técnica de fondo, como el papel milimetrado de un plano.
 *
 * Da textura a los fondos planos sin recurrir a un degradado —que en esta marca
 * sería un cuarto color— y refuerza la lectura de precisión. Se desvanece hacia
 * los bordes: una retícula que llega recortada al borde de la sección se lee
 * como un fallo de recorte, no como fondo.
 *
 * Es puramente decorativa y va `aria-hidden`. La opacidad se mantiene lo bastante
 * baja para no restar contraste al texto que se apoya encima.
 */
export function GridPaper({ className, tone = 'dark' }: GridPaperProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 grid-tech',
        tone === 'dark' ? 'text-white/[0.055]' : 'text-navy-950/[0.07]',
        '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]',
        className,
      )}
    />
  )
}
