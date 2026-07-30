import { Reveal } from '@/components/motion/Reveal'
import { BrandGlyph } from '@/components/ui/BrandGlyph'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { ABOUT } from '@/content/about'

/** Versión extendida de "quiénes somos" para /nosotros. */
export function AboutFull() {
  return (
    <Section spacing="lg" className="overflow-hidden" aria-labelledby="quienes-somos">
      <BrandGlyph className="pointer-events-none absolute -right-24 bottom-0 h-[30rem] text-terracota-500/[0.06]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="quienes-somos"
                className="mt-6 text-display-sm font-extrabold text-white md:text-display-md"
              >
                {ABOUT.heading}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-base leading-relaxed text-white/75 md:text-lg">
              {ABOUT.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 40)} delay={0.12 + index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
