'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { NAV_LINKS, ROUTES } from '@/lib/constants'
import { cn, formatIndex } from '@/lib/utils'

/** Desplazamiento a partir del cual el header deja de ser transparente. */
const SOLID_AT = 24

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /*
   * El header arranca transparente sobre el hero y se vuelve sólido en cuanto
   * la página se mueve. `passive` porque el manejador nunca cancela el evento y
   * marcarlo permite al navegador seguir haciendo scroll sin esperarlo.
   */
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AT)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    /* El fondo no debe poder desplazarse detrás del panel. */
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      /* Retención del foco: sin esto el tabulador se va al contenido que hay
         debajo del panel, que el usuario no puede ver. */
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    /* Se captura ahora: para cuando corra la limpieza, `toggleRef.current`
       podría apuntar a otro nodo o a ninguno. */
    const toggle = toggleRef.current

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      /* El foco vuelve al botón que abrió el panel, no al principio del documento. */
      toggle?.focus()
    }
  }, [open])

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-(--header-height) transition-colors duration-300 lg:h-(--header-height-lg)',
        solid || open ? 'bg-navy-950/95 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      {/* Filo inferior. Se desvanece con el header transparente en vez de
          aparecer de golpe al empezar a desplazar. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 bottom-0 h-px bg-navy-700 transition-opacity duration-300',
          solid || open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div className="mx-auto flex h-full max-w-[100rem] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)

            return (
              /*
               * El enlace mide 44 px de alto —mínimo táctil de HIG, y 1024 px
               * puede ser una tablet— mientras que el subrayado se ancla al
               * `<span>` del texto. Si colgara del enlace quedaría a 15 px por
               * debajo de las letras, flotando.
               */
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="group flex min-h-11 items-center font-mono text-label uppercase text-navy-100 transition-colors duration-200 hover:text-white"
              >
                <span className="relative">
                  {link.label}
                  {/* Presente y al 100 % en la ruta activa; trazado desde la
                      izquierda al pasar el cursor por las demás. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 -bottom-1.5 h-px origin-left bg-terracota-500 transition-transform duration-300 ease-[var(--ease-out-soft)]',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={ROUTES.contact} className="min-h-11 px-6">
            Hablemos
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="-mr-3 flex size-12 cursor-pointer items-center justify-center text-white lg:hidden"
        >
          {open ? (
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
          ) : (
            <Menu aria-hidden="true" strokeWidth={1.5} className="size-6" />
          )}
        </button>
      </div>

      {/*
        El panel permanece en el árbol y se oculta con `hidden`, que además lo
        retira del orden de tabulación y del árbol de accesibilidad. Desmontarlo
        haría imposible devolver el foco de forma ordenada al cerrarlo.
      */}
      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-(--header-height) bottom-0 z-40 overflow-y-auto bg-navy-950 lg:hidden"
      >
        <nav aria-label="Principal (móvil)" className="flex flex-col px-6 pt-6 pb-12">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              /* Cerrar aquí y no en un efecto sobre `pathname`: la intención de
                 navegar es este clic, no un cambio de ruta que hay que observar
                 después con un render de más. */
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-5 border-b border-navy-800 py-5"
            >
              <span className="font-mono text-label tabular text-terracota-500">
                {formatIndex(index)}
              </span>
              <span
                className={cn(
                  'stretch-display font-display text-2xl font-semibold tracking-tight transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1',
                  isActive(link.href) ? 'text-terracota-500' : 'text-white',
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}

          <Button href={ROUTES.contact} onClick={() => setOpen(false)} className="mt-10 w-full">
            Hablemos
          </Button>
        </nav>
      </div>
    </header>
  )
}
