import { Reveal } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SplitPanel } from '@/components/ui/SplitPanel'
import { ABOUT } from '@/content/about'
import { ROUTES } from '@/lib/constants'

/** Panel de texto a la izquierda, fotografía a sangre a la derecha. */
export function AboutSplit() {
  return (
    <section aria-labelledby="quienes-somos">
      <SplitPanel media="aboutSplit" mediaSide="right" tone="navyDeep">
        <Reveal>
          <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="quienes-somos"
            className="mt-6 text-display-sm font-extrabold text-white md:text-display-md"
          >
            {ABOUT.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-white/70">
            {/* Solo los dos primeros párrafos: el tercero vive en /nosotros. */}
            {ABOUT.paragraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <ButtonLink href={ROUTES.about} variant="outline" className="mt-9" withArrow>
            Conoce más sobre nosotros
          </ButtonLink>
        </Reveal>
      </SplitPanel>
    </section>
  )
}
