import { Counter } from '@/components/motion/Counter'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { STATS } from '@/content/stats'

/**
 * Banda de cifras. No se renderiza mientras `STATS` esté vacío, de modo que la
 * home queda coherente hasta que el cliente entregue los datos reales.
 */
export function StatsBar() {
  if (STATS.length === 0) return null

  return (
    <Section tone="terracota" spacing="sm" aria-labelledby="cifras">
      <Container>
        <h2 id="cifras" className="sr-only">
          Cifras de la compañía
        </h2>
        <Stagger as="ul" className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem as="li" key={stat.id} className="border-l border-navy-950/25 pl-5">
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="block font-display text-4xl font-extrabold tabular-nums tracking-tight text-navy-950 md:text-5xl"
              />
              <span className="mt-2 block text-sm font-medium text-navy-950/75">{stat.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
