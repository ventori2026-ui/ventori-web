import type { Metadata } from 'next'
import { CONTACT, ROUTES, SITE, SOCIAL } from '@/lib/constants'

interface BuildMetadataInput {
  title: string
  description: string
  /** Ruta relativa, p. ej. `ROUTES.services`. */
  path: string
}

/** Metadata consistente para todas las páginas: canonical, Open Graph y Twitter. */
export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const url = new URL(path, SITE.url).toString()

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/** JSON-LD de organización. Solo incluye los campos que ya tienen dato cargado. */
export function buildOrganizationJsonLd() {
  const sameAs = [SOCIAL.linkedin].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    areaServed: { '@type': 'Country', name: 'Colombia' },
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
    ...(CONTACT.address || CONTACT.city
      ? {
          address: {
            '@type': 'PostalAddress',
            addressCountry: SITE.country,
            ...(CONTACT.address ? { streetAddress: CONTACT.address } : {}),
            ...(CONTACT.city ? { addressLocality: CONTACT.city } : {}),
          },
        }
      : {}),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '17:30',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: new URL(ROUTES.contact, SITE.url).toString(),
      availableLanguage: ['Spanish'],
    },
  }
}
