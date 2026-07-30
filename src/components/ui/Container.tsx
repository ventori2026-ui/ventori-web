import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** `narrow` para bloques de texto largo, donde la medida importa más que el ancho. */
  width?: 'default' | 'narrow' | 'wide'
}

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[90rem]',
} as const

export function Container({ children, className, width = 'default' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-6 sm:px-8 lg:px-12', WIDTHS[width], className)}>
      {children}
    </div>
  )
}
