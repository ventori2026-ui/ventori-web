import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { PageHero } from '@/components/ui/PageHero'
import { PAGES } from '@/content/pages'
import { ROUTES } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: PAGES.projects.metaTitle,
  description: PAGES.projects.description,
  path: ROUTES.projects,
})

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={PAGES.projects.eyebrow}
        lines={PAGES.projects.titleLines}
        lead={PAGES.projects.lead}
      />
      <ProjectsGrid />
      <CtaBand index={0} />
    </>
  )
}
