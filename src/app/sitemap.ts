import type { MetadataRoute } from 'next'
import { ROUTES, SITE } from '@/lib/constants'

/** Prioridad relativa por ruta; la home encabeza y contacto la sigue. */
const PRIORITIES: Record<string, number> = {
  [ROUTES.home]: 1,
  [ROUTES.services]: 0.9,
  [ROUTES.about]: 0.8,
  [ROUTES.sectors]: 0.8,
  [ROUTES.projects]: 0.7,
  [ROUTES.contact]: 0.9,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return Object.values(ROUTES).map((route) => ({
    url: new URL(route, SITE.url).toString(),
    lastModified,
    changeFrequency: 'monthly',
    priority: PRIORITIES[route] ?? 0.5,
  }))
}
