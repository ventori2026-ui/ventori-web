'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HERO_CLIPS } from '@/content/media'
import { cn } from '@/lib/utils'

/** Milisegundos que permanece cada clip antes de fundir al siguiente. */
const CLIP_DURATION = 7000

/**
 * Fondo del hero: tres clips que se funden en bucle, como en la referencia.
 *
 * - Los vídeos van silenciados y sin controles: son decorado, no contenido.
 * - `poster` pinta el primer fotograma sin esperar al vídeo, así el LCP no
 *   depende de la descarga del mp4.
 * - Solo se reproduce el clip visible. Con `autoPlay` en los tres, los tres
 *   quedaban decodificando a la vez y consumían CPU sin que se vieran.
 * - Con `prefers-reduced-motion` no se monta ningún `<video>`: se queda el
 *   póster del primer clip como imagen fija.
 */
export function HeroVideo() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion || HERO_CLIPS.length < 2) return

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % HERO_CLIPS.length)
    }, CLIP_DURATION)

    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (index === active) {
        // Cada clip reaparece desde el principio, no a media reproducción.
        video.currentTime = 0
        void video.play().catch(() => {
          // Si el navegador bloquea la reproducción automática, queda el póster.
        })
      } else {
        video.pause()
      }
    })
  }, [active, prefersReducedMotion])

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-950" aria-hidden="true">
      {HERO_CLIPS.map((clip, index) => (
        <div
          key={clip.src}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === active ? 'opacity-100' : 'opacity-0',
          )}
        >
          {prefersReducedMotion ? (
            // eslint-disable-next-line @next/next/no-img-element -- el póster ya está dimensionado y sirve de fondo a sangre
            <img src={clip.poster} alt="" className="size-full object-cover" />
          ) : (
            <video
              ref={(node) => {
                videoRefs.current[index] = node
              }}
              src={clip.src}
              poster={clip.poster}
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
              className="size-full object-cover"
            />
          )}
        </div>
      ))}

      {/* Doble velo: uno general para el contraste del texto y otro desde abajo
          para que el titular se apoye sobre la zona más oscura. */}
      <div className="absolute inset-0 bg-navy-950/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/40" />
    </div>
  )
}
