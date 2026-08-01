import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Section } from '@/components/ui/Section'
import { SectionHead } from '@/components/ui/SectionHead'
import { ABOUT } from '@/content/about'
import { HOME_SECTIONS } from '@/content/sections'
import { ROUTES } from '@/lib/constants'

/**
 * Presentación de la empresa: texto a la izquierda, fotografía a la derecha.
 *
 * La imagen entra enmascarada desde abajo mientras el texto solo se funde. Que
 * una de las dos columnas pese más en el movimiento es lo que evita que el
 * bloque entre "de golpe" y lo que dirige la mirada a la fotografía primero.
 *
 * En móvil la fotografía va debajo del texto, no encima: el usuario ya vio
 * fotografía en el hero y en el mosaico, y lo que necesita aquí es el
 * argumento.
 */
export function AboutSplit({ index }: { index: number }) {
  const copy = HOME_SECTIONS.about

  return (
    <Section tone="paper">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              index={index}
              eyebrow={copy.eyebrow}
              lines={copy.lines}
              tone="light"
            />

            <div className="mt-8 space-y-5">
              {ABOUT.paragraphs.map((paragraph, position) => (
                <Reveal key={paragraph.slice(0, 40)} delay={0.3 + position * 0.06}>
                  <p className="text-base leading-relaxed text-navy-700 sm:text-lg">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.5}>
              <div className="mt-10">
                <Button href={ROUTES.about} variant="onPaper">
                  Conoce la empresa
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal mask from="bottom" delay={0.15}>
            <MediaFrame
              media="aboutSplit"
              ratio="portrait"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
