import { AboutIntro } from '@/components/sections/AboutIntro'
import { Commitment } from '@/components/sections/Commitment'
import { CtaBand } from '@/components/sections/CtaBand'
import { Hero } from '@/components/sections/Hero'
import { SectorsGrid } from '@/components/sections/SectorsGrid'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsBar } from '@/components/sections/StatsBar'
import { WhyUs } from '@/components/sections/WhyUs'

/**
 * El ritmo de fondos alterna navy → acento → claro para marcar el scroll:
 * hero navy · cifras terracota · nosotros navy · servicios navy profundo ·
 * sectores blanco · por qué elegirnos navy · compromiso terracota · cierre navy.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutIntro />
      <ServicesGrid />
      <SectorsGrid />
      <WhyUs />
      <Commitment />
      <CtaBand />
    </>
  )
}
