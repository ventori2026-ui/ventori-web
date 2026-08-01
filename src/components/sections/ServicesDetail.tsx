import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Rule } from '@/components/motion/Rule'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SERVICES } from '@/content/services'
import { formatIndex } from '@/lib/utils'

/**
 * Detalle de los nueve servicios, uno por bloque.
 *
 * Cada bloque lleva `id` porque el índice de la home y el pie enlazan a
 * `#servicio`. El `scroll-padding-top` de `globals.css` compensa el header fijo
 * para que el título no quede oculto bajo la barra al saltar al ancla.
 *
 * La retícula alterna: en escritorio el número y el icono quedan en una columna
 * estrecha a la izquierda y el contenido en las ocho restantes. Es la
 * disposición de una ficha técnica, y sostiene bien títulos largos sin
 * recortarlos.
 */
export function ServicesDetail() {
  return (
    <Section tone="navy" grid>
      <Container>
        <div className="border-t border-navy-800">
          {SERVICES.map((service, position) => (
            <article
              key={service.id}
              id={service.id}
              className="grid gap-6 border-b border-navy-800 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20"
            >
              <div className="lg:col-span-3">
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-label tabular text-terracota-500">
                      {formatIndex(position)}
                    </span>
                    <Rule className="w-8 flex-none text-navy-600" delay={0.1} />
                  </div>

                  <Icon name={service.icon} className="mt-7 size-9 text-terracota-500" />
                </Reveal>
              </div>

              <div className="lg:col-span-9">
                <Reveal delay={0.08}>
                  <h2 className="stretch-display text-display-sm font-semibold text-white">
                    {service.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-3xl text-base leading-relaxed text-navy-100 sm:text-lg">
                    {service.description}
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <h3 className="mt-10 font-mono text-label uppercase text-navy-200">
                    Qué entregamos
                  </h3>
                </Reveal>

                <Stagger as="ul" className="mt-5 grid gap-3 sm:grid-cols-2" delay={0.28}>
                  {service.deliverables.map((deliverable) => (
                    <StaggerItem as="li" key={deliverable} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="mt-0.5 size-4 shrink-0 text-terracota-500"
                      />
                      <span className="text-sm leading-relaxed text-navy-100">{deliverable}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
