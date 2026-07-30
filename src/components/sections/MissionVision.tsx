import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { MISSION, VISION } from '@/content/about'

/** Misión y visión a doble columna, sobre el corte claro del sitio. */
export function MissionVision() {
  return (
    <Section tone="light" spacing="lg" aria-labelledby="mision-vision">
      <Container>
        <h2 id="mision-vision" className="sr-only">
          Misión y visión
        </h2>

        <div className="grid gap-px bg-navy-950/15 md:grid-cols-2">
          {[MISSION, VISION].map((block, index) => (
            <Reveal
              key={block.eyebrow}
              delay={index * 0.1}
              className="bg-white p-8 md:p-12 lg:p-16"
            >
              <div className="flex items-center gap-3">
                <Icon name={block.icon} className="size-6 text-navy-700" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
                  {block.eyebrow}
                </h3>
              </div>
              <p className="mt-8 text-lg font-medium leading-relaxed text-navy-950 md:text-xl">
                {block.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
