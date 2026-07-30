import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SERVICES } from '@/content/services'
import { ROUTES } from '@/lib/constants'

/**
 * Los nueve servicios en un bento a sangre.
 *
 * La rejilla de 3 columnas encaja exactamente: la tesela de imagen ocupa dos
 * filas, los nueve servicios ocupan nueve celdas y la tarjeta de cierre rellena
 * la duodécima, de modo que no queda ningún hueco vacío.
 */
export function ServicesBento() {
  return (
    <Section tone="navyDeep" spacing="md" aria-labelledby="servicios">
      <Container>
        <h2
          id="servicios"
          className="max-w-3xl pb-12 text-display-sm font-extrabold text-white md:text-display-md"
        >
          Cubrimos el ciclo completo del proyecto
        </h2>
      </Container>

      <Stagger as="ul" className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        <StaggerItem as="li" className="lg:row-span-2">
          <MediaFrame
            media="servicesSupport"
            ratio="fill"
            overlay="strong"
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="min-h-[280px] lg:min-h-full"
          >
            <div className="flex h-full flex-col justify-end p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-300">
                Servicios
              </p>
              <p className="mt-4 font-display text-xl font-bold leading-snug text-white md:text-2xl">
                Nueve frentes que pueden contratarse por separado o como un alcance integral.
              </p>
            </div>
          </MediaFrame>
        </StaggerItem>

        {SERVICES.map((service) => (
          <StaggerItem as="li" key={service.id} className="bg-navy-900">
            <Link
              href={`${ROUTES.services}#${service.id}`}
              className="group flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:bg-navy-800 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <Icon name={service.icon} className="size-7 text-terracota-400" />
                <ArrowUpRight
                  className="size-5 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracota-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold leading-snug tracking-tight text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{service.summary}</p>
            </Link>
          </StaggerItem>
        ))}

        <StaggerItem as="li" className="bg-terracota-500">
          <Link
            href={ROUTES.services}
            className="group flex h-full flex-col justify-between gap-6 p-7 transition-colors duration-300 hover:bg-terracota-400 md:p-8"
          >
            <p className="font-display text-xl font-bold leading-snug tracking-tight text-navy-950 md:text-2xl">
              Ver el detalle de cada servicio
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy-950">
              Servicios
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
          </Link>
        </StaggerItem>
      </Stagger>
    </Section>
  )
}
