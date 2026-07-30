'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { NAV_LINKS, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

/** Píxeles de scroll a partir de los cuales el header pasa a fondo sólido. */
const SOLID_AFTER = 24

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  /**
   * El menú guarda la ruta en la que se abrió. Así basta con comparar contra la
   * ruta actual para que se cierre solo al navegar, sin un efecto que sincronice
   * estado con estado.
   */
  const [menu, setMenu] = useState({ open: false, path: pathname })
  const isMenuOpen = menu.open && menu.path === pathname
  const setIsMenuOpen = (open: boolean) => setMenu({ open, path: pathname })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SOLID_AFTER)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Con el menú abierto el fondo no debe desplazarse.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      // `setMenu` es estable; `setIsMenuOpen` se recrea en cada render.
      if (event.key === 'Escape') setMenu((prev) => ({ ...prev, open: false }))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300',
        isScrolled || isMenuOpen
          ? 'border-b border-white/10 bg-navy-950/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <div className="flex h-[var(--header-height)] items-center justify-between lg:h-[var(--header-height-lg)]">
          <Logo />

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'group relative px-3.5 py-2 text-[0.9375rem] font-semibold tracking-[0.02em] transition-colors duration-200',
                  isActive(link.href) ? 'text-white' : 'text-white/70 hover:text-white',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-3.5 bottom-1 h-0.5 origin-left rounded-full bg-terracota-500 transition-transform duration-300',
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href={ROUTES.contact} className="hidden lg:inline-flex" withArrow>
              Hablemos
            </ButtonLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="menu-movil"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-terracota-500 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="size-5" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu className="size-5" strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="menu-movil"
        hidden={!isMenuOpen}
        className="h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-white/10 bg-navy-950 lg:hidden"
      >
        <Container className="flex flex-col gap-2 py-8">
          <nav aria-label="Navegación principal móvil" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'border-b border-white/10 py-5 font-display text-2xl font-bold tracking-tight transition-colors duration-200',
                  isActive(link.href) ? 'text-terracota-400' : 'text-white hover:text-terracota-300',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ButtonLink href={ROUTES.contact} size="lg" className="mt-6 w-full" withArrow>
            Hablemos
          </ButtonLink>
        </Container>
      </div>
    </header>
  )
}
