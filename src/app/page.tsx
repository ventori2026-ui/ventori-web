import { AboutSplit } from '@/components/sections/AboutSplit'
import { CtaBand } from '@/components/sections/CtaBand'
import { Hero } from '@/components/sections/Hero'
import { PillarsSticky } from '@/components/sections/PillarsSticky'
import { SectorsMosaic } from '@/components/sections/SectorsMosaic'
import { ServicesBento } from '@/components/sections/ServicesBento'
import { StatsBar } from '@/components/sections/StatsBar'
import { WhyUsSplit } from '@/components/sections/WhyUsSplit'

/**
 * El ritmo alterna oscuro, claro y acento para marcar el scroll, y casi cada
 * bloque se apoya en fotografía a sangre:
 *
 *   hero vídeo · cifras terracota · mosaico de sectores · split nosotros ·
 *   pilares en blanco · servicios en bento · por qué elegirnos en terracota ·
 *   cierre sobre foto · footer claro
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <SectorsMosaic />
      <AboutSplit />
      <PillarsSticky />
      <ServicesBento />
      <WhyUsSplit />
      <CtaBand />
    </>
  )
}
