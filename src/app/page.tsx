import { AboutSplit } from '@/components/sections/AboutSplit'
import { CtaBand } from '@/components/sections/CtaBand'
import { Hero } from '@/components/sections/Hero'
import { MarqueeBand } from '@/components/sections/MarqueeBand'
import { ProcessSequence } from '@/components/sections/ProcessSequence'
import { SectorsMosaic } from '@/components/sections/SectorsMosaic'
import { ServicesIndex } from '@/components/sections/ServicesIndex'
import { StatsBar } from '@/components/sections/StatsBar'
import { WhyUs } from '@/components/sections/WhyUs'

/**
 * Home.
 *
 * El orden de tonos marca el avance del scroll y evita que dos bloques seguidos
 * se lean como uno solo:
 *
 *   hero sobre vídeo · cifras en navy profundo · mosaico de sectores ·
 *   banda de términos · quiénes somos sobre papel · las tres fases en navy ·
 *   índice de servicios · por qué elegirnos en terracota · cierre sobre foto ·
 *   pie sobre papel
 *
 * El índice numerado de cada sección sale de su posición aquí, no del contenido:
 * reordenar la página las renumera sin tocar `content/`. El hero no cuenta —no
 * lleva cabecera numerada—, así que la numeración visible arranca en el mosaico.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <SectorsMosaic index={0} />
      <MarqueeBand />
      <AboutSplit index={1} />
      <ProcessSequence index={2} />
      <ServicesIndex index={3} />
      <WhyUs index={4} />
      <CtaBand index={5} />
    </>
  )
}
