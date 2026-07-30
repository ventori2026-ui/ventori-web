import { Reveal } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { ABOUT, MISSION, VISION } from '@/content/about'
import { ROUTES } from '@/lib/constants'

/** Resumen institucional de la home: quiénes somos, con misión y visión al lado. */
export function AboutIntro() {
  return (
    <Section spacing="lg" aria-labelledby="quienes-somos">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
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
            <Reveal delay={0.16}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70">
                {ABOUT.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ButtonLink href={ROUTES.about} variant="outline" className="mt-10" withArrow>
                Conoce más sobre nosotros
              </ButtonLink>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:pt-4">
            {[MISSION, VISION].map((block, index) => (
              <Reveal key={block.eyebrow} delay={0.12 + index * 0.1} from="right">
                <article className="border-l-2 border-terracota-500 bg-navy-900/60 p-7 md:p-9">
                  <div className="flex items-center gap-3">
                    <Icon name={block.icon} className="size-5 text-terracota-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
                      {block.eyebrow}
                    </h3>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-white/80">{block.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
