import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { DIFFERENTIATORS } from '@/content/differentiators'

export function WhyUs() {
  return (
    <Section spacing="lg" aria-labelledby="por-que-elegirnos">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Por qué elegirnos</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="por-que-elegirnos"
              className="mt-6 text-display-sm font-extrabold text-white md:text-display-md"
            >
              Siete razones que se verifican en obra
            </h2>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-16 grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <StaggerItem as="li" key={item.id} className="flex gap-5 border-t border-white/15 py-7">
              <Icon name={item.icon} className="mt-1 size-6 shrink-0 text-terracota-400" />
              <div>
                <h3 className="text-base font-bold leading-snug tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
