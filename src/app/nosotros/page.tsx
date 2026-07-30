import type { Metadata } from 'next'
import { AboutFull } from '@/components/sections/AboutFull'
import { Commitment } from '@/components/sections/Commitment'
import { CtaBand } from '@/components/sections/CtaBand'
import { MissionVision } from '@/components/sections/MissionVision'
import { WhyUs } from '@/components/sections/WhyUs'
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
        title={PAGES.about.title}
        lead={PAGES.about.lead}
      />
      <AboutFull />
      <MissionVision />
      <WhyUs />
      <Commitment />
      <CtaBand />
    </>
  )
}
