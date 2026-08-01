import type { Metadata } from 'next'
import { Commitment } from '@/components/sections/Commitment'
import { CtaBand } from '@/components/sections/CtaBand'
import { MissionVision } from '@/components/sections/MissionVision'
import { AboutFull } from '@/components/sections/AboutFull'
import { PageHero } from '@/components/ui/PageHero'
import { PAGES } from '@/content/pages'
import { ROUTES } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: PAGES.about.metaTitle,
  description: PAGES.about.description,
  path: ROUTES.about,
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={PAGES.about.eyebrow}
        lines={PAGES.about.titleLines}
        lead={PAGES.about.lead}
      />
      <AboutFull index={0} />
      <MissionVision index={1} />
      <Commitment index={3} />
      <CtaBand index={4} />
    </>
  )
}
