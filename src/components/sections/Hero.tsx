import { Reveal } from '@/components/motion/Reveal'
import { BrandGlyph } from '@/components/ui/BrandGlyph'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { HERO } from '@/content/about'
import { ROUTES } from '@/lib/constants'

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-navy-950 pb-24 pt-[calc(var(--header-height)+5rem)] lg:pt-[calc(var(--header-height-lg)+6rem)]">
      {/* Isotipo como marca de agua: sustituye a la fotografía mientras no haya imágenes de proyecto. */}
      <BrandGlyph className="pointer-events-none absolute -right-16 top-1/2 h-[36rem] -translate-y-1/2 text-terracota-500/[0.07] md:-right-8 lg:h-[44rem]" />

      {/* Retícula técnica de fondo, guiño al plano de ingeniería. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:5rem_5rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 text-display-sm font-extrabold text-white md:text-display-lg lg:text-display-xl">
              {HERO.headline}{' '}
              <span className="text-terracota-500">{HERO.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {HERO.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
