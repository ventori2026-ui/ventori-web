import type { TargetAndTransition } from 'framer-motion'

/**
 * Qué dispara la entrada de una pieza.
 *
 * - `view`  — al cruzar el viewport. El valor por defecto y el correcto para
 *   todo lo que hay debajo del pliegue.
 * - `mount` — al montar el componente. Obligatorio para lo que ya está en
 *   pantalla en la primera carga: hero y encabezados de página.
 *
 * La distinción no es cosmética: en la primera carga no ha habido scroll, así
 * que lo que ya está en pantalla no puede esperar a "entrar en vista". Los CTA
 * del hero se quedaban invisibles por esto.
 */
export type EntranceTrigger = 'view' | 'mount'

/*
 * Configuración del observador, común a todas las primitivas.
 *
 * Sin `margin` y sin `amount`, es decir, umbral cero y viewport completo. Las
 * dos alternativas se probaron y las dos dejaban contenido invisible:
 *
 *   margin: '0px 0px -15% 0px'  recorta el viewport por abajo para adelantar el
 *     revelado, pero crea una franja donde un elemento puede estar a la vista y
 *     sin disparar. Quien lo atraviese de un golpe de scroll lo deja en cero
 *     para siempre.
 *
 *   amount: 0.15  exige que se vea el 15 % del elemento. Rompe justo las piezas
 *     que arrancan recortadas —titulares y marcos enmascarados—, porque su área
 *     visible inicial es cero y nunca alcanzan el umbral.
 *
 * Con umbral cero basta un píxel a la vista. El revelado empieza en cuanto la
 * pieza asoma por abajo y, con 0,65–0,9 s de duración, se ve entero mientras
 * sube. Es menos dramático que retrasarlo y no tiene ningún modo de fallo en el
 * que el contenido se quede en blanco.
 */
const VIEWPORT = { once: true } as const

/**
 * Props de framer-motion para una entrada con destino explícito.
 *
 * Solo para piezas que no arrancan recortadas: el observador se aplica al mismo
 * elemento que se anima, así que su área visible inicial no puede ser cero.
 */
export function entranceProps(trigger: EntranceTrigger, target: TargetAndTransition) {
  if (trigger === 'mount') return { animate: target }
  return { whileInView: target, viewport: VIEWPORT } as const
}

/**
 * Props para el elemento que **observa** cuando la entrada debe dispararse, y
 * que propaga el estado a sus hijos por variantes.
 *
 * Es el modo obligatorio cuando la pieza animada arranca fuera de su caja y
 * recortada —titulares línea a línea, marcos enmascarados—. Si el observador
 * fuera sobre la pieza animada, su rectángulo visible inicial mediría cero y el
 * navegador no la consideraría nunca dentro del viewport: se quedaría invisible
 * de forma permanente. El envoltorio nunca se transforma, así que siempre es
 * observable.
 */
export function entranceTriggerProps(trigger: EntranceTrigger) {
  if (trigger === 'mount') return { initial: 'hidden', animate: 'visible' } as const
  return { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT } as const
}

export { VIEWPORT as ENTRANCE_VIEWPORT }
