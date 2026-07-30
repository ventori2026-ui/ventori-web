'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MEDIA } from '@/content/media'
import { PILLARS, PILLARS_INTRO } from '@/content/pillars'
import { cn } from '@/lib/utils'

/**
 * Corte claro del sitio y su pieza más característica, equivalente al bloque
 * Community/Creativity/Clients de la referencia: una lista fija a la izquierda
 * cuya palabra activa cambia según la tarjeta que se esté leyendo.
 *
 * El seguimiento se hace con `IntersectionObserver` sobre cada tarjeta, no
 * escuchando el scroll: el navegador ya calcula la intersección y así no se
 * ejecuta trabajo en cada fotograma.
 *
 * La columna fija se oculta por debajo de `lg`, donde no hay espacio para dos
 * columnas; en móvil cada tarjeta lleva su propio rótulo.
 */
export function PillarsSticky() {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Gana la tarjeta más visible, para que el cambio no oscile en los bordes.
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!winner) return
        const index = cards.indexOf(winner.target as HTMLElement)
        if (index !== -1) setActiveIndex(index)
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: [0.25, 0.5, 0.75] },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <Section tone="light" spacing="lg" aria-labelledby="como-trabajamos">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="onLight">{PILLARS_INTRO.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="como-trabajamos"
              className="mt-6 text-display-sm font-extrabold text-navy-950 md:text-display-md"
            >
              {PILLARS_INTRO.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed text-navy-950/70 md:text-lg">
              {PILLARS_INTRO.text}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Lista fija. Es un resumen visual del contenido de la derecha, así
              que se oculta a lectores de pantalla para no duplicar los títulos. */}
          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true">
            <ul className="sticky top-32 space-y-2">
              {PILLARS.map((pillar, index) => (
                <li
                  key={pillar.id}
                  className={cn(
                    'font-display text-4xl font-extrabold tracking-tight transition-colors duration-500 xl:text-5xl',
                    index === activeIndex ? 'text-navy-950' : 'text-navy-950/15',
                  )}
                >
                  {pillar.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-20 lg:col-span-7 lg:col-start-6 lg:space-y-28">
            {PILLARS.map((pillar, index) => {
              const image = MEDIA[pillar.media]

              return (
                <article
                  key={pillar.id}
                  ref={(node) => {
                    cardRefs.current[index] = node
                  }}
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-navy-900">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-6 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy-700 lg:hidden">
                    {pillar.label}
                  </p>

                  <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-navy-950 md:text-3xl lg:mt-6">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-950/70">
                    {pillar.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
