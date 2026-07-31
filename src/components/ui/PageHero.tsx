import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'

interface PageHeroProps {
  eyebrow: string
  title: string
  lead: string
}

/** Encabezado compartido por todas las páginas internas. */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-[calc(var(--header-height)+4rem)] md:pb-24 lg:pt-[calc(var(--header-height-lg)+6rem)]">
      {/* Halo de acento tras el titular, puramente decorativo. */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-terracota-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-display-sm font-extrabold text-white md:text-display-md lg:text-display-lg">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {lead}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
