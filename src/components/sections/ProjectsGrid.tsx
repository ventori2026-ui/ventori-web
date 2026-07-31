import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { BrandGlyph } from '@/components/ui/BrandGlyph'
import { LiquidMetalButtonLink } from '@/components/ui/LiquidMetalButton'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PAGES } from '@/content/pages'
import { PROJECTS } from '@/content/projects'
import { SECTORS } from '@/content/sectors'
import { ROUTES } from '@/lib/constants'

function sectorTitle(sectorId: string) {
  return SECTORS.find((sector) => sector.id === sectorId)?.title ?? ''
}

/**
 * Grilla de proyectos. Mientras `PROJECTS` esté vacío muestra un estado
 * explícito en vez de una página en blanco; al cargar los casos en
 * `content/projects.ts` la sección cambia sola, sin tocar este componente.
 */
export function ProjectsGrid() {
  if (PROJECTS.length === 0) {
    return (
      <Section spacing="lg" className="overflow-hidden" aria-labelledby="proyectos-vacio">
        <BrandGlyph className="pointer-events-none absolute -right-20 top-0 h-[26rem] text-terracota-500/[0.06]" />
        <Container className="relative">
          <Reveal>
            <div className="max-w-2xl border-l-2 border-terracota-500 py-2 pl-8">
              <h2
                id="proyectos-vacio"
                className="text-2xl font-extrabold tracking-tight text-white md:text-3xl"
              >
                {PAGES.projects.empty.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                {PAGES.projects.empty.text}
              </p>
              <LiquidMetalButtonLink href={ROUTES.contact} className="mt-8" withArrow>
                Escríbenos
              </LiquidMetalButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    )
  }

  return (
    <Section spacing="lg" aria-labelledby="listado-proyectos">
      <Container>
        <h2 id="listado-proyectos" className="sr-only">
          Listado de proyectos
        </h2>

        <Stagger as="ul" className="grid gap-10 md:grid-cols-2 lg:gap-12">
          {PROJECTS.map((project) => (
            <StaggerItem as="li" key={project.id} className="group">
              <div className="relative aspect-4/3 overflow-hidden bg-navy-900">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.location}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
                {sectorTitle(project.sectorId)}
              </p>
              <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{project.scope}</p>
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/15 pt-5 text-sm">
                <div>
                  <dt className="text-white/45">Cliente</dt>
                  <dd className="mt-1 text-white/85">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Ubicación</dt>
                  <dd className="mt-1 text-white/85">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Año</dt>
                  <dd className="mt-1 text-white/85">{project.year}</dd>
                </div>
              </dl>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
