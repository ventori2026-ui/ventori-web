import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SERVICES } from '@/content/services'

/**
 * Detalle de los nueve servicios. Cada bloque tiene ancla propia (`#${id}`), que
 * es a donde apuntan las tarjetas de la home y los enlaces del footer.
 */
export function ServicesDetail() {
  return (
    <Section spacing="none" className="py-8 md:py-12" aria-labelledby="detalle-servicios">
      <Container>
        <h2 id="detalle-servicios" className="sr-only">
          Detalle de servicios
        </h2>

        <div className="divide-y divide-white/12">
          {SERVICES.map((service, index) => (
            <article key={service.id} id={service.id} className="scroll-mt-32 py-14 md:py-20">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <Icon name={service.icon} className="size-8 text-terracota-400" />
                      <span className="font-display text-sm font-semibold tabular-nums text-white/40">
                        {String(index + 1).padStart(2, '0')} /{' '}
                        {String(SERVICES.length).padStart(2, '0')}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
                      {service.title}
                    </h3>
                  </Reveal>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <Reveal delay={0.12}>
                    <p className="text-base leading-relaxed text-white/75 md:text-lg">
                      {service.description}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <h4 className="mt-9 text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
                      Entregables
                    </h4>
                    <ul className="mt-5 space-y-3">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex gap-3 text-sm text-white/70">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-terracota-400"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
