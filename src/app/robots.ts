import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El endpoint del formulario no aporta nada a un rastreador.
      disallow: '/api/',
    },
    sitemap: new URL('/sitemap.xml', SITE.url).toString(),
  }
}
