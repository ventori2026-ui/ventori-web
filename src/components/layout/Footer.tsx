import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/ui/Container'
import { SERVICES } from '@/content/services'
import { CONTACT, NAV_LINKS, ROUTES, SITE, SOCIAL, getContactChannels } from '@/lib/constants'

/** lucide-react ya no incluye iconos de marca, así que LinkedIn va como SVG inline. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4V9Z" />
    </svg>
  )
}

export function Footer() {
  const channels = getContactChannels()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
              {SITE.description}
            </p>
            {SOCIAL.linkedin ? (
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-terracota-500 hover:text-terracota-300"
                aria-label={`${SITE.name} en LinkedIn`}
              >
                <LinkedInIcon />
              </a>
            ) : null}
          </div>

          <nav aria-labelledby="footer-navegacion">
            <h2
              id="footer-navegacion"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400"
            >
              Navegación
            </h2>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-servicios">
            <h2
              id="footer-servicios"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400"
            >
              Servicios
            </h2>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`${ROUTES.services}#${service.id}`}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
              Contacto
            </h2>
            <ul className="mt-6 space-y-3">
              {channels.map((channel) => (
                <li key={channel.id} className="text-sm text-white/70">
                  {channel.href ? (
                    <a href={channel.href} className="transition-colors duration-200 hover:text-white">
                      {channel.value}
                    </a>
                  ) : (
                    channel.value
                  )}
                </li>
              ))}
              <li className="flex items-start gap-2 pt-1 text-sm text-white/70">
                <Clock className="mt-0.5 size-4 shrink-0 text-terracota-400" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {CONTACT.schedule.days}
                  <br />
                  {CONTACT.schedule.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs text-white/50">
            © {year} {SITE.legalName}. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
