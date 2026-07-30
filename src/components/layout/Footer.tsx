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

/**
 * Footer claro, como en la referencia, cerrado por el nombre de la marca a gran
 * tamaño recortado en el borde inferior.
 */
export function Footer() {
  const channels = getContactChannels()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-white text-navy-950">
      <Container className="pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Logo tone="onLight" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-950/65">
              {SITE.description}
            </p>
            {SOCIAL.linkedin ? (
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex size-10 items-center justify-center rounded-full border border-navy-950/20 text-navy-950 transition-colors duration-300 hover:border-navy-950 hover:bg-navy-950 hover:text-white"
                aria-label={`${SITE.name} en LinkedIn`}
              >
                <LinkedInIcon />
              </a>
            ) : null}
          </div>

          <nav aria-labelledby="footer-navegacion">
            <h2
              id="footer-navegacion"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700"
            >
              Navegación
            </h2>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-950/70 transition-colors duration-200 hover:text-navy-950"
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
              className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700"
            >
              Servicios
            </h2>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`${ROUTES.services}#${service.id}`}
                    className="text-sm text-navy-950/70 transition-colors duration-200 hover:text-navy-950"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
              Contacto
            </h2>
            <ul className="mt-6 space-y-3">
              {channels.map((channel) => (
                <li key={channel.id} className="text-sm text-navy-950/70">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="transition-colors duration-200 hover:text-navy-950"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    channel.value
                  )}
                </li>
              ))}
              <li className="flex items-start gap-2 pt-1 text-sm text-navy-950/70">
                <Clock
                  className="mt-0.5 size-4 shrink-0 text-navy-700"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>
                  {CONTACT.schedule.days}
                  <br />
                  {CONTACT.schedule.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-navy-950/10 pt-8">
          <p className="text-xs text-navy-950/50">
            © {year} {SITE.legalName}. Todos los derechos reservados.
          </p>
        </div>
      </Container>

      {/* Marca de agua: decorativa y recortada abajo, como en la referencia.
          El nombre real ya lo aportan el logo y el copyright. */}
      <p
        className="pointer-events-none -mb-[2vw] select-none whitespace-nowrap text-center font-display text-[13vw] font-extrabold leading-none tracking-tighter text-navy-950/[0.06]"
        aria-hidden="true"
      >
        {SITE.name}
      </p>
    </footer>
  )
}
