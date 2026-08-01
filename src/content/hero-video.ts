import type { MediaVideo } from '@/content/media'

/**
 * Vídeo del hero. **Material propio de Grupo Ventori**, no ambientación de stock.
 *
 * Vive fuera de `media.ts` a propósito: ese archivo lo genera `npm run media` y
 * cualquier ejecución del script sobrescribiría esta entrada. Aquí está a salvo,
 * y es la razón de que `HERO_VIDEOS` esté vacío en `scripts/media-plan.mjs`.
 *
 * PENDIENTE DE CONFIRMAR CON EL CLIENTE: no está verificado si estas obras son
 * proyectos ejecutados por Grupo Ventori. Hasta que lo confirme, la descripción
 * alternativa es puramente descriptiva y en ningún punto del sitio se rotula
 * como obra propia — igual que se hace con el material de stock. Si son suyas,
 * se puede decir; si no, decirlo sería una afirmación falsa sobre su trayectoria,
 * que en una empresa de interventoría no es un detalle menor.
 *
 * Origen: `videohero.mp4` (1920×1080, 25 fps, 10,3 s). Recodificado a H.264 High
 * con `-crf 32 -maxrate 1.6M -pix_fmt yuv420p -movflags +faststart -an`, que a
 * 2,1 MB no muestra artefactos bajo el velo del hero. Sin pista de audio: el
 * vídeo va silenciado y `aria-hidden`. El póster es el primer fotograma exacto
 * —cualquier otro produce un salto visible al arrancar la reproducción—.
 */
export const HERO_CLIPS: readonly MediaVideo[] = [
  {
    src: '/media/hero.mp4',
    poster: '/media/hero-poster.jpg',
    alt: 'Montaje de obra: excavación y cimentaciones vistas desde el aire, encofrado en altura, vía en concreto atravesando un barrio, cuadrilla vaciando una placa entre columnas de acero de refuerzo, y una grúa torre sobre un edificio en construcción con la ciudad al fondo',
  },
] as const
