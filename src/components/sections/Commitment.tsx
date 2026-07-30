import { Reveal } from '@/components/motion/Reveal'
import { BrandGlyph } from '@/components/ui/BrandGlyph'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { COMMITMENT } from '@/content/about'

/**
 * Banda de acento. Sobre terracota todo el texto va en navy: es el único par de
 * colores que alcanza contraste AA en este fondo.
 */
export function Commitment() {
  return (
    <Section tone="terracota" spacing="lg" className="overflow-hidden" aria-labelledby="compromiso">
      <BrandGlyph className="pointer-events-none absolute -left-20 top-1/2 h-[28rem] -translate-y-1/2 text-navy-950/10" />

      <Container className="relative">
        <div className="ml-auto max-w-3xl">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-950/70">
              <span className="h-px w-8 shrink-0 bg-navy-950/70" aria-hidden="true" />
              {COMMITMENT.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="compromiso"
              className="mt-6 text-display-sm font-extrabold text-navy-950 md:text-display-md"
            >
              {COMMITMENT.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 text-base leading-relaxed text-navy-950/80 md:text-lg">
              {COMMITMENT.text}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
