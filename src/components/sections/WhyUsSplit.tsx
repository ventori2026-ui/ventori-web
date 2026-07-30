import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { SplitPanel } from '@/components/ui/SplitPanel'
import { DIFFERENTIATORS } from '@/content/differentiators'

/**
 * Fotografía a la izquierda con rótulo superpuesto, panel de acento a la derecha.
 * Es el momento de color fuerte de la home, equivalente a "Build What Matters".
 *
 * Sobre terracota todo el texto va en navy: es el único par que alcanza AA en
 * ese fondo (ver AGENTS.md).
 */
export function WhyUsSplit() {
  return (
    <section aria-labelledby="por-que-elegirnos">
      <SplitPanel
        media="whyUs"
        mediaSide="left"
        tone="terracota"
        caption={
          <p className="font-display text-xl font-bold leading-tight text-white md:text-2xl">
            Respondemos por el resultado,
            <br />
            no solo por el entregable.
          </p>
        }
      >
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-950/70">
            <span className="h-px w-8 shrink-0 bg-navy-950/70" aria-hidden="true" />
            Por qué elegirnos
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="por-que-elegirnos"
            className="mt-6 text-display-sm font-extrabold text-navy-950 md:text-display-md"
          >
            Siete razones que se verifican en obra
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-9 space-y-4">
            {DIFFERENTIATORS.map((item) => (
              <li key={item.id} className="flex gap-3">
                <Check
                  className="mt-1 size-4 shrink-0 text-navy-950"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span className="text-base font-medium leading-snug text-navy-950">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </SplitPanel>
    </section>
  )
}
