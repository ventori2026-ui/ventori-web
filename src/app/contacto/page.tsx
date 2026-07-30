import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { ContactForm } from '@/components/sections/ContactForm'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { PAGES } from '@/content/pages'
import { CONTACT, ROUTES, getContactChannels } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: PAGES.contact.metaTitle,
  description: PAGES.contact.description,
  path: ROUTES.contact,
})

/** Icono por canal. Los canales sin dato cargado no llegan hasta aquí. */
const CHANNEL_ICONS = {
  email: Mail,
  phone: Phone,
  address: MapPin,
  city: MapPin,
} as const

export default function ContactPage() {
  const channels = getContactChannels()

  return (
    <>
      <PageHero
        eyebrow={PAGES.contact.eyebrow}
        title={PAGES.contact.title}
        lead={PAGES.contact.lead}
      />

      <Section spacing="lg" aria-labelledby="formulario">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <h2 id="formulario" className="sr-only">
                Formulario de contacto
              </h2>
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal from="right" delay={0.1}>
                <div className="border-l-2 border-terracota-500 py-2 pl-7">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
                    Datos de contacto
                  </h2>

                  <ul className="mt-7 space-y-6">
                    {channels.map((channel) => {
                      const ChannelIcon = CHANNEL_ICONS[channel.id as keyof typeof CHANNEL_ICONS]
                      return (
                        <li key={channel.id} className="flex gap-4">
                          <ChannelIcon
                            className="mt-0.5 size-5 shrink-0 text-terracota-400"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-xs uppercase tracking-[0.1em] text-white/45">
                              {channel.label}
                            </p>
                            {channel.href ? (
                              <a
                                href={channel.href}
                                className="mt-1 block text-white transition-colors duration-200 hover:text-terracota-300"
                              >
                                {channel.value}
                              </a>
                            ) : (
                              <p className="mt-1 text-white">{channel.value}</p>
                            )}
                          </div>
                        </li>
                      )
                    })}

                    <li className="flex gap-4">
                      <Clock
                        className="mt-0.5 size-5 shrink-0 text-terracota-400"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.1em] text-white/45">
                          Horario de atención
                        </p>
                        <p className="mt-1 text-white">{CONTACT.schedule.days}</p>
                        <p className="text-white/70">{CONTACT.schedule.hours}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
