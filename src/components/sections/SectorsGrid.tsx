import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SECTORS } from '@/content/sectors'

interface SectorsGridProps {
  /** En /sectores el encabezado ya lo pone `<PageHero />`. */
  withHeading?: boolean
}

/**
 * Corte claro del sitio. Sobre blanco los acentos van en navy: la terracota como
 * texto no alcanza contraste AA (ver AGENTS.md).
 */
export function SectorsGrid({ withHeading = true }: SectorsGridProps) {
  return (
    <Section tone="light" spacing="lg" aria-labelledby={withHeading ? 'sectores' : undefined}>
      <Container>
        {withHeading ? (
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="onLight">Sectores</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="sectores"
                className="mt-6 text-display-sm font-extrabold text-navy-950 md:text-display-md"
              >
                Dónde trabajamos
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-base leading-relaxed text-navy-950/70 md:text-lg">
                Atendemos proyectos de infraestructura y equipamiento en el sector público y
                privado, con el rigor documental y técnico que exige cada uno.
              </p>
            </Reveal>
          </div>
        ) : null}

        <Stagger
          as="ul"
          className={`grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 ${withHeading ? 'mt-16' : ''}`}
        >
          {SECTORS.map((sector, index) => (
            <StaggerItem
              as="li"
              key={sector.id}
              id={sector.id}
              className="group scroll-mt-32 border-t border-navy-950/15 py-8 transition-colors duration-300 hover:border-navy-950"
            >
              <div className="flex items-center justify-between gap-4">
                <Icon name={sector.icon} className="size-7 text-navy-700" />
                <span className="font-display text-sm font-semibold tabular-nums text-navy-950/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-navy-950">
                {sector.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-950/70">{sector.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
