import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { ServicesDetail } from '@/components/sections/ServicesDetail'
import { PageHero } from '@/components/ui/PageHero'
import { PAGES } from '@/content/pages'
import { ROUTES } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: PAGES.services.metaTitle,
  description: PAGES.services.description,
  path: ROUTES.services,
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={PAGES.services.eyebrow}
        lines={PAGES.services.titleLines}
        lead={PAGES.services.lead}
      />
      <ServicesDetail />
      <CtaBand index={0} />
    </>
  )
}
