import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Variantes de botón. Todas cumplen contraste AA sobre el fondo donde se usan:
 * `primary` va sobre navy, `onTerracota` y `onLight` sobre fondos claros.
 */
const VARIANTS = {
  primary: 'bg-terracota-500 text-navy-950 hover:bg-terracota-400',
  outline: 'border border-white/25 text-white hover:border-terracota-500 hover:bg-white/5',
  onLight: 'bg-navy-950 text-white hover:bg-navy-800',
  onTerracota: 'bg-navy-950 text-white hover:bg-navy-800',
  ghost: 'text-white hover:text-terracota-300',
} as const

const SIZES = {
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
} as const

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60'

interface ButtonBaseProps {
  children: React.ReactNode
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  className?: string
  /** Muestra una flecha que se desplaza en hover. */
  withArrow?: boolean
}

function Inner({ children, withArrow }: Pick<ButtonBaseProps, 'children' | 'withArrow'>) {
  return (
    <>
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : null}
    </>
  )
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(BASE, VARIANTS[variant], SIZES[size], className)}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  )
}

interface ButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  )
}
