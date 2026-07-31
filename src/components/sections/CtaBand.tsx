import { Reveal } from '@/components/motion/Reveal'
import { LiquidMetalButtonLink } from '@/components/ui/LiquidMetalButton'
import { Container } from '@/components/ui/Container'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { CTA_BAND } from '@/content/about'
import { ROUTES } from '@/lib/constants'

/**
 * Cierre a sangre: fotografía de fondo con una tarjeta oscura encima, como el
 * bloque final de la referencia. Reutilizado por la home y las internas.
 */
export function CtaBand() {
  return (
    <section className="relative" aria-labelledby="cta">
      <MediaFrame
        media="ctaBand"
        ratio="fill"
        overlay="soft"
        sizes="100vw"
        className="min-h-[560px] md:min-h-[520px]"
      >
        <Container className="flex h-full items-center py-20">
          <Reveal className="w-full">
            <div className="max-w-2xl bg-navy-950/90 p-9 backdrop-blur-sm md:p-14">
              <h2 id="cta" className="text-display-sm font-extrabold text-white md:text-display-md">
                {CTA_BAND.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">
                {CTA_BAND.text}
              </p>
              <LiquidMetalButtonLink href={ROUTES.contact} size="lg" className="mt-9" withArrow>
                {CTA_BAND.cta}
              </LiquidMetalButtonLink>
            </div>
          </Reveal>
        </Container>
      </MediaFrame>
    </section>
  )
}
