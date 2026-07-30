import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Section } from '@/components/ui/Section'
import { SECTORS } from '@/content/sectors'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

/**
 * Mosaico asimétrico de los siete sectores: el primero ocupa cuatro celdas y el
 * resto va en teselas menores. Es el patrón "Where We Operate" de la referencia,
 * donde la jerarquía la marca el tamaño de la imagen y no el tipo de letra.
 */
export function SectorsMosaic() {
  const [featured, ...rest] = SECTORS

  return (
    <Section spacing="md" aria-labelledby="sectores">
      <Container>
        <div className="flex flex-col justify-between gap-6 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Dónde trabajamos</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="sectores"
                className="mt-6 text-display-sm font-extrabold text-white md:text-display-md"
              >
                Siete frentes, un mismo estándar
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href={ROUTES.sectors}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-terracota-400 transition-colors hover:text-terracota-300"
            >
              Ver todos los sectores
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </Container>

      {/*
        A sangre: el mosaico gana al ocupar todo el ancho de la ventana.

        Con 4 columnas, la tesela destacada consume dos y quedan cuatro huecos
        para los seis sectores restantes. Los dos últimos se ensanchan a doble
        columna para que la última fila cierre en vez de dejar el hueco muerto.
      */}
      <Stagger as="ul" className="grid grid-cols-2 gap-1 lg:grid-cols-4">
        <StaggerItem as="li" className="col-span-2 row-span-2">
          <SectorTile sector={featured} featured />
        </StaggerItem>

        {rest.map((sector, index) => (
          <StaggerItem
            as="li"
            key={sector.id}
            className={index >= rest.length - 2 ? 'lg:col-span-2' : undefined}
          >
            <SectorTile sector={sector} wide={index >= rest.length - 2} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

function SectorTile({
  sector,
  featured = false,
  wide = false,
}: {
  sector: (typeof SECTORS)[number]
  featured?: boolean
  /** Tesela de doble columna: necesita un formato más panorámico. */
  wide?: boolean
}) {
  return (
    <Link
      href={`${ROUTES.sectors}#${sector.id}`}
      className="group block h-full focus-visible:outline-offset-[-4px]"
    >
      {/*
        La tesela destacada se estira a la altura de las dos filas que ocupa
        (`fill`), mientras que las pequeñas derivan su alto de la relación de
        aspecto. Combinar `aspect-*` con `h-full` hacía justo lo contrario:
        el alto fijaba el ancho y las teselas desbordaban la rejilla.
      */}
      <MediaFrame
        media={sector.media}
        ratio={featured ? 'fill' : wide ? 'panorama' : 'wide'}
        overlay="bottom"
        zoomOnHover
        sizes={
          featured || wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'
        }
        className={featured ? 'h-full min-h-[340px] md:min-h-[420px]' : undefined}
      >
        <div className="flex h-full flex-col justify-end p-5 md:p-7">
          <h3
            className={cn(
              'font-display font-bold leading-tight tracking-tight text-white',
              featured ? 'text-2xl md:text-4xl' : 'text-base md:text-xl',
            )}
          >
            {sector.title}
          </h3>

          {featured ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              {sector.description}
            </p>
          ) : null}

          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-terracota-300">
            Explorar
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </span>
        </div>
      </MediaFrame>
    </Link>
  )
}
