import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { PAGES } from '@/content/pages'
import { ROUTES, SITE } from '@/lib/constants'
import { buildMetadata, buildOrganizationJsonLd } from '@/lib/seo'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata({
    title: PAGES.home.metaTitle,
    description: PAGES.home.description,
    path: ROUTES.home,
  }),
  title: {
    default: PAGES.home.metaTitle,
    template: `%s | ${SITE.name}`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} className={`${plusJakarta.variable} ${inter.variable} h-full`}>
      <head>
        {/*
          Los reveals parten de `opacity: 0` en el HTML servido. Sin JavaScript
          nunca llegaría el evento que los hace visibles, así que aquí se
          neutralizan y el contenido queda legible igual.
        */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-navy-950">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[70] focus:rounded-full focus:bg-terracota-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-950"
        >
          Saltar al contenido
        </a>

        <MotionProvider>
          <ScrollProgress />
          <Header />

          <main id="contenido" className="flex-1">
            {children}
          </main>

          <Footer />
        </MotionProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
        />
      </body>
    </html>
  )
}
