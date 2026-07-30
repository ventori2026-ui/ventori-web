import { Reveal } from '@/components/motion/Reveal'
import { HeroVideo } from '@/components/sections/HeroVideo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { HERO } from '@/content/about'
import { ROUTES } from '@/lib/constants'

/**
 * Hero a pantalla completa sobre carrusel de vídeo, siguiendo el ritmo de la
 * referencia: el contenido se apoya en el tercio inferior, no centrado.
 */
export function Hero() {
  return (
    <section className="relative flex h-screen max-h-[1000px] min-h-[640px] items-end overflow-hidden">
      <HeroVideo />

      <Container className="relative pb-20 md:pb-28 lg:pb-32">
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-display-sm font-extrabold text-white md:text-display-lg lg:text-display-xl">
              {HERO.headline}
              <br />
              <span className="text-terracota-400">{HERO.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {HERO.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={ROUTES.contact} size="lg" withArrow>
                {HERO.primaryCta}
              </ButtonLink>
              <ButtonLink href={ROUTES.services} size="lg" variant="outline">
                {HERO.secondaryCta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
