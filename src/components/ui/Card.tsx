import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type { IconName } from '@/types/content'

interface CardProps {
  title: string
  description: string
  icon?: IconName
  /** Numeración visible, para las grillas donde el orden comunica. */
  index?: number
  tone?: 'onDark' | 'onLight'
  className?: string
  headingLevel?: 'h3' | 'h4'
}

export function Card({
  title,
  description,
  icon,
  index,
  tone = 'onDark',
  className,
  headingLevel: Heading = 'h3',
}: CardProps) {
  const onDark = tone === 'onDark'

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col gap-4 border-t p-6 transition-colors duration-300 md:p-8',
        onDark
          ? 'border-white/15 hover:border-terracota-500'
          : 'border-navy-950/15 hover:border-navy-950',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {icon ? (
          <Icon
            name={icon}
            className={cn(
              'size-7 transition-colors duration-300',
              onDark ? 'text-terracota-400' : 'text-navy-700',
            )}
          />
        ) : null}
        {index !== undefined ? (
          <span
            className={cn(
              'font-display text-sm font-semibold tabular-nums',
              onDark ? 'text-white/40' : 'text-navy-950/40',
            )}
          >
            {String(index).padStart(2, '0')}
          </span>
        ) : null}
      </div>

      <Heading
        className={cn(
          'text-lg font-bold leading-snug tracking-tight md:text-xl',
          onDark ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </Heading>

      <p className={cn('text-sm leading-relaxed', onDark ? 'text-white/70' : 'text-navy-950/75')}>
        {description}
      </p>
    </article>
  )
}
