import { Reveal } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { CTA_BAND } from '@/content/about'
import { ROUTES } from '@/lib/constants'

/** Cierre reutilizado por la home y las páginas internas. */
export function CtaBand() {
  return (
    <Section spacing="lg" aria-labelledby="cta">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 border-t border-white/15 pt-14 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h2 id="cta" className="text-display-sm font-extrabold text-white md:text-display-md">
                {CTA_BAND.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                {CTA_BAND.text}
              </p>
            </div>
            <ButtonLink href={ROUTES.contact} size="lg" className="shrink-0" withArrow>
              {CTA_BAND.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
