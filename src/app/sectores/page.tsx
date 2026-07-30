import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { SectorsGrid } from '@/components/sections/SectorsGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { PageHero } from '@/components/ui/PageHero'
import { PAGES } from '@/content/pages'
import { ROUTES } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: PAGES.sectors.metaTitle,
  description: PAGES.sectors.description,
  path: ROUTES.sectors,
})

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow={PAGES.sectors.eyebrow}
        title={PAGES.sectors.title}
        lead={PAGES.sectors.lead}
      />
      {/* El encabezado ya lo puso `<PageHero />`, así que la grilla va sin el suyo. */}
      <SectorsGrid withHeading={false} />
      <WhyUs />
      <CtaBand />
    </>
  )
}
