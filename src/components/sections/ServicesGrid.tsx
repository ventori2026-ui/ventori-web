import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SERVICES } from '@/content/services'
import { ROUTES } from '@/lib/constants'

/** Los nueve servicios en la home; cada tarjeta lleva a su ancla en /servicios. */
export function ServicesGrid() {
  return (
    <Section tone="navyDeep" spacing="lg" aria-labelledby="servicios">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Servicios</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="servicios"
                className="mt-6 text-display-sm font-extrabold text-white md:text-display-md"
              >
                Cubrimos el ciclo completo del proyecto
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <ButtonLink href={ROUTES.services} variant="outline" withArrow>
              Ver todos los servicios
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem as="li" key={service.id} className="bg-navy-900">
              <Link
                href={`${ROUTES.services}#${service.id}`}
                className="group flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:bg-navy-800 md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon name={service.icon} className="size-7 text-terracota-400" />
                  <ArrowUpRight
                    className="size-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracota-400"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold leading-snug tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">{service.summary}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
